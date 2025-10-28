import { ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Audiflix",
    tools: "React, Vite, Tailwind",
    tags: ["AUDIO STREAMING", "UI", "VERCEL"],
    description:
      "Audiflix is an audio streaming web app with playlist management, search, and a clean, responsive UI. Built with React and deployed on Vercel.",
    slug: "audiflix",
    repo: "https://github.com/Justasushant/Audiflix",
    live: "https://audiflix.vercel.app",
  },
  {
    id: 2,
    title: "Animplex",
    tools: "React, Vite, Tailwind",
    tags: ["VIDEO STREAMING", "ANIME", "VERCEL"],
    description:
      "Animplex is a video streaming front-end focused on anime discovery and playback. It includes search, categories, and fast navigation—deployed on Vercel.",
    slug: "animplex",
    repo: "https://github.com/Justasushant/Animplex",
    live: "https://animplex.vercel.app",
  },
];

const Projects = () => {
  return (
    <section id="work" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
  <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center font-mono">My projects</h2>
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-accent transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-2"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              {/* Content (removed image — show description instead) */}
              <div className="p-6 md:p-8 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl md:text-2xl font-bold group-hover:text-accent transition-colors">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {project.title}
                    </a>
                  </h3>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-muted-foreground hover:text-accent transition-all p-2 hover:bg-secondary rounded-lg hover:scale-110 flex items-center gap-1"
                  >
                    <span className="text-xs font-mono hidden md:inline">View on GitHub</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground font-mono">{project.tools}</p>

                {/* Project description */}
                <p className="text-base text-foreground leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground font-mono hover:bg-accent hover:text-background transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Live preview link */}
                <div className="mt-2 flex flex-col gap-2">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-mono text-accent hover:underline"
                  >
                    Live preview — {project.live.replace("https://", "")}
                  </a>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-mono text-muted-foreground hover:underline"
                  >
                    Source — {project.repo.replace("https://", "")}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-16">
          <a
            href="https://github.com/justasushant"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-accent text-background rounded-full font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 font-mono shadow-lg hover:shadow-xl"
          >
            View All Projects
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
