import { WORKFLOW_STEPS } from "@/lib/tentangData";

export default function AlurPesertaSection() {
  return (
    <section id="alur-peserta" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-[80px]">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0a2244]">
            STANDAR OPERASIONAL PROSEDUR
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#081730] tracking-tight mt-1.5">
            Protokol Lima Tahap Penyelenggaraan Sesi
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Alur akuntabel mulai dari autentikasi identitas kepegawaian hingga penambahan angka kredit JP ke SIASN.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {WORKFLOW_STEPS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-300 p-5 flex flex-col justify-between gap-3 shadow-xs"
            >
              <div className="flex flex-col gap-2">
                <span className="text-2xl font-black text-[#0a2244] font-mono">
                  {item.step}
                </span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {item.role}
                </span>
                <h4 className="text-sm font-bold text-[#081730] leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
