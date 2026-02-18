
import React from 'react';
import { COMPANY_PROJECTS, FEATURED_CLIENTS } from '../constants';

interface WorkProps {
  onNavigate: (path: string) => void;
}

const Work: React.FC<WorkProps> = ({ onNavigate }) => {
  return (
    <div className="py-24 px-6 md:px-12 lg:px-20 bg-white/40">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-[1px] w-12 bg-primary/20"></div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-primary/40 uppercase">Our Companies</h4>
          </div>

          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            {COMPANY_PROJECTS.map((company) => (
              <a
                key={company.id}
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white border border-primary/10 shadow-sm p-2 flex items-center justify-center hover:shadow-lg transition-all">
                  <img
                    src={company.imageUrl}
                    alt={company.title}
                    title={company.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="absolute -right-1 -top-1 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-[12px]">info</span>
                </div>

                <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[calc(100%+12px)] w-64 bg-white border border-primary/10 rounded-xl shadow-xl p-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all z-20">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <h3 className="text-sm font-extrabold text-primary">{company.title}</h3>
                    {company.isOngoing && (
                      <span className="px-2 py-0.5 rounded-full bg-primary/5 text-[9px] font-bold text-primary/50 uppercase tracking-widest">Ongoing</span>
                    )}
                  </div>
                  <p className="text-xs text-primary/60 leading-relaxed">{company.description}</p>
                  <span className="mt-2 inline-block text-[10px] font-bold uppercase tracking-widest text-primary/40">
                    {company.website.replace('https://', '')}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-primary/5 pb-8">
          <div>
            <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-primary/30 mb-4">Clients</h3>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Selected Works</h2>
          </div>
          <button
            onClick={() => onNavigate('/clients')}
            className="flex items-center gap-2 text-sm font-bold text-primary group"
          >
            <span>View All Clients</span>
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {FEATURED_CLIENTS.map((project, idx) => (
            <div 
              key={project.id} 
              onClick={() => onNavigate(project.link)}
              className={`flex flex-col gap-6 group cursor-pointer ${idx % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              <div className="relative overflow-hidden rounded-2xl bg-cream-dark aspect-[4/3] shadow-sm transition-all duration-500 group-hover:shadow-2xl">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  title={project.title}
                  className="w-full h-full object-contain bg-white transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors"></div>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-2xl font-bold group-hover:underline decoration-1 underline-offset-8 transition-all">
                    {project.title}
                  </h4>
                  <span className="px-3 py-1 rounded-full bg-primary/5 text-[10px] font-bold text-primary/40">
                    {project.year}
                  </span>
                </div>
                <p className="text-primary/50 text-base leading-relaxed max-w-md">
                  {project.description}
                </p>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs font-bold uppercase tracking-widest text-primary hover:underline"
                >
                  {project.liveUrl.replace('https://', '')}
                </a>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-primary/30">
                      {tag} {tag !== project.tags[project.tags.length-1] && "•"}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
