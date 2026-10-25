const {test}=require('node:test');
const assert=require('node:assert/strict');
const C=require('../src/core.js');
test('search supports phrases, exclusions, full-width input and apostrophes',()=>{
  const q=C.query('"due to" -traffic');
  assert.equal(C.matches('due to rain',q),true);
  assert.equal(C.matches('due to traffic',q),false);
  assert.equal(C.matches('due tomorrow to',q),false);
  assert.equal(C.normalize('ＡＢＣ children’s'),"abc children's");
});
test('review intervals and lapse counts reflect actual feedback',()=>{
  const a=C.review(null,'again',1000);
  assert.equal(a.due,601000);assert.equal(a.lapses,1);
  const h=C.review(a,'hard',2000);assert.equal(h.due,2000+C.DAY);
  const g=C.review(null,'good',3000);assert.equal(g.interval,3);
  assert.equal(C.review(g,'good',4000).interval,7);
  assert.equal(C.review({interval:180},'good',4000).interval,180);
});
test('invalid review records cannot become scheduled learning data',()=>{
  assert.deepEqual(C.cleanReviews({bad:{grade:'good',due:'tomorrow'},ok:C.review(null,'good',100)}),{ok:C.review(null,'good',100)});
});
const bank=Array.from({length:40},(_,i)=>({id:'x'+i,en:`Students explore topic ${i} carefully with their classmates today.`,level:i%2+2,topic:'topic'+i%4,kind:'kind'+i%5}));
test('new, review and due modes are strict, even when the target cannot be reached',()=>{
  const opt={target:40,copies:1,limit:4,random:()=>0,hist:{x0:2},reviews:{x1:C.review(null,'good',0)},now:4*C.DAY};
  assert.ok(C.select(bank,{...opt,mode:'new'}).every(x=>!['x0','x1'].includes(x.id)));
  assert.ok(C.select(bank,{...opt,mode:'rev'}).every(x=>['x0','x1'].includes(x.id)));
  assert.deepEqual(C.select(bank,{...opt,mode:'due'}).map(x=>x.id),['x1']);
  assert.deepEqual(C.select(bank,{...opt,mode:'due',now:0}),[]);
});
test('selection respects word and count budgets, removes duplicate sentences and favors due material',()=>{
  const result=C.select([...bank,{...bank[0],id:'duplicate'}],{target:30,copies:1,limit:3,random:()=>0,reviews:{x35:C.review(null,'again',0)},now:C.DAY});
  assert.ok(result.length<=3&&result.length>0);
  assert.ok(result.some(x=>x.id==='x35'));
  assert.equal(new Set(result.map(x=>x.en)).size,result.length);
  assert.ok(result.reduce((n,x)=>n+C.wordCount(x.en),0)<=36);
  assert.ok(new Set(result.map(x=>x.topic)).size>=2);
});
test('impossible target returns no selection without mutating input',()=>{
  const before=JSON.stringify(bank);
  assert.deepEqual(C.select(bank,{target:1,copies:20}),[]);
  assert.equal(JSON.stringify(bank),before);
});
