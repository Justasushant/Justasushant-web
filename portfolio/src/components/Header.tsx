import { Link } from "react-router-dom";
import { Home, Briefcase, User, Mail } from "lucide-react";
import profileImage from "@/assets/profile.jpg";
import ScrollProgress from "./ScrollProgress";

const Header = () => {
  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-8 py-5 flex items-center justify-between gap-8">
          <Link to="/" className="hover:scale-105 transition-transform flex-shrink-0">
            <span className="text-xl font-bold font-mono tracking-wide">Justakartik</span>
          </Link>
          
          {/* Progress Bar - fills the space between name and nav */}
          <div className="flex-1 flex items-center px-8">
            <ScrollProgress />
          </div>
          
          <nav className="flex gap-10 flex-shrink-0">
            <a 
              href="#home" 
              className="text-sm hover:text-sky-400 transition-colors font-mono font-medium tracking-wide relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 transition-all group-hover:w-full"></span>
            </a>
            <a 
              href="#work" 
              className="text-sm hover:text-sky-400 transition-colors font-mono font-medium tracking-wide relative group"
            >
              Work
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 transition-all group-hover:w-full"></span>
            </a>
            <a 
              href="#about" 
              className="text-sm hover:text-sky-400 transition-colors font-mono font-medium tracking-wide relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 transition-all group-hover:w-full"></span>
            </a>
            <a 
              href="#contact" 
              className="text-sm hover:text-sky-400 transition-colors font-mono font-medium tracking-wide relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 transition-all group-hover:w-full"></span>
            </a>
          </nav>
        </div>
      </header>

      {/* Mobile Top Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-center">
          <Link to="/" className="">
            <span className="text-base font-bold font-mono tracking-wide">Justakartik</span>
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
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-secondary transition-all group active:scale-95"
          >
            <Home className="w-5 h-5 group-hover:text-accent transition-colors" />
            <span className="text-xs group-hover:text-accent transition-colors font-mono">Home</span>
          </a>
          <a 
            href="#work" 
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-secondary transition-all group active:scale-95"
          >
            <Briefcase className="w-5 h-5 group-hover:text-accent transition-colors" />
            <span className="text-xs group-hover:text-accent transition-colors font-mono">Work</span>
          </a>
          <a 
            href="#about" 
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-secondary transition-all group active:scale-95"
          >
            <User className="w-5 h-5 group-hover:text-accent transition-colors" />
            <span className="text-xs group-hover:text-accent transition-colors font-mono">About</span>
          </a>
          <a 
            href="#contact" 
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-secondary transition-all group active:scale-95"
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
