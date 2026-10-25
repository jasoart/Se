import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=name=>readFile(path.join(root,name),'utf8');
const data=(await Promise.all(['src/core.js','exam_111_115.js','src/expansion.js'].map(read))).join('\n');
const app=await read('src/app.js');
const html=(await read('src/index.template.html')).replace('<!-- DATA -->',()=>'<script>\n'+data+'\n</script>').replace('<!-- APP -->',()=>'<script>\n'+app+'\n</script>');
if(process.argv.includes('--check')){
  if(html!==await read('index.html'))throw Error('index.html is stale; run node scripts/build.mjs');
  console.log('PASS: standalone build is current');
}else{await writeFile(path.join(root,'index.html'),html);console.log('Built standalone index.html');}
