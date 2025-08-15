
import { RotatingText } from "./rotating-text";

export default function HeroSection() {
  const skills = ["Web Developer (Frontend)", "Python Developer"];

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
              Justasushant
            </h1>
            <div className="text-xl sm:text-2xl lg:text-3xl font-poppins font-semibold h-16">
              <span className="text-white">And I'm a </span>
              <RotatingText texts={skills} />
            </div>
          </div>
          
          <p className="text-gray-300 text-lg max-w-lg mx-auto lg:mx-0 animate-fade-in-delay">
            Passionate developer creating innovative digital solutions with modern technologies. 
            Specializing in web development, Python programming, and creative design.
          </p>
          
          {/* Social Media Links */}
          <div className="flex justify-center lg:justify-start space-x-4 pt-4">
            <a 
              href="https://discord.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-btn w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-flame transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-flame/25"
            >
              <i className="fab fa-discord text-xl"></i>
            </a>
            <a 
              href="https://instagram.com/justasushant" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-btn w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-flame transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-flame/25"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a 
              href="mailto:contact@justasushant.dev" 
              className="social-btn w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-flame transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-flame/25"
            >
              <i className="fas fa-envelope text-xl"></i>
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
        
        {/* Right Content - Profile Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            {/* Logo Container */}
            <div className="w-80 h-80 bg-gradient-to-br from-flame to-flame-light rounded-3xl shadow-2xl shadow-flame/20 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-black/90 rounded-3xl"></div>
              <div className="relative z-10 flex flex-col items-center justify-center">
                <img 
                  src="https://i.ibb.co/7xKhBDk/image-1751973541905.png" 
                  alt="Justasushant Logo" 
                  className="w-48 h-48 object-contain filter drop-shadow-2xl"
                />
                <p className="text-gray-400 text-sm mt-4 font-medium">Justasushant</p>
              </div>
              
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-flame to-flame-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-flame rounded-full animate-ping opacity-75"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-flame-light rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 -left-8 w-4 h-4 bg-flame/60 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
