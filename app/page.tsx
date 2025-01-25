import { Hero } from "@/components/Hero";
import { Features } from "@/components/FeaturesSection";
import { Technologies } from "@/components/Technologies";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-4xl ">
      <Hero />
      <Features />
      <Technologies />
      <Footer />
    </div>
  );
}