import { useState, useEffect } from "react";
import profileImage from "@/assets/profile.jpg";
import heroBanner from "@/assets/hero-banner.jpg";

const roles = ["Frontend & UX/UI", "Freelancer", "Student"];

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentFullText = roles[currentRole];
      
      if (!isDeleting) {
        // Typing
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        setTypingSpeed(150);

        if (displayText === currentFullText) {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        setTypingSpeed(75);

        if (displayText === "") {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole, typingSpeed]);

  return (
    <section className="pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Profile and Intro */}
        <div className="flex flex-col md:flex-row items-start gap-6 mb-12 animate-fade-in">
          <img 
            src={profileImage} 
            alt="Profile" 
            className="w-20 h-20 rounded-full object-cover border-2 border-border"
          />
          <div className="flex-1">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-mono">
              Hi, I'm <span className="text-foreground font-medium">Sushant Sharma</span>, also known as Pheonix/justasushant.
              <br />
              I'm a passionate Web Designer & Developer turning pixels into experiences.
            </p>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="relative mb-16 overflow-hidden rounded-2xl animate-scale-in">
          <img 
            src={heroBanner} 
            alt="Hero banner" 
            className="w-full h-[250px] md:h-[400px] object-cover"
          />
        </div>

        {/* Title Section */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-7xl font-bold leading-tight">
            Web Designer <span className="text-muted-foreground">&</span>
            <br />
            <span className="inline-flex items-baseline">
              {displayText}
              <span className="inline-block w-1 h-[0.8em] bg-accent ml-1 animate-blink"></span>
            </span>
          </h1>
          
          {/* Info Grid */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-8 border-t border-b border-border text-sm">
            <div className="flex flex-col gap-1">
              <span className="text-foreground font-medium">India</span>
              <span className="text-muted-foreground text-xs">Creative Mind & Anime Fanatic</span>
            </div>
            <span className="flex items-center gap-2 text-accent font-medium">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              AVAILABLE FOR WORK
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
