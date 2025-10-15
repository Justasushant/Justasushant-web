import { memo, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import MatrixRain from "./matrix-rain";

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
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Ripple Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="ripple-grid"></div>
      </div>
      
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.p 
              className="text-accent text-lg font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Hi! I am
            </motion.p>
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-ranade font-bold text-white"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6, type: "spring", stiffness: 100 }}
            >
              Sushant
            </motion.h1>
            <div className="text-xl sm:text-2xl lg:text-3xl font-ranade font-semibold h-16">
              <span className="text-white">I am a </span>
              <Suspense fallback={<span className="text-accent">Developer</span>}>
                <Typewriter texts={skills} />
              </Suspense>
            </div>
          </motion.div>

          <motion.p 
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Passionate developer creating beautiful, responsive web applications with modern technologies. 
            Specializing in React, TypeScript, and exceptional user experience design.
          </motion.p>

          {/* Social Media Links */}
          <motion.div 
            className="flex justify-center space-x-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {[
              { href: "https://discord.com/users/1054399503052050512", icon: "fab fa-discord", label: "Connect with me on Discord - Sushant" },
              { href: "https://instagram.com/justasushant", icon: "fab fa-instagram", label: "Follow me on Instagram @justasushant" },
              { href: "https://github.com/Justasushant", icon: "fab fa-github", label: "View my GitHub profile - Justasushant" },
              { href: "mailto:sushantsharma5128@gmail.com", icon: "fas fa-envelope", label: "Send me an email" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : "_blank"}
                rel={social.href.startsWith('mailto') ? undefined : "noopener noreferrer"}
                className="social-btn w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent transition-all duration-300"
                aria-label={social.label}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <i className={`${social.icon} text-xl`} aria-hidden="true"></i>
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            className="pt-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 150 }}
          >
            <motion.button 
              onClick={handleDownloadCV}
              className="relative bg-white text-black px-8 py-3 rounded-full font-ranade font-semibold overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Download CV</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;