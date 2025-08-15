import Typewriter from "./typewriter";

export default function HeroSection() {
  const typewriterTexts = ["Web Dev", "Python Dev", "Logo Designer"];

  const handleDownloadCV = () => {
    // In a real application, this would trigger a download of the CV
    alert("CV download would be implemented here");
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left space-y-6">
          <div className="space-y-2">
            <p className="text-flame text-lg font-medium">Hello, It's Me</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-bold text-white">
              Pheonix
            </h1>
            <div className="text-xl sm:text-2xl lg:text-3xl font-poppins font-semibold h-12">
              <span className="text-white">And I'm a </span>
              <Typewriter texts={typewriterTexts} />
            </div>
          </div>
          
          <p className="text-gray-300 text-lg max-w-lg mx-auto lg:mx-0">
            Passionate developer creating innovative digital solutions with modern technologies. 
            Specializing in web development, Python programming, and creative design.
          </p>
          
          {/* Social Media Links */}
          <div className="flex justify-center lg:justify-start space-x-4 pt-4">
            <a 
              href="https://discord.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-btn w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-flame transition-colors duration-300"
            >
              <i className="fab fa-discord text-xl"></i>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-btn w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-flame transition-colors duration-300"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a 
              href="mailto:contact@pheonix.dev" 
              className="social-btn w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-flame transition-colors duration-300"
            >
              <i className="fas fa-envelope text-xl"></i>
            </a>
          </div>
          
          {/* CTA Button */}
          <div className="pt-6">
            <button 
              onClick={handleDownloadCV}
              className="flame-gradient text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105"
            >
              Download CV
            </button>
          </div>
        </div>
        
        {/* Right Content - Profile Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            {/* Glowing Hexagonal Container */}
            <div className="hexagon w-80 h-80 bg-gradient-to-br from-flame to-flame-light animate-glow">
              <div className="hexagon w-full h-full bg-black m-1 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto bg-flame/20 rounded-full flex items-center justify-center animate-float">
                    <i className="fas fa-fire text-4xl text-flame"></i>
                  </div>
                  <p className="text-gray-400 text-sm">Pheonix Logo</p>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-flame rounded-full animate-ping opacity-75"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-flame-light rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
