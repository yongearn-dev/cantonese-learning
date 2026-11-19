#!/usr/bin/env python3
"""合併 index.html + js/ + img/ → 單一 HTML（離線備份／直接開檔）。用法：python3 tools/build-single.py [輸出檔]"""
import re,base64,os,sys
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out=sys.argv[1] if len(sys.argv)>1 else os.path.join(root,'cantonese-app-single.html')
s=open(os.path.join(root,'index.html'),encoding='utf-8').read()
def js(m):
    code=open(os.path.join(root,m.group(2)),encoding='utf-8').read()
    return '<script'+m.group(1)+'>\n'+code+'</script>'
s=re.sub(r'<script([^>]*?) src="(js/[^"?]+)(?:\?[^"]*)?"></script>',js,s)
def css(m):
    return '<style>'+open(os.path.join(root,m.group(1)),encoding='utf-8').read()+'</style>'
s=re.sub(r'<link rel="stylesheet" href="(css/[^"?]+)(?:\?[^"]*)?">',css,s)
def img(m):
    b=base64.b64encode(open(os.path.join(root,m.group(1)),'rb').read()).decode()
    return '"data:image/webp;base64,'+b+'"'
s=re.sub(r'"(img/[^"?]+\.webp)(?:\?[^"]*)?"',img,s)
open(out,'w',encoding='utf-8').write(s)
print('wrote',out,len(s.encode())//1024,'KB')
