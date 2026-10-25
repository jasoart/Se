"use strict";
const $=s=>document.querySelector(s);
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const words=s=>(String(s).match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)||[]).length;
const num=(v,d,a,b)=>{v=Number(v);return Number.isFinite(v)?Math.min(b,Math.max(a,v)):d};
const norm=s=>String(s??"").normalize("NFKC").toLowerCase();
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
/* 主題包：主題|動名詞片語(4)|中文|動詞片語(4)|中文|應避免之動名詞(4)|中文 → 4×4×4 組合 × 14 句型 × 14 主題 */
const PACKS=`學習|studying consistently,reviewing mistakes carefully,taking organized notes,asking questions actively|持之以恆地讀書,仔細檢討錯誤,做有條理的筆記,主動發問|build a solid foundation,retain knowledge longer,think more critically,gain real confidence|打下穩固基礎,記得更久,更有批判性地思考,獲得真正的自信|cramming at the last minute,memorizing without understanding,comparing ourselves with others,giving up too early|臨時抱佛腳,不求甚解地死背,與他人比較,太早放棄
閱讀|reading widely,reading classics slowly,discussing books with friends,keeping a reading journal|廣泛閱讀,慢慢品讀經典,與朋友討論書籍,寫閱讀日記|broaden our horizons,enrich our vocabulary,understand other viewpoints,sharpen our imagination|開闊視野,豐富字彙,理解他人觀點,磨練想像力|relying on a single source,skimming without thinking,judging a book by its cover,reading only for scores|只依賴單一來源,不經思考地略讀,以貌取書,只為分數而讀
健康|exercising regularly,sleeping enough every night,eating a balanced diet,drinking enough water|規律運動,每晚睡眠充足,均衡飲食,充分喝水|relieve stress,boost our immunity,stay energetic all day,improve our concentration|紓解壓力,提升免疫力,整天保持活力,提升專注力|skipping meals,staying up late,relying on junk food,ignoring early warning signs|不吃正餐,熬夜,依賴垃圾食物,忽視早期警訊
環境|reducing plastic waste,saving water and electricity,choosing public transportation,recycling carefully|減少塑膠垃圾,節約水電,選擇大眾運輸,仔細做資源回收|protect marine life,cut carbon emissions,preserve natural resources,leave a cleaner planet behind|保護海洋生物,減少碳排放,保存自然資源,留下更乾淨的地球|littering in public places,wasting food,ignoring small daily habits,blaming only big companies|在公共場所亂丟垃圾,浪費食物,忽視日常小習慣,只責怪大企業
科技|using technology wisely,learning basic coding,setting screen-time limits,backing up important files|明智運用科技,學習基礎程式設計,設定螢幕使用時間,備份重要檔案|work more efficiently,solve problems creatively,stay connected with others,protect our privacy online|提升工作效率,創意地解決問題,與他人保持聯繫,保護網路隱私|depending on screens too much,copying without thinking,ignoring online safety,comparing our lives with others online|過度依賴螢幕,不加思考地抄襲,忽視網路安全,在網路上與他人比較生活
人際|listening patiently,showing genuine kindness,apologizing sincerely,respecting different opinions|耐心傾聽,展現真誠善意,誠心道歉,尊重不同意見|build lasting trust,strengthen friendships,resolve conflicts peacefully,create a warm atmosphere|建立長久信任,增進友誼,和平化解衝突,營造溫暖氣氛|interrupting others,gossiping behind people's backs,making hollow promises,judging too quickly|打斷別人,在背後說閒話,開空頭支票,太快下判斷
志工|volunteering in the community,donating to charity,helping classmates in need,joining service projects|參與社區志工,捐款給慈善機構,幫助有需要的同學,參加服務計畫|learn the value of giving,make a real difference,develop empathy for others,inspire people around us|學會付出的價值,帶來真正改變,培養同理心,激勵身邊的人|expecting rewards,helping only when it is convenient,showing off our good deeds,ignoring people in need|期待回報,只在方便時幫忙,炫耀自己的善行,忽視需要幫助的人
文化|learning about local traditions,visiting museums,practicing traditional crafts,listening to elders' stories|認識在地傳統,參觀博物館,練習傳統工藝,聆聽長輩的故事|preserve our cultural identity,appreciate our history,pass traditions to the next generation,respect diverse customs|保存文化認同,欣賞我們的歷史,把傳統傳給下一代,尊重多元習俗|forgetting our roots,treating traditions as outdated,copying foreign trends blindly,looking down on other cultures|忘記自己的根,把傳統視為過時,盲目模仿外國潮流,輕視其他文化
旅遊|traveling abroad,trying local food,staying with local families,exploring small villages|出國旅行,品嚐在地美食,住在當地家庭,探索小村莊|understand different lifestyles,practice a foreign language,step out of our comfort zone,discover unexpected beauty|了解不同的生活方式,練習外語,走出舒適圈,發現意外的美景|judging others by appearances,treating places only as photo spots,ignoring local rules,leaving trash behind|以貌取人,只把地方當成拍照景點,忽視當地規定,留下垃圾
成長|facing failure bravely,setting realistic goals,accepting honest feedback,learning from experience|勇敢面對失敗,設定務實的目標,接受誠懇的回饋,從經驗中學習|grow more resilient,discover our potential,become more independent,stay optimistic in hard times|變得更堅韌,發現自己的潛力,變得更獨立,在困境中保持樂觀|blaming others,making excuses,fearing every mistake,giving in to peer pressure|責怪他人,找藉口,害怕每個錯誤,屈服於同儕壓力
溝通|expressing ideas clearly,asking thoughtful questions,using polite language,giving specific examples|清楚表達想法,提出深思的問題,使用禮貌的語言,舉出具體例子|avoid misunderstandings,persuade others gently,find common ground,make our message memorable|避免誤會,溫和地說服他人,找到共識,讓訊息令人難忘|hiding our true feelings,speaking before thinking,using harsh words,ignoring the listener's reaction|隱藏真實感受,未經思考就開口,使用尖銳的言詞,忽視聽者的反應
時間|managing time carefully,making a daily schedule,setting clear priorities,taking short breaks|謹慎管理時間,訂定每日計畫,設定明確優先順序,適時短暫休息|achieve our goals,reduce unnecessary pressure,finish tasks on time,make room for hobbies|達成目標,減少不必要的壓力,準時完成任務,為興趣留出空間|putting things off,trying to do everything at once,wasting time on trivial matters,ignoring our own limits|拖延事情,想要一次做完所有事,把時間浪費在瑣事上,忽視自己的極限
資訊|checking sources carefully,comparing different reports,thinking before posting,learning basic media literacy|仔細查證來源,比對不同報導,發文前先思考,學習基本媒體素養|resist false information,make sensible decisions,protect our reputation,stay calm in a flood of news|抵擋不實資訊,做出明智決定,保護自己的名聲,在大量新聞中保持冷靜|sharing rumors,trusting every headline,spreading panic online,ignoring the facts|轉傳謠言,輕信每則標題,在網路散播恐慌,無視事實
經濟|saving money regularly,keeping a budget,comparing prices carefully,investing in our education|定期存錢,記帳並編列預算,仔細比較價格,投資自己的教育|handle unexpected expenses,avoid unnecessary debt,plan for the future,live within our means|應付突發開銷,避免不必要的債務,規劃未來,量入為出|buying things on impulse,following every trend,borrowing beyond our ability,ignoring small expenses|衝動購物,追隨每個潮流,超出能力借錢,忽視小額開銷`.split("\n").map(l=>l.split("|").map((s,i)=>i?s.split(","):s));
/* 句型：標籤|等級|英文|中文（皆含 g／b／r 三個欄位，確保每句唯一） */
const TPLS=[
["can … as long as",3,"{G} can {b}, as long as we avoid {r}.","只要避免{rz}，{gz}就能{bz}。"],
["not only can … but also",3,"Not only can {g} {b}, but it can also teach us to avoid {r}.","{gz}不僅能{bz}，還能教我們避免{rz}。"],
["there is no denying that",2,"There is no denying that {g} helps us {b}, whereas {r} only holds us back.","無可否認，{gz}有助於我們{bz}，而{rz}只會拖累我們。"],
["only by … rather than … can",3,"Only by {g}, rather than {r}, can we truly {b}.","唯有{gz}而非{rz}，我們才能真正{bz}。"],
["in the long run",2,"In the long run, {g} will enable us to {b}, while {r} will not.","長遠來看，{gz}將使我們能夠{bz}，{rz}卻做不到。"],
["had it not been for … let alone",3,"Had it not been for {g}, we could hardly {b}, let alone stop {r}.","若非{gz}，我們幾乎無法{bz}，更別說停止{rz}了。"],
["to a certain extent",2,"To a certain extent, {g} is the best way to {b} without {r}.","在某種程度上，{gz}是{bz}而不必{rz}的最佳方式。"],
["from my perspective",2,"From my perspective, {g} is more valuable than {r}, because it helps us {b}.","我認為{gz}比{rz}更有價值，因為它幫助我們{bz}。"],
["the more … the less likely",3,"The more we practice {g}, the better we can {b}, and the less likely we are to fall into the habit of {r}.","我們愈練習{gz}，就愈能{bz}，也愈不容易養成{rz}的習慣。"],
["it goes without saying",3,"It goes without saying that {g} is meant to help us {b}, not to encourage {r}.","不言而喻，{gz}是為了幫助我們{bz}，而不是鼓勵{rz}。"],
["regardless of",3,"Regardless of age or background, anyone can {b} by {g} instead of {r}.","不論年齡或背景，人人都能藉由{gz}而非{rz}來{bz}。"],
["rather than",3,"Rather than {r}, we should focus on {g} so that we can {b}.","與其{rz}，我們更應專注於{gz}，好讓自己能{bz}。"],
["keep … from",3,"{G} not only helps us {b} but also keeps us from {r}.","{gz}不僅幫助我們{bz}，也使我們不致{rz}。"],
["what makes … worthwhile",3,"What makes {g} worthwhile is its power to help us {b} and avoid {r}.","{gz}之所以值得，在於它能幫助我們{bz}並避免{rz}。"]];
const BUILT=[],up=s=>s[0].toUpperCase()+s.slice(1);
for(let a=0;a<4;a++)for(let b=0;b<4;b++)for(let c=0;c<4;c++)TPLS.forEach((t,j)=>PACKS.forEach((p,i)=>{
  const m={g:p[1][a],G:up(p[1][a]),gz:p[2][a],b:p[3][b],bz:p[4][b],r:p[5][c],rz:p[6][c]},f=s=>s.replace(/\{(\w+)\}/g,(_,k)=>m[k]);
  BUILT.push({id:`g${i}.${j}.${a}${b}${c}`,level:t[1],kind:t[0],topic:p[0],zh:f(t[3]),en:f(t[2]),sg:a,sr:c})}));
