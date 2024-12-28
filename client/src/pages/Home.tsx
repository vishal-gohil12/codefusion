import { CodePreview } from "../Components/CodePreview";
import Features from "../Components/Features";
import { Footer } from "../Components/Footer";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import { ParticleBackground } from "../Components/ParticleBackground";

export default function Home() {
  return (
    <div>
      <div className="w-full">
        <ParticleBackground />
        <Header />
        <div className="relative z-10">
          <Hero />
          <CodePreview />
          <Features />
        </div>
        <Footer />
      </div>
    </div>
  );
}
