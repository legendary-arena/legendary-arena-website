"""
Compose the brand-guideline diagrams (WP-248) from the approved marks:

  static/brand/logo/guide-clearspace.png   lockup + dashed exclusion zone (X)
  static/brand/logo/guide-minsize.png      emblem + lockup at minimum sizes

Both are derived from the committed lockup/emblem SVGs, so they cannot drift
from the mark. Dependencies: Inkscape 1.x on PATH. Regenerate:
  python scripts/build-brand-guides.py
"""
import re
import subprocess
from pathlib import Path

LOGO = Path(__file__).resolve().parent.parent / 'static' / 'brand' / 'logo'
FONT = 'font-family="Inter, Arial, sans-serif"'


def inner_and_box(name):
    svg = (LOGO / name).read_text(encoding='utf-8')
    vx, vy, vw, vh = (float(n) for n in re.search(r'viewBox="([\d.\- ]+)"', svg).group(1).split())
    inner = svg[svg.index('>', svg.index('<svg')) + 1: svg.rindex('</svg>')]
    inner = re.sub(r'<title>.*?</title>', '', inner, flags=re.DOTALL)
    return inner, (vx, vy, vw, vh)


def place(inner, box, x, y, target_h):
    vx, vy, vw, vh = box
    s = target_h / vh
    return f'<g transform="translate({x - vx * s:.2f} {y - vy * s:.2f}) scale({s:.4f})">{inner}</g>', vw * s


def render(svg, out, w, h):
    tmp = LOGO / '.guidetmp.svg'
    tmp.write_text(svg, encoding='utf-8')
    subprocess.run(['inkscape', str(tmp), '--export-type=png', f'--export-width={w}',
                    f'--export-height={h}', f'--export-filename={out}'],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    tmp.unlink()


lock_inner, lock_box = inner_and_box('logo-la-lockup.svg')
emb_inner, emb_box = inner_and_box('logo-la-emblem.svg')

# Clear-space diagram.
W, H, lock_h = 1000, 460, 150
_, lw = place(lock_inner, lock_box, 0, 0, lock_h)
lx, ly = (W - lw) / 2, (H - lock_h) / 2
X = lock_h * 0.5
lock_g, _ = place(lock_inner, lock_box, lx, ly, lock_h)
clear = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}">
  <rect width="{W}" height="{H}" fill="#0b0f19"/>
  <rect x="{lx-X:.1f}" y="{ly-X:.1f}" width="{lw+2*X:.1f}" height="{lock_h+2*X:.1f}"
        fill="none" stroke="#d4af37" stroke-width="2" stroke-dasharray="8 6" opacity="0.8"/>
  {lock_g}
  <line x1="{lx-X:.1f}" y1="{ly-X-18:.1f}" x2="{lx:.1f}" y2="{ly-X-18:.1f}" stroke="#6e7893" stroke-width="1.5"/>
  <text x="{lx-X/2:.1f}" y="{ly-X-24:.1f}" fill="#a7b0c5" font-size="20" text-anchor="middle" {FONT}>X</text>
  <text x="{W/2:.1f}" y="{H-26:.1f}" fill="#a7b0c5" font-size="22" text-anchor="middle" {FONT}>Minimum clear space on all sides = X (half the mark height)</text>
</svg>'''
render(clear, LOGO / 'guide-clearspace.png', W, H)
print('wrote guide-clearspace.png')

# Minimum-size diagram.
W2, H2 = 760, 300
eg, ew = place(emb_inner, emb_box, 150, 120, 72)
lg2, lw2 = place(lock_inner, lock_box, 380, 134, 56)
minsize = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W2} {H2}">'
           f'<rect width="{W2}" height="{H2}" fill="#0b0f19"/>{eg}{lg2}'
           f'<text x="{150+ew/2:.0f}" y="230" fill="#a7b0c5" font-size="18" text-anchor="middle" {FONT}>Emblem</text>'
           f'<text x="{150+ew/2:.0f}" y="252" fill="#6e7893" font-size="15" text-anchor="middle" {FONT}>min 24 px</text>'
           f'<text x="{380+lw2/2:.0f}" y="230" fill="#a7b0c5" font-size="18" text-anchor="middle" {FONT}>Lockup</text>'
           f'<text x="{380+lw2/2:.0f}" y="252" fill="#6e7893" font-size="15" text-anchor="middle" {FONT}>min 120 px wide</text>'
           '</svg>')
render(minsize, LOGO / 'guide-minsize.png', W2, H2)
print('wrote guide-minsize.png')
