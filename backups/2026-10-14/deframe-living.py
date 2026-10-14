import sys, numpy as np
from PIL import Image
from scipy import sparse, ndimage as nd
from scipy.sparse.linalg import spsolve
src,out=sys.argv[1],sys.argv[2]; x0,y0,x1,y1=map(int,sys.argv[3:7])
a=np.asarray(Image.open(src).convert('RGB')).astype(np.float64); H,W,_=a.shape
m=np.zeros((H,W),bool); m[y0:y1,x0:x1]=True
idx=-np.ones((H,W),int); ys,xs=np.nonzero(m); idx[ys,xs]=np.arange(len(ys)); n=len(ys)
rows=[];cols=[];vals=[]; b=np.zeros((n,3))
for k,(y,x) in enumerate(zip(ys,xs)):
    rows.append(k);cols.append(k);vals.append(4.0)
    for dy,dx in((1,0),(-1,0),(0,1),(0,-1)):
        yy,xx=y+dy,x+dx
        if m[yy,xx]: rows.append(k);cols.append(idx[yy,xx]);vals.append(-1.0)
        else: b[k]+=a[yy,xx]
A=sparse.csr_matrix((vals,(rows,cols)),shape=(n,n))
sol=np.stack([spsolve(A,b[:,c]) for c in range(3)],1)
o=a.copy(); o[ys,xs]=sol
# add wall grain sampled from a clean strip just above the frame
ref=a[max(0,y0-60):y0-8, x0:x1]; grain=ref-nd.gaussian_filter(ref,(4,4,0))
sd=grain.std(axis=(0,1)); rng=np.random.default_rng(3); g=nd.gaussian_filter(rng.normal(0,1,(y1-y0,x1-x0,1)),(.7,.7,0))*sd/0.45
o[y0:y1,x0:x1]+=g
Image.fromarray(np.clip(o,0,255).astype(np.uint8)).save(out,quality=92)
