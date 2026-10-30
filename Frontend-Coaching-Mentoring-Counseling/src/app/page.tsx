import { Navbar, Footer } from "@/components/common";
import {
  HeroSection,
  ServicesSection,
  DashboardShowcase,
  CaraKerjaSection,
  CtaBanner,
} from "@/components/landing";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <DashboardShowcase />
        <CaraKerjaSection />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
