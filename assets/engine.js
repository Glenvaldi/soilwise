/* Mesin sistem pakar SoilWise: aturan "jika-maka" + tampilan hasil.
 * Skor 0–100 = A struktur (30) + B indikasi bahan organik (25) + C drainase (15) + D pola pemupukan (30).
 * Bobot adalah rancangan prototipe, belum dikalibrasi dengan uji laboratorium (lihat halaman Metodologi). */
window.SoilEngine = (function () {
  var OPTS = {
    crop: {
      padi: { label: 'Padi sawah', tip: 'Setelah panen, benamkan atau komposkan jerami ke lahan, jangan dibakar.' },
      jagung: { label: 'Jagung', tip: 'Campur pupuk kandang matang di barisan tanam agar tanah tidak cepat memadat.' },
      cabai: { label: 'Cabai', tip: 'Pakai bedengan dan mulsa agar tanah tidak memadat dan tergenang saat hujan.' },
      tomat: { label: 'Tomat', tip: 'Pakai bedengan yang cukup tinggi dan hindari genangan di sekitar akar.' },
      sayur: { label: 'Sayuran daun', tip: 'Pakai kompos yang sudah matang. Kompos mentah bisa merusak akar muda.' },
      kacang: { label: 'Kedelai / kacang tanah', tip: 'Atur rotasi tanam. Tanaman kacang-kacangan membantu memperbaiki tanah.' }
    },
    tekstur: {
      gembur: { label: 'Gembur', desc: 'Mudah hancur seperti remah, empuk saat dicangkul.', pts: 30 },
      padat: { label: 'Padat / keras', desc: 'Keras saat kering, sulit dicangkul, mudah retak.', pts: 4 },
      lengket: { label: 'Lengket (liat)', desc: 'Lengket dan licin saat basah, keras saat kering.', pts: 14 },
      berpasir: { label: 'Berpasir', desc: 'Kasar, butirnya terasa di jari, cepat kering.', pts: 14 }
    },
    warna: {
      gelap: { label: 'Gelap kehitaman', hex: '#3b2f2a', pts: 15 },
      cokelat: { label: 'Cokelat', hex: '#7a5230', pts: 10 },
      kemerahan: { label: 'Kemerahan', hex: '#a4552f', pts: 6 },
      pucat: { label: 'Pucat / keabu-abuan', hex: '#b9b2a1', pts: 3 },
      ragu: { label: 'Tidak yakin', hex: '#ffffff', pts: 8 }
    },
    cacing: {
      banyak: { label: 'Banyak', desc: 'Mudah ditemukan saat menggali.', pts: 10 },
      sedikit: { label: 'Sedikit', desc: 'Jarang ditemukan.', pts: 5 },
      tidak: { label: 'Tidak ada', desc: 'Tidak ditemukan sama sekali.', pts: 0 },
      ragu: { label: 'Tidak yakin', desc: 'Belum pernah memeriksa.', pts: 4 }
    },
    air: {
      baik: { label: 'Meresap baik', desc: 'Air hilang dalam beberapa menit.', pts: 15 },
      lambat: { label: 'Lambat / menggenang', desc: 'Air lama tergenang di permukaan.', pts: 5 },
      cepat: { label: 'Terlalu cepat', desc: 'Air langsung hilang, tanah cepat kering.', pts: 8 },
      ragu: { label: 'Tidak yakin', desc: 'Belum pernah memperhatikan.', pts: 9 }
    },
    chemLabels: ['Tidak pernah', 'Jarang', 'Kadang-kadang', 'Sering', 'Setiap musim, dosis tinggi'],
    durasi: {
      baru: { label: 'Kurang dari 1 tahun', pen: 0 },
      sedang: { label: '1 sampai 3 tahun', pen: 3 },
      lama: { label: '3 sampai 10 tahun', pen: 6 },
      sangat: { label: 'Lebih dari 10 tahun', pen: 10 }
    },
    organik: {
      rutin: { label: 'Rutin tiap musim', bonus: 5 },
      kadang: { label: 'Kadang-kadang', bonus: 2 },
      tidak: { label: 'Belum pernah', bonus: 0 }
    }
  };

  var BANDS = [
    { id: 'kritis', min: 0, max: 35, label: 'Kritis', color: '#b91c1c', badge: 'badge-bad', icon: 'alert' },
    { id: 'perbaikan', min: 35, max: 55, label: 'Perlu perbaikan', color: '#c2410c', badge: 'badge-orange', icon: 'alert' },
    { id: 'cukup', min: 55, max: 75, label: 'Cukup, perlu dirawat', color: '#ca8a04', badge: 'badge-warn', icon: 'info' },
    { id: 'baik', min: 75, max: 100.01, label: 'Baik', color: '#15803d', badge: 'badge-good', icon: 'badgeCheck' }
  ];
  function bandOf(s) { for (var i = 0; i < BANDS.length; i++) if (s >= BANDS[i].min && s < BANDS[i].max) return BANDS[i]; return BANDS[0]; }

  /* Aturan: id, nama, kondisi (teks untuk halaman Metodologi), tes, aksi, sumber. */
  var RULES = [
    { id: 'R01', name: 'Tanah padat', cond: 'Tekstur dipilih "Padat / keras"', srcs: ['juknis-pengamatan'],
      test: function (i) { return i.tekstur === 'padat'; },
      act: { type: 'tambah', title: 'Gemburkan dengan kompos matang', detail: 'Tebarkan kompos atau pupuk kandang yang sudah matang, lalu cangkul ringan. Ulangi tiap musim sampai tanah mudah hancur.' } },
    { id: 'R02', name: 'Bahan organik tampak rendah', cond: 'Nilai indikator bahan organik (warna + cacing) 12 atau kurang dari 25', srcs: ['mentan-bo-2022', 'juknis-kimia-3'],
      test: function (i, p) { return p.B <= 12; },
      act: { type: 'tambah', title: 'Kembalikan sisa tanaman ke lahan', detail: 'Benamkan atau komposkan jerami dan batang setelah panen daripada dibakar, supaya bahan organik tanah naik pelan-pelan.' } },
    { id: 'R03', name: 'Ketergantungan pupuk kimia', cond: 'Pupuk kimia "Sering" atau lebih, atau "Kadang-kadang" dengan pemakaian lebih dari 3 tahun', srcs: ['asumsi'],
      test: function (i) { var d = i.durasi === 'lama' || i.durasi === 'sangat'; return i.chem >= 75 || (i.chem >= 50 && d); },
      act: { type: 'kurangi', title: 'Kurangi pupuk kimia secara bertahap', detail: 'Turunkan sedikit tiap musim sambil menambah pupuk organik, dan amati hasil panen. Dosis pastinya ikuti anjuran penyuluh setempat.' } },
    { id: 'R04', name: 'Belum memakai pupuk organik', cond: 'Pupuk organik "Belum pernah" dan pupuk kimia sudah dipakai', srcs: ['permentan-01-2019'],
      test: function (i) { return i.organik === 'tidak' && i.chem >= 25; },
      act: { type: 'tambah', title: 'Mulai pupuk organik tiap musim tanam', detail: 'Pilih produk pupuk organik yang terdaftar resmi, atau kompos yang sudah matang (tidak berbau menyengat dan tidak panas).' } },
    { id: 'R05', name: 'Tanah berpasir', cond: 'Tekstur dipilih "Berpasir"', srcs: ['juknis-pengamatan'],
      test: function (i) { return i.tekstur === 'berpasir'; },
      act: { type: 'perbaiki', title: 'Tahan air dan hara dengan bahan organik', detail: 'Tambahkan kompos dan pasang mulsa. Beri pupuk sedikit-sedikit tetapi lebih sering, karena hara mudah hanyut.' } },
    { id: 'R06', name: 'Drainase kurang baik', cond: 'Air "Lambat / menggenang", atau tanah lengket dengan air tidak meresap baik', srcs: ['juknis-pengamatan'],
      test: function (i) { return i.air === 'lambat' || (i.tekstur === 'lengket' && i.air !== 'baik'); },
      act: { type: 'perbaiki', title: 'Perbaiki saluran air', detail: 'Buat parit atau bedengan agar air tidak menggenang. Jangan mengolah tanah saat terlalu basah karena justru memadatkan.' } },
    { id: 'R07', name: 'Air cepat hilang', cond: 'Air dipilih "Terlalu cepat"', srcs: ['juknis-pengamatan'],
      test: function (i) { return i.air === 'cepat'; },
      act: { type: 'perbaiki', title: 'Pasang mulsa penutup tanah', detail: 'Jerami atau daun kering di atas tanah mengurangi penguapan dan menjaga lembap.' } },
    { id: 'R08', name: 'Kehidupan tanah rendah', cond: 'Cacing "Tidak ada", atau "Sedikit" dengan pupuk kimia sering', srcs: ['asumsi'],
      test: function (i) { return i.cacing === 'tidak' || (i.cacing === 'sedikit' && i.chem >= 50); },
      act: { type: 'tambah', title: 'Beri makan kehidupan tanah', detail: 'Bahan organik dan berkurangnya bahan kimia keras membantu cacing dan mikroba tanah kembali.' } },
    { id: 'R09', name: 'Kondisi baik', cond: 'Skor total 75 atau lebih', srcs: ['asumsi'],
      test: function (i, p, s) { return s >= 75; },
      act: { type: 'pertahankan', title: 'Pertahankan pola sekarang', detail: 'Lanjutkan pemakaian bahan organik dan atur rotasi tanaman. Periksa lagi tiap musim tanam.' } },
    { id: 'R10', name: 'Cek angka pasti', cond: 'Selalu ditampilkan', srcs: ['juknis-kimia-3'],
      test: function () { return true; },
      act: { type: 'pantau', title: 'Cek angka pasti ke laboratorium', detail: 'Bawa contoh tanah ke Dinas Pertanian atau penyuluh (BPP) setempat untuk uji C-organik dan pH. Hasil di sini hanya pemeriksaan awal.' } }
  ];

  var WEIGHTS = [
    { key: 'A', name: 'Struktur dan kepadatan tanah', max: 30, how: 'Gembur 30, lengket 14, berpasir 14, padat 4.' },
    { key: 'B', name: 'Indikasi bahan organik', max: 25, how: 'Warna tanah (gelap 15, cokelat 10, kemerahan 6, pucat 3, tidak yakin 8) ditambah cacing (banyak 10, sedikit 5, tidak ada 0, tidak yakin 4).' },
    { key: 'C', name: 'Drainase', max: 15, how: 'Meresap baik 15, terlalu cepat 8, lambat 5, tidak yakin 9.' },
    { key: 'D', name: 'Pola pemupukan', max: 30, how: 'Mulai 25, kurangi 0,15 untuk tiap poin pemakaian pupuk kimia (0–100), kurangi lama pemakaian (0, 3, 6, atau 10, berlaku penuh mulai pemakaian "Kadang-kadang"), tambah pupuk organik (rutin 5, kadang 2). Dibatasi 0 sampai 30.' }
  ];

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function evaluate(raw) {
    var i = {
      crop: raw.crop || 'padi', tekstur: raw.tekstur || 'gembur', warna: raw.warna || 'ragu', cacing: raw.cacing || 'ragu',
      air: raw.air || 'ragu', chem: raw.chem == null ? 0 : +raw.chem, durasi: raw.durasi || 'sedang', organik: raw.organik || 'tidak'
    };
    var A = OPTS.tekstur[i.tekstur].pts;
    var B = OPTS.warna[i.warna].pts + OPTS.cacing[i.cacing].pts;
    var C = OPTS.air[i.air].pts;
    var D = clamp(25 - 0.15 * i.chem - OPTS.durasi[i.durasi].pen * Math.min(1, i.chem / 50) + OPTS.organik[i.organik].bonus, 0, 30);
    var parts = { A: A, B: B, C: C, D: D };
    var score = Math.round(A + B + C + D);
    var band = bandOf(score);

    var fired = RULES.filter(function (r) { return r.test(i, parts, score); });
    var order = { kurangi: 0, tambah: 1, perbaiki: 2, pertahankan: 3, pantau: 4 };
    var acts = fired.map(function (r) { return { rule: r.id, type: r.act.type, title: r.act.title, detail: r.act.detail }; })
      .sort(function (a, b) { return order[a.type] - order[b.type]; });

    var diag;
    if (i.tekstur === 'padat' && B <= 13) {
      diag = { title: 'Tanah padat, kurang bahan organik.', summary: i.chem >= 50 ? 'Kurangi pupuk kimia dan gunakan kompos.' : 'Tambahkan kompos dan gemburkan tanah bertahap.' };
    } else if (i.tekstur === 'berpasir') {
      diag = { title: 'Tanah berpasir, cepat kehilangan air dan hara.', summary: 'Tambahkan bahan organik dan pasang mulsa.' };
    } else if (i.air === 'lambat' || (i.tekstur === 'lengket' && i.air !== 'baik')) {
      diag = { title: 'Tanah liat dengan drainase kurang baik.', summary: 'Perbaiki saluran air dan tambahkan bahan organik.' };
    } else if (score >= 75) {
      diag = { title: 'Tanah dalam kondisi baik.', summary: 'Pertahankan pola sekarang dan periksa lagi tiap musim.' };
    } else if (D / 30 <= B / 25) {
      diag = { title: 'Pemupukan kimia terlalu dominan.', summary: 'Kurangi bertahap dan tambahkan bahan organik.' };
    } else {
      diag = { title: 'Bahan organik tampak rendah.', summary: 'Tambahkan kompos dan kembalikan sisa tanaman ke lahan.' };
    }
    return { input: i, parts: parts, score: score, band: band, diag: diag, rules: fired, acts: acts, cropTip: OPTS.crop[i.crop].tip };
  }

  /* ---------- tampilan ---------- */
  function esc(s) { return window.SWUI.esc(s); }
  function pt(r, s) { var th = Math.PI * (1 - s / 100); return [120 + r * Math.cos(th), 120 - r * Math.sin(th)]; }
  function arc(r, s0, s1) { var a = pt(r, s0), b = pt(r, s1); return 'M' + a[0].toFixed(2) + ' ' + a[1].toFixed(2) + ' A' + r + ' ' + r + ' 0 0 1 ' + b[0].toFixed(2) + ' ' + b[1].toFixed(2); }
  function gauge() {
    var segs = BANDS.map(function (b) {
      var s0 = b.min + (b.min === 0 ? 0 : 0.8), s1 = Math.min(b.max, 100) - (b.max > 100 ? 0 : 0.8);
      return '<path d="' + arc(92, s0, s1) + '" fill="none" stroke="' + b.color + '" stroke-width="18" stroke-linecap="butt"/>';
    }).join('');
    return '<svg class="gauge" viewBox="0 0 240 132" role="img" aria-label="Skor kesehatan tanah"><g>' + segs + '</g>' +
      '<text x="12" y="132" font-size="10" fill="#5b6678" font-family="JetBrains Mono, monospace">0</text>' +
      '<text x="228" y="132" font-size="10" fill="#5b6678" text-anchor="end" font-family="JetBrains Mono, monospace">100</text>' +
      '<g class="needle"><line x1="120" y1="120" x2="120" y2="42" stroke="#111" stroke-width="4" stroke-linecap="round"/></g>' +
      '<circle cx="120" cy="120" r="9" fill="#111"/></svg>';
  }

  var ICON = { kurangi: 'minus', tambah: 'plus', perbaiki: 'shovel', pertahankan: 'check', pantau: 'flask' };
  var TYPE_LABEL = { kurangi: 'Kurangi', tambah: 'Tambah', perbaiki: 'Perbaiki', pertahankan: 'Pertahankan', pantau: 'Pantau' };

  function render(el, res, opt) {
    opt = opt || {};
    var b = res.band, I = window.SWUI;
    var partsHtml = WEIGHTS.map(function (w) {
      var v = res.parts[w.key];
      return '<div class="part"><span>' + w.name + '</span><span class="num"><b>' + Math.round(v) + '</b> / ' + w.max + '</span><div class="bar"><i style="width:' + (v / w.max * 100).toFixed(0) + '%"></i></div></div>';
    }).join('');
    var acts = res.acts.map(function (a) {
      return '<li class="act act-' + a.type + '"><span class="ic"><i data-ic="' + ICON[a.type] + '"></i></span><div><b>' + esc(a.title) + '</b><span class="d">' + esc(a.detail) + '</span></div></li>';
    }).join('');
    var why = res.rules.filter(function (r) { return r.id !== 'R10'; }).map(function (r) {
      return '<div class="why-i"><b>' + r.id + '</b>' + esc(r.name) + '<div class="srcs">' + r.srcs.map(I.chip).join('') + '</div></div>';
    }).join('') || '<div class="why-i">Tidak ada aturan khusus yang terpicu selain pemeriksaan lanjutan.</div>';

    el.innerHTML =
      (opt.example ? '<div style="padding:10px 18px 0"><span class="badge badge-soft">Contoh isian, bukan data Anda</span></div>' : '') +
      '<div class="gauge-box">' + gauge() +
      '<div class="gauge-num"><span id="gScore">0</span><small>/100</small></div>' +
      '<div class="gauge-cap">Skor kesehatan tanah</div>' +
      '<span class="badge ' + b.badge + ' band-badge"><i data-ic="' + b.icon + '"></i>Status: ' + b.label + '</span></div>' +
      '<div class="diag"><h3>' + esc(res.diag.title) + '</h3><p>' + esc(res.diag.summary) + '</p></div>' +
      '<div class="res-body">' +
      (opt.photo ? '<div class="sec-t">Foto tanah Anda</div><img class="photo-th" src="' + opt.photo + '" alt="Foto tanah yang diunggah">' : '') +
      '<div class="sec-t">Langkah yang disarankan</div><ul class="acts">' + acts + '</ul>' +
      '<p class="help" style="margin-top:10px"><b>Tips ' + esc(OPTS.crop[res.input.crop].label.toLowerCase()) + ':</b> ' + esc(res.cropTip) + '</p>' +
      (opt.compact ? '' : '<div class="sec-t">Rincian skor</div><div class="parts">' + partsHtml + '</div>' +
        '<div class="sec-t">Mengapa hasilnya begini</div><div class="why">' + why + '</div>') +
      '<div class="disclaim" style="margin-top:18px"><i data-ic="alert"></i><span>Ini pemeriksaan awal, bukan pengganti uji laboratorium.</span></div>' +
      (opt.actions || '') + '</div>';
    if (window.SWIcons) window.SWIcons.paint(el);

    var needle = el.querySelector('.needle'), num = el.querySelector('#gScore');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var deg = -90 + 1.8 * res.score;
    if (reduce) { needle.style.transform = 'rotate(' + deg + 'deg)'; num.textContent = res.score; return; }
    requestAnimationFrame(function () { requestAnimationFrame(function () { needle.style.transform = 'rotate(' + deg + 'deg)'; }); });
    var t0 = null;
    (function step(t) { if (!t0) t0 = t; var p = Math.min((t - t0) / 1300, 1); num.textContent = Math.round(p * res.score); if (p < 1) requestAnimationFrame(step); })(performance.now());
  }

  function summaryText(res) {
    var i = res.input;
    return ['SoilWise — ringkasan pemeriksaan awal',
      'Tanaman: ' + OPTS.crop[i.crop].label + ' | Tanah: ' + OPTS.tekstur[i.tekstur].label,
      'Skor: ' + res.score + '/100 (' + res.band.label + ')',
      'Diagnosis: ' + res.diag.title + ' ' + res.diag.summary,
      'Langkah:'].concat(res.acts.map(function (a) { return '- ' + a.title; }))
      .concat(['Catatan: pemeriksaan awal, bukan pengganti uji laboratorium.']).join('\n');
  }

  return { OPTS: OPTS, RULES: RULES, WEIGHTS: WEIGHTS, BANDS: BANDS, evaluate: evaluate, render: render, summaryText: summaryText };
})();
