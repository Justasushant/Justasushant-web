import React from 'react';
import { CLIENT_PROJECTS } from '../constants';

interface ClientsPageProps {
  onNavigate: (path: string) => void;
}

const ClientsPage: React.FC<ClientsPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-20 min-h-screen bg-white/40">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-14 flex flex-col gap-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary">All Clients</h1>
          <p className="text-primary/60 text-lg max-w-2xl">
            Detailed view of client projects with overview, stack used, and live links.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {CLIENT_PROJECTS.map((project) => (
            <article
              key={project.id}
              className="group bg-white rounded-2xl shadow-sm border border-primary/5 overflow-hidden cursor-pointer hover:shadow-xl transition-all"
              onClick={() => onNavigate(project.link)}
            >
              <div className="aspect-[16/10] overflow-hidden bg-cream-dark">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-2xl font-bold text-primary">{project.title}</h2>
                  <span className="px-3 py-1 rounded-full bg-primary/5 text-[10px] font-bold text-primary/50 uppercase tracking-widest">
                    {project.year}
                  </span>
                </div>

                <p className="text-primary/60 leading-relaxed">{project.description}</p>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs font-bold uppercase tracking-widest text-primary hover:underline"
                >
                  {project.liveUrl === '#' ? 'Launching soon' : project.liveUrl.replace('https://', '')}
                </a>

                <div className="flex flex-wrap gap-2 mt-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-primary/35">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