/* 111–115 學測延伸：12 種新句型 × 原有 14 主題 × 64 種組合，另加 57 句人工撰寫考點練習。 */
const EXAM_TPLS=window.GSAT_EXTRA_TPLS||[];
for(let a=0;a<4;a++)for(let b=0;b<4;b++)for(let c=0;c<4;c++)EXAM_TPLS.forEach((t,j)=>PACKS.forEach((p,i)=>{
 const m={g:p[1][a],G:up(p[1][a]),gz:p[2][a],b:p[3][b],bz:p[4][b],r:p[5][c],rz:p[6][c]},f=str=>str.replace(/\{(\w+)\}/g,(_,k)=>m[k]);
 BUILT.push({id:`x${i}.${j}.${a}${b}${c}`,level:t[1],kind:t[0],topic:p[0],zh:f(t[3]),en:f(t[2]),sg:a,sr:c});
}));
BUILT.push(...(window.GSAT_YEAR_BANK||[]));
// v5 IDs remain stable; new templates use independent namespaces.
const Core=window.GSATCore,extra=window.GSAT_EXPANSION;
const appendPack=(p,i,templates,prefix)=>{
 for(let a=0;a<4;a++)for(let b=0;b<4;b++)for(let c=0;c<4;c++)templates.forEach((t,j)=>{
  const m={g:p[1][a],G:up(p[1][a]),gz:p[2][a],b:p[3][b],bz:p[4][b],r:p[5][c],rz:p[6][c]},f=str=>str.replace(/\{(\w+)\}/g,(_,k)=>m[k]);
  BUILT.push({id:`${prefix}${i}.${j}.${a}${b}${c}`,level:t[1],kind:t[0],topic:p[0],zh:f(t[3]),en:f(t[2]),sg:a,sr:c,origin:'template'});
 });
};
extra.packs.forEach((p,i)=>appendPack(p,i,[...TPLS,...EXAM_TPLS],'v6p'));
[...PACKS,...extra.packs].forEach((p,i)=>appendPack(p,i,extra.templates,'v6t'));
BUILT.push(...extra.curated);
for(const x of BUILT)x.origin=x.origin||(x.year?'curated':'template');
const KEY="gsat-writing-v3";
const DEF={mode:"bal",targetWords:160,pageCap:2,maxItems:12,copies:3,gridType:"four",gridMm:5,lineMm:9,fontSize:12,sheetTitle:"學測英文自主練習卷",school:"",student:"",showZh:true,showKey:true};
let hadSavedState=false;
let U={custom:[],hidden:[],selected:[],hist:{},reviews:{},favorites:[],config:{...DEF}};
try{const s=JSON.parse(localStorage.getItem(KEY));hadSavedState=!!s;if(s&&typeof s==="object")U={custom:Array.isArray(s.custom)?s.custom:[],hidden:Array.isArray(s.hidden)?s.hidden:[],selected:Array.isArray(s.selected)?s.selected:[],hist:(s.hist&&typeof s.hist==="object")?s.hist:{},reviews:Core.cleanReviews(s.reviews),favorites:Array.isArray(s.favorites)?s.favorites.filter(x=>typeof x==="string"):[],config:{...DEF,...(s.config||{})}}}catch(e){}
const cfg=U.config;
// Normalize imported or older settings before they reach page layout.
function sanitizeConfig(input){const result={...DEF};for(const k of Object.keys(DEF)){
 const v=input?.[k],d=DEF[k];
 if(typeof d==='number'){const e=document.getElementById(k);result[k]=num(v,d,+e.min,+e.max)}
 else if(typeof d==='boolean')result[k]=typeof v==='boolean'?v:d;
 else if(typeof v==='string')result[k]=v.slice(0,150);
 }for(const k of ['targetWords','pageCap','maxItems','copies'])result[k]=Math.round(result[k]);if(!['bal','new','hard','rev','due'].includes(result.mode))result.mode='bal';if(!['four','line','box'].includes(result.gridType))result.gridType='four';return result;}
