
import React from 'react';

const About: React.FC = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="py-24 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
      <div className="flex items-center gap-4 mb-16">
        <div className="h-[1px] w-12 bg-primary/20"></div>
        <h4 className="text-xs font-bold tracking-[0.2em] text-primary/40 uppercase">About Me</h4>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-8">
           <div className="bg-white rounded-[2rem] p-10 md:p-16 shadow-xl border border-primary/5 relative overflow-hidden group">
              <div className="relative z-10 flex flex-col gap-10">
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary leading-[1.1]">
                  Young, focused, and committed to building better every year.
                </h2>
                
                <div className="flex flex-col gap-6 max-w-2xl">
                  <p className="text-xl md:text-2xl text-primary/80 font-medium leading-relaxed">
                    I'm a young frontend developer based in Ajmer, Rajasthan, working full-time on real client websites and digital products.
                  </p>
                  <p className="text-lg text-primary/50 leading-relaxed">
                    I work with speed, discipline, and attention to detail—focused on responsive UI, clean frontend architecture, and strong project delivery.
                  </p>
                  <p className="text-lg text-primary/50 leading-relaxed">
                    My approach is simple: understand each client's business deeply, then build web experiences that are practical, premium, and growth-ready.
                  </p>
                  <p className="text-lg text-primary/50 leading-relaxed">
                    I want to keep growing with every collaboration—working on bigger products, stronger systems, and long-term partnerships through CONEIZ.
                  </p>
                </div>

                <div className="pt-10 mt-10 border-t border-primary/5 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/30">Location</span>
                    <span className="text-lg font-bold">Rajasthan, Ajmer</span>
                  </div>
                  <button
                    onClick={scrollToContact}
                    className="flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 group/btn"
                  >
                    <span>Contact Sushant</span>
                    <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Decoration blur */}
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-cream-dark rounded-full blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none"></div>
           </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-cream mb-6 flex items-center justify-center">
                <span className="material-symbols-outlined">handshake</span>
              </div>
              <h3 className="text-2xl font-extrabold mb-1">Kartik</h3>
              <p className="text-sm font-bold text-primary/40 uppercase tracking-widest">Founder of Coneiz & Partner of Sushant</p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-primary/70">
                <a href="https://github.com/justakartik" title="Kartik GitHub" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                <a href="https://www.instagram.com/officialkartikeytiwari/" title="Kartik Instagram" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
                <a href="https://justakartik.com" title="Kartik Website" target="_blank" rel="noopener noreferrer" className="hover:underline">Website</a>
              </div>
           </div>
           
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-cream mb-6 flex items-center justify-center">
                <span className="material-symbols-outlined">rocket_launch</span>
              </div>
              <h3 className="text-2xl font-extrabold mb-1">Current Focus</h3>
              <p className="text-sm font-bold text-primary/40 uppercase tracking-widest">Agency growth, premium delivery, and product-scale execution</p>
           </div>

           <div className="bg-primary p-8 rounded-2xl shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">hub</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[9px] font-extrabold uppercase text-white tracking-widest">Active Ecosystem</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">CONEIZ</h3>
                  <p className="text-sm font-medium text-white/60">TixWize • Rudracloud • Colanc</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/80">
                    <a href="https://www.instagram.com/coneiz" title="Coneiz Instagram" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
                    <a href="mailto:support@coneiz.com" title="Email Coneiz support" className="hover:underline">support@coneiz.com</a>
                    <a href="https://coneiz.com" title="Coneiz Website" target="_blank" rel="noopener noreferrer" className="hover:underline">coneiz.com</a>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;
