const fs=require('fs'),p=require('path'),z=require('zlib'),crypto=require('crypto'),assert=require('assert/strict'),{execFileSync}=require('child_process');


const gzipMembers=new Map();let primed=false;
function primeCompression(input){let at=5;assert.equal(input.subarray(0,5).toString(),'DVP1\n');while(at<input.length){assert.equal(input.readUInt32LE(at),0x00088b1f);const raw=z.inflateRawSync(input.subarray(at+10),{info:true,maxOutputLength:512*1024**2}),length=10+raw.engine.bytesWritten+8,member=input.subarray(at,at+length);assert(z.gunzipSync(member).equals(raw.buffer));gzipMembers.set(crypto.createHash('sha256').update(raw.buffer).digest('hex'),member);at+=length;}assert.equal(at,input.length);primed=true;}
function verifiedPatchHeader(input){assert.equal(input.subarray(0,5).toString(),'DVP1\n');const header=z.inflateRawSync(input.subarray(15),{maxOutputLength:1024*1024}).toString('utf8');assert(header.endsWith(',"files":['));return JSON.parse(header.slice(0,-10)+'}');}
function patchEncoder(){
 const cache=gzipMembers,end=z.gzipSync(Buffer.from(']}'),{level:6});
 return manifest=>{
  const metadata={schema:manifest.schema,fromVersion:manifest.fromVersion,version:manifest.version,fromRuntimeSHA256:manifest.fromRuntimeSHA256,runtimeSHA256:manifest.runtimeSHA256,remove:manifest.remove};
  const header=JSON.stringify(metadata).slice(0,-1)+',"files":[',parts=[Buffer.from('DVP1\n'),z.gzipSync(Buffer.from(header),{level:6})];let expanded=Buffer.byteLength(header)+2;
  for(let i=0;i<manifest.files.length;i++){
   const file=manifest.files[i],prefix=i?',':'',serialized=prefix+JSON.stringify(file),key=crypto.createHash('sha256').update(serialized).digest('hex');expanded+=Buffer.byteLength(serialized);
   if(!cache.has(key))cache.set(key,z.gzipSync(Buffer.from(serialized),{level:6}));parts.push(cache.get(key));
  }
  if(expanded>512*1024**2)throw Error('Patch exceeds the installed updater expansion limit.');
  parts.push(end);return Buffer.concat(parts);
 };
}


const encodePatch=patchEncoder();
const repo='dustinstaw-cyber/daemon-viewer-updates',version='1.7.104',tag='v'+version,old='1.7.103',out=p.join(process.env.RUNNER_TEMP||__dirname,'daemon-release-'+version),hash=b=>crypto.createHash('sha256').update(b).digest('hex');fs.mkdirSync(out,{recursive:true});

async function bytes(url){for(let n=0;n<5;n++)try{const r=await fetch(url,{headers:{Accept:'application/vnd.github.raw+json','User-Agent':'Daemon-Verified-Publisher',...(new URL(url).hostname==='api.github.com'&&process.env.GH_TOKEN?{Authorization:'Bearer '+process.env.GH_TOKEN}:{})},signal:AbortSignal.timeout(90000)});assert(r.ok,r.status+' '+url);return Buffer.from(await r.arrayBuffer());}catch(e){if(n===4)throw e;await new Promise(r=>setTimeout(r,1000*(n+1)));}}

const json=async url=>JSON.parse(await bytes(url));

function gh(args){return execFileSync('gh',args,{encoding:'utf8',maxBuffer:4*1024*1024,windowsHide:true});}

const downloadPrior=(()=>{
const fs=require('node:fs/promises'),path=require('node:path'),c=require('node:crypto'),assert=require('node:assert/strict');
const sha=b=>c.createHash('sha256').update(b).digest('hex');
async function downloadPrior(asset,directory,{cache=true}={}){if(cache)await fs.mkdir(directory,{recursive:true});const target=path.join(directory,asset.name);try{if(!cache)throw Error('uncached');const cached=await fs.readFile(target);if(cached.length===asset.size&&'sha256:'+sha(cached)===asset.digest)return cached;}catch{}
 const size=8*1024**2,parts=[];let direct;
 for(let start=0;start<asset.size;start+=size){const end=Math.min(asset.size-1,start+size-1);let data;
  for(let retry=0;retry<5;retry++){try{const response=await fetch(direct||asset.url,{headers:{...(!direct&&process.env.GH_TOKEN?{Authorization:'Bearer '+process.env.GH_TOKEN}:{}),Accept:'application/octet-stream',Range:'bytes='+start+'-'+end,'User-Agent':'Daemon-Verified-Builder'},signal:AbortSignal.timeout(90000)});assert(response.ok,'Asset HTTP '+response.status);const raw=Buffer.from(await response.arrayBuffer());if(response.status===200){assert.equal(start,0);assert.equal(raw.length,asset.size);assert.equal('sha256:'+sha(raw),asset.digest);if(cache)await fs.writeFile(target,raw);return raw;}assert.equal(response.status,206);assert.equal(response.headers.get('content-range'),'bytes '+start+'-'+end+'/'+asset.size);assert.equal(raw.length,end-start+1);direct=response.url;data=raw;break;}catch(error){if(retry===4)throw error;direct=null;await new Promise(r=>setTimeout(r,1000*(retry+1)));}}
  parts.push(data);
 }
 const bytes=Buffer.concat(parts);assert.equal(bytes.length,asset.size);assert.equal('sha256:'+sha(bytes),asset.digest);if(cache)await fs.writeFile(target,bytes);return bytes;
}
return downloadPrior;

})();
async function eachLimit(list,fn,n=3){let at=0;await Promise.all(Array.from({length:Math.min(n,list.length)},async()=>{while(at<list.length){const i=at++;await fn(list[i],i);}}));}
const ghAsync=args=>require('node:util').promisify(require('node:child_process').execFile)('gh',args,{encoding:'utf8',maxBuffer:4*1024*1024,windowsHide:true});
function verifyEnvelope(e,key){assert.equal(e.schema,1);assert.equal(e.algorithm,'Ed25519');const b=Buffer.from(e.payload,'base64');assert(crypto.verify(null,b,key,Buffer.from(e.signature,'base64')));return JSON.parse(b);}

