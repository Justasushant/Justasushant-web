
import React from 'react';

const Footer: React.FC = () => {
  const socials = [
    { label: 'GitHub', key: 'github', url: 'https://github.com/Justasushant' },
    { label: 'Instagram', key: 'instagram', url: 'https://www.instagram.com/justasushant/' },
    { label: 'Discord', key: 'discord', url: 'https://discord.com/users/1054399503052050512' },
    { label: 'LinkedIn', key: 'linkedin', url: 'https://www.linkedin.com/in/justasushant' },
  ];

  const renderSocialIcon = (iconKey: string) => {
    switch (iconKey) {
      case 'github':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 0 0 8.2 11.4c.6.12.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.08-.73.08-.72.08-.72 1.2.08 1.83 1.2 1.83 1.2 1.06 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.48-1.34-5.48-5.96 0-1.32.47-2.4 1.24-3.25-.12-.31-.54-1.54.12-3.2 0 0 1.01-.33 3.3 1.24a11.46 11.46 0 0 1 6 0c2.28-1.57 3.3-1.24 3.3-1.24.66 1.66.24 2.89.12 3.2.77.85 1.24 1.93 1.24 3.25 0 4.63-2.82 5.65-5.5 5.95.44.38.82 1.1.82 2.24v3.32c0 .32.22.7.83.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        );
      case 'instagram':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
            <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5zm8.95 1.35a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8z" />
          </svg>
        );
      case 'discord':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
            <path d="M20.3 4.37A19.8 19.8 0 0 0 15.4 3l-.24.49a13.9 13.9 0 0 1 4.08 1.97 13.2 13.2 0 0 0-4.3-2.08 17.4 17.4 0 0 0-5.88 0A13.2 13.2 0 0 0 4.76 5.46a13.9 13.9 0 0 1 4.08-1.97L8.6 3A19.8 19.8 0 0 0 3.7 4.37C.6 9.03-.2 13.56.2 18.03a19.9 19.9 0 0 0 6.03 3.03l1.3-1.77a12.8 12.8 0 0 1-2.04-.98l.5-.37c3.9 1.82 8.14 1.82 12 0l.5.37c-.65.38-1.33.7-2.04.98l1.3 1.77a19.9 19.9 0 0 0 6.03-3.03c.47-5.17-.8-9.66-3.48-13.66zM8.64 15.37c-1.17 0-2.12-1.07-2.12-2.38s.94-2.38 2.12-2.38c1.18 0 2.14 1.08 2.12 2.38 0 1.31-.95 2.38-2.12 2.38zm6.72 0c-1.17 0-2.12-1.07-2.12-2.38s.94-2.38 2.12-2.38c1.18 0 2.14 1.08 2.12 2.38 0 1.31-.95 2.38-2.12 2.38z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
            <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3V9zm7 0h3.83v1.64h.06c.53-1 1.84-2.05 3.79-2.05C21.2 8.59 22 10.8 22 14.02V21h-4v-6.18c0-1.47-.03-3.36-2.05-3.36-2.06 0-2.37 1.6-2.37 3.25V21h-4V9z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer id="footer" className="bg-primary text-white py-24 px-6 md:px-12 lg:px-20 mt-20">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-20">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16">
          <div className="flex flex-col gap-8 max-w-2xl">
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">
              Ready to build something <span className="text-white/20">exceptional?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/50 leading-relaxed max-w-lg">
              I'm currently available for projects and exciting collaborations.
            </p>
          </div>

          <div id="contact" className="flex flex-col gap-10 items-start lg:items-end">
            <a 
              href="mailto:contact@sushantsharma.me" 
              title="Email Sushant Sharma"
              className="group flex flex-col items-start lg:items-end gap-2"
            >
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/20">Drop an email</span>
              <span className="flex items-center gap-4 text-3xl md:text-4xl font-bold border-b-2 border-transparent hover:border-white transition-all py-2">
                contact@sushantsharma.me
                <span className="material-symbols-outlined text-4xl group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform">arrow_outward</span>
              </span>
            </a>

            <div className="flex flex-wrap gap-4">
              {socials.map(social => (
                <a 
                  key={social.label} 
                  href={social.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <span className="text-white/80">{renderSocialIcon(social.key)}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-10 gap-6">
           <div className="flex items-center gap-2">
             <span className="w-5 h-5 flex items-center justify-center rounded-full border border-white/20 text-[10px]">C</span>
             <p className="text-sm font-medium text-white/30">
               2025 Sushant Sharma. Crafted with precision & code.
             </p>
           </div>
           <div className="flex items-center gap-6">
             <p className="text-sm font-medium text-white/20">Local time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
             <button 
               onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
               className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
             >
               <span className="material-symbols-outlined text-sm">arrow_upward</span>
             </button>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
