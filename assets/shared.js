/* Navbar + footer dipakai semua halaman. Ganti nama merek cukup di BRAND. */
(function () {
  var BRAND = { name: "SoilWise", tag: "Dokter tanah digital" };
  var PAGES = [
    { key: "beranda", href: "index.html", label: "Beranda" },
    { key: "diagnosis", href: "diagnosis.html", label: "Diagnosis" },
    { key: "data", href: "data.html", label: "Data Resmi" },
    { key: "panduan", href: "panduan.html", label: "Panduan" },
    { key: "metodologi", href: "metodologi.html", label: "Metodologi" },
  ];
  var PORTALS = [
    { href: "https://www.pertanian.go.id", label: "Kementerian Pertanian" },
    {
      href: "https://tanahpupuk.brmp.pertanian.go.id",
      label: "BRMP Tanah dan Pupuk",
    },
    { href: "https://www.bps.go.id", label: "Badan Pusat Statistik" },
    {
      href: "https://jdih.pertanian.go.id",
      label: "JDIH Kementan (peraturan)",
    },
  ];
  var curEl = document.querySelector("[data-page]");
  var cur = curEl ? curEl.getAttribute("data-page") : "";

  function links(cls) {
    return PAGES.map(function (p) {
      return (
        "<a " +
        (cls ? 'class="' + cls + '" ' : "") +
        'href="' +
        p.href +
        '"' +
        (p.key === cur ? ' aria-current="page"' : "") +
        ">" +
        p.label +
        (cls ? '<i data-ic="chevRight"></i>' : "") +
        "</a>"
      );
    }).join("");
  }

  var THEME_SVGS =
    '<svg class="sw-ic-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="4"></circle>' +
    '<path d="M12 2v2"></path><path d="M12 20v2"></path>' +
    '<path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path>' +
    '<path d="M2 12h2"></path><path d="M20 12h2"></path>' +
    '<path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>' +
    "</svg>" +
    '<svg class="sw-ic-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>' +
    "</svg>";

  var header = document.getElementById("site-header");
  if (header) {
    header.outerHTML =
      '<header class="nav" id="site-header"><div class="wrap nav-in">' +
      '<a class="brand" href="index.html" aria-label="' +
      BRAND.name +
      ', ke beranda"><i data-ic="sprout"></i><span>' +
      BRAND.name +
      "</span></a>" +
      '<nav class="nav-links" aria-label="Menu utama">' +
      links("") +
      "</nav>" +
      '<div class="sw-utilities" id="swUtilities">' +
      '<div class="sw-lang-switch" role="group" aria-label="Pilih Bahasa">' +
      '<button type="button" class="sw-lang-btn is-active" data-lang="id">ID</button>' +
      '<button type="button" class="sw-lang-btn" data-lang="en">EN</button>' +
      "</div>" +
      '<button type="button" class="sw-theme-btn" id="swThemeBtn" aria-label="Ganti Tema" title="Ganti Tema">' +
      THEME_SVGS +
      "</button>" +
      "</div>" +
      '<div class="nav-cta"><a class="btn btn-dark" href="diagnosis.html">Mulai diagnosis</a></div>' +
      '<button class="nav-burger" id="burger" type="button" aria-expanded="false" aria-controls="mnav" aria-label="Buka menu"><i data-ic="menu"></i></button>' +
      '</div><div class="mnav" id="mnav" hidden><nav aria-label="Menu utama seluler">' +
      links("m-link") +
      "</nav>" +
      '<a class="btn btn-dark btn-lg" href="diagnosis.html">Mulai diagnosis</a></div></header>';
    var b = document.getElementById("burger"),
      m = document.getElementById("mnav");
    b.addEventListener("click", function () {
      var open = m.hidden;
      m.hidden = !open;
      b.setAttribute("aria-expanded", String(open));
      b.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
      b.innerHTML = '<i data-ic="' + (open ? "x" : "menu") + '"></i>';
      if (window.SWIcons) window.SWIcons.paint(b);
    });
  }

  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.outerHTML =
      '<footer class="footer"><div class="wrap">' +
      '<div class="footer-in">' +
      '<div class="stack" style="gap:10px"><a class="brand" href="index.html"><i data-ic="sprout"></i><span>' +
      BRAND.name +
      "</span></a>" +
      '<p class="muted" style="max-width:38ch">' +
      BRAND.tag +
      " untuk petani. Alat pemeriksaan awal kondisi tanah dengan acuan dari instansi resmi Indonesia.</p></div>" +
      "<div><h4>Halaman</h4><ul>" +
      PAGES.map(function (p) {
        return '<li><a href="' + p.href + '">' + p.label + "</a></li>";
      }).join("") +
      "</ul></div>" +
      "<div><h4>Situs resmi rujukan</h4><ul>" +
      PORTALS.map(function (p) {
        return (
          '<li><a href="' +
          p.href +
          '" target="_blank" rel="noopener noreferrer">' +
          p.label +
          ' <i data-ic="arrowUpRight" style="width:.9em;height:.9em;vertical-align:-1px"></i></a></li>'
        );
      }).join("") +
      "</ul></div>" +
      "</div>" +
      '<p class="footer-note">SoilWise adalah alat screening awal dan prototipe tugas UI/UX. Hasilnya bukan pengganti uji laboratorium atau saran penyuluh pertanian. Data diperiksa terakhir 14 Oktober 2026.</p>' +
      "</div></footer>";
  }
  if (window.SWIcons) window.SWIcons.paint();
})();

