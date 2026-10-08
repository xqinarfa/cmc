import { LEGAL_REGISTRY } from "@/lib/tentangData";

export default function DasarHukumSection() {
  return (
    <section id="dasar-hukum" className="py-20 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-[80px]">
      <div className="max-w-2xl mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0a2244]">
          REGISTRI HUKUM &amp; KEPATUHAN
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#081730] tracking-tight mt-1.5">
          Landasan Yuridis Penyelenggaraan CMC
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Seluruh aktivitas bimbingan memiliki legal standing sah dan diakui dalam pangkalan data aparatur sipil negara nasional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LEGAL_REGISTRY.map((reg, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-300 p-6 flex flex-col justify-between gap-4 shadow-xs"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-xs font-mono font-bold text-[#0a2244]">
                  {reg.number}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {reg.category}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-500">
                {reg.article}
              </span>
              <h4 className="text-base font-bold text-[#081730] leading-snug">
                {reg.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {reg.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Kepatuhan: Penuh (100%)</span>
              <span className="text-[#0a2244] font-bold">Terverifikasi BKN ✓</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
