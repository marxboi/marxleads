import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { Features } from "@/components/Features";
import { Directory } from "@/components/Directory";
import { HowItWorks } from "@/components/HowItWorks";
import { ProductSection } from "@/components/ProductSection";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustStrip />
      <Features />
      <Directory />
      <HowItWorks />
      <ProductSection />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
