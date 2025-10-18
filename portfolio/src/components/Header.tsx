import { Link, useNavigate, useLocation } from "react-router-dom";
import { Home, Briefcase, User, Mail } from "lucide-react";
import profileImage from "@/assets/profile.jpg";
import ScrollProgress from "./ScrollProgress";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate to home first
    if (location.pathname !== "/") {
      navigate("/#" + sectionId);
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    } else {
      // If we're already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-8 py-5 flex items-center justify-between gap-8">
          <Link to="/" className="hover:scale-105 transition-transform flex-shrink-0">
            <span className="text-xl font-bold font-mono tracking-wide">Sushant</span>
          </Link>
          
          {/* Progress Bar - fills the space between name and nav */}
          <div className="flex-1 flex items-center px-8">
            <ScrollProgress />
          </div>
          
          <nav className="flex gap-10 flex-shrink-0">
            <a 
              href="#home" 
              onClick={(e) => handleScrollToSection(e, "home")}
              className="text-sm hover:text-accent transition-colors font-mono font-medium tracking-wide relative group cursor-pointer"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </a>
            <a 
              href="#work" 
              onClick={(e) => handleScrollToSection(e, "work")}
              className="text-sm hover:text-accent transition-colors font-mono font-medium tracking-wide relative group cursor-pointer"
            >
              Work
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </a>
            <a 
              href="#about" 
              onClick={(e) => handleScrollToSection(e, "about")}
              className="text-sm hover:text-accent transition-colors font-mono font-medium tracking-wide relative group cursor-pointer"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleScrollToSection(e, "contact")}
              className="text-sm hover:text-accent transition-colors font-mono font-medium tracking-wide relative group cursor-pointer"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </a>
          </nav>
        </div>
      </header>

      {/* Mobile Top Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-center">
          <Link to="/" className="">
            <span className="text-base font-bold font-mono tracking-wide">Sushant</span>
          </Link>
        </div>
        {/* Scroll Progress Indicator */}
        <ScrollProgress />
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border shadow-lg">
        <div className="flex items-center justify-around py-3 px-2">
          <a 
            href="#home" 
            onClick={(e) => handleScrollToSection(e, "home")}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-secondary transition-all group active:scale-95 cursor-pointer"
          >
            <Home className="w-5 h-5 group-hover:text-accent transition-colors" />
            <span className="text-xs group-hover:text-accent transition-colors font-mono">Home</span>
          </a>
          <a 
            href="#work" 
            onClick={(e) => handleScrollToSection(e, "work")}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-secondary transition-all group active:scale-95 cursor-pointer"
          >
            <Briefcase className="w-5 h-5 group-hover:text-accent transition-colors" />
            <span className="text-xs group-hover:text-accent transition-colors font-mono">Work</span>
          </a>
          <a 
            href="#about" 
            onClick={(e) => handleScrollToSection(e, "about")}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-secondary transition-all group active:scale-95 cursor-pointer"
          >
            <User className="w-5 h-5 group-hover:text-accent transition-colors" />
            <span className="text-xs group-hover:text-accent transition-colors font-mono">About</span>
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleScrollToSection(e, "contact")}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-secondary transition-all group active:scale-95 cursor-pointer"
          >
            <Mail className="w-5 h-5 group-hover:text-accent transition-colors" />
            <span className="text-xs group-hover:text-accent transition-colors font-mono">Contact</span>
          </a>
        </div>
      </nav>
    </>
  );
};

export default Header;
