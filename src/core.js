/* Shared pure functions: browser + Node, no network dependencies. */
(function(root){
  'use strict';
  const DAY=86400000;
  const normalize=s=>String(s??'').normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'");
  const wordCount=s=>(String(s).match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)||[]).length;
  function query(text){
    return [...normalize(text).matchAll(/(-?)(?:"([^"]+)"|(\S+))/g)].map(m=>({exclude:m[1]==='-',text:m[2]||m[3],phrase:!!m[2]}));
  }
  const matches=(text,terms)=>terms.every(t=>{
    let found=text.includes(t.text);
    if(found&&t.phrase){
      found=false;let pos=text.indexOf(t.text);
      while(pos>=0){const before=text[pos-1]||'',after=text[pos+t.text.length]||'';
        if(!(/[a-z0-9]/i.test(t.text[0])&&/[a-z0-9]/i.test(before))&&!(/[a-z0-9]/i.test(t.text.at(-1))&&/[a-z0-9]/i.test(after))){found=true;break}
        pos=text.indexOf(t.text,pos+1);
      }
    }return t.exclude?!found:found;
  });
  function review(previous,grade,now=Date.now()){
    const p=previous||{},old=Math.max(0,Number(p.interval)||0);
    const interval=grade==='again'?0:grade==='hard'?1:old?Math.min(180,Math.max(3,Math.round(old*2.2))):3;
    return {interval,due:now+(grade==='again'?10*60000:interval*DAY),last:now,
      attempts:(Number(p.attempts)||0)+1,lapses:(Number(p.lapses)||0)+(grade==='again'?1:0),grade};
  }
  function cleanReviews(input){
    const out={};
    if(!input||typeof input!=='object'||Array.isArray(input))return out;
    for(const [id,r] of Object.entries(input)){
      if(!r||typeof r!=='object'||!['again','hard','good'].includes(r.grade))continue;
      if(!['due','last','interval','attempts','lapses'].every(k=>Number.isFinite(r[k])&&r[k]>=0))continue;
      if(r.interval>180||r.attempts>1e7||r.lapses>r.attempts)continue;
      Object.defineProperty(out,id,{value:{due:r.due,last:r.last,interval:r.interval,attempts:r.attempts,lapses:r.lapses,grade:r.grade},enumerable:true,writable:true,configurable:true});
    }return out;
  }
  function select(bank,{mode='bal',target=160,copies=3,limit=12,hist={},reviews={},now=Date.now(),random=Math.random}={}){
    const seen=new Set();
    const eligible=bank.filter(x=>{
      const key=normalize(x.en);if(seen.has(key))return false;seen.add(key);
      const practiced=!!hist[x.id]||!!reviews[x.id];
      return mode==='new'?!practiced:mode==='rev'?practiced:mode==='due'?reviews[x.id]?.due<=now:true;
    });
    const priority=x=>{
      const r=reviews[x.id];
      if(mode==='random')return random()*10;
      return (r?.due<=now?20:0)+(r?.grade==='again'?10:r?.grade==='hard'?5:0)+(!hist[x.id]&&!r?3:0)+(mode==='hard'&&x.level===3?12:0)+random();
    };
    const ranked=eligible.map(x=>({x,p:priority(x),w:wordCount(x.en)*copies})).sort((a,b)=>b.p-a.p);
    // Keep a bounded, diverse candidate pool; each path owns its own choices.
    const pool=[],groups=new Map(),deferred=[];
    for(const e of ranked){const k=e.x.topic+'|'+e.x.kind,n=groups.get(k)||0;
      if(n<2){pool.push(e);groups.set(k,n+1)}else deferred.push(e);
      if(pool.length>=180)break;
    }
    if(pool.length<180)pool.push(...deferred.slice(0,180-pool.length));
    let beam=[{items:[],w:0,p:0,topics:new Set(),kinds:new Set()}];
    const ceiling=Math.ceil(target*1.2);
    const value=s=>-Math.abs(s.w-target)/Math.max(1,target)*100+s.p/Math.max(1,s.items.length)*0.3+s.topics.size+s.kinds.size;
    for(const e of pool){
      const next=[...beam];
      for(const s of beam){
        if(s.items.length>=limit||s.w+e.w>ceiling)continue;
        next.push({items:[...s.items,e.x],w:s.w+e.w,p:s.p+e.p,topics:new Set([...s.topics,e.x.topic]),kinds:new Set([...s.kinds,e.x.kind])});
      }
      next.sort((a,b)=>value(b)-value(a));
      const unique=new Set();beam=[];
      for(const s of next){const k=s.w+'|'+s.items.length+'|'+s.items.map(x=>x.id).join(',');if(unique.has(k))continue;unique.add(k);beam.push(s);if(beam.length===48)break}
      // An empty path allows later short/high-priority entries to compete.
      if(!beam.some(s=>!s.items.length))beam.push({items:[],w:0,p:0,topics:new Set(),kinds:new Set()});
    }
    const best=beam.filter(s=>s.items.length).sort((a,b)=>value(b)-value(a))[0];
    return best?best.items.sort((a,b)=>a.level-b.level||wordCount(a.en)-wordCount(b.en)):[];
  }
  const api={DAY,normalize,wordCount,query,matches,review,cleanReviews,select};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.GSATCore=api;
})(typeof window!=='undefined'?window:globalThis);
