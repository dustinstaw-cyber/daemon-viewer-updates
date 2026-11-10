const fs=require('fs'),p=require('path'),z=require('zlib'),crypto=require('crypto'),assert=require('assert/strict'),{execFileSync}=require('child_process');


const originalGzipSync=z.gzipSync;z.gzipSync=(...args)=>{const bytes=originalGzipSync(...args);bytes[9]=10;return bytes;}; // Canonical Windows DVP gzip header matches the independently signed exact patch.
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
  if(expanded>512*1024**2)throw Error('Patch expansion '+expanded+' baseline '+manifest.fromVersion+' exceeds limit; largest '+JSON.stringify(manifest.files.map(f=>({path:f.path,size:f.size})).sort((a,b)=>b.size-a.size).slice(0,20)));
  parts.push(end);return Buffer.concat(parts);
 };
}


const encodePatch=patchEncoder();
const repo='dustinstaw-cyber/daemon-viewer-updates',version='1.7.108',tag='v'+version,old='1.7.107',out=p.join(process.env.RUNNER_TEMP||__dirname,'daemon-release-'+version),hash=b=>crypto.createHash('sha256').update(b).digest('hex');fs.mkdirSync(out,{recursive:true});

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

(async()=>{
const prefix='https://raw.githubusercontent.com/'+repo+'/'+process.env.GITHUB_SHA+'/release-payloads/',input=await bytes(prefix+'build-input-1.7.108.json.gz'),payload=JSON.parse(z.gunzipSync(input));assert.equal(payload.version,version);assert.equal(payload.old,old);
const key=payload.publicKey;assert.equal(hash(Buffer.from(key.replaceAll('\r\n','\n'))),'73ac800430aaa48e68c9c405697fb2c16c874c953da34f037c51571fbb728e6b');
const claims=verifyEnvelope(payload.envelope,key);assert.equal(claims.product,'daemon-viewer');assert.equal(claims.component,'release');assert.equal(claims.version,version);assert.deepEqual(claims.patches,[payload.exact]);assert.deepEqual(claims.assets,payload.extraAssets);
const changes=new Map(payload.changed.map(f=>{const b=Buffer.from(f.data,'base64');assert.equal(b.length,f.size);assert.equal(hash(b),f.sha256);assert(!f.path.startsWith('content-packs/'));return[f.path,f]}));assert.equal(hash(Buffer.from(changes.get('runtime-files.json').data,'base64')),payload.runtimeSHA256);
const runtime=JSON.parse(Buffer.from(changes.get('runtime-files.json').data,'base64'));assert.equal(runtime.files.length,payload.runtimeFiles);
const prior=await json('https://api.github.com/repos/'+repo+'/releases/tags/v'+old);assert(!prior.draft);const priorEnvelope=JSON.parse(await downloadPrior(prior.assets.find(a=>a.name==='Daemon_Viewer_Release_'+old+'.json'),out,{cache:false})),priorClaims=verifyEnvelope(priorEnvelope,key);assert.equal(priorClaims.version,old);assert.equal(priorClaims.patches.length,75);
const api='https://api.github.com/repos/'+repo;
const all=await json(api+'/releases?per_page=100&verify='+Date.now());console.log('Recent release metadata '+JSON.stringify(all.slice(0,6).map(r=>({id:r.id,tag:r.tag_name,name:r.name,draft:r.draft}))));
const buildMarker='<!-- verified-input:'+hash(input)+'; gzip-os:10 -->';
let draft=all.filter(r=>r.tag_name===tag&&r.body?.includes(buildMarker)).sort((a,b)=>b.assets.length-a.assets.length)[0];
for(const obsolete of all.filter(r=>r.tag_name===tag&&r.draft&&!r.body?.includes(buildMarker))){const response=await fetch(api+'/releases/'+obsolete.id,{method:'PATCH',headers:{Authorization:'Bearer '+process.env.GH_TOKEN,Accept:'application/vnd.github+json','Content-Type':'application/json'},body:JSON.stringify({tag_name:'superseded-draft-'+tag+'-'+obsolete.id,make_latest:'false'})});assert(response.ok,'Preserve superseded draft '+response.status);}
if(draft)assert(draft.draft,'Already public; never mutate release bytes');else{const response=await fetch(api+'/releases',{method:'POST',headers:{Authorization:'Bearer '+process.env.GH_TOKEN,Accept:'application/vnd.github+json','Content-Type':'application/json'},body:JSON.stringify({tag_name:tag,target_commitish:process.env.GITHUB_SHA,name:'Daemon M2 Tool '+version+' - WorldEditor-Datenabgleich',body:payload.notes+'\n\n'+buildMarker,draft:true,prerelease:false,make_latest:'false'})});assert(response.ok,'Create draft '+response.status);draft=await response.json();}
assert.equal(draft.tag_name,tag);console.log('Using verified draft '+draft.id);

async function upload(spec,data){assert.equal(hash(data),spec.sha256);assert.equal(data.length,spec.size);const present=draft.assets.find(a=>a.name===spec.name);if(present){assert.equal(present.digest,'sha256:'+spec.sha256);assert.equal(present.size,spec.size);return;}
 const url=draft.upload_url.replace(/\{.*$/,'')+'?name='+encodeURIComponent(spec.name)+(spec.baseline?'&label='+encodeURIComponent('Datei-Patch ab '+spec.baseline):'');
 for(let retry=0;retry<4;retry++){const response=await fetch(url,{method:'POST',headers:{Authorization:'Bearer '+process.env.GH_TOKEN,'Content-Type':'application/octet-stream'},body:data,signal:AbortSignal.timeout(180000)});if(response.ok){const uploaded=await response.json();assert.equal(uploaded.digest,'sha256:'+spec.sha256);assert.equal(uploaded.size,spec.size);if(spec.baseline)assert.equal(uploaded.label,'Datei-Patch ab '+spec.baseline);return;}if(retry===3)throw Error('Upload failed '+response.status+' '+spec.name);await new Promise(r=>setTimeout(r,3000*(retry+1)));}
}
const built=[];await eachLimit(priorClaims.patches,async(spec,index)=>{const a=prior.assets.find(a=>a.name===spec.name);assert.equal(a.digest,'sha256:'+spec.sha256);assert.equal(a.size,spec.size);const b=await downloadPrior(a,out,{cache:false});assert.equal(hash(b),spec.sha256);if(!primed)primeCompression(b);const before=JSON.parse(z.gunzipSync(b.subarray(5)));assert.equal(before.version,old);assert.equal(before.fromVersion,spec.baseline);assert.equal(before.runtimeSHA256,payload.fromRuntimeSHA256);const all=new Map(before.files.filter(f=>!f.path.startsWith('environment-effect-pack/')&&!f.path.startsWith('waterfall-pack/')).map(f=>[f.path,f]));for(const f of payload.changed)all.set(f.path,f);const m={...before,version,runtimeSHA256:payload.runtimeSHA256,files:[...all.values()].sort((a,b)=>a.path.localeCompare(b.path,'en')),remove:before.remove.filter(f=>!changes.has(f))};for(const f of runtime.files)if(all.has(f.path))assert.equal(all.get(f.path).sha256,f.sha256,f.path);const data=encodePatch(m),name='Daemon_Viewer_Files_'+spec.baseline+'_to_'+version+'.dvp',next={version,baseline:spec.baseline,kind:'files',name,url:'https://github.com/'+repo+'/releases/download/'+tag+'/'+name,size:data.length,sha256:hash(data)};await upload(next,data);built[index]=next;console.log('Verified baseline '+spec.baseline+'; drafted '+built.filter(Boolean).length+'/76');},3);
const exactBytes=encodePatch({schema:1,fromVersion:old,version,fromRuntimeSHA256:payload.fromRuntimeSHA256,runtimeSHA256:payload.runtimeSHA256,files:payload.changed,remove:[]});assert.equal(hash(exactBytes),payload.exact.sha256);await upload(payload.exact,exactBytes);built.push(payload.exact);assert.equal(built.length,76);
for(const asset of payload.extraAssets){const chunks=[];let received=0;for(const part of payload.uploads.filter(x=>x.part===asset.name).sort((a,b)=>a.offset-b.offset)){assert.equal(part.offset,received);assert(/^[a-f0-9]{40}$/.test(part.uploaded));const b=await bytes('https://api.github.com/repos/'+repo+'/git/blobs/'+part.uploaded);assert.equal(b.length,part.size);assert.equal(hash(b),part.sha256);chunks.push(b);received+=b.length;}await upload(asset,Buffer.concat(chunks));console.log('Native pack byte-for-byte verified '+asset.size);}
const checked=JSON.parse(gh(['api','repos/'+repo+'/releases/'+draft.id]));assert(checked.draft);assert.equal(checked.assets.length,76);for(const f of [...built,...payload.extraAssets]){const a=checked.assets.find(a=>a.name===f.name);assert.equal(a.digest,'sha256:'+f.sha256);assert.equal(a.size,f.size);if(f.baseline)assert.equal(a.label,'Datei-Patch ab '+f.baseline);}
const result={schema:1,version,old,inputSHA256:hash(input),sourceCommit:process.env.GITHUB_SHA,releaseId:draft.id,patches:built,assets:payload.extraAssets,runtimeSHA256:payload.runtimeSHA256,fromRuntimeSHA256:payload.fromRuntimeSHA256,priorSignatureVerified:true,allDraftAssetDigestsVerified:true};
const rel='release-payloads/build-result-1.7.108.json',request={message:'Record independently verified 1.7.108 draft hashes',content:Buffer.from(JSON.stringify(result)).toString('base64')};try{const existing=JSON.parse(gh(['api','repos/'+repo+'/contents/'+rel]));request.sha=existing.sha;}catch{}const file=p.join(out,'record.json');fs.writeFileSync(file,JSON.stringify(request));gh(['api','--method','PUT','repos/'+repo+'/contents/'+rel,'--input',file]);console.log('DRAFT READY '+draft.id+'; 76 file patches. Awaiting offline publisher signature.');
})().catch(e=>{console.error(e);process.exitCode=1});
