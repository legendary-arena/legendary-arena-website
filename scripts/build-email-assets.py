"""
Compose the email header logo from the approved lockup (WP-250).

Email clients do not render SVG, so these are PNGs at 2x for retina (they
display at ~200-320 px wide). The emblem is a dark-surface mark, so the
default header bakes a dark rounded bar behind the lockup and reads on any
email background; a transparent version is provided for templates whose header
is already dark.

  static/brand/email/email-header-lockup-on-dark.png   (recommended default)
  static/brand/email/email-header-lockup.png           (transparent)

Dependencies: Inkscape 1.x on PATH. Regenerate:
  python scripts/build-email-assets.py
"""
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LOGO = ROOT / 'static' / 'brand' / 'logo'
OUT = ROOT / 'static' / 'brand' / 'email'
OUT.mkdir(parents=True, exist_ok=True)

lockup = (LOGO / 'logo-la-lockup.svg').read_text(encoding='utf-8')
vx, vy, vw, vh = (float(n) for n in re.search(r'viewBox="([\d.\- ]+)"', lockup).group(1).split())
inner = lockup[lockup.index('>', lockup.index('<svg')) + 1: lockup.rindex('</svg>')]
inner = re.sub(r'<title>.*?</title>', '', inner, flags=re.DOTALL)

# Layout: lockup at a fixed height with uniform padding.
LOCK_H = 132
PAD_X, PAD_Y = 72, 56
scale = LOCK_H / vh
lock_w = vw * scale
W = lock_w + 2 * PAD_X
H = LOCK_H + 2 * PAD_Y
place = f'<g transform="translate({PAD_X - vx*scale:.2f} {PAD_Y - vy*scale:.2f}) scale({scale:.4f})">{inner}</g>'


def render(svg, name, export_w):
    tmp = OUT / '.emailtmp.svg'
    tmp.write_text(svg, encoding='utf-8')
    subprocess.run(['inkscape', str(tmp), '--export-type=png', f'--export-width={export_w}',
                    f'--export-filename={OUT / name}'],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    tmp.unlink()


# 2x export width for retina (displays at ~half).
EXPORT_W = int(round(W * 2))

on_dark = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.1f} {H:.1f}">'
           f'<rect width="{W:.1f}" height="{H:.1f}" rx="28" fill="#0b0f19"/>{place}</svg>')
render(on_dark, 'email-header-lockup-on-dark.png', EXPORT_W)
print('wrote email-header-lockup-on-dark.png', f'{EXPORT_W}px wide')

transparent = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.1f} {H:.1f}">{place}</svg>'
render(transparent, 'email-header-lockup.png', EXPORT_W)
print('wrote email-header-lockup.png', f'{EXPORT_W}px wide')
