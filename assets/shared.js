/* Navbar + footer dipakai semua halaman. Ganti nama merek cukup di BRAND. */
(function () {
  var BRAND = { name: 'SoilWise', tag: 'Dokter tanah digital' };
  var PAGES = [
    { key: 'beranda', href: 'index.html', label: 'Beranda' },
    { key: 'diagnosis', href: 'diagnosis.html', label: 'Diagnosis' },
    { key: 'data', href: 'data.html', label: 'Data Resmi' },
    { key: 'panduan', href: 'panduan.html', label: 'Panduan' },
    { key: 'metodologi', href: 'metodologi.html', label: 'Metodologi' }
  ];
  var PORTALS = [
    { href: 'https://www.pertanian.go.id', label: 'Kementerian Pertanian' },
    { href: 'https://tanahpupuk.brmp.pertanian.go.id', label: 'BRMP Tanah dan Pupuk' },
    { href: 'https://www.bps.go.id', label: 'Badan Pusat Statistik' },
    { href: 'https://jdih.pertanian.go.id', label: 'JDIH Kementan (peraturan)' }
  ];
  var curEl = document.querySelector('[data-page]');
  var cur = curEl ? curEl.getAttribute('data-page') : '';

  function links(cls) {
    return PAGES.map(function (p) {
      return '<a ' + (cls ? 'class="' + cls + '" ' : '') + 'href="' + p.href + '"' + (p.key === cur ? ' aria-current="page"' : '') + '>' +
        p.label + (cls ? '<i data-ic="chevRight"></i>' : '') + '</a>';
    }).join('');
  }

  var header = document.getElementById('site-header');
  if (header) {
    header.outerHTML =
      '<header class="nav"><div class="wrap nav-in">' +
      '<a class="brand" href="index.html" aria-label="' + BRAND.name + ', ke beranda"><i data-ic="sprout"></i><span>' + BRAND.name + '</span></a>' +
      '<nav class="nav-links" aria-label="Menu utama">' + links('') + '</nav>' +
      '<div class="nav-cta"><a class="btn btn-dark" href="diagnosis.html">Mulai diagnosis</a></div>' +
      '<button class="nav-burger" id="burger" type="button" aria-expanded="false" aria-controls="mnav" aria-label="Buka menu"><i data-ic="menu"></i></button>' +
      '</div><div class="mnav" id="mnav" hidden><nav aria-label="Menu utama seluler">' + links('m-link') + '</nav>' +
      '<a class="btn btn-dark btn-lg" href="diagnosis.html">Mulai diagnosis</a></div></header>';
    var b = document.getElementById('burger'), m = document.getElementById('mnav');
    b.addEventListener('click', function () {
      var open = m.hidden;
      m.hidden = !open;
      b.setAttribute('aria-expanded', String(open));
      b.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
      b.innerHTML = '<i data-ic="' + (open ? 'x' : 'menu') + '"></i>';
      if (window.SWIcons) window.SWIcons.paint(b);
    });
  }

  var footer = document.getElementById('site-footer');
  if (footer) {
    footer.outerHTML =
      '<footer class="footer"><div class="wrap">' +
      '<div class="footer-in">' +
      '<div class="stack" style="gap:10px"><a class="brand" href="index.html"><i data-ic="sprout"></i><span>' + BRAND.name + '</span></a>' +
      '<p class="muted" style="max-width:38ch">' + BRAND.tag + ' untuk petani. Alat pemeriksaan awal kondisi tanah dengan acuan dari instansi resmi Indonesia.</p></div>' +
      '<div><h4>Halaman</h4><ul>' + PAGES.map(function (p) { return '<li><a href="' + p.href + '">' + p.label + '</a></li>'; }).join('') + '</ul></div>' +
      '<div><h4>Situs resmi rujukan</h4><ul>' + PORTALS.map(function (p) { return '<li><a href="' + p.href + '" target="_blank" rel="noopener noreferrer">' + p.label + ' <i data-ic="arrowUpRight" style="width:.9em;height:.9em;vertical-align:-1px"></i></a></li>'; }).join('') + '</ul></div>' +
      '</div>' +
      '<p class="footer-note">SoilWise adalah alat screening awal dan prototipe tugas UI/UX. Hasilnya bukan pengganti uji laboratorium atau saran penyuluh pertanian. Data diperiksa terakhir 14 Oktober 2026.</p>' +
      '</div></footer>';
  }
  if (window.SWIcons) window.SWIcons.paint();
})();
