import { memo, lazy, Suspense } from "react";

const Typewriter = lazy(() => import("./typewriter"));

const HeroSection = memo(() => {
  const skills = ["Web Developer", "UI/UX Designer"];

  const handleDownloadCV = () => {
    // In a real application, this would trigger a download of the CV
    alert("CV download would be implemented here");
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 overflow-hidden">
      {/* Ripple Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="ripple-grid"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left space-y-6">
          <div className="space-y-2">
            <p className="text-flame text-lg font-medium animate-fade-in">Hello, It's Me</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-bold text-white animate-slide-up">
              Sushant Sharma
            </h1>
            <div className="text-xl sm:text-2xl lg:text-3xl font-poppins font-semibold h-16">
              <span className="text-white">Frontend Developer & </span>
              <Suspense fallback={<span className="text-flame">Web Developer</span>}>
                <Typewriter texts={skills} />
              </Suspense>
            </div>
          </div>

          <p className="text-gray-300 text-lg max-w-lg mx-auto lg:mx-0 animate-fade-in-delay">
            Sushant Sharma - Passionate frontend developer creating beautiful, responsive web applications with modern technologies. 
            Specializing in React, TypeScript, Python development, and exceptional user experience design.
          </p>

          {/* Social Media Links */}
          <div className="flex justify-center lg:justify-start space-x-4 pt-4">
            <a 
              href="https://discord.com/users/1054399503052050512" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-btn w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-flame transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-flame/25"
              aria-label="Connect with me on Discord - Sushant"
            >
              <i className="fab fa-discord text-xl" aria-hidden="true"></i>
            </a>
            <a 
              href="https://instagram.com/justasushant" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-btn w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-flame transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-flame/25"
              aria-label="Follow me on Instagram @justasushant"
            >
              <i className="fab fa-instagram text-xl" aria-hidden="true"></i>
            </a>
            <a 
              href="https://github.com/Justasushant" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-btn w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-flame transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-flame/25"
              aria-label="View my GitHub profile - Justasushant"
            >
              <i className="fab fa-github text-xl" aria-hidden="true"></i>
            </a>
            <a 
              href="mailto:sushantsharma5128@gmail.com" 
              className="social-btn w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-flame transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-flame/25"
              aria-label="Send me an email at sushantsharma5128@gmail.com"
            >
              <i className="fas fa-envelope text-xl" aria-hidden="true"></i>
            </a>
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <button 
              onClick={handleDownloadCV}
              className="flame-gradient text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10">Download CV</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </div>

        {/* Right Content - Profile Area */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            {/* Profile Container */}
            <div className="w-96 h-96 rounded-full flex items-center justify-center relative overflow-hidden group">
              {/* Profile Image */}
              <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-flame/20">
                <img 
                  src="https://i.postimg.cc/WpKWkCNx/cartoon-image-removebg-preview.png" 
                  alt="Sushant Profile"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;