
import React from 'react';
import { STATS } from '../constants';

const Hero: React.FC = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 lg:px-20 min-h-[90vh] flex flex-col justify-center max-w-[1440px] mx-auto">
      <div className="mb-10 inline-flex items-center gap-2 border border-primary/10 bg-white/50 px-3 py-1.5 rounded-full w-fit">
        <span className="flex h-1.5 w-1.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary/60">Available to connect</span>
      </div>

      <h1 className="font-manrope font-extrabold text-[12vw] leading-[0.85] tracking-tighter text-primary whitespace-nowrap lg:whitespace-normal mb-20 opacity-95">
        SUSHANT <br className="hidden lg:block"/>
        <span className="lg:ml-24">SHARMA</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
        <div className="lg:col-span-7 flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl md:text-4xl font-light text-primary/80 leading-snug">
              Frontend Developer & <br/>
              <span className="font-semibold italic">UI Specialist</span>
            </h2>
            <p className="text-lg md:text-xl text-primary/60 max-w-xl leading-relaxed">
              Crafting pixel-perfect, accessible, and performant web experiences since 2023. Bridging the gap between design and engineering with absolute precision.
            </p>
          </div>

          <div className="flex flex-wrap gap-5">
            <button 
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-10 py-5 bg-primary text-white rounded-xl text-lg font-bold transition-all hover:-translate-y-1 hover:shadow-2xl active:translate-y-0"
            >
              <span>View Work</span>
              <span className="material-symbols-outlined">arrow_downward</span>
            </button>
            <button
              onClick={scrollToContact}
              className="flex items-center gap-2 px-10 py-5 border border-primary text-primary rounded-xl text-lg font-bold transition-all hover:bg-primary/5 active:scale-95"
            >
              <span>Contact Me</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-12">
          <div className="relative group w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-lg">
             <img 
               src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800" 
               alt="Code Detail"
               title="Sushant featured project preview"
               className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
             <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div className="bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-xl">
                  <p className="text-[9px] font-extrabold uppercase tracking-widest text-primary/30 mb-0.5">Ongoing Project</p>
                  <p className="text-sm font-bold text-primary">SaaS Application</p>
                </div>
             </div>
          </div>

          <div className="flex gap-12 border-t border-primary/10 pt-10 w-full lg:w-auto">
            {STATS.map((stat, idx) => (
              <div key={idx}>
                <span className="block text-2xl font-extrabold mb-1">{stat.value}</span>
                <span className="text-[9px] text-primary/40 font-bold uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
