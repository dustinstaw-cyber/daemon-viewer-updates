const assert=require('assert/strict');
const repo=process.env.GITHUB_REPOSITORY, token=process.env.GH_TOKEN;
assert.equal(repo,'dustinstaw-cyber/daemon-viewer-updates');assert(token);
const api='https://api.github.com/repos/'+repo;
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function request(path,method='GET',body){
 for(let n=0;n<6;n++){
  const r=await fetch(api+path,{method,headers:{...(method==='GET'?{}:{Authorization:'Bearer '+token}),Accept:'application/vnd.github+json','User-Agent':'Daemon-Channel-Metadata-Maintenance',...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined});
  if((r.status===403||r.status===429)&&n<5){await pause(Math.max(60000,Number(r.headers.get('retry-after')||0)*1000));continue;}
  const t=await r.text();assert(r.ok,'API '+r.status+' '+path);return{value:JSON.parse(t),length:t.length};
 }
}
(async()=>{
 const snapshot=(await request('/releases?per_page=10')).value;
 const newest=snapshot.find(r=>!r.draft&&!r.prerelease);assert.equal(newest.tag_name,'v1.7.93');
 const backup=await request('/contents/release-payloads/channel-metadata-before-1.7.93.json.gz?ref='+process.env.GITHUB_SHA);
 const saved=JSON.parse(require('zlib').gunzipSync(Buffer.from(backup.value.content.replace(/\s/g,''),'base64')));
 for(const release of snapshot.filter(r=>!r.draft&&r.id!==newest.id)){
  const old=saved.find(r=>r.id===release.id);assert(old&&old.body===release.body);
  await request('/releases/'+release.id,'PATCH',{body:'Versionshinweise (Archiv): https://github.com/'+repo+'/raw/refs/heads/main/release-payloads/channel-metadata-before-1.7.93.json.gz',make_latest:'false'});
  await pause(800);
 }
 let response=await request('/releases?per_page=10');
 for(const release of snapshot.filter(r=>!r.draft&&r.id!==newest.id).reverse()){
  for(const asset of release.assets){
   if(response.length<1045000)break;
   if(!asset.label||!asset.name.endsWith('.dvp'))continue;
   await request('/releases/assets/'+asset.id,'PATCH',{label:''});
   await pause(800);
   response.length-=asset.label.length;
  }
  response=await request('/releases?per_page=10');
  console.log('Legacy update channel bytes:',response.length);
  if(response.length<1045000)break;
 }
 const after=(await request('/releases?per_page=10')).value;
 for(const before of snapshot){const now=after.find(x=>x.id===before.id);assert(now);assert.deepEqual(now.assets.map(a=>({id:a.id,name:a.name,size:a.size,digest:a.digest})),before.assets.map(a=>({id:a.id,name:a.name,size:a.size,digest:a.digest})));}
 const live=after.find(r=>r.id===newest.id);assert.equal(live.body,newest.body);assert.deepEqual(live.assets.map(a=>({id:a.id,label:a.label})),newest.assets.map(a=>({id:a.id,label:a.label})));
 assert(response.length<1048576);assert.equal((await request('/releases/latest')).value.tag_name,'v1.7.68');
 console.log('PASS: all downloads unchanged, labels and notes archived, legacy updater response below 1 MiB.');
})().catch(e=>{console.error(e);process.exitCode=1});