/* =========================================================
   FITUR MULTI-BAHASA (ID/EN) & TEMA (DARK/LIGHT)
   ========================================================= */
(function () {
  var EN_MAP = {
    // Navbar & Footer
    Beranda: "Home",
    Diagnosis: "Diagnosis",
    "Data Resmi": "Official Data",
    Panduan: "Field Guide",
    Metodologi: "Methodology",
    "Mulai diagnosis": "Start diagnosis",
    "Lihat data resmi": "View official data",
    Halaman: "Pages",
    "Situs resmi rujukan": "Official reference sites",
    "Dokter tanah digital untuk petani. Alat pemeriksaan awal kondisi tanah dengan acuan dari instansi resmi Indonesia.":
      "Digital soil doctor for farmers. An initial soil condition screening tool referencing official Indonesian agencies.",
    "SoilWise adalah alat screening awal dan prototipe tugas UI/UX. Hasilnya bukan pengganti uji laboratorium atau saran penyuluh pertanian. Data diperiksa terakhir 14 Oktober 2026.":
      "SoilWise is an initial screening tool and UI/UX project prototype. Results do not replace lab tests or agricultural extension advice. Data last verified October 14, 2026.",

    // Umum & Komponen
    "Tampilan HP": "Mobile view",
    "Panel hasil": "Result panel",
    "Tidak pernah": "Never",
    Jarang: "Rarely",
    "Kadang-kadang": "Sometimes",
    Sering: "Often",
    "Setiap musim": "Every season",
    "Setiap musim, dosis tinggi": "Every season, high dose",
    Lanjut: "Next",
    Kembali: "Back",
    Ubah: "Edit",

    // Opsi Engine (engine.js)
    "Padi sawah": "Paddy rice",
    Jagung: "Corn",
    Cabai: "Chili",
    Tomat: "Tomato",
    "Sayuran daun": "Leafy vegetables",
    "Kedelai / kacang tanah": "Soybean / peanut",
    Gembur: "Friable (Crumbly)",
    "Mudah hancur seperti remah, empuk saat dicangkul.":
      "Breaks easily into crumbs, soft when hoed.",
    "Padat / keras": "Compact / hard",
    "Keras saat kering, sulit dicangkul, mudah retak.":
      "Hard when dry, difficult to hoe, cracks easily.",
    "Lengket (liat)": "Sticky (clayey)",
    "Lengket dan licin saat basah, keras saat kering.":
      "Sticky and slippery when wet, hard when dry.",
    Berpasir: "Sandy",
    "Kasar, butirnya terasa di jari, cepat kering.":
      "Coarse, gritty between fingers, dries quickly.",
    "Gelap kehitaman": "Dark blackish",
    Cokelat: "Brown",
    Kemerahan: "Reddish",
    "Pucat / keabu-abuan": "Pale / grayish",
    "Tidak yakin": "Not sure",
    Banyak: "Many",
    "Mudah ditemukan saat menggali.": "Easy to find when digging.",
    Sedikit: "Few",
    "Jarang ditemukan.": "Rarely found.",
    "Tidak ada": "None",
    "Tidak ditemukan sama sekali.": "Not found at all.",
    "Belum pernah memeriksa.": "Never checked before.",
    "Meresap baik": "Absorbs well",
    "Air hilang dalam beberapa menit.": "Water drains within minutes.",
    "Lambat / menggenang": "Slow / pooling",
    "Air lama tergenang di permukaan.":
      "Water pools on the surface for a long time.",
    "Terlalu cepat": "Too fast",
    "Air langsung hilang, tanah cepat kering.":
      "Water disappears immediately, soil dries fast.",
    "Belum pernah memperhatikan.": "Never noticed before.",
    "Kurang dari 1 tahun": "Less than 1 year",
    "1 sampai 3 tahun": "1 to 3 years",
    "3 sampai 10 tahun": "3 to 10 years",
    "Lebih dari 10 tahun": "More than 10 years",
    "Rutin tiap musim": "Routine every season",
    "Belum pernah": "Never",

    // Hasil Engine (engine.js)
    "Contoh isian, bukan data Anda": "Sample input, not your data",
    "Skor kesehatan tanah": "Soil health score",
    "Status: Kritis": "Status: Critical",
    "Status: Perlu perbaikan": "Status: Needs improvement",
    "Status: Cukup, perlu dirawat": "Status: Fair, needs care",
    "Status: Baik": "Status: Good",
    Kritis: "Critical",
    "Perlu perbaikan": "Needs improvement",
    "Cukup, perlu dirawat": "Fair, needs care",
    Baik: "Good",
    "Tanah padat, kurang bahan organik.":
      "Compacted soil, lacking organic matter.",
    "Kurangi pupuk kimia dan gunakan kompos.":
      "Reduce chemical fertilizers and apply compost.",
    "Tambahkan kompos dan gemburkan tanah bertahap.":
      "Add compost and loosen the soil gradually.",
    "Tanah berpasir, cepat kehilangan air dan hara.":
      "Sandy soil, loses water and nutrients quickly.",
    "Tambahkan bahan organik dan pasang mulsa.":
      "Add organic matter and apply mulch.",
    "Tanah liat dengan drainase kurang baik.": "Clay soil with poor drainage.",
    "Perbaiki saluran air dan tambahkan bahan organik.":
      "Improve water channels and add organic matter.",
    "Tanah dalam kondisi baik.": "Soil is in good condition.",
    "Pertahankan pola sekarang dan periksa lagi tiap musim.":
      "Maintain current practices and check again every season.",
    "Pemupukan kimia terlalu dominan.":
      "Chemical fertilization is too dominant.",
    "Kurangi bertahap dan tambahkan bahan organik.":
      "Reduce gradually and add organic matter.",
    "Bahan organik tampak rendah.": "Organic matter appears low.",
    "Tambahkan kompos dan kembalikan sisa tanaman ke lahan.":
      "Add compost and return crop residues to the field.",
    "Foto tanah Anda": "Your soil photo",
    "Langkah yang disarankan": "Recommended steps",
    "Rincian skor": "Score breakdown",
    "Mengapa hasilnya begini": "Why you got this result",
    "Ini pemeriksaan awal, bukan pengganti uji laboratorium.":
      "This is an initial screening, not a substitute for laboratory testing.",
    "Gemburkan dengan kompos matang": "Loosen with mature compost",
    "Tebarkan kompos atau pupuk kandang yang sudah matang, lalu cangkul ringan. Ulangi tiap musim sampai tanah mudah hancur.":
      "Spread mature compost or manure, then hoe lightly. Repeat each season until the soil crumbles easily.",
    "Kembalikan sisa tanaman ke lahan": "Return crop residues to the field",
    "Benamkan atau komposkan jerami dan batang setelah panen daripada dibakar, supaya bahan organik tanah naik pelan-pelan.":
      "Bury or compost straw and stalks after harvest instead of burning, so soil organic matter increases gradually.",
    "Kurangi pupuk kimia secara bertahap":
      "Reduce chemical fertilizer gradually",
    "Turunkan sedikit tiap musim sambil menambah pupuk organik, dan amati hasil panen. Dosis pastinya ikuti anjuran penyuluh setempat.":
      "Lower slightly each season while adding organic fertilizer, and monitor yields. Follow local extension advice for exact doses.",
    "Mulai pupuk organik tiap musim tanam":
      "Start organic fertilizer every planting season",
    "Pilih produk pupuk organik yang terdaftar resmi, atau kompos yang sudah matang (tidak berbau menyengat dan tidak panas).":
      "Choose officially registered organic fertilizers, or mature compost (no pungent smell and not warm).",
    "Tahan air dan hara dengan bahan organik":
      "Retain water and nutrients with organic matter",
    "Tambahkan kompos dan pasang mulsa. Beri pupuk sedikit-sedikit tetapi lebih sering, karena hara mudah hanyut.":
      "Add compost and apply mulch. Fertilize in smaller amounts more frequently, as nutrients leach easily.",
    "Perbaiki saluran air": "Improve drainage channels",
    "Buat parit atau bedengan agar air tidak menggenang. Jangan mengolah tanah saat terlalu basah karena justru memadatkan.":
      "Make ditches or raised beds so water does not pool. Avoid tilling when too wet as it compacts the soil.",
    "Pasang mulsa penutup tanah": "Apply ground-cover mulch",
    "Jerami atau daun kering di atas tanah mengurangi penguapan dan menjaga lembap.":
      "Dry straw or leaves on top of the soil reduce evaporation and retain moisture.",
    "Beri makan kehidupan tanah": "Feed soil life",
    "Bahan organik dan berkurangnya bahan kimia keras membantu cacing dan mikroba tanah kembali.":
      "Organic matter and fewer harsh chemicals help earthworms and soil microbes return.",
    "Pertahankan pola sekarang": "Maintain current practices",
    "Lanjutkan pemakaian bahan organik dan atur rotasi tanaman. Periksa lagi tiap musim tanam.":
      "Continue using organic matter and practice crop rotation. Check again each planting season.",
    "Cek angka pasti ke laboratorium": "Verify exact figures at a laboratory",
    "Bawa contoh tanah ke Dinas Pertanian atau penyuluh (BPP) setempat untuk uji C-organik dan pH. Hasil di sini hanya pemeriksaan awal.":
      "Bring a soil sample to your local Agriculture Office or extension center (BPP) for organic-C and pH testing. This result is only an initial screening.",

    // index.html
    "Sistem pakar tanah · pemeriksaan awal":
      "Soil expert system · initial screening",
    "Dokter tanah digital untuk lahan Anda, langsung dari HP.":
      "Digital soil doctor for your farmland, right from your phone.",
    "Jawab beberapa pertanyaan tentang tanah dan pupuk. SoilWise menimbang seperti ahli pertanian lalu memberi diagnosis dan langkah perbaikan. Tanpa tunggu hasil lab, tanpa biaya.":
      "Answer a few questions about your soil and fertilizer. SoilWise evaluates them like an agricultural expert to give a diagnosis and action steps. No lab wait, free of charge.",
    Alur: "Flow",
    "Ciri tanah": "Soil traits",
    "Riwayat pupuk": "Fertilizer history",
    "Foto tanah": "Soil photo",
    Hasil: "Result",
    "Di bawah ini versi singkat. Diagnosis lengkap ada di halaman Diagnosis.":
      "Below is the quick version. Full diagnosis is on the Diagnosis page.",
    "Cek cepat": "Quick check",
    "Seperti apa tanah Anda?": "What is your soil like?",
    "Ciri fisik tanah": "Physical soil traits",
    "Pemakaian pupuk kimia": "Chemical fertilizer usage",
    "Geser sesuai kebiasaan Anda.": "Slide according to your habit.",
    "Analisis contoh ini": "Analyze this sample",
    "Buka diagnosis lengkap": "Open full diagnosis",
    "Kenapa bisa dipercaya": "Why you can trust it",
    "Angka dari instansi resmi, mudah dipakai di lahan.":
      "Figures from official agencies, easy to use in the field.",
    "Berbasis acuan resmi": "Based on official references",
    "Setiap angka punya tautan ke situs instansinya":
      "Every figure has a link to its agency's website",
    "Aturan SoilWise mengacu pada Kementerian Pertanian, balai penelitian tanah, dan BPS. Anda bisa klik langsung untuk memeriksanya sendiri.":
      "SoilWise rules refer to the Ministry of Agriculture, soil research institutes, and BPS. You can click directly to check them yourself.",
    "Buka halaman Data Resmi": "Open Official Data page",
    "Dirancang untuk petani": "Designed for farmers",
    "Tombol besar, bahasa sederhana, satu langkah per layar":
      "Large buttons, simple language, one step per screen",
    "Pilihan bergambar dan istilah sehari-hari. Cukup jempol, tidak perlu mengetik panjang.":
      "Visual options and everyday terms. Just use your thumb, no long typing needed.",
    "Coba diagnosis lengkap": "Try full diagnosis",
    "Cara kerja": "How it works",
    "Tiga langkah, sekitar dua menit": "Three steps, about two minutes",
    "Isi ciri tanah dan riwayat pupuk":
      "Fill in soil traits and fertilizer history",
    "Tanaman, tekstur, warna, cacing, drainase, dan seberapa sering memakai pupuk kimia. Foto tanah boleh ditambahkan.":
      "Crop, texture, color, earthworms, drainage, and how often you use chemical fertilizers. A soil photo can be added.",
    "Sistem pakar menimbang": "Expert system evaluates",
    "Jawaban Anda dicocokkan dengan aturan jika-maka, lalu dihitung menjadi skor 0 sampai 100.":
      "Your answers are matched with if-then rules, then calculated into a score from 0 to 100.",
    "Terima diagnosis dan langkah": "Receive diagnosis and steps",
    "Anda mendapat penjelasan singkat, apa yang dikurangi atau ditambah, dan dasar sumbernya.":
      "You receive a brief explanation, what to reduce or add, and the underlying sources.",
    "Gambaran nasional": "National overview",
    "Mengapa kesehatan tanah penting": "Why soil health matters",
    "Lihat grafik dan tabel lengkap": "View full charts and tables",
    "Gratis dan cepat": "Free and fast",
    "Periksa tanah Anda sebelum musim tanam berikutnya.":
      "Check your soil before the next planting season.",
    "Hasilnya pemeriksaan awal. Untuk angka pasti, bawa contoh tanah ke penyuluh atau Dinas Pertanian setempat.":
      "The result is an initial screening. For exact numbers, bring a soil sample to your local agricultural extension worker.",

    // diagnosis.html
    "Diagnosis · 3 langkah": "Diagnosis · 3 steps",
    "Periksa kondisi tanah Anda": "Check your soil condition",
    'Jawab sesuai yang Anda lihat di lahan. Kalau belum yakin, pilih "Tidak yakin". Tidak ada jawaban yang salah.':
      'Answer based on what you see in the field. If unsure, select "Not sure". There are no wrong answers.',
    Langkah: "Steps",
    "Foto dan periksa": "Photo and review",
    "Langkah 1 dari 3": "Step 1 of 3",
    "Langkah 2 dari 3": "Step 2 of 3",
    "Langkah 3 dari 3": "Step 3 of 3",
    "Jenis tanaman": "Crop type",
    "Pilih tanaman…": "Select crop…",
    "Pilih jenis tanaman dulu.": "Please select a crop type first.",
    "Tanah terasa seperti apa saat dicangkul?":
      "How does the soil feel when hoed?",
    "Pilih salah satu ciri tanah.": "Please select one soil trait.",
    "Warna tanah": "Soil color",
    "Lihat tanah lapisan atas yang lembap.": "Look at the moist topsoil.",
    "Cacing tanah": "Earthworms",
    "Gali sedalam satu cangkul.": "Dig one hoe deep.",
    "Air saat disiram atau hujan": "Water when irrigated or raining",
    "Perhatikan apakah air cepat meresap.": "Notice if water absorbs quickly.",
    "Seberapa sering memakai pupuk kimia?":
      "How often do you use chemical fertilizer?",
    "Pupuk kimia misalnya urea, NPK, TSP, atau KCl.":
      "Chemical fertilizers such as urea, NPK, TSP, or KCl.",
    "Sudah berapa lama memakai pupuk kimia?":
      "How long have you used chemical fertilizers?",
    "Pupuk organik atau kompos": "Organic fertilizer or compost",
    "Boleh dilewati": "Optional",
    "Ketuk untuk memotret atau pilih foto": "Tap to take or choose a photo",
    "JPG atau PNG, maksimal 10 MB": "JPG or PNG, max 10 MB",
    "Foto belum dianalisis otomatis dan tidak mengubah skor. Foto hanya ditampilkan di hasil agar bisa Anda bawa ke penyuluh.":
      "Photos are not analyzed automatically yet and do not affect the score. It is only shown in the result to show your extension worker.",
    "Hapus foto": "Remove photo",
    "Periksa jawaban Anda": "Review your answers",
    "Analisis tanah": "Analyze soil",
    "Menimbang aturan…": "Evaluating rules…",
    "Menunggu jawaban Anda": "Waiting for your answers",
    'Isi tiga langkah di samping, lalu tekan "Analisis tanah". Hasilnya muncul di sini.':
      'Complete the three steps on the side, then press "Analyze soil". The result appears here.',
    "Salin ringkasan": "Copy summary",
    "Periksa ulang": "Check again",
    "Lihat data resmi di balik aturan": "View official data behind the rules",

    // data.html & data.js
    "Data resmi · diperiksa 14 Oktober 2026":
      "Official data · verified October 14, 2026",
    "Dasar data di balik diagnosis": "The data behind the diagnosis",
    "Setiap angka di sini punya tombol ke situs instansinya. Kami juga menandai mana yang sudah dicocokkan langsung dengan sumbernya dan mana yang masih perlu Anda cek sendiri.":
      "Every number here has a button to its agency's website. We also mark which ones are directly verified and which ones you should check yourself.",
    Semua: "All",
    "Produksi pangan": "Food production",
    "Kualitas tanah": "Soil quality",
    "Regulasi pupuk": "Fertilizer regulations",
    "Sudah dicek": "Verified",
    "Kutipan media": "Media quote",
    "Cocokkan dulu": "Check first",
    Grafik: "Charts",
    "Produksi padi dan kelas bahan organik tanah":
      "Rice production and soil organic matter classes",
    "Padi Indonesia, 2023 dan 2024": "Indonesian Rice, 2023 and 2024",
    "Tiap kotak punya skala sendiri dan mulai dari nol. Sumber: BPS, rilis 3 Februari 2025.":
      "Each box has its own scale starting at zero. Source: BPS, released February 3, 2025.",
    "Di mana posisi tanah sawah kita?": "Where does our paddy soil stand?",
    "Skala kelas C-organik (%). Garis siku menunjukkan pernyataan Menteri Pertanian bahwa bahan organik sawah di bawah 2 persen.":
      "Organic-C class scale (%). The bracket shows the Minister of Agriculture's statement that paddy soil organic matter is below 2 percent.",
    "Tabel kriteria": "Criteria tables",
    "Kelas C-organik dan pH tanah": "Soil organic-C and pH classes",
    "Daftar sumber": "Source list",
    "Klik untuk membuka situs instansinya":
      "Click to open the agency's website",
    Instansi: "Agency",
    Dokumen: "Document",
    Terbit: "Published",
    Status: "Status",
    Tautan: "Link",
    "Buka situs": "Open site",
    "Lihat bobot": "View weights",
    "Portal resmi": "Official portals",
    "Mau cari data sendiri?": "Want to explore data yourself?",

    // panduan.html
    "Panduan lapangan": "Field guide",
    "Cara membaca tanah sebelum mengisi diagnosis":
      "How to read your soil before filling in the diagnosis",
    "Empat pemeriksaan sederhana yang bisa Anda lakukan di lahan dengan cangkul dan segelas air. Hasilnya dipakai untuk menjawab pertanyaan di halaman Diagnosis.":
      "Four simple checks you can do in the field with a hoe and a glass of water. Use the results to answer the Diagnosis page.",
    "Langsung ke diagnosis": "Go straight to diagnosis",
    "Empat pemeriksaan": "Four checks",
    "Remas segenggam tanah": "Squeeze a handful of soil",
    "Hitung cacing": "Count earthworms",
    "Uji resap air": "Water absorption test",
    "Pupuk organik": "Organic fertilizer",
    "Pilih kompos yang sudah matang": "Choose mature compost",
    "Lihat peraturannya": "View regulations",
    "Ciri kompos matang": "Signs of mature compost",
    "Pertanyaan yang sering muncul": "Frequently asked questions",
    "Sudah memeriksa tanahnya?": "Finished checking your soil?",
    "Isi hasil pengamatan Anda di halaman Diagnosis untuk mendapat skor dan langkah perbaikan.":
      "Enter your observations on the Diagnosis page to get a score and improvement steps.",

    // metodologi.html
    "Bagaimana skor dan diagnosis dihitung":
      "How the score and diagnosis are calculated",
    'SoilWise memakai aturan "jika-maka" yang bisa dibaca semua orang, bukan kotak hitam. Halaman ini menunjukkan seluruh aturan, bobot nilai, sumbernya, dan bagian yang masih perlu divalidasi.':
      'SoilWise uses human-readable "if-then" rules, not a black box. This page shows all rules, score weights, sources, and parts needing validation.',
    "Skor 0 sampai 100": "Score 0 to 100",
    "Empat komponen yang dijumlahkan": "Four summed components",
    Komponen: "Component",
    "Maks.": "Max.",
    "Cara memberi nilai": "Scoring method",
    Skor: "Score",
    "Basis aturan": "Rule base",
    "Sepuluh aturan sistem pakar": "Ten expert system rules",
    Kode: "Code",
    Aturan: "Rule",
    "Dipicu bila": "Triggered when",
    Sumber: "Source",
    Keterbatasan: "Limitations",
    "Yang belum dilakukan, dengan jujur":
      "What has not been done yet, honestly",
    "Belum divalidasi pakar": "Not yet validated by experts",
    "Belum dibandingkan dengan uji laboratorium":
      "Not yet compared with laboratory tests",
    "Foto belum dianalisis": "Photos are not yet analyzed",
    "Data adalah potret 14 Oktober 2026":
      "Data is a snapshot as of October 14, 2026",
    "Untuk laporan UI/UX": "For UI/UX report",
    "Keputusan desain dan alasannya": "Design decisions and rationale",
    "Satu langkah per layar": "One step per screen",
    "Tombol besar dan pilihan bergambar": "Large buttons and visual choices",
    'Opsi "Tidak yakin"': '"Not sure" option',
    "Status tidak hanya warna": "Status is not color alone",
    "Sumber terlihat di tiap hasil": "Sources visible in every result",
    "Rincian disembunyikan di bawah": "Details tucked below",
  };

  var isApplying = false;

  function translatePage(lang) {
    isApplying = true;
    localStorage.setItem("sw_lang", lang);
    document.documentElement.setAttribute("lang", lang);

    var walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    var node;
    while ((node = walker.nextNode())) {
      var parent = node.parentNode;
      if (!parent || parent.tagName === "SCRIPT" || parent.tagName === "STYLE")
        continue;

      if (
        typeof node._origID === "undefined" ||
        (lang === "id" && node.nodeValue !== node._lastTranslated)
      ) {
        node._origID = node.nodeValue;
      }

      var raw = node._origID;
      var trimmed = raw.trim();
      if (!trimmed) continue;

      if (lang === "en") {
        if (EN_MAP[trimmed]) {
          var nextVal = raw.replace(trimmed, EN_MAP[trimmed]);
          node.nodeValue = nextVal;
          node._lastTranslated = nextVal;
        }
      } else {
        node.nodeValue = raw;
      }
    }

    var qInput = document.getElementById("q");
    if (qInput) {
      qInput.placeholder =
        lang === "en"
          ? "Search agency or document"
          : "Cari instansi atau dokumen";
    }

    var btns = document.querySelectorAll(".sw-lang-btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle(
        "is-active",
        btns[i].getAttribute("data-lang") === lang
      );
    }
    isApplying = false;
  }

  function applyTheme(theme) {
    localStorage.setItem("sw_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    var btn = document.getElementById("swThemeBtn");
    if (btn) {
      btn.title =
        theme === "dark"
          ? "Mode Terang / Light Mode"
          : "Mode Gelap / Dark Mode";
    }
  }

  function bindNavbarEvents() {
    var langBtns = document.querySelectorAll(".sw-lang-btn");
    for (var i = 0; i < langBtns.length; i++) {
      langBtns[i].addEventListener("click", function () {
        translatePage(this.getAttribute("data-lang"));
      });
    }
    var themeBtn = document.getElementById("swThemeBtn");
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        var cur =
          document.documentElement.getAttribute("data-theme") || "light";
        applyTheme(cur === "dark" ? "light" : "dark");
      });
    }
  }

  function initEnhancements() {
    bindNavbarEvents();
    var savedTheme = localStorage.getItem("sw_theme") || "light";
    var savedLang = localStorage.getItem("sw_lang") || "id";
    applyTheme(savedTheme);
    translatePage(savedLang);

    var observer = new MutationObserver(function () {
      if (isApplying) return;
      var currentLang = localStorage.getItem("sw_lang") || "id";
      if (currentLang === "en") {
        translatePage("en");
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initEnhancements);
  } else {
    initEnhancements();
  }
})();
