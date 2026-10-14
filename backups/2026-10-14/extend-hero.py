import sys, numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as nd

src, out = sys.argv[1], sys.argv[2]
EXT = int(sys.argv[3]) if len(sys.argv) > 3 else 850
rng = np.random.default_rng(7)
a = np.asarray(Image.open(src).convert('RGB')).astype(np.float32)
H, W, _ = a.shape
NH = H + EXT
X0, X1 = 103, 1497           # water span between the kolam borders
PER = 407                    # border repeat period (measured)
Y0 = 960                     # water region top used for sampling

# ---- water mask in sample region ----
reg = a[Y0:H, X0:X1]
wc = np.median(reg.reshape(-1, 3), axis=0)
dist = np.sqrt(((reg - wc) ** 2).sum(2))
water = dist < 38
water = nd.binary_erosion(water, iterations=3)

# ---- output canvas ----
o = np.zeros((NH, W, 3), np.float32)
o[:H] = a
# borders: tile by period
for y in range(H, NH):
    sy = y - PER * int(np.ceil((y - H + 1) / PER))
    o[y, :X0] = a[sy, :X0]
    o[y, X1:] = a[sy, X1:]

# ---- quilt water from clean blocks ----
BW, BH, OV = 200, 70, 40
ii = nd.uniform_filter(water.astype(np.float32), size=(BH, BW), mode='constant')
cy, cx = np.where(ii > 0.999)
cand = list(zip(cy - BH // 2, cx - BW // 2))
cand = [(y, x) for y, x in cand if 0 <= y and y + BH <= reg.shape[0] and 0 <= x and x + BW <= reg.shape[1]]
print('clean blocks', len(cand))
acc = np.zeros((EXT + 2 * BH, X1 - X0 + 2 * BW, 3), np.float32)
wsum = np.zeros(acc.shape[:2], np.float32)
wy = np.minimum(1, np.minimum(np.arange(BH) + 1, BH - np.arange(BH)) / OV)
wx = np.minimum(1, np.minimum(np.arange(BW) + 1, BW - np.arange(BW)) / OV)
wb = np.outer(wy, wx)
for by in range(-BH // 2, EXT, BH - OV):
    for bx in range(-BW // 2, X1 - X0, BW - OV):
        y, x = cand[rng.integers(len(cand))]
        blk = reg[y:y + BH, x:x + BW]
        ty, tx = by + BH // 2, bx + BW // 2
        acc[ty:ty + BH, tx:tx + BW] += blk * wb[..., None]
        wsum[ty:ty + BH, tx:tx + BW] += wb
syn = acc / np.maximum(wsum, 1e-6)[..., None]
syn = syn[BH // 2:BH // 2 + EXT, BW // 2:BW // 2 + X1 - X0]
# soften blockiness a touch horizontally (water strokes run sideways)
syn = nd.gaussian_filter(syn, sigma=(1.2, 3, 0))
o[H:, X0:X1] = syn

# blend seam: last 36 original rows, only on water pixels
S = 36
for i in range(S):
    y = H - S + i
    t = (i + 1) / (S + 1)
    rowmask = (np.sqrt(((a[y, X0:X1] - wc) ** 2).sum(1)) < 38)[:, None]
    # take a synthetic row from the top of syn mirrored upward
    sr = syn[S - 1 - i]
    o[y, X0:X1] = np.where(rowmask, a[y, X0:X1] * (1 - t) + sr * t, a[y, X0:X1])

# ---- lotus cut-outs from her painting ----
pink = (a[..., 0] - a[..., 1] > 45)
pink[:Y0] = False; pink[:, :X0] = False; pink[:, X1:] = False
lab, n = nd.label(nd.binary_dilation(pink, iterations=6))
lotus = []
for sl in nd.find_objects(lab):
    h, w = sl[0].stop - sl[0].start, sl[1].stop - sl[1].start
    if 40 < h < 140 and 50 < w < 200:
        y0, y1 = max(Y0, sl[0].start - 12), min(H, sl[0].stop + 12)
        x0, x1 = max(X0, sl[1].start - 14), min(X1, sl[1].stop + 14)
        c = a[y0:y1, x0:x1]
        al = np.sqrt(((c - wc) ** 2).sum(2)) > 30
        pk = c[..., 0] - c[..., 1] > 45
        pl, _ = nd.label(pk); pk = pl == 1 + np.argmax(nd.sum(pk, pl, range(1, pl.max() + 1)))
        al &= nd.binary_dilation(pk, iterations=9)
        al = nd.binary_closing(al, iterations=2)
        al = nd.binary_fill_holes(al)
        l2, k = nd.label(al)
        if k == 0: continue
        big = 1 + np.argmax(nd.sum(al, l2, range(1, k + 1)))
        al = (l2 == big).astype(np.float32)
        m = al > 0.5
        pf = ((c[..., 0] - c[..., 1] > 45) & m).sum() / m.sum()
        tf = ((c[..., 2] > c[..., 0] + 10) & m).sum() / m.sum()
        print('cand', c.shape[:2], round(pf, 2), round(tf, 3))
        if pf < 0.35 or tf > 0.01: continue
        al = nd.gaussian_filter(al, 1.0)
        lotus.append((c, al))
print('lotuses', len(lotus), [l[0].shape[:2] for l in lotus])

def place(img, al, cx, cy, s, flip):
    im = Image.fromarray(img.astype(np.uint8)); am = Image.fromarray((al * 255).astype(np.uint8))
    if flip:
        im, am = im.transpose(Image.FLIP_LEFT_RIGHT), am.transpose(Image.FLIP_LEFT_RIGHT)
    w, h = int(im.width * s), int(im.height * s)
    im, am = im.resize((w, h), Image.LANCZOS), am.resize((w, h), Image.LANCZOS)
    x0, y0 = int(cx - w / 2), int(cy - h / 2)
    I = np.asarray(im).astype(np.float32); A = np.asarray(am).astype(np.float32)[..., None] / 255
    o[y0:y0 + h, x0:x0 + w] = o[y0:y0 + h, x0:x0 + w] * (1 - A) + I * A

# hand-set layout: loose, uneven drift like the painted ones above
spots = [(300, H + 120, 0.95), (720, H + 70, 0.8), (1180, H + 160, 1.0), (520, H + 320, 0.75),
         (960, H + 380, 0.9), (1380, H + 330, 0.7), (230, H + 520, 0.85), (760, H + 600, 1.0),
         (1210, H + 640, 0.8), (450, H + 760, 0.7), (1020, H + 790, 0.75)]
for i, (cx, cy, s) in enumerate(spots):
    c, al = lotus[i % len(lotus)]
    place(c, al, cx + rng.integers(-25, 25), cy, s, i % 2 == 1)

Image.fromarray(np.clip(o, 0, 255).astype(np.uint8)).save(out, quality=90, optimize=True, progressive=True)
print(out, W, NH)