Object.assign(cfg,sanitizeConfig(cfg));let bank=[],idx=new Map(),limit=40,pages=[],nt=null,raf=null,qt=null;
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(U))}catch(e){toast("儲存空間不足，請先備份。")}};
function toast(m){const n=$("#note");n.textContent=m;n.classList.add("show");clearTimeout(nt);nt=setTimeout(()=>n.classList.remove("show"),3000)}
const valid=x=>x&&typeof x.en==="string"&&x.en.trim()&&x.en.length<=500&&String(x.zh||"").length<=200;
const clean=(x,id)=>({id,level:num(x.level,2,1,3),kind:String(x.kind||x.phrase||"自編").slice(0,150),origin:"custom",topic:String(x.topic||"自編").slice(0,30),zh:String(x.zh||"").slice(0,200),en:String(x.en).trim().slice(0,500)});
function rebuild(){
  const h=new Set(U.hidden);
  bank=[...BUILT.filter(x=>!h.has(x.id)),...U.custom.filter(x=>valid(x)&&!h.has(x.id)).map(x=>clean(x,String(x.id)))];
  idx=new Map(bank.map(x=>[x.id,x]));const ids=idx;U.selected=[...new Set(U.selected)].filter(i=>ids.has(i));
  const fill=(sel,vals)=>{const o=sel.value;sel.innerHTML='<option value="">全部</option>'+vals.map(v=>`<option>${esc(v)}</option>`).join("");if(vals.includes(o))sel.value=o};
  fill($("#fTp"),[...new Set(bank.map(x=>x.topic))]);fill($("#fKy"),[...new Set(bank.map(x=>x.kind))]);$("#sDb").textContent=bank.length}