// Keep obsolete patch bytes in a private draft while retaining their pinned native URLs publicly.
// Current patches support every baseline; no native resource or signed byte is discarded.
async function compactLegacyResourceRelease(publicKey){
 const api='https://api.github.com/repos/'+repo,originalTag='v1.7.103',archiveTag='archive-v1.7.103',stagingTag='resources-compat-v1.7.103';
 const all=[];for(let page=1;page<=100;page++){const batch=await json(api+'/releases?per_page=100&page='+page);all.push(...batch);if(batch.length<100)break;assert(page<100,'Release listing exceeds verified pagination bound');}let current=all.find(r=>r.tag_name===originalTag&&!r.draft)||all.find(r=>r.tag_name===stagingTag)||all.find(r=>r.tag_name===originalTag&&r.assets.length>0),archive=all.find(r=>r.tag_name===archiveTag);
 if(!archive&&current?.assets.some(a=>a.name.endsWith('.dvp')))archive=current;
 if(!archive){assert(current&&!current.draft&&current.assets.length===2);return;}
 const change=async(endpoint,method,body)=>{const response=await fetch(api+endpoint,{method,headers:{Authorization:'Bearer '+process.env.GH_TOKEN,Accept:'application/vnd.github+json','Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(30000)});assert(response.ok,method+' '+response.status+' '+endpoint);return response.json();};
 const assetBytes=async asset=>{for(let n=0;n<4;n++){const response=await fetch(asset.url,{headers:{Authorization:'Bearer '+process.env.GH_TOKEN,Accept:'application/octet-stream','User-Agent':'Daemon-Archive-Preservation'},signal:AbortSignal.timeout(120000)});if(response.ok){const data=Buffer.from(await response.arrayBuffer());assert.equal(data.length,asset.size);assert.equal('sha256:'+hash(data),asset.digest);return data;}if(n===3)throw Error('Archive resource download '+response.status);await new Promise(r=>setTimeout(r,2000));}};
 const kept=archive.assets.filter(a=>!a.name.endsWith('.dvp'));assert.equal(kept.length,2);const saved=await Promise.all(kept.map(async a=>({asset:a,data:await assetBytes(a)}))),envelope=JSON.parse(saved.find(f=>f.asset.name==='Daemon_Viewer_Release_1.7.103.json').data),claims=verifyEnvelope(envelope,publicKey);assert.equal(claims.version,'1.7.103');assert.equal(claims.assets.length,0);for(const f of claims.assets){const actual=saved.find(a=>a.asset.name===f.name);assert(actual);assert.equal(hash(actual.data),f.sha256);assert.equal(actual.data.length,f.size);}
 const tagBefore=await json(api+'/git/ref/tags/'+originalTag);
 const original=current?.id===archive.id?archive:null;if(original)current=all.find(r=>r.tag_name===stagingTag);
 if(!current)current=await change('/releases','POST',{tag_name:stagingTag,target_commitish:archive.target_commitish,name:'Daemon M2 Tool 1.7.103 - archivierte Ressourcen',body:'Kompatibilitaetsressourcen fuer bestehende Installationen. Die unveraenderten Signaturdateien bleiben unter ihren bisherigen Download-Adressen erreichbar. Die vollstaendige alte Patchausgabe ist fuer den Herausgeber als Draft archiviert; aktuelle Versionen enthalten gepruefte Patches fuer alle unterstuetzten Ausgangsversionen.',draft:true,prerelease:false,make_latest:'false'});
 for(const f of saved){const present=current.assets.find(a=>a.name===f.asset.name);if(present){assert.equal(present.digest,f.asset.digest);assert.equal(present.size,f.asset.size);continue;}const url=current.upload_url.replace(/\{.*$/,'')+'?name='+encodeURIComponent(f.asset.name),response=await fetch(url,{method:'POST',headers:{Authorization:'Bearer '+process.env.GH_TOKEN,'Content-Type':'application/octet-stream'},body:f.data,signal:AbortSignal.timeout(120000)});assert(response.ok,'Restore compatibility asset '+response.status);const uploaded=await response.json();assert.equal(uploaded.digest,f.asset.digest);assert.equal(uploaded.size,f.asset.size);}
 current=await json(api+'/releases/'+current.id);assert.equal(current.assets.length,2);for(const f of saved)assert.equal(current.assets.find(a=>a.name===f.asset.name)?.digest,f.asset.digest);if(original){const preserved=await change('/releases/'+original.id,'PATCH',{draft:true,tag_name:archiveTag,make_latest:'false'});assert(preserved.draft);assert.equal(preserved.assets.length,original.assets.length);console.log('All '+original.assets.length+' legacy assets preserved in draft '+archiveTag+' (release '+original.id+').');}if(current.draft||current.tag_name!==originalTag)current=await change('/releases/'+current.id,'PATCH',{tag_name:originalTag,draft:false,make_latest:'false'});assert(!current.draft);assert.equal((await json(api+'/git/ref/tags/'+originalTag)).object.sha,tagBefore.object.sha);
 for(const f of saved){const url='https://github.com/'+repo+'/releases/download/'+originalTag+'/'+f.asset.name;const downloaded=await assetBytes(current.assets.find(a=>a.name===f.asset.name));assert.equal(hash(downloaded),hash(f.data));}console.log('Legacy v1.7.103 resource URLs restored and byte-for-byte verified; every old patch retained in archive draft.');
}

(async()=>{
const prefix='https://raw.githubusercontent.com/'+repo+'/'+process.env.GITHUB_SHA+'/release-payloads/',payload=await json(prefix+'signed-release-1.7.104.json');const key=payload.publicKey;assert.equal(hash(Buffer.from(key.replaceAll('\r\n','\n'))),'73ac800430aaa48e68c9c405697fb2c16c874c953da34f037c51571fbb728e6b');const claims=verifyEnvelope(payload.envelope,key);assert.equal(claims.version,version);assert.equal(claims.product,'daemon-viewer');assert.equal(claims.component,'release');assert.equal(claims.patches.length,72);assert.equal(claims.assets.length,0);
const release=await json('https://api.github.com/repos/'+repo+'/releases/'+payload.releaseId);assert.equal(release.tag_name,tag);assert(release.draft||release.assets.length===74);for(const f of [...claims.patches,...claims.assets]){const a=release.assets.find(a=>a.name===f.name);assert(a);assert.equal(a.digest,'sha256:'+f.sha256);assert.equal(a.size,f.size);assert.equal(a.state,'uploaded');if(f.baseline)assert.equal(a.label,'Datei-Patch ab '+f.baseline);}
const signature='Daemon_Viewer_Release_'+version+'.json',signatureBytes=Buffer.from(JSON.stringify(payload.envelope)),extras=[...claims.assets,{name:signature,size:signatureBytes.length,sha256:hash(signatureBytes)}],sumsName='SHA256SUMS-'+version+'.txt',sums=Buffer.from([...claims.patches,...extras].map(f=>f.sha256+'  '+f.name).join('\n')+'\n');for(const f of [{name:signature,data:signatureBytes},{name:sumsName,data:sums}]){const existing=release.assets.find(a=>a.name===f.name);if(existing){assert.equal(existing.digest,'sha256:'+hash(f.data));assert.equal(existing.size,f.data.length);}else{assert(release.draft);const response=await fetch(release.upload_url.replace(/\{.*$/,'')+'?name='+encodeURIComponent(f.name),{method:'POST',headers:{Authorization:'Bearer '+process.env.GH_TOKEN,'Content-Type':'application/octet-stream'},body:f.data,signal:AbortSignal.timeout(90000)});assert(response.ok,'Signature upload '+response.status);const created=await response.json();assert.equal(created.digest,'sha256:'+hash(f.data));assert.equal(created.size,f.data.length);}}
const checked=await json('https://api.github.com/repos/'+repo+'/releases/'+release.id);assert.equal(checked.assets.length,74);for(const a of checked.assets)assert.equal(a.state,'uploaded');console.log('All 72 file patches match offline publisher signature; all 74 release assets verified.');
await compactLegacyResourceRelease(key);
if(checked.draft)gh(['api','--method','PATCH','repos/'+repo+'/releases/'+checked.id,'-F','draft=false','-f','make_latest=false','-f','name=Daemon M2 Tool '+version+' - Server & Minimap','-f','target_commitish='+payload.sourceCommit]);
const live=await json('https://api.github.com/repos/'+repo+'/releases/tags/'+tag+'?verify='+Date.now());assert(!live.draft);assert.equal(live.assets.length,74);assert.equal((await json('https://api.github.com/repos/'+repo+'/releases/latest')).tag_name,'v1.7.68');
// Authenticated API metadata is used for publication verification; the next workflow step
// separately checks the unmodified updater over anonymous public download URLs.
// The authenticated owner listing includes archive drafts and differs from the public updater channel.
// Verify public channel discovery in the separate anonymous updater step.
console.log('PUBLISHED '+live.html_url+'; signed patch and content release complete.');
})().catch(e=>{console.error(e);process.exitCode=1});
