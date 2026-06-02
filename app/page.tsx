import ScrollScene from "./components/ScrollScene";
import HeroSection from "./components/HeroSection";
import ManifestoSection from "./components/ManifestoSection";
import CtaSection from "./components/CtaSection";

export default function Home() {
  return (
    <main className="relative w-full">
      <ScrollScene>
        <HeroSection />
        <ManifestoSection />
        <CtaSection />
      </ScrollScene>
    </main>
  );
}
