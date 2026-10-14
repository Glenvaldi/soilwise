/* Data rujukan SoilWise. Satu sumber kebenaran: halaman Data Resmi, Beranda, dan hasil diagnosis membaca dari sini.
 * Status verifikasi:
 *   verified = isi dokumen/halaman sudah dibuka dan angkanya dicocokkan (14 Okt 2026)
 *   media    = pernyataan instansi yang dikutip media; cari rilis aslinya sebelum dipakai di laporan
 *   check    = rujukan benar adanya, tetapi angka/isi detailnya belum dicocokkan, cek dulu ke dokumen aslinya
 */
window.SW_DATA = (function () {
  var STATUS = {
    verified: { label: 'Sudah dicek', badge: 'badge-good', icon: 'badgeCheck', desc: 'Isi sumber dibuka dan angkanya dicocokkan.' },
    media: { label: 'Kutipan media', badge: 'badge-warn', icon: 'info', desc: 'Pernyataan instansi yang dikutip media. Cari rilis aslinya untuk laporan.' },
    check: { label: 'Cocokkan dulu', badge: 'badge-warn', icon: 'alert', desc: 'Rujukan ada, tetapi detail angkanya belum dicocokkan dengan dokumen asli.' }
  };

  var CATS = [
    { key: 'all', label: 'Semua' },
    { key: 'pangan', label: 'Produksi pangan' },
    { key: 'tanah', label: 'Kualitas tanah' },
    { key: 'regulasi', label: 'Regulasi pupuk' },
    { key: 'lapangan', label: 'Panduan lapangan' }
  ];

  var SOURCES = {
    'bps-padi-2024': {
      agency: 'Badan Pusat Statistik (BPS)', short: 'BPS',
      title: 'Luas Panen dan Produksi Padi di Indonesia 2024 (rilis resmi)',
      year: '3 Feb 2025', cat: 'pangan', status: 'verified',
      url: 'https://www.bps.go.id/id/pressrelease/2025/02/03/2414/pada-2024-luas-panen-padi-mencapai-sekitar-10-05-juta-hektare-dengan-produksi-padi-sebanyak-53-14-juta-ton-gabah-kering-giling-gkg-.html',
      used: 'Grafik luas panen dan produksi padi 2023 dan 2024',
      note: 'Angka 2023 dan 2024 dibaca langsung dari halaman rilis BPS.'
    },
    'mentan-bo-2022': {
      agency: 'Kementerian Pertanian (dikutip Medcom.id)', short: 'Kementan via Medcom',
      title: 'Mentan: kandungan bahan organik sawah di Indonesia kurang dari 2 persen',
      year: '27 Jun 2022', cat: 'tanah', status: 'media',
      url: 'https://www.medcom.id/ekonomi/bisnis/GNlWZd9K-rehabilitasi-lahan-pertanian-mentan-dorong-penggunaan-pupuk-organik',
      used: 'Alasan utama tanah sawah perlu tambahan bahan organik',
      note: 'Pernyataan Menteri Pertanian lewat keterangan tertulis. Yang disebut "bahan organik", bukan "C-organik". Cari rilis aslinya di pertanian.go.id untuk laporan.'
    },
    'juknis-kimia-3': {
      agency: 'Balai Perakitan dan Pengujian Tanah dan Pupuk (BRMP Tanah dan Pupuk), Kementan', short: 'BRMP Tanah dan Pupuk',
      title: 'Juknis Analisis Kimia Edisi 3: Acuan Prosedur Analisis Tanah, Tanaman, Air dan Pupuk',
      year: '2023', cat: 'tanah', status: 'check',
      url: 'https://tanahpupuk.brmp.pertanian.go.id/berita/juknis-analisis-kimia-edisi-3-acuan-prosedur-analisis-tanah-tanaman-air-dan-pupuk',
      used: 'Kelas kriteria C-organik dan pH pada tabel kriteria',
      note: 'Halaman resmi menyebut buku ini memuat "kriteria penilaian hasil analisis". Kelas pada tabel di halaman ini mengikuti kriteria baku Balai Penelitian Tanah. Cocokkan dengan lampiran buku edisi 3 sebelum dipresentasikan.'
    },
    'juknis-pengamatan': {
      agency: 'Balai Penelitian Tanah, Kementan (repository.pertanian.go.id)', short: 'Balittanah',
      title: 'Juknis Pengamatan Tanah',
      year: 'tahun terbit tidak tercantum', cat: 'lapangan', status: 'verified',
      url: 'https://repository.pertanian.go.id/bitstream/handle/123456789/14957/juknis_pengamatan_tanah.pdf?sequence=1',
      used: 'Dasar pertanyaan tekstur, konsistensi (keras/gembur), warna, dan drainase',
      note: 'Isi diperiksa: struktur, konsistensi basah/lembap/kering, tekstur dengan perasaan jari, warna Munsell, dan 7 kelas drainase.'
    },
    'permentan-01-2019': {
      agency: 'Kementerian Pertanian', short: 'Kementan',
      title: 'Permentan No. 01 Tahun 2019 tentang Pendaftaran Pupuk Organik, Pupuk Hayati, dan Pembenah Tanah',
      year: '2019', cat: 'regulasi', status: 'verified',
      url: 'https://jdih.pertanian.go.id/sources/files/Permentan_01-2019_Organik.pdf',
      used: 'Dasar saran memilih pupuk organik yang terdaftar dan kompos yang matang',
      note: 'Isi diperiksa. Persyaratan teknis minimal ditetapkan dengan Keputusan Menteri (Pasal 9 ayat 3 dan 4). Rasio C/N 25 atau kurang muncul di Lampiran II sebagai indikator kematangan pada uji pengurai bahan organik.'
    },
    'kepmentan-261-2019': {
      agency: 'Kementerian Pertanian', short: 'Kementan',
      title: 'Keputusan Menteri Pertanian No. 261/KPTS/SR.310/M/4/2019 (persyaratan mutu pupuk organik)',
      year: '2019', cat: 'regulasi', status: 'check',
      url: 'https://jdih.pertanian.go.id',
      used: 'Rujukan angka syarat mutu pupuk organik (belum dipakai di aturan diagnosis)',
      note: 'Nomor ditemukan tertulis dua versi di sumber sekunder (SR.310 dan SR.130). Cari dokumennya di JDIH Kementan dan pastikan nomor serta angkanya sebelum dikutip.'
    },
    'atr-lbs-2025': {
      agency: 'Kementerian ATR/BPN (dikutip Investortrust)', short: 'ATR/BPN via Investortrust',
      title: 'ATR/BPN lindungi 7 juta hektare sawah demi dukung swasembada pangan',
      year: '7 Nov 2025', cat: 'pangan', status: 'media',
      url: 'https://investortrust.id/business/84781/atrbpn-lindungi-7-juta-hektare-sawah-demi-dukung-swasembada-pangan',
      used: 'Gambaran luas lahan baku sawah nasional',
      note: 'Artikel menulis total lahan baku sawah 7,3 juta ha, tetapi tidak menyebut sumber datanya. Angka lahan baku sawah juga berbeda antar publikasi, jadi sebut tahun dan sumbernya.'
    },
    'asumsi': {
      agency: 'Perancang SoilWise', short: 'Asumsi prototipe',
      title: 'Bobot nilai dan ambang batas skor pada sistem pakar', year: '2026', cat: 'lapangan', status: 'check',
      url: 'metodologi.html#bobot', used: 'Skor 0 sampai 100 dan batas status', internal: true,
      note: 'Ini rancangan prototipe, belum dikalibrasi dengan uji laboratorium dan belum divalidasi pakar.'
    }
  };

  var PORTALS = [
    { name: 'Kementerian Pertanian', host: 'pertanian.go.id', url: 'https://www.pertanian.go.id', desc: 'Berita, program, dan rilis resmi Kementan.' },
    { name: 'BRMP Tanah dan Pupuk', host: 'tanahpupuk.brmp.pertanian.go.id', url: 'https://tanahpupuk.brmp.pertanian.go.id', desc: 'Balai rujukan analisis tanah dan pupuk.' },
    { name: 'Badan Pusat Statistik', host: 'bps.go.id', url: 'https://www.bps.go.id', desc: 'Statistik produksi padi dan pertanian.' },
    { name: 'JDIH Kementan', host: 'jdih.pertanian.go.id', url: 'https://jdih.pertanian.go.id', desc: 'Peraturan Menteri Pertanian dan keputusan menteri.' },
    { name: 'Kementerian ATR/BPN', host: 'atrbpn.go.id', url: 'https://www.atrbpn.go.id', desc: 'Data pertanahan dan lahan baku sawah.' }
  ];

  var BPS = {
    title: 'Padi Indonesia, 2023 dan 2024',
    src: 'bps-padi-2024',
    items: [
      { key: 'panen', label: 'Luas panen padi', unit: 'juta ha', v2023: 10.21, v2024: 10.05 },
      { key: 'gkg', label: 'Produksi padi (GKG)', unit: 'juta ton', v2023: 53.98, v2024: 53.14 },
      { key: 'beras', label: 'Produksi beras konsumsi', unit: 'juta ton', v2023: 31.10, v2024: 30.62 }
    ]
  };

  var KPIS = [
    { cat: 'pangan', eyebrow: 'Luas panen padi 2024', value: '10,05', unit: 'juta ha', sub: 'Turun dari 10,21 juta ha pada 2023.', src: 'bps-padi-2024' },
    { cat: 'pangan', eyebrow: 'Produksi padi 2024', value: '53,14', unit: 'juta ton GKG', sub: 'Turun dari 53,98 juta ton pada 2023.', src: 'bps-padi-2024' },
    { cat: 'tanah', eyebrow: 'Bahan organik tanah sawah', value: '< 2', unit: '%', sub: 'Pernyataan Menteri Pertanian, Juni 2022.', src: 'mentan-bo-2022' },
    { cat: 'pangan', eyebrow: 'Lahan baku sawah', value: '7,3', unit: 'juta ha', sub: 'Dikutip media, 7 Nov 2025. Sumber data tidak disebut.', src: 'atr-lbs-2025' }
  ];

  var CORG = {
    title: 'Kelas C-organik tanah (%)', max: 7, src: 'juknis-kimia-3',
    classes: [
      { name: 'Sangat rendah', min: 0, max: 1, text: '< 1', color: '#dcefd9' },
      { name: 'Rendah', min: 1, max: 2, text: '1 – 2', color: '#b7e0b5' },
      { name: 'Sedang', min: 2, max: 3, text: '2 – 3', color: '#84c88a' },
      { name: 'Tinggi', min: 3, max: 5, text: '3 – 5', color: '#4fa760' },
      { name: 'Sangat tinggi', min: 5, max: 7, text: '> 5', color: '#237a3b', light: true }
    ],
    // Bahan organik < 2% dibagi faktor Van Bemmelen 1,724 menjadi C-organik sekitar 1,16%.
    omBracket: { om: 2, factor: 1.724 }
  };

  var PH = {
    title: 'Kelas pH tanah (H₂O)', src: 'juknis-kimia-3',
    classes: [
      { name: 'Sangat masam', text: '< 4,5' }, { name: 'Masam', text: '4,5 – 5,5' }, { name: 'Agak masam', text: '5,6 – 6,5' },
      { name: 'Netral', text: '6,6 – 7,5' }, { name: 'Agak alkalis', text: '7,6 – 8,5' }, { name: 'Alkalis', text: '> 8,5' }
    ]
  };

  return { STATUS: STATUS, CATS: CATS, SOURCES: SOURCES, PORTALS: PORTALS, BPS: BPS, KPIS: KPIS, CORG: CORG, PH: PH, asOf: '14 Oktober 2026' };
})();

