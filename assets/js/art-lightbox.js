/* Legendary Arena — art gallery lightbox (WP-041).
   Dependency-free. Opens gallery thumbnails in a full-screen overlay
   with keyboard navigation (Esc to close, arrows to page). Progressive
   enhancement: with JS off, each thumbnail is a plain link to the
   full-size render, so the gallery still works. */
(function () {
  var tiles = Array.prototype.slice.call(document.querySelectorAll('.art-gallery a.art-tile'));
  var box = document.getElementById('art-lightbox');
  if (!tiles.length || !box) return;

  var imgEl = box.querySelector('.art-lightbox-img');
  var capEl = box.querySelector('.art-lightbox-caption');
  var btnClose = box.querySelector('.art-lightbox-close');
  var btnPrev = box.querySelector('.art-lightbox-prev');
  var btnNext = box.querySelector('.art-lightbox-next');
  var current = -1;
  var lastFocused = null;

  function show(i) {
    if (i < 0) i = tiles.length - 1;
    if (i >= tiles.length) i = 0;
    current = i;
    var tile = tiles[i];
    var title = tile.getAttribute('data-title') || '';
    var caption = tile.getAttribute('data-caption') || '';
    imgEl.src = tile.getAttribute('href');
    imgEl.alt = title || caption;
    // why: build the caption from title (bold) + caption text without
    // innerHTML, so gallery front-matter can never inject markup.
    capEl.textContent = '';
    if (title) {
      var strong = document.createElement('strong');
      strong.textContent = title;
      capEl.appendChild(strong);
    }
    if (caption) {
      if (title) capEl.appendChild(document.createTextNode(' — '));
      capEl.appendChild(document.createTextNode(caption));
    }
  }

  function open(i) {
    lastFocused = document.activeElement;
    show(i);
    box.hidden = false;
    box.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    btnClose.focus();
    document.addEventListener('keydown', onKey);
  }

  function close() {
    box.hidden = true;
    box.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    imgEl.src = '';
    document.removeEventListener('keydown', onKey);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function onKey(e) {
    if (e.key === 'Escape') { close(); }
    else if (e.key === 'ArrowLeft') { show(current - 1); }
    else if (e.key === 'ArrowRight') { show(current + 1); }
  }

  tiles.forEach(function (tile, i) {
    tile.addEventListener('click', function (e) {
      e.preventDefault();
      open(i);
    });
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', function () { show(current - 1); });
  btnNext.addEventListener('click', function () { show(current + 1); });
  // Click the backdrop (not the image or the controls) to close.
  box.addEventListener('click', function (e) {
    if (e.target === box || e.target.classList.contains('art-lightbox-figure')) close();
  });
})();
