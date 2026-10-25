// Offline regression test. Run: node verify_v5.cjs
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const blocks=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
assert.equal(blocks.length,2,'v5 must have exactly two embedded scripts (data + application)');
assert.equal((html.match(/<script src=/g)||[]).length,0,'index.html must be standalone');
for(const code of blocks)new vm.Script(code);
const ctx={window:{}};
vm.runInNewContext(blocks[0],ctx);
const generator=blocks[1].slice(blocks[1].indexOf('const PACKS='),blocks[1].indexOf('const KEY='));
const bank=vm.runInNewContext('(function(){'+generator+';return BUILT})()',ctx);
assert.equal(ctx.window.GSAT_YEAR_BANK.length,57);
assert.equal(ctx.window.GSAT_EXTRA_TPLS.length,12);
assert.equal(bank.length,23353);
assert.equal(new Set(bank.map(x=>x.en)).size,bank.length,'Duplicate English sentences found');
assert.deepEqual([...new Set(bank.filter(x=>x.year).map(x=>x.year))].sort(),['111','112','113','114','115']);
assert.match(html,/id="fYear"/);
assert.match(html,/GSAT_YEAR_BANK/);
assert.match(html,/gsat-writing-v3/,'old progress key must remain unchanged');
for(const x of ctx.window.GSAT_YEAR_BANK){
 assert.ok(x.source.includes(x.year)&&x.source.includes(x.question),'question anchor missing');
 assert.ok(x.en.length>50 && x.zh.length>10,'practice sentence missing');
}
console.log('PASS: v5 standalone HTML, 57 anchored sentences, 12 templates, 23,353 unique examples, year filters, legacy storage.');
