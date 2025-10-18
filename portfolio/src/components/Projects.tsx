import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";
import project4 from "@/assets/project4.jpg";

const projects = [
  {
    id: 1,
    title: "RudraCloud",
    tools: "TypeScript, Next.js, Tailwind CSS",
    tags: ["FULL STACK", "HOSTING", "BUSINESS"],
    image: project1,
    github: "https://github.com/justakartik/rudracloud",
  },
  {
    id: 2,
    title: "Image to ASCII Art",
    tools: "Node.js, Jimp",
    tags: ["JAVASCRIPT", "CLI", "IMAGE PROCESSING"],
    image: project2,
    github: "https://github.com/justakartik/image-to-ascii-art",
  },
  {
    id: 3,
    title: "Code Server Installer",
    tools: "Bash, Shell Script",
    tags: ["DEVOPS", "TOOLS", "SERVER"],
    image: project4,
    github: "https://github.com/justakartik/install-code-server",
  },
  {
    id: 4,
    title: "Portfolio Website",
    tools: "TypeScript, React, Tailwind CSS",
    tags: ["FRONTEND", "DESIGN", "RESPONSIVE"],
    image: project3,
    github: "https://github.com/justakartik/portfolio",
  },
];

const Projects = () => {
  return (
    <section id="work" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center font-mono">Featured Work</h2>
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-sky-400 transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-2"
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
                  <h3 className="text-xl md:text-2xl font-bold group-hover:text-sky-400 transition-colors">
                    {project.title}
                  </h3>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 text-muted-foreground hover:text-sky-400 transition-all p-2 hover:bg-secondary rounded-lg hover:scale-110"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                </div>

                <p className="text-sm text-muted-foreground font-mono">{project.tools}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground font-mono hover:bg-sky-400 hover:text-background transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-16">
          <a
            href="https://github.com/justakartik"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-sky-400 text-background rounded-full font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 font-mono shadow-lg hover:shadow-xl"
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
