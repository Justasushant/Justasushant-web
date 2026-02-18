
import React from 'react';
import { EXPERTISE } from '../constants';

const Expertise: React.FC = () => {
  return (
    <div className="py-24 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        <div className="lg:w-1/3">
           <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-primary/30 mb-6">Expertise</h3>
           <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">I build digital products that scale.</h2>
        </div>

        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {EXPERTISE.map((item, idx) => (
            <div key={idx} className="group">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:-translate-y-1">
                 <span className="material-symbols-outlined text-3xl">{item.icon}</span>
              </div>
              <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
              <p className="text-primary/50 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Expertise;
