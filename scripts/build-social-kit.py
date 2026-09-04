"""
Compose the launch / social raster kit (WP-248) from the approved marks:

  static/brand/social/og-image.png          1200x630  (Open Graph / Twitter)
  static/brand/social/facebook-cover.png     851x315
  static/brand/social/youtube-banner.png    2560x1440 (lockup in TV-safe center)
  static/brand/social/youtube-watermark.png  150x150   (transparent emblem)
  static/brand/social/avatar-800.png          800x800  (app-icon tile)

All derived from the committed lockup/emblem SVGs on the brand navy ground.
Dependencies: Inkscape 1.x on PATH. Regenerate:
  python scripts/build-social-kit.py
"""
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LOGO = ROOT / 'static' / 'brand' / 'logo'
OUT = ROOT / 'static' / 'brand' / 'social'
OUT.mkdir(parents=True, exist_ok=True)
FONT = 'font-family="Inter, Arial, sans-serif"'
TAGLINE = 'MASTERY — NOT LUCK — DETERMINES VICTORY'


def inner_and_box(name):
    svg = (LOGO / name).read_text(encoding='utf-8')
    vx, vy, vw, vh = (float(n) for n in re.search(r'viewBox="([\d.\- ]+)"', svg).group(1).split())
    inner = svg[svg.index('>', svg.index('<svg')) + 1: svg.rindex('</svg>')]
    inner = re.sub(r'<title>.*?</title>', '', inner, flags=re.DOTALL)
    return inner, (vx, vy, vw, vh)


LOCK, LOCK_BOX = inner_and_box('logo-la-lockup.svg')
EMB, EMB_BOX = inner_and_box('logo-la-emblem.svg')


def centered(inner, box, cx, cy, target_h):
    vx, vy, vw, vh = box
    s = target_h / vh
    x = cx - (vw * s) / 2 - vx * s
    y = cy - (vh * s) / 2 - vy * s
    return f'<g transform="translate({x:.2f} {y:.2f}) scale({s:.4f})">{inner}</g>'


def render(svg, out, w, h, bg=None):
    tmp = OUT / '.socialtmp.svg'
    tmp.write_text(svg, encoding='utf-8')
    args = ['inkscape', str(tmp), '--export-type=png', f'--export-width={w}',
            f'--export-height={h}', f'--export-filename={out}']
    if bg:
        args += [f'--export-background={bg}', '--export-background-opacity=1']
    subprocess.run(args, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    tmp.unlink()


def ground(w, h):
    """Brand navy vertical gradient with a faint centered gold glow."""
    return (f'<defs>'
            f'<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">'
            f'<stop offset="0" stop-color="#121826"/><stop offset="1" stop-color="#0b0f19"/>'
            f'</linearGradient>'
            f'<radialGradient id="glow" cx="0.5" cy="0.42" r="0.5">'
            f'<stop offset="0" stop-color="#d4af37" stop-opacity="0.10"/>'
            f'<stop offset="1" stop-color="#d4af37" stop-opacity="0"/></radialGradient>'
            f'</defs>'
            f'<rect width="{w}" height="{h}" fill="url(#bg)"/>'
            f'<rect width="{w}" height="{h}" fill="url(#glow)"/>')


def banner(w, h, lockup_h, tagline_size, cx, cy, tagline_gap):
    lock = centered(LOCK, LOCK_BOX, cx, cy, lockup_h)
    ty = cy + lockup_h / 2 + tagline_gap
    tag = (f'<text x="{cx}" y="{ty}" fill="#a7b0c5" font-size="{tagline_size}" '
           f'letter-spacing="{tagline_size*0.18:.1f}" text-anchor="middle" {FONT}>{TAGLINE}</text>')
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}">{ground(w,h)}{lock}{tag}</svg>'


# Open Graph 1200x630
render(banner(1200, 630, 210, 30, 600, 285, 130), OUT / 'og-image.png', 1200, 630)
print('wrote og-image.png')

# Facebook cover 851x315
render(banner(851, 315, 120, 19, 425, 135, 78), OUT / 'facebook-cover.png', 851, 315)
print('wrote facebook-cover.png')

# YouTube banner 2560x1440 — everything inside the 1546x423 TV-safe center box.
render(banner(2560, 1440, 300, 40, 1280, 660, 200), OUT / 'youtube-banner.png', 2560, 1440)
print('wrote youtube-banner.png')

# YouTube watermark 150x150 — transparent emblem, no ground.
wm = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150">{centered(EMB, EMB_BOX, 75, 75, 132)}</svg>'
render(wm, OUT / 'youtube-watermark.png', 150, 150)
print('wrote youtube-watermark.png')

# Avatar 800x800 — emblem on a dark rounded tile.
av = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">'
      f'<rect width="800" height="800" rx="144" fill="#0b0f19"/>'
      f'{centered(EMB, EMB_BOX, 400, 400, 560)}</svg>')
render(av, OUT / 'avatar-800.png', 800, 800)
print('wrote avatar-800.png')
