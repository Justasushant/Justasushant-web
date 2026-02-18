
import React from 'react';

interface NavbarProps {
  activeSection: string;
  currentPath: string;
  onNavigate: (path: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, currentPath, onNavigate }) => {
  const navItems = [
    { label: 'Work', id: 'work' },
    { label: 'About', id: 'about' },
    { label: 'Expertise', id: 'expertise' },
  ];

  const scrollToSection = (id: string) => {
    if (currentPath !== '/') {
      onNavigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    if (currentPath !== '/') {
      onNavigate('/');
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md px-6 py-5 md:px-12 md:py-6 lg:px-20 border-b border-primary/5">
      <div className="max-w-[1440px] mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => {
            if (currentPath !== '/') {
              onNavigate('/');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <span className="text-base md:text-lg font-extrabold tracking-wide text-primary">Sushant</span>
        </div>

        <nav className="flex items-center gap-6 md:gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-[11px] md:text-xs font-extrabold uppercase tracking-widest transition-all hover:text-primary/100 ${
                activeSection === item.id ? 'text-primary' : 'text-primary/40'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={scrollToContact}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-[10px] md:text-xs font-bold rounded-full transition-transform hover:scale-[1.05] active:scale-95"
        >
          <span>Let's Talk</span>
          <span className="material-symbols-outlined text-sm">arrow_outward</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
