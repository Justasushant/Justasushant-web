import { ArrowRight } from "lucide-react";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";

const projects = [
  {
    id: 1,
    title: "Audiflix",
    tools: "React, Vite, Tailwind",
    tags: ["AUDIO STREAMING", "UI", "VERCEL"],
    image: project1,
    slug: "audiflix",
    repo: "https://github.com/Justasushant/Audiflix",
    live: "https://audiflix.vercel.app",
  },
  {
    id: 2,
    title: "Animplex",
    tools: "React, Vite, Tailwind",
    tags: ["VIDEO STREAMING", "ANIME", "VERCEL"],
    image: project2,
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
              {/* Image Container */}
              <div className="relative h-[280px] md:h-[320px] overflow-hidden bg-secondary">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
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
                <div className="mt-2">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-mono text-accent hover:underline"
                  >
                    Live preview — {project.live.replace("https://", "")}
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