const item=id=>idx.get(id),chosen=()=>U.selected.map(item).filter(Boolean);
function filtered(){
 const terms=Core.query($("#q").value),lv=$("#fLv").value,yr=$("#fYear").value,tp=$("#fTp").value,ky=$("#fKy").value,origin=$("#fSource").value,state=$("#fState").value,now=Date.now(),favorites=new Set(U.favorites);
 return bank.filter(x=>{
  if((lv&&String(x.level)!==lv)||(yr&&x.year!==yr)||(tp&&x.topic!==tp)||(ky&&x.kind!==ky)||(origin&&x.origin!==origin))return false;
  const r=U.reviews[x.id];
  if(state==='favorite'&&!favorites.has(x.id)||state==='due'&&!(r?.due<=now)||state==='new'&&(r||U.hist[x.id])||state==='weak'&&!['again','hard'].includes(r?.grade))return false;
  x._s=x._s||Core.normalize([x.en,x.zh,x.kind,x.topic,x.source||'',x.note||''].join(' '));
  return Core.matches(x._s,terms);
 });
}
function reviewLabel(x){const r=U.reviews[x.id];return !r?'尚未自評':r.due<=Date.now()?'已到期':`下次：${new Date(r.due).toLocaleDateString('zh-TW')}`;}
function learningStats(){const now=Date.now(),due=bank.filter(x=>U.reviews[x.id]?.due<=now).length;
 $('#learnStats').textContent=`到期 ${due} 句 · 已自評 ${Object.keys(U.reviews).length} 句 · 收藏 ${U.favorites.length} 句`;
 $('#practice').disabled=!U.selected.length;
}
function renderList(){
  const all=filtered(),on=new Set(U.selected),show=all.slice(0,limit);
  $("#sum").textContent=`符合 ${all.length} 句，顯示 ${show.length} 句。`;
  $("#list").innerHTML=show.length?show.map(x=>`<div class="it ${on.has(x.id)?"on":""}"><input type="checkbox" data-pick="${esc(x.id)}" ${on.has(x.id)?"checked":""} aria-label="選取"><div class="b"><div class="t">${esc(x.kind)} <span class="pill">${esc(x.topic)}</span></div><div class="en">${esc(x.en)}</div><div class="zh">${esc(x.zh)}</div><div class="meta">L${x.level}・${words(x.en)} 詞${x.source?`・${esc(x.source)}｜原創例句`:""}${U.hist[x.id]?`・練習紀錄 ${U.hist[x.id]} 次`:""}・${esc(reviewLabel(x))}・${{template:"模板變體",curated:"考點原創",custom:"自編"}[x.origin]}</div>${x.note?`<details><summary>用法提醒</summary><p class="hint">${esc(x.note)}</p></details>`:""}<button class="mini" data-fav="${esc(x.id)}" aria-pressed="${U.favorites.includes(x.id)}">${U.favorites.includes(x.id)?"★ 已收藏":"☆ 收藏"}</button> <button class="mini dg" data-hide="${esc(x.id)}">隱藏</button></div></div>`).join(""):'<p class="hint" style="padding:14px">找不到符合條件的例句。</p>';
  $("#more").disabled=all.length<=limit;$("#more").textContent=all.length>limit?`顯示更多（剩 ${all.length-limit}）`:"已顯示全部"}
