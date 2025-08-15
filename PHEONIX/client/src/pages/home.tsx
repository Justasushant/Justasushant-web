import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";

export default function Home() {
  return (
    <div className="bg-black text-white font-inter overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Pheonix. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
