import { ASSETS } from "@/lib/assets";

export default function CaraKerjaSection() {
  const steps = [
    {
      number: "01",
      title: "Pilih Aktivitas",
      description: "Coaching atau Mentoring sesuai tujuan pengembangan Anda.",
      icon: ASSETS.step01,
    },
    {
      number: "02",
      title: "Temukan Pendamping",
      description:
        "Pilih Coach atau Mentor yang sesuai melalui rekomendasi atau pencarian.",
      icon: ASSETS.step02,
    },
    {
      number: "03",
      title: "Jalankan Sesi",
      description:
        "Laksanakan pertemuan, catat hasil, dan rencanakan tindak lanjut.",
      icon: ASSETS.step03,
    },
    {
      number: "04",
      title: "Pantau Perkembangan",
      description:
        "Lihat progres JP, hasil sesi, dan dapatkan sertifikat setelah verifikasi.",
      icon: ASSETS.step04,
    },
  ];

  return (
    <section id="cara-kerja" className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-[80px]">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight">
            Cara Kerja CMC
          </h2>
          <p className="text-base text-[#475569] mt-3">
            Mulai perjalanan pengembangan Anda dalam beberapa langkah mudah.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon Container with Badge */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#eff6ff] shadow-sm flex items-center justify-center transition-transform group-hover:scale-110">
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="w-8 h-8"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#dbeafe] border-2 border-white flex items-center justify-center">
                  <span className="text-[11px] font-black text-[#1d4ed8]">
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-[#0f172a] mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-[#64748b] leading-relaxed max-w-[210px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