function renderSel(){
  const a=chosen();$("#sel").innerHTML=a.length?a.map((x,i)=>`<div class="sr"><span title="${esc(x.en)}">${i+1}. ${esc(x.en)}</span><button data-mv="${esc(x.id)}" data-d="-1" ${i?"":"disabled"}>↑</button><button data-mv="${esc(x.id)}" data-d="1" ${i<a.length-1?"":"disabled"}>↓</button><button data-un="${esc(x.id)}">×</button></div>`).join(""):'<p class="hint">尚未選取例句。</p>'}
function stats(){
  const a=chosen(),w=a.reduce((s,x)=>s+words(x.en),0);$("#sSel").textContent=a.length;$("#sW").textContent=w;$("#sC").textContent=w*num(cfg.copies,3,1,20)}
const refresh=()=>{renderList();renderSel();stats();learningStats();sched()};
/* 格線與分頁 */
const units=s=>{let n=0;for(const c of s)n+=/[MW@%]/.test(c)?1.35:/[A-Z]/.test(c)?1.13:/[ilIjtfr.,:;!'`]/.test(c)?.54:/\s/.test(c)?.58:1;return n};
const rowsOf=x=>Math.max(1,Math.ceil(units(x.en)*num(cfg.gridMm,5,3,9)/171));
function mk(){
  const n=pages.length+1,wrap=document.createElement("div");wrap.className="pw";
  const p=document.createElement("article");p.className="paper";p.style.setProperty("--pf",num(cfg.fontSize,12,9,17)+"pt");
  p.innerHTML=`<div class="pin"><div class="phd"><div class="pt">${esc(cfg.sheetTitle||"英文罰寫練習卷")}</div><div class="ps"><span>班級：${esc(cfg.school||"________")}</span><span>姓名：${esc(cfg.student||"________")}</span><span>第 ${n} 頁</span></div></div><div class="pm"></div><div class="pf"><span>GSAT Writing Studio</span><span>第 ${n} 頁</span></div></div>`;
  wrap.appendChild(p);$("#pages").appendChild(wrap);const o={main:p.querySelector(".pm")};pages.push(o);return o}
function block(x,cont){
  const b=document.createElement("section"),i=U.selected.indexOf(x.id)+1;b.className="card";
  b.innerHTML=`<div class="cap"><span>${i}. ${cont?"續寫・":""}${cfg.showKey?esc(x.kind):"英文佳句"}</span><span>${words(x.en)} words・L${x.level}${x.year?`・${esc(x.year)}學測第${esc(x.question)}題`:""}</span></div><div class="pe">${esc(x.en)}</div>${cfg.showZh?`<div class="pz">${esc(x.zh)}</div>`:""}`;return b}
function writing(x,r){
  const d=document.createElement("div");d.className="rs";const t=cfg.gridType==="box"?"gb":cfg.gridType==="four"?"g4":"";
  for(let j=0;j<rowsOf(x);j++){const w=document.createElement("div");w.className="row "+t;w.style.setProperty("--lh",num(cfg.lineMm,9,6,14)+"mm");w.style.setProperty("--cw",num(cfg.gridMm,5,3,9)+"mm");w.innerHTML=`<span class="c">${j?"":r}</span><span class="w"></span>`;d.appendChild(w)}return d}
const over=p=>p.main.scrollHeight>p.main.clientHeight+1;
function paginate(){
  raf=null;$("#pages").replaceChildren();pages=[];let cur=mk();const a=chosen(),C=num(cfg.copies,3,1,20);
  if(!a.length)cur.main.innerHTML='<div class="empty">尚未選取例句<p style="font-size:10pt">請從左側挑選，或按「智慧組卷」。</p></div>';
  for(const x of a){
    let card=block(x,false);cur.main.appendChild(card);
    if(over(cur)&&cur.main.children.length>1){card.remove();cur=mk();card=block(x,false);cur.main.appendChild(card)}
    for(let copy=1;copy<=C;copy++){
      let lines=writing(x,copy),rows=[...lines.children];lines.replaceChildren();card.appendChild(lines);
      for(const row of rows){
        lines.appendChild(row);
        if(over(cur)){
          row.remove();
          if(!lines.children.length)lines.remove();
          if(!card.querySelector('.row'))card.remove();
          cur=mk();card=block(x,true);cur.main.appendChild(card);
          lines=document.createElement('div');lines.className='rs';card.appendChild(lines);lines.appendChild(row);
          if(over(cur))toast('題目標題或內容過長，請調小字級。');
        }
      }
    }
  }
  scale();let u=0,t=0;pages.forEach(p=>{t+=p.main.clientHeight;if(a.length){const last=p.main.lastElementChild;u+=last?Math.min(last.offsetTop+last.offsetHeight-p.main.offsetTop,p.main.clientHeight):0}});
  $("#sPg").textContent=pages.length;$("#sF").textContent=t?Math.round(100*u/t)+"%":"0%";
  $("#lay").textContent=`${pages.length} 張 A4｜每句 ${C} 次｜${{four:"英文四線格",line:"橫線",box:"方格"}[cfg.gridType]}`+(a.length&&pages.length>num(cfg.pageCap,2,1,15)?"｜已超過設定頁數":"")}
function scale(){
  const s=Math.min(1,Math.max(240,$(".prev").clientWidth-40)/(210*96/25.4));
  document.querySelectorAll(".pw").forEach(w=>{w.style.width=210*s+"mm";w.style.height=297*s+"mm";w.firstChild.style.transform=`scale(${s})`})}
function sched(){if(raf!==null)cancelAnimationFrame(raf);raf=requestAnimationFrame(paginate)}
/* Bounded, weighted selection with review priority and diversity. */
function smart(rand){
 const all=filtered(),C=cfg.copies,T=cfg.targetWords;
 const out=Core.select(all,{mode:rand?'random':cfg.mode,target:T,copies:C,limit:cfg.maxItems,hist:U.hist,reviews:U.reviews});
 if(!out.length)return toast('沒有符合策略的例句，請調整篩選、目標詞數或複習策略。');
 U.selected=out.map(x=>x.id);paginate();
 while(pages.length>cfg.pageCap&&U.selected.length>1){U.selected.pop();paginate()}
 const total=chosen().reduce((n,x)=>n+words(x.en)*C,0),due=chosen().filter(x=>U.reviews[x.id]?.due<=Date.now()).length;
 $('#planInfo').textContent=`已選 ${U.selected.length} 句／${total} 詞（目標 ${T}）· ${new Set(chosen().map(x=>x.topic)).size} 個主題 · ${due} 句到期複習。${pages.length>cfg.pageCap?'單句已超出頁數上限，請減少抄寫次數或調整版面。':total<T?'受句長、句數或頁數限制，未滿目標詞數。':''}`;
 save();refresh();toast('組卷完成，已套用目前搜尋條件與學習策略。');
}
/* 新增、匯入匯出 */
const uid=()=>"u-"+(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2));
function addEntries(arr){
  const seen=new Set(bank.map(x=>norm(x.en)));let n=0;
  for(const x of arr.slice(0,3000)){if(U.custom.length>=3000)break;if(!valid(x)||seen.has(norm(x.en)))continue;seen.add(norm(x.en));U.custom.push(clean(x,uid()));n++}return n}
async function importFile(f){
 if(!f)return;
 try{
  if(f.size>6e6)throw Error('檔案超過 6 MB');
  const d=JSON.parse(await f.text());
  if(d?.app==='GSAT Writing Studio'){
   if(!Array.isArray(d.custom)||!Array.isArray(d.selected)||!Array.isArray(d.hidden)||!d.config||typeof d.config!=='object')throw Error('備份格式不完整');
   if(d.version>6)throw Error('此備份來自更新版本，請先更新程式');
   if(!d.custom.every(x=>valid(x)&&typeof x.id==='string'))throw Error('備份含無效例句');
   if(d.custom.length>3000)throw Error('自編例句超過 3000 句上限');
   const ids=new Set(BUILT.map(x=>x.id));
   for(const x of d.custom){if(ids.has(x.id))throw Error('備份例句 ID 重複');ids.add(x.id)}
   if(!confirm('還原備份將取代目前的自編句、選句、收藏、設定與學習紀錄。建議先備份目前資料。是否繼續？'))return;
   const counts={};for(const [id,n] of Object.entries(d.hist||{}))if(ids.has(id)&&Number.isInteger(n)&&n>=0&&n<=1e7)Object.defineProperty(counts,id,{value:n,enumerable:true,writable:true,configurable:true});
   U={custom:d.custom.map(x=>clean(x,x.id)),selected:d.selected.filter(x=>ids.has(x)),hidden:d.hidden.filter(x=>ids.has(x)),hist:counts,reviews:Core.cleanReviews(d.reviews),favorites:Array.isArray(d.favorites)?[...new Set(d.favorites.filter(x=>ids.has(x)))]:[],config:cfg};
   Object.assign(cfg,sanitizeConfig(d.config));applyCfg();
   save();rebuild();refresh();toast('已還原備份：包含選句、設定與學習紀錄。');
  }else{
   const arr=Array.isArray(d)?d:d?.completeBank;
   if(!Array.isArray(arr)||!arr.length)throw Error('請選擇完整備份或例句 JSON 陣列');
   const n=addEntries(arr);save();rebuild();refresh();toast(`已合併 ${n} 句，重複或無效內容略過。`);
  }
 }catch(e){toast('匯入失敗：'+e.message)}finally{$('#file').value=''}
}
function download(){
  const b=new Blob([JSON.stringify({app:"GSAT Writing Studio",version:6,...U,exportedAt:new Date().toISOString()},null,2)],{type:"application/json"});
  const u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download="學測英文罰寫備份.json";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),3000);toast("備份已建立。")}
