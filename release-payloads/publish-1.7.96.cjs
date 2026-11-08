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
const repo='dustinstaw-cyber/daemon-viewer-updates',version='1.7.96',tag='v'+version,old='1.7.95',out=p.join(process.env.RUNNER_TEMP||__dirname,'daemon-release-'+version),hash=b=>crypto.createHash('sha256').update(b).digest('hex');fs.mkdirSync(out,{recursive:true});

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
 const api='https://api.github.com/repos/'+repo,originalTag='v1.7.90',archiveTag='archive-v1.7.90',stagingTag='resources-compat-v1.7.90';
 const all=await json(api+'/releases?per_page=100');let current=all.find(r=>r.tag_name===originalTag)||all.find(r=>r.tag_name===stagingTag),archive=all.find(r=>r.tag_name===archiveTag);
 if(!archive&&current?.assets.some(a=>a.name.endsWith('.dvp')))archive=current;
 if(!archive){assert(current&&!current.draft&&current.assets.length===3);return;}
 const change=async(endpoint,method,body)=>{const response=await fetch(api+endpoint,{method,headers:{Authorization:'Bearer '+process.env.GH_TOKEN,Accept:'application/vnd.github+json','Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(30000)});assert(response.ok,method+' '+response.status+' '+endpoint);return response.json();};
 const assetBytes=async asset=>{for(let n=0;n<4;n++){const response=await fetch(asset.url,{headers:{Authorization:'Bearer '+process.env.GH_TOKEN,Accept:'application/octet-stream','User-Agent':'Daemon-Archive-Preservation'},signal:AbortSignal.timeout(120000)});if(response.ok){const data=Buffer.from(await response.arrayBuffer());assert.equal(data.length,asset.size);assert.equal('sha256:'+hash(data),asset.digest);return data;}if(n===3)throw Error('Archive resource download '+response.status);await new Promise(r=>setTimeout(r,2000));}};
 const kept=archive.assets.filter(a=>!a.name.endsWith('.dvp'));assert.equal(kept.length,3);assert(kept.some(a=>a.name==='Daemon_Palmen_6_1.7.90.zip'));const saved=await Promise.all(kept.map(async a=>({asset:a,data:await assetBytes(a)}))),envelope=JSON.parse(saved.find(f=>f.asset.name==='Daemon_Viewer_Release_1.7.90.json').data),claims=verifyEnvelope(envelope,publicKey);assert.equal(claims.version,'1.7.90');assert.equal(claims.assets.length,1);for(const f of claims.assets){const actual=saved.find(a=>a.asset.name===f.name);assert(actual);assert.equal(hash(actual.data),f.sha256);assert.equal(actual.data.length,f.size);}
 const tagBefore=await json(api+'/git/ref/tags/'+originalTag);
 const original=current?.id===archive.id?archive:null;if(original)current=all.find(r=>r.tag_name===stagingTag);
 if(!current)current=await change('/releases','POST',{tag_name:stagingTag,target_commitish:archive.target_commitish,name:'Daemon M2 Tool 1.7.90 - archivierte Ressourcen',body:'Kompatibilitaetsressourcen fuer bestehende Installationen. Die unveraenderten Palmen-Dateien bleiben unter ihren bisherigen Download-Adressen erreichbar. Die vollstaendige alte Patchausgabe ist fuer den Herausgeber als Draft archiviert; aktuelle Versionen enthalten gepruefte Patches fuer alle unterstuetzten Ausgangsversionen.',draft:true,prerelease:false,make_latest:'false'});
 for(const f of saved){const present=current.assets.find(a=>a.name===f.asset.name);if(present){assert.equal(present.digest,f.asset.digest);assert.equal(present.size,f.asset.size);continue;}const url=current.upload_url.replace(/\{.*$/,'')+'?name='+encodeURIComponent(f.asset.name),response=await fetch(url,{method:'POST',headers:{Authorization:'Bearer '+process.env.GH_TOKEN,'Content-Type':'application/octet-stream'},body:f.data,signal:AbortSignal.timeout(120000)});assert(response.ok,'Restore compatibility asset '+response.status);const uploaded=await response.json();assert.equal(uploaded.digest,f.asset.digest);assert.equal(uploaded.size,f.asset.size);}
 current=await json(api+'/releases/'+current.id);assert.equal(current.assets.length,3);for(const f of saved)assert.equal(current.assets.find(a=>a.name===f.asset.name)?.digest,f.asset.digest);if(original){const preserved=await change('/releases/'+original.id,'PATCH',{draft:true,tag_name:archiveTag,make_latest:'false'});assert(preserved.draft);assert.equal(preserved.assets.length,original.assets.length);console.log('All '+original.assets.length+' legacy assets preserved in draft '+archiveTag+' (release '+original.id+').');}if(current.draft||current.tag_name!==originalTag)current=await change('/releases/'+current.id,'PATCH',{tag_name:originalTag,draft:false,make_latest:'false'});assert(!current.draft);assert.equal((await json(api+'/git/ref/tags/'+originalTag)).object.sha,tagBefore.object.sha);
 for(const f of saved){const url='https://github.com/'+repo+'/releases/download/'+originalTag+'/'+f.asset.name;let downloaded;try{downloaded=await bytes(url);}catch{downloaded=await assetBytes(current.assets.find(a=>a.name===f.asset.name));}assert.equal(hash(downloaded),hash(f.data));}console.log('Legacy v1.7.90 resource URLs restored and byte-for-byte verified; every old patch retained in archive draft.');
}

async function ensureLegacyChannelSize(){
 const publicList=async()=>{for(let attempt=0;attempt<20;attempt++){const r=await fetch('https://api.github.com/repos/'+repo+'/releases?per_page=10&daemon_verify='+Date.now(),{headers:{Accept:'application/vnd.github+json','User-Agent':'Daemon-Legacy-Channel-Check'},signal:AbortSignal.timeout(20000)});assert(r.ok);const text=await r.text(),releases=JSON.parse(text);if(releases.length===10)return{length:Buffer.byteLength(text),releases};await new Promise(r=>setTimeout(r,3000));}throw Error('Public pagination has not stabilized.');};
 let channel=await publicList();
 for(const superseded of ['v1.7.86','v1.7.85','v1.7.84','v1.7.83','v1.7.82','v1.7.80']){
  if(channel.length<1045000)break;
  const release=JSON.parse(gh(['api','repos/'+repo+'/releases?per_page=100','--jq','.[] | select(.tag_name == '+JSON.stringify(superseded)+')']));assert(release);
  assert(release.assets.every(a=>a.name.endsWith('.dvp')||/^Daemon_Viewer_Release_.*\.json$/.test(a.name)||/^SHA256SUMS-.*\.txt$/.test(a.name)),'Never retire pinned native content or installer releases');
  // Retain every byte and its signed envelope in an owner-visible draft.
  // The new public release contains a verified patch for every old baseline.
  if(!release.draft)gh(['api','--method','PATCH','repos/'+repo+'/releases/'+release.id,'-F','draft=true','-f','make_latest=false']);
  console.log('Superseded patch-only listing retained as draft: '+superseded);
  channel=await publicList();
 }
 assert(channel.length<1048576,'Legacy updater response still exceeds its installed limit');
 assert(channel.releases.some(r=>r.tag_name===tag&&!r.draft));
 console.log('Public legacy channel verified below 1 MiB: '+channel.length);
}

(async()=>{

 const payloadBytes=process.env.DAEMON_LOCAL_PAYLOAD?fs.readFileSync(process.env.DAEMON_LOCAL_PAYLOAD):await (async()=>{const prefix='https://raw.githubusercontent.com/'+repo+'/'+process.env.GITHUB_SHA+'/release-payloads/',index=await json(prefix+'mapping-plateau-1.7.96.json');assert.equal(index.schema,1);assert(index.parts.length<=16);const chunks=[];for(const part of index.parts){assert(/^mapping-plateau-1\.7\.96\.part\d{2}$/.test(part.name));const b=await bytes(prefix+part.name);assert.equal(b.length,part.size);assert.equal(hash(b),part.sha256);chunks.push(b);}const b=Buffer.concat(chunks);assert.equal(hash(b),index.sha256);return b;})();const payload=JSON.parse(z.gunzipSync(payloadBytes));assert.equal(payload.version,version);assert.equal(payload.old,old);assert.equal(payload.changed.length,payload.expectedChanged);assert.equal(payload.patches.length,64);

 const key=payload.publicKey;assert.equal(hash(Buffer.from(key.replaceAll('\r\n','\n'))),'73ac800430aaa48e68c9c405697fb2c16c874c953da34f037c51571fbb728e6b');const claims=verifyEnvelope(payload.envelope,key);assert.equal(claims.product,'daemon-viewer');assert.equal(claims.component,'release');assert.equal(claims.version,version);assert.deepEqual(claims.patches,payload.patches);assert.deepEqual(claims.assets,payload.extraAssets);

 const prior=await json('https://api.github.com/repos/'+repo+'/releases/tags/v'+old);assert(!prior.draft);const priorSignature=JSON.parse(await downloadPrior(prior.assets.find(a=>a.name==='Daemon_Viewer_Release_'+old+'.json'),p.join(out,'prior-download'),{cache:false}));const priorClaims=verifyEnvelope(priorSignature,key);assert.equal(priorClaims.version,old);const bases=new Map();const loadBase=async spec=>{const a=prior.assets.find(a=>a.name===spec.name);assert(a);const b=process.env.DAEMON_LOCAL_PRIOR_DIR?fs.readFileSync(p.join(process.env.DAEMON_LOCAL_PRIOR_DIR,a.name)):await downloadPrior(a,p.join(out,'prior-download'),{cache:false});assert.equal('sha256:'+hash(b),a.digest);assert.equal(a.digest,spec.digest);const signed=priorClaims.patches.find(x=>x.baseline===spec.baseline);assert.equal(hash(b),signed.sha256);assert.equal(b.length,signed.size);if(!primed)primeCompression(b);const m=verifiedPatchHeader(b);assert.equal(m.version,old);assert.equal(m.runtimeSHA256,payload.fromRuntimeSHA256);fs.writeFileSync(p.join(out,'prior-'+spec.baseline+'.dvp'),b);bases.set(m.fromVersion,spec.baseline);};await loadBase(payload.priors[0]);await eachLimit(payload.priors.slice(1),loadBase);assert.equal(bases.size,63);

 const changes=new Map(payload.changed.map(f=>{const b=Buffer.from(f.data,'base64');assert.equal(b.length,f.size);assert.equal(hash(b),f.sha256);return [f.path,f];}));const runtime=JSON.parse(Buffer.from(changes.get('runtime-files.json').data,'base64'));assert.equal(hash(Buffer.from(changes.get('runtime-files.json').data,'base64')),payload.runtimeSHA256);assert.equal(runtime.files.length,payload.runtimeFiles);assert(!payload.changed.some(f=>f.path.startsWith('content-packs/')));

 const built=[];for(const spec of payload.patches){let m;if(spec.baseline===old)m={schema:1,fromVersion:old,version,fromRuntimeSHA256:payload.fromRuntimeSHA256,runtimeSHA256:payload.runtimeSHA256,files:payload.changed,remove:[]};else{assert(bases.has(spec.baseline));const before=JSON.parse(z.gunzipSync(fs.readFileSync(p.join(out,'prior-'+spec.baseline+'.dvp')).subarray(5)));const all=new Map(before.files.filter(f=>!f.path.startsWith('environment-effect-pack/')&&!f.path.startsWith('waterfall-pack/')).map(f=>[f.path,f]));for(const f of payload.changed)all.set(f.path,f);m={...before,version,runtimeSHA256:payload.runtimeSHA256,files:[...all.values()].sort((a,b)=>a.path.localeCompare(b.path,'en')),remove:before.remove.filter(f=>!changes.has(f))};}

  const b=encodePatch(m);assert.equal(hash(b),spec.sha256,'Canonical signed package mismatch: '+spec.name);assert.equal(b.length,spec.size);fs.writeFileSync(p.join(out,spec.name),b);built.push(spec);if(spec.baseline!==old)fs.unlinkSync(p.join(out,'prior-'+spec.baseline+'.dvp'));

 }

 const languages=[];

 for(const part of payload.extraAssets){const chunks=[];let received=0;for(const spec of payload.uploads.filter(x=>x.part===part.name).sort((a,b)=>a.offset-b.offset)){assert.equal(spec.offset,received);assert(/^[a-f0-9]{40}$/.test(spec.uploaded));const b=await bytes('https://api.github.com/repos/'+repo+'/git/blobs/'+spec.uploaded);assert.equal(b.length,spec.size);assert.equal(hash(b),spec.sha256);chunks.push(b);received+=b.length;}const data=Buffer.concat(chunks);assert.equal(data.length,part.size);assert.equal(hash(data),part.sha256);fs.writeFileSync(p.join(out,part.name),data);languages.push(part);console.log('Content part verified: '+part.name+' '+part.size+' bytes');}



 const signature='Daemon_Viewer_Release_'+version+'.json',sums='SHA256SUMS-'+version+'.txt';fs.writeFileSync(p.join(out,signature),JSON.stringify(payload.envelope));const extras=[...languages,{name:signature,sha256:hash(fs.readFileSync(p.join(out,signature)))}];fs.writeFileSync(p.join(out,sums),[...built,...extras].map(f=>f.sha256+'  '+f.name).join('\n')+'\n');const expected=[...built,...extras,{name:sums,sha256:hash(fs.readFileSync(p.join(out,sums)))}];

 console.log('64 independently signed canonical patch packages reproduced. Latest patch: '+built.at(-1).size+' bytes. Eighty-one models and eight effects, including ten snowmen, with native textures and properties. No installer or engine package.');if(process.env.DAEMON_LOCAL_PAYLOAD)return;

 let existing;try{existing=JSON.parse(gh(['api','repos/'+repo+'/releases?per_page=100','--jq','.[] | select(.tag_name == '+JSON.stringify(tag)+')']));}catch{}

 if(existing&&!existing.draft){assert.equal(existing.assets.length,expected.length);for(const f of expected){const a=existing.assets.find(a=>a.name===f.name);assert(a);assert.equal(a.digest,'sha256:'+f.sha256);if(f.baseline)assert.equal(a.label,'Datei-Patch ab '+f.baseline);}for(const f of built){const a=existing.assets.find(a=>a.name===f.name),label='Datei-Patch ab '+f.baseline;if(a.label!==label)gh(['api','--method','PATCH','repos/'+repo+'/releases/assets/'+a.id,'-f','label='+label]);}const verified=await json('https://api.github.com/repos/'+repo+'/releases/tags/'+tag);for(const f of built)assert.equal(verified.assets.find(a=>a.name===f.name).label,'Datei-Patch ab '+f.baseline);await ensureLegacyChannelSize();console.log('Immutable release bytes verified; updater compatibility labels verified.');return;}

 const notes=p.join(out,'notes.md');fs.writeFileSync(notes,payload.notes);if(!existing)gh(['release','create',tag,'--repo',repo,'--draft','--title','Daemon M2 Tool '+version+' - Christmas2019 - Schneemaenner und Dekoration','--notes-file',notes,'--target',process.env.GITHUB_SHA]);

 await eachLimit(expected,f=>ghAsync(['release','upload',tag,p.join(out,f.name)+(f.baseline?'#Datei-Patch ab '+f.baseline:''),'--repo',repo,'--clobber']));const draft=JSON.parse(gh(['api','repos/'+repo+'/releases?per_page=100','--jq','.[] | select(.tag_name == '+JSON.stringify(tag)+')']));assert(draft.draft);assert.equal(draft.assets.length,expected.length);for(const f of expected){const a=draft.assets.find(a=>a.name===f.name);assert(a);assert.equal(a.digest,'sha256:'+f.sha256);if(f.baseline)assert.equal(a.label,'Datei-Patch ab '+f.baseline);}

 await compactLegacyResourceRelease(key);
 gh(['api','--method','PATCH','repos/'+repo+'/releases/'+draft.id,'-F','draft=false','-f','make_latest=false']);

 await ensureLegacyChannelSize();const live=await json('https://api.github.com/repos/'+repo+'/releases/tags/'+tag);assert(!live.draft);await eachLimit(expected,async f=>{const a=live.assets.find(a=>a.name===f.name);assert.equal(hash(await bytes(a.browser_download_url)),f.sha256);});const latest=await json('https://api.github.com/repos/'+repo+'/releases/latest');assert.equal(latest.tag_name,'v1.7.68','Legacy latest migration route changed');console.log('LIVE '+live.html_url+'; all 67 assets verified; legacy latest remains '+latest.tag_name);

})().catch(e=>{console.error(e);process.exitCode=1});




