import Link from "next/link";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { BestSellersSection } from "../components/sections/BestSellersSection";
import { CustomDesignSection } from "../components/sections/CustomDesignSection";
import { InfoChipsSection } from "../components/sections/InfoChipsSection";
import { StartOrderSection } from "../components/sections/StartOrderSection";

export default function HomePage() {
  return (
    <main className="page-shell section-stack">
      <Header />
      <Hero />
      <BestSellersSection />
      <CustomDesignSection />
      <InfoChipsSection />
      <StartOrderSection />

      <Link
        href="https://wa.me/60123456789"
        className="btn btn-primary whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp Us
      </Link>

      <Link
        href="https://wa.me/60123456789"
        className="btn btn-primary mobile-whatsapp-bar"
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp Us
      </Link>
    </main>
  );
}
