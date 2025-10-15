import { calculateExperience } from "../lib/calculateExperience";
import AnimatedCounter from "./animated-counter";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const technologies = [
    "python", "html", "css", "js", "react", "nodejs", "tailwind",
    "git", "github", "mongodb", "firebase", "figma", "illustrator",
    "vscode", "replit", "vercel", "cursor", "chatgpt", "claude", "warp"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-light/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="relative z-10 w-full">
        <motion.div 
          className="text-center mb-20 max-w-7xl mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-ranade font-bold mb-8 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            About Sushant Sharma
          </motion.h2>
          <motion.p 
            className="text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            I'm a passionate <span className="text-accent font-semibold">full-stack developer</span> and creative problem solver who transforms ideas into 
            elegant digital experiences. With a strong foundation in modern web technologies and a keen eye 
            for design, I craft <span className="text-accent-light font-semibold">scalable applications</span> that deliver real value. Let's build something amazing together.
          </motion.p>
        </motion.div>

        {/* What I Know Section */}
        <div className="mb-16 w-full">
          <h3 className="text-2xl sm:text-3xl font-ranade font-bold text-center mb-12 bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
            Technologies & Tools
          </h3>
          
            {/* Tech Logo Loop */}
            <div className="relative overflow-hidden py-12 w-full">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-48 sm:w-64 md:w-80 bg-gradient-to-r from-background via-background to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-48 sm:w-64 md:w-80 bg-gradient-to-l from-background via-background to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex animate-scroll gap-8 sm:gap-12">
              {[...technologies, ...technologies].map((tech, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 group cursor-pointer flex items-center justify-center"
                  title={tech}
                >
                  <img 
                    src={`https://go-skill-icons.vercel.app/api/icons?i=${tech}`}
                    alt={tech}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain group-hover:scale-110 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            
            .animate-scroll {
              animation: scroll 50s linear infinite;
              width: fit-content;
            }
            
            .animate-scroll:hover {
              animation-play-state: paused;
            }
          `}} />
        </div>

        {/* Stats Section */}
        <motion.div 
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12 max-w-7xl mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { number: calculateExperience(), label: calculateExperience().includes('month') ? "Experience in Months" : "Experience", icon: "fas fa-clock" },
            { number: "7+", label: "Projects Completed", icon: "fas fa-check-circle" },
            { number: "4+", label: "Happy Clients", icon: "fas fa-users" },
            { number: "100%", label: "Client Satisfaction", icon: "fas fa-heart" },
          ].map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.05 }}
            >
              <i className={`${stat.icon} text-accent text-2xl mb-3 block group-hover:scale-110 transition-transform duration-300`}></i>
              <div className="text-5xl font-ranade font-bold bg-gradient-to-br from-accent to-accent-light bg-clip-text text-transparent mb-2">
                <AnimatedCounter end={stat.number} />
              </div>
              <div className="text-gray-400 font-medium text-sm uppercase tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