/* Pembantu bersama: chip sumber dan tooltip. */
window.SWUI = (function () {
  var D = window.SW_DATA;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function chip(key) {
    var s = D.SOURCES[key]; if (!s) return '';
    var st = D.STATUS[s.status];
    var cls = s.status === 'verified' ? 'ok' : 'asm';
    var ext = s.internal ? '' : ' target="_blank" rel="noopener noreferrer"';
    return '<a class="src-chip ' + cls + '" href="' + esc(s.url) + '"' + ext + ' title="' + esc(st.label + ': ' + s.title) + '"><i data-ic="' + st.icon + '"></i>' + esc(s.short) + '</a>';
  }
  var tipEl;
  function tip(show, html, x, y) {
    if (!tipEl) { tipEl = document.createElement('div'); tipEl.className = 'tip'; tipEl.setAttribute('role', 'tooltip'); document.body.appendChild(tipEl); }
    if (!show) { tipEl.classList.remove('on'); return; }
    tipEl.innerHTML = html; tipEl.classList.add('on');
    var w = tipEl.offsetWidth, h = tipEl.offsetHeight;
    tipEl.style.left = Math.max(8, Math.min(window.innerWidth - w - 8, x - w / 2)) + 'px';
    tipEl.style.top = Math.max(8, y - h - 12) + 'px';
  }
  function bindTip(el, htmlFn) {
    function at(e) { var r = el.getBoundingClientRect(); tip(true, htmlFn(), e.clientX || r.left + r.width / 2, e.clientY || r.top); }
    el.addEventListener('mousemove', at); el.addEventListener('mouseleave', function () { tip(false); });
    el.addEventListener('focus', function () { var r = el.getBoundingClientRect(); tip(true, htmlFn(), r.left + r.width / 2, r.top); });
    el.addEventListener('blur', function () { tip(false); });
    el.addEventListener('click', at);
  }
  function fmt(n, d) { return n.toLocaleString('id-ID', { minimumFractionDigits: d == null ? 2 : d, maximumFractionDigits: d == null ? 2 : d }); }
  function kpiHtml(k) {
    return '<article class="kpi" data-cat="' + k.cat + '"><div class="eyebrow">' + esc(k.eyebrow) + '</div>' +
      '<div class="v">' + esc(k.value) + '<small>' + esc(k.unit) + '</small></div><p class="s">' + esc(k.sub) + '</p>' +
      '<div class="foot">' + chip(k.src) + '<span class="badge ' + D.STATUS[D.SOURCES[k.src].status].badge + '">' + D.STATUS[D.SOURCES[k.src].status].label + '</span></div></article>';
  }
  return { esc: esc, chip: chip, tip: tip, bindTip: bindTip, fmt: fmt, kpiHtml: kpiHtml };
})();
