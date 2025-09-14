import { memo, lazy, Suspense } from "react";

const Typewriter = lazy(() => import("./typewriter"));

const HeroSection = memo(() => {
  const skills = ["Web Developer", "UI/UX Designer"];

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/CV.pdf';
    link.download = 'Sushant_Sharma_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 overflow-hidden">
      {/* Ripple Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="ripple-grid"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-accent text-lg font-medium animate-fade-in">Hi! I am</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-ranade font-bold text-white animate-slide-up">
              Sushant
            </h1>
            <div className="text-xl sm:text-2xl lg:text-3xl font-ranade font-semibold h-16">
              <span className="text-white">I am a </span>
              <Suspense fallback={<span className="text-accent">Developer</span>}>
                <Typewriter texts={skills} />
              </Suspense>
            </div>
          </div>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto animate-fade-in-delay">
            Passionate developer creating beautiful, responsive web applications with modern technologies. 
            Specializing in React, TypeScript, and exceptional user experience design.
          </p>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-4 pt-4">
            <a 
              href="https://discord.com/users/1054399503052050512" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-btn w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent/25"
              aria-label="Connect with me on Discord - Sushant"
            >
              <i className="fab fa-discord text-xl" aria-hidden="true"></i>
            </a>
            <a 
              href="https://instagram.com/justasushant" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-btn w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent/25"
              aria-label="Follow me on Instagram @justasushant"
            >
              <i className="fab fa-instagram text-xl" aria-hidden="true"></i>
            </a>
            <a 
              href="https://github.com/Justasushant" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-btn w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent/25"
              aria-label="View my GitHub profile - Justasushant"
            >
              <i className="fab fa-github text-xl" aria-hidden="true"></i>
            </a>
            <a 
              href="mailto:sushantsharma5128@gmail.com" 
              className="social-btn w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent/25"
              aria-label="Send me an email at sushantsharma5128@gmail.com"
            >
              <i className="fas fa-envelope text-xl" aria-hidden="true"></i>
            </a>
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <button 
              onClick={handleDownloadCV}
              className="bg-white text-black px-8 py-3 rounded-full font-ranade font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Download CV</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;