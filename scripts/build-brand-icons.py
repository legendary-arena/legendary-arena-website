"""
Generate every derived brand icon from the approved emblem master (WP-247).

Single source of truth: static/brand/logo/logo-la-emblem.svg (the transparent
split-emblem vector). Everything below is derived from it, so the icon set can
never drift from the mark:

  static/brand/logo/logo-la-emblem-mono.svg   single-ink (currentColor)
  static/safari-pinned-tab.svg                mono, solid black (mask-icon)
  static/favicon.svg                          scalable, dark rounded tile
  static/favicon-16/32/48/192/512x*.png       raster rungs (dark tile)
  static/apple-touch-icon.png                 180, dark tile
  static/favicon.ico                          16+32+48 bundle
  static/brand/logo/icon-maskable-512.png     full-bleed square (PWA maskable)

site.webmanifest is hand-authored (metadata, not derived) and not touched here.

Dependencies: Inkscape 1.x + ImageMagick 7 on PATH; pip install pillow numpy is
not required. Regenerate:  python scripts/build-brand-icons.py
"""
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STATIC = ROOT / 'static'
LOGO = STATIC / 'brand' / 'logo'
EMBLEM = LOGO / 'logo-la-emblem.svg'

emblem = EMBLEM.read_text(encoding='utf-8')


def write_mono():
    """Gold + white shapes -> currentColor; drop the black separation layer."""
    src = re.sub(r'\s*<g fill="#0b0f19">.*?</g>', '', emblem, flags=re.DOTALL)
    src = re.sub(r'\s*<defs>.*?</defs>', '', src, flags=re.DOTALL)
    src = src.replace('fill="url(#la-gold)"', 'fill="currentColor"')
    src = src.replace('fill="#ffffff"', 'fill="currentColor"')
    src = src.replace('aria-label="Legendary Arena emblem"',
                      'aria-label="Legendary Arena emblem (monochrome)"')
    (LOGO / 'logo-la-emblem-mono.svg').write_text(src, encoding='utf-8')
    (STATIC / 'safari-pinned-tab.svg').write_text(
        src.replace('currentColor', '#000000'), encoding='utf-8')
    print('wrote logo-la-emblem-mono.svg, safari-pinned-tab.svg')


def tile_svg(size, pad_frac, rounded):
    """Square dark tile with the emblem centered/scaled into the safe area."""
    vx, vy, vw, vh = (float(n) for n in
                      re.search(r'viewBox="([\d.\- ]+)"', emblem).group(1).split())
    inner = emblem[emblem.index('>', emblem.index('<svg')) + 1: emblem.rindex('</svg>')]
    inner = re.sub(r'<title>.*?</title>', '', inner, flags=re.DOTALL)
    inset = size * pad_frac
    area = size - 2 * inset
    scale = area / max(vw, vh)
    tx = inset + (area - vw * scale) / 2 - vx * scale
    ty = inset + (area - vh * scale) / 2 - vy * scale
    rx = f'rx="{size * 0.18:.1f}"' if rounded else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" '
            f'width="{size}" height="{size}" role="img" aria-label="Legendary Arena">\n'
            f'  <rect width="{size}" height="{size}" {rx} fill="#0b0f19"/>\n'
            f'  <g transform="translate({tx:.2f} {ty:.2f}) scale({scale:.4f})">{inner}</g>\n'
            f'</svg>\n')


def render(svg_text, out_png, size):
    tmp = LOGO / '.icontmp.svg'
    tmp.write_text(svg_text, encoding='utf-8')
    subprocess.run(['inkscape', str(tmp), '--export-type=png',
                    f'--export-width={size}', f'--export-height={size}',
                    f'--export-filename={out_png}'],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    tmp.unlink()


def write_icons():
    rounded = tile_svg(512, 0.12, rounded=True)
    maskable = tile_svg(512, 0.20, rounded=False)
    (STATIC / 'favicon.svg').write_text(rounded, encoding='utf-8')
    for out, size, svg in [
        (STATIC / 'favicon-16x16.png', 16, rounded),
        (STATIC / 'favicon-32x32.png', 32, rounded),
        (STATIC / 'favicon-48x48.png', 48, rounded),
        (STATIC / 'favicon-192x192.png', 192, rounded),
        (STATIC / 'favicon-512x512.png', 512, rounded),
        (STATIC / 'apple-touch-icon.png', 180, rounded),
        (LOGO / 'icon-maskable-512.png', 512, maskable),
    ]:
        render(svg, out, size)
        print('rendered', out.name)
    subprocess.run(['magick', str(STATIC / 'favicon-16x16.png'),
                    str(STATIC / 'favicon-32x32.png'), str(STATIC / 'favicon-48x48.png'),
                    str(STATIC / 'favicon.ico')], check=True)
    print('wrote favicon.ico')


if __name__ == '__main__':
    write_mono()
    write_icons()
