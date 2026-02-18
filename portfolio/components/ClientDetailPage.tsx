import React from 'react';
import { CLIENT_PROJECTS } from '../constants';

interface ClientDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

const ClientDetailPage: React.FC<ClientDetailPageProps> = ({ slug, onNavigate }) => {
  const project = CLIENT_PROJECTS.find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="pt-36 pb-24 px-6 md:px-12 lg:px-20 min-h-screen">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold">Client not found</h1>
          <button
            onClick={() => onNavigate('/clients')}
            className="mx-auto px-8 py-4 bg-primary text-white rounded-full font-bold"
          >
            Back to Clients
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-20 min-h-screen bg-white/40">
      <div className="max-w-[1100px] mx-auto flex flex-col gap-10">
        <button
          onClick={() => onNavigate('/clients')}
          className="w-fit text-xs font-bold uppercase tracking-widest text-primary/60 hover:text-primary"
        >
          ← Back to All Clients
        </button>

        <div className="rounded-3xl overflow-hidden border border-primary/5 bg-white shadow-xl">
          <div className="aspect-[16/8] overflow-hidden bg-cream-dark">
            <img src={project.imageUrl} alt={project.title} title={project.title} className="w-full h-full object-cover" />
          </div>

          <div className="p-8 md:p-12 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">{project.title}</h1>
                <span className="px-3 py-1 rounded-full bg-primary/5 text-[10px] font-bold text-primary/50 uppercase tracking-widest">
                  {project.year}
                </span>
              </div>
              <p className="text-lg text-primary/70 leading-relaxed">{project.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/40 mb-3">Project Details</h2>
                <p className="text-primary/70 leading-relaxed">{project.details}</p>
              </div>

              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/40 mb-3">Stack Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 rounded-full bg-primary/5 text-xs font-bold text-primary/60 uppercase tracking-widest">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              {project.liveUrl === '#' ? (
                <span className="text-sm font-bold uppercase tracking-widest text-primary/40">Live link coming soon</span>
              ) : (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full text-sm font-bold hover:opacity-90"
                >
                  Visit Live Website
                  <span className="material-symbols-outlined text-base">open_in_new</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailPage;
