import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import DashboardShowcase from "@/components/DashboardShowcase";
import CaraKerjaSection from "@/components/CaraKerjaSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

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
