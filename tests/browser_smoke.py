"""Run: python3 tests/browser_smoke.py (requires Playwright and Chromium)."""
import functools
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import threading
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

server = ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(QuietHandler, directory=str(ROOT)))
threading.Thread(target=server.serve_forever, daemon=True).start()
url = f'http://127.0.0.1:{server.server_port}/index.html'
key = 'gsat-writing-v3'
try:
    with sync_playwright() as p, tempfile.TemporaryDirectory() as tmp:
        browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH') or shutil.which('chromium'), args=['--no-sandbox'])
        context = browser.new_context(accept_downloads=True)
        page = context.new_page()
        errors, external = [], []
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.on('request', lambda req: external.append(req.url) if not req.url.startswith(url.rsplit('/',1)[0]) else None)
        assert page.goto(url).status == 200
        expect(page.locator('#sDb')).to_have_text('58465')
        assert int(page.locator('#sSel').inner_text()) > 0
        page.select_option('#fYear', '115')
        expect(page.locator('#sum')).to_contain_text('符合 23 句')
        page.fill('#q', '"tight schedule" doctor -mayor')
        expect(page.locator('#sum')).to_contain_text('符合 1 句')
        page.click('[data-fav]')
        page.select_option('#fState', 'favorite')
        expect(page.locator('#sum')).to_contain_text('符合 1 句')
        page.click('#clr')
        page.click('#addAll')
        expect(page.locator('#sSel')).to_have_text('1')
        page.click('#practice')
        expect(page.locator('#answer')).to_be_hidden()
        expect(page.locator('#grades')).to_be_hidden()
        page.click('#reveal')
        expect(page.locator('#answer')).to_contain_text('tight schedule')
        page.click('[data-grade="again"]')
        expect(page.locator('#practiceDialog')).not_to_be_visible()
        state = page.evaluate(f'JSON.parse(localStorage.getItem("{key}"))')
        selected = state['selected'][0]
        assert state['reviews'][selected]['lapses'] == 1
        assert state['hist'][selected] == 1
        page.reload()
        expect(page.locator('#sSel')).to_have_text('1')
        # Printing is not evidence of practice.
        page.evaluate('window.print=()=>{window.printCalled=true}')
        page.click('#pr1')
        assert page.evaluate('window.printCalled')
        assert page.evaluate(f'JSON.parse(localStorage.getItem("{key}")).hist') == state['hist']
        # Full backup with zero custom sentences must restore progress and favorites.
        with page.expect_download() as dl:
            page.click('#exp')
        backup = Path(tmp)/'backup.json'
        dl.value.save_as(backup)
        saved = json.loads(backup.read_text())
        page.on('dialog', lambda d: d.accept())
        page.click('#rst')
        page.set_input_files('#file', str(backup))
        expect(page.locator('#note')).to_contain_text('已還原備份')
        restored = page.evaluate(f'JSON.parse(localStorage.getItem("{key}"))')
        for field in ['custom','selected','hidden','hist','reviews','favorites','config']:
            assert restored[field] == saved[field], field
        # Unsupported or malformed backups cannot change state.
        page.set_input_files('#file', {'name':'bad.json','mimeType':'application/json','buffer':b'{broken'})
        expect(page.locator('#note')).to_contain_text('匯入失敗')
        assert page.evaluate(f'JSON.parse(localStorage.getItem("{key}"))') == restored
        # v3 backups retain IDs, history, selection and custom content.
        old = {'app':'GSAT Writing Studio','version':3,'custom':[{'id':'u-old','en':'We can learn from every mistake.','zh':'我們可以從每個錯誤中學習。','level':2,'topic':'自編','kind':'can'}], 'selected':['u-old','g0.0.000'],'hidden':[],'hist':{'u-old':4},'config':{'copies':1,'targetWords':100}}
        page.set_input_files('#file', {'name':'old.json','mimeType':'application/json','buffer':json.dumps(old).encode()})
        expect(page.locator('#note')).to_contain_text('已還原備份')
        expect(page.locator('#sSel')).to_have_text('2')
        assert page.evaluate(f'JSON.parse(localStorage.getItem("{key}")).hist["u-old"]') == 4
        page.reload()
        expect(page.locator('#sSel')).to_have_text('2')
        # An intentionally empty selection survives reload.
        page.click('#clr');page.reload()
        expect(page.locator('#sSel')).to_have_text('0')
        # Strict review mode finds only practiced sentences.
        page.select_option('#mode','rev');page.click('#smart')
        expect(page.locator('#sSel')).to_have_text('1')
        # Layout, real PDF and mobile width.
        page.wait_for_function("document.querySelectorAll('.card').length > 0")
        assert page.evaluate("[...document.querySelectorAll('.pm')].every(x=>x.scrollHeight<=x.clientHeight+1)")
        pdf = Path(tmp)/'exercise.pdf'
        page.pdf(path=str(pdf), prefer_css_page_size=True)
        assert pdf.read_bytes().startswith(b'%PDF-') and pdf.stat().st_size > 1000
        if shutil.which('pdfinfo'):
            info=subprocess.check_output(['pdfinfo',str(pdf)],text=True)
            assert 'A4' in info, info
        page.set_viewport_size({'width':390,'height':844})
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        # Long handwriting rows continue on subsequent A4 pages without clipping.
        page.set_viewport_size({'width':1280,'height':900})
        long_sentence = 'We will carefully review every observation before making a decision. ' * 7
        page.click('#newB')
        page.fill('#eEn',long_sentence)
        page.fill('#eZh','這是一段用於驗證長句跨頁的練習。')
        page.click('#eOk')
        page.select_option('#fSource','custom')
        page.fill('#q','observation')
        expect(page.locator('#sum')).to_contain_text('符合 1 句')
        page.click('#clr');page.click('#addAll')
        page.fill('#gridMm','9');page.locator('#gridMm').blur()
        page.fill('#lineMm','14');page.locator('#lineMm').blur()
        page.wait_for_function("Number(document.querySelector('#sPg').textContent)>1")
        assert page.evaluate("[...document.querySelectorAll('.pm')].every(x=>x.scrollHeight<=x.clientHeight+1)")
        # After load, all functions work with network disabled.
        context.set_offline(True)
        page.click('#practice');page.click('#reveal');page.click('[data-grade="good"]')
        expect(page.locator('#learnStats')).to_contain_text('已自評 1 句')
        assert not errors, errors
        assert not external, external
        print('PASS: browser startup, search, favorites, practice, persistence, print, backup restore, legacy migration, malformed import, strict review, A4 PDF, mobile, offline interactions; no JS errors or external requests.')
        browser.close()
finally:
    server.shutdown()
