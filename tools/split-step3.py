#!/usr/bin/env python3
"""第 3 步：每份測驗嘅「設定＋題目」搬去 js/data/<卷>.data.js，引擎檔只留程式。"""
import re,os
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
V='20261119'
papers=[('quiz-l1-7','l1_7'),('quiz-l8-14a','l8_14a'),('quiz-l8-14b','l8_14b'),('quiz-l15-19','l15_19')]
os.makedirs(os.path.join(root,'js','data'),exist_ok=True)
idx=open(os.path.join(root,'index.html'),encoding='utf-8').read()
for fn,key in papers:
    p=os.path.join(root,'js',fn+'.js'); L=open(p,encoding='utf-8').read().split('\n')
    s=next(i for i,l in enumerate(L) if l.startswith('var CFG='))
    e=next(i for i,l in enumerate(L) if i>s and (l.startswith('function q(s)') or l.startswith('/* ── 工具')))
    block=L[s:e]
    # 引擎檔：保留 ROOT 之前嘅頭，之後插入取資料；資料區塊同尾巴之間嘅空行／註解（e 之前）亦一併留低
    txt='\n'.join(block)
    names=[]
    for m in re.finditer(r'^var\s+(.+)$',txt,re.M):
        names.append(re.match(r'[A-Za-z_]\w*',m.group(1)).group(0))
        names+=re.findall(r',\s*([A-Za-z_]\w*)\s*=',m.group(1))
    names+=re.findall(r'^function\s+(\w+)',txt,re.M)
    seen=[];[seen.append(n) for n in names if n not in seen]
    data=("/* 課堂測驗題目＋設定（%s）。引擎：js/%s.js；改題目只需改呢個檔 */\n"%(key,fn)+
          "window.QZ_DATA=window.QZ_DATA||{};\nwindow.QZ_DATA.%s=(function(){\n'use strict';\n"%key+txt.rstrip()+"\nreturn {"+','.join('%s:%s'%(n,n) for n in seen)+"};\n})();\n")
    open(os.path.join(root,'js','data',fn+'.data.js'),'w',encoding='utf-8').write(data)
    head=L[:s]; tail=L[e:]
    pull="var D=window.QZ_DATA&&window.QZ_DATA.%s; if(!D)return;\nvar %s;"%(key,','.join('%s=D.%s'%(n,n) for n in seen))
    open(p,'w',encoding='utf-8').write('\n'.join(head+[pull]+tail))
    tag='<script src="js/%s.js?v=%s"></script>'%(fn,V)
    assert idx.count(tag)==1,tag
    idx=idx.replace(tag,'<script src="js/data/%s.data.js?v=%s"></script>\n'%(fn,V)+tag)
    print(fn,'data lines',len(block),'names',len(seen),seen)
open(os.path.join(root,'index.html'),'w',encoding='utf-8').write(idx)
