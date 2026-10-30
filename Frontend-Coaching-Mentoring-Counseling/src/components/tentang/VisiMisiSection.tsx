export default function VisiMisiSection() {
  return (
    <section id="visi-misi" className="py-20 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-[80px]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Vision & Mission Statement */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0a2244]">
              ARAH STRATEGIS BPSDMP
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#081730] tracking-tight mt-1.5">
              Visi &amp; Misi Kemenhub Corporate University
            </h2>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0a2244]">
              Visi Institusional 2045
            </span>
            <p className="text-base sm:text-lg font-bold text-[#081730] leading-snug">
              &ldquo;Mewujudkan Sumber Daya Manusia Transportasi yang Unggul, Berkarakter, Adaptif, dan Berkelas Dunia untuk Menopang Konektivitas &amp; Logistik Nasional.&rdquo;
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <div className="flex items-start gap-3">
              <span className="size-6 rounded bg-[#0a2244] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong className="text-slate-900 block font-bold">Standardisasi Kompetensi 20 JP:</strong>
                Menjadikan pembelajaran dan refleksi kinerja bagian tak terpisahkan dari tugas kedinasan sehari-hari.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="size-6 rounded bg-[#0a2244] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong className="text-slate-900 block font-bold">Preservasi Tacit Knowledge Transportasi:</strong>
                Mentransfer keahlian teknis bernilai tinggi lintas generasi aparatur darat, laut, udara, dan perkeretaapian.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="size-6 rounded bg-[#0a2244] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong className="text-slate-900 block font-bold">Pemeliharaan Resiliensi &amp; Kesejahteraan Mental:</strong>
                Menyediakan ruang konseling profesional terproteksi guna mendukung ketahanan mental aparatur berbeban kerja tinggi.
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Alignment in Operational Context */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 flex flex-col gap-5 shadow-xs">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              NILAI DASAR APARATUR SIPIL NEGARA
            </span>
            <h3 className="text-lg font-bold text-[#081730]">
              Operasionalisasi Budaya BerAKHLAK di Lapangan
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60">
              <span className="font-bold text-[#0a2244] block mb-0.5">Berorientasi Pelayanan</span>
              Standar pelayanan prima pada simpul terminal, stasiun, pelabuhan, dan bandara udara nusantara.
            </div>
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60">
              <span className="font-bold text-[#0a2244] block mb-0.5">Akuntabel</span>
              Integritas pengujian kelayakan sarana transportasi dan transparansi sertifikasi tanpa gratifikasi.
            </div>
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60">
              <span className="font-bold text-[#0a2244] block mb-0.5">Kompeten</span>
              Peningkatan kualifikasi teknis berstandar konvensi internasional (IMO, ICAO, UIC).
            </div>
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60">
              <span className="font-bold text-[#0a2244] block mb-0.5">Harmonis</span>
              Solidaritas dan saling menghargai dinamika penugasan di wilayah tertinggal, terdepan, dan terluar (3T).
            </div>
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60">
              <span className="font-bold text-[#0a2244] block mb-0.5">Loyal &amp; Adaptif</span>
              Kesiapsiagaan mengawal angkutan hari raya keagamaan, tanggap darurat cuaca, dan digitalisasi sistem.
            </div>
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60">
              <span className="font-bold text-[#0a2244] block mb-0.5">Kolaboratif</span>
              Sinergi regulator bersama operator transportasi, BMKG, Basarnas, kepolisian, dan pemerintah daerah.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
