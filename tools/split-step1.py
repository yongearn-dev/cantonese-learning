import re,base64,os,sys
src=open('/home/claude/cantonese-app.html',encoding='utf-8').read()
V='20261119'
# 1) body images -> img/*.webp
m=re.search(r'<script>window\.BD_IMGS = (\{.*?\});</script>',src,re.S)
imgs=dict(re.findall(r'"(\w+)": "data:image/webp;base64,([A-Za-z0-9+/=]+)"',m.group(1)))
assert set(imgs)=={'outer','back','skeleton','organs'},imgs.keys()
for k,v in imgs.items():
    open(f'/home/claude/site/img/body-{k}.webp','wb').write(base64.b64decode(v))
new='<script>window.BD_IMGS = {'+', '.join(f'"{k}": "img/body-{k}.webp?v={V}"' for k in imgs)+'};</script>'
src=src.replace(m.group(0),new)
# 2) jy-engine -> js/jy-engine.js
m=re.search(r'<script id="jy-engine">\n?(.*?)</script>',src,re.S)
open('/home/claude/site/js/jy-engine.js','w',encoding='utf-8').write(m.group(1))
src=src.replace(m.group(0),f'<script id="jy-engine" src="js/jy-engine.js?v={V}"></script>')
open('/home/claude/site/index.html','w',encoding='utf-8').write(src)
print('index.html',len(src.encode())//1024,'KB; engine',len(m.group(1).encode())//1024,'KB')
