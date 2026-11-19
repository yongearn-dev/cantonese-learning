#!/usr/bin/env python3
"""第 2 步拆檔：每個 <script> 模組搬去 js/，測驗 CSS 搬去 css/quiz.css（次序不變）。只喺 index.html 仍係內嵌版本時用。"""
import re,os
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
V='20261119'
s=open(os.path.join(root,'index.html'),encoding='utf-8').read()
names=['app','jyutping-practice','vocab-read-aloud','soundalike','quiz-hub','quiz-l1-7','quiz-l8-14a','quiz-l8-14b','quiz-l15-19',
       'time','direction','antonym','classifier','hobby','tones','score-bridge',None,'body','family']
os.makedirs(os.path.join(root,'js'),exist_ok=True); os.makedirs(os.path.join(root,'css'),exist_ok=True)
it=iter(names); out=[]; last=0; k=0
for m in re.finditer(r'<script([^>]*)>([\s\S]*?)</script>',s):
    attrs,body=m.group(1),m.group(2)
    if 'src=' in attrs: continue
    n=next(it)
    if n is None: continue          # BD_IMGS（細）保持內嵌
    if n=='quiz-l8-14a': body=body.replace('課堂測驗（二）· 第8–14課','課堂測驗（二）A卷 · 第8–14課',1)
    if n=='quiz-l8-14b': body=body.replace('課堂測驗（二）· 第8–14課','課堂測驗（二）B卷 · 第8–14課',1)
    open(os.path.join(root,'js',n+'.js'),'w',encoding='utf-8').write(body.lstrip('\n'))
    out.append(s[last:m.start()]); out.append('<script'+attrs+' src="js/%s.js?v=%s"></script>'%(n,V)); last=m.end(); k+=1
out.append(s[last:]); s=''.join(out)
# CSS：第一個 <style> 入面測驗（一）…粵拼表之前 → css/quiz.css，前後各留一段，次序不變
m=re.search(r'<style>([\s\S]*?)</style>',s); css=m.group(1)
a=css.index('/* ══ 課堂測驗（一）：全部加 qz- 前綴'); b=css.index('/* ══ 粵拼表（由 jyutping.html 併入')
open(os.path.join(root,'css','quiz.css'),'w',encoding='utf-8').write(css[a:b])
new='<style>'+css[:a]+'</style>\n<link rel="stylesheet" href="css/quiz.css?v=%s">\n<style>'%V+css[b:]+'</style>'
s=s[:m.start()]+new+s[m.end():]
open(os.path.join(root,'index.html'),'w',encoding='utf-8').write(s)
print('scripts moved',k,'; index.html',len(s.encode())//1024,'KB; quiz.css',(b-a)//1024,'KB')