function printIt(){if(!chosen().length)return toast("請先挑選至少一句。");paginate();window.print()}
const keys=["mode","targetWords","pageCap","maxItems","copies","gridType","gridMm","lineMm","fontSize","sheetTitle","school","student","showZh","showKey"];
function applyCfg(){for(const k of keys){const e=$("#"+k);if(e.type==="checkbox")e.checked=!!cfg[k];else e.value=cfg[k]}}
function toggle(id,on){const s=new Set(U.selected);on?s.add(id):s.delete(id);U.selected=[...s];save();refresh()}
function init(){
  applyCfg();rebuild();
  for(const k of keys)$("#"+k).addEventListener("change",e=>{const el=e.target;cfg[k]=el.type==="checkbox"?el.checked:el.type==="number"?num(el.value,DEF[k],+el.min||0,+el.max||1e9):el.value;if(["targetWords","pageCap","maxItems","copies"].includes(k)){cfg[k]=Math.round(cfg[k]);el.value=cfg[k]}save();stats();sched()});
  $("#q").addEventListener("input",()=>{clearTimeout(qt);qt=setTimeout(()=>{limit=40;renderList()},120)});
  for(const k of ["#fLv","#fYear","#fTp","#fKy","#fSource","#fState"])$(k).addEventListener("change",()=>{limit=40;renderList()});
  $("#list").addEventListener("change",e=>{if(e.target.dataset.pick)toggle(e.target.dataset.pick,e.target.checked)});
  $("#list").addEventListener("click",e=>{const favorite=e.target.dataset.fav;if(favorite){U.favorites=U.favorites.includes(favorite)?U.favorites.filter(x=>x!==favorite):[...U.favorites,favorite];save();renderList();learningStats();return}const id=e.target.dataset.hide;if(id&&confirm("確定隱藏這句？")){U.hidden.push(id);U.custom=U.custom.filter(x=>x.id!==id);save();rebuild();refresh()}});
  $("#sel").addEventListener("click",e=>{const d=e.target.dataset;if(d.un)toggle(d.un,false);if(d.mv){const i=U.selected.indexOf(d.mv),j=i+Number(d.d);if(i>=0&&j>=0&&j<U.selected.length){[U.selected[i],U.selected[j]]=[U.selected[j],U.selected[i]];save();refresh()}}});
  $("#clrH").onclick=()=>{if(confirm("清除所有練習紀錄？")){U.hist={};U.reviews={};save();refresh()}};$("#smart").onclick=()=>smart(false);$("#rnd").onclick=()=>smart(true);
  $("#clr").onclick=()=>{U.selected=[];save();refresh()};
  $("#addAll").onclick=()=>{const f=filtered().slice(0,60);U.selected=[...new Set([...U.selected,...f.map(x=>x.id)])];save();refresh();toast(`已加入前 ${f.length} 句（單次上限 60 句）。`)};
  $("#more").onclick=()=>{limit+=40;renderList()};
  $("#newB").onclick=()=>{["eKy","eZh","eEn"].forEach(i=>$("#"+i).value="");$("#dlg").showModal()};
  $("#eNo").onclick=()=>$("#dlg").close();
  $("#eOk").onclick=()=>{const x={level:$("#eLv").value,topic:$("#eTp").value.trim()||"自編",kind:$("#eKy").value.trim()||"自編",zh:$("#eZh").value.trim(),en:$("#eEn").value.trim()};
    if(!valid(x))return toast("請填入英文例句。");if(U.custom.length>=3000)return toast("自編例句已達 3000 句上限。");if(bank.some(y=>norm(y.en)===norm(x.en)))return toast("句庫已有相同英文例句。");U.custom.push(clean(x,uid()));$("#dlg").close();save();rebuild();refresh();toast("已新增。")};
  $("#exp").onclick=download;$("#imp").onclick=()=>$("#file").click();$("#file").onchange=e=>importFile(e.target.files[0]);
  $("#rst").onclick=()=>{if(!confirm("將清除本機自編句、隱藏、選句、收藏、設定與所有學習紀錄，確定？"))return;try{localStorage.removeItem(KEY)}catch(e){}
    U={custom:[],hidden:[],selected:[],hist:{},reviews:{},favorites:[],config:{...DEF}};Object.keys(cfg).forEach(k=>delete cfg[k]);Object.assign(cfg,DEF);U.config=cfg;applyCfg();rebuild();save();refresh()};
  $("#pr1").onclick=printIt;$("#pr2").onclick=printIt;addEventListener("resize",scale);
  $('#practice').onclick=startPractice;
 $('#reveal').onclick=()=>{const x=practiceQueue[practiceIndex];$('#answer').textContent=x.en;$('#practiceNote').textContent=x.note||x.kind;$('#answer').hidden=false;$('#grades').hidden=false;$('#reveal').hidden=true};
 $('#grades').onclick=e=>{const grade=e.target.dataset.grade;if(!grade)return;const x=practiceQueue[practiceIndex];U.reviews[x.id]=Core.review(U.reviews[x.id],grade);U.hist[x.id]=(Number(U.hist[x.id])||0)+1;save();practiceIndex++;showPractice();refresh()};
 $('#practiceClose').onclick=()=>$('#practiceDialog').close();
 refresh();if(!U.selected.length&&!hadSavedState)smart(false)}
let practiceQueue=[],practiceIndex=0;
function startPractice(){practiceQueue=chosen().slice();practiceIndex=0;if(!practiceQueue.length)return;$('#practiceDialog').showModal();showPractice();}
function showPractice(){
 if(practiceIndex>=practiceQueue.length){$('#practiceDialog').close();toast(`已完成 ${practiceQueue.length} 句自評，下次複習時間已更新。`);return;}
 const x=practiceQueue[practiceIndex];$('#practiceProgress').textContent=`${practiceIndex+1} / ${practiceQueue.length} · 先試著說出或寫出英文，再查看參考句。`;
 $('#prompt').textContent=x.zh;$('#answer').hidden=true;$('#grades').hidden=true;$('#reveal').hidden=false;$('#practiceNote').textContent='';$('#reveal').focus();
}
init();
