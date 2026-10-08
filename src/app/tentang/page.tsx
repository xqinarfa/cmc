import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  TentangHero,
  VisiMisiSection,
  TigaPilarSection,
  DasarHukumSection,
  AlurPesertaSection,
  FaqSection,
} from "@/components/tentang";

export default function TentangPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfe] text-slate-900 selection:bg-[#0a2244] selection:text-white">
      <Navbar />

      <main className="flex-1 w-full">
        <TentangHero />
        <VisiMisiSection />
        <TigaPilarSection />
        <DasarHukumSection />
        <AlurPesertaSection />
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
