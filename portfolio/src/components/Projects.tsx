import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";
import project4 from "@/assets/project4.jpg";

const projects = [
  {
    id: 1,
    title: "Desigamblers.in",
    tools: "HTML, CSS, JavaScript, Full Stack",
    tags: ["WEB DESIGN", "INTERACTIVE", "GAME FEATURES"],
    image: project1,
    slug: "desigamblers",
    link: "https://desigamblers.in",
  },
  {
    id: 2,
    title: "HomeyRewards",
    tools: "Full Stack, Frontend + Backend",
    tags: ["WEB DEVELOPMENT", "DESIGN", "COMPLETE SOLUTION"],
    image: project2,
    slug: "homeyrewards",
    link: "https://homeyrewards.pro",
  },
  {
    id: 3,
    title: "ShreeshyamMobile",
    tools: "Ecommerce, Full Stack",
    tags: ["ECOMMERCE", "RETAIL", "WEB DESIGN"],
    image: project3,
    slug: "shreeshyammobile",
    link: "https://shreeshyammobile.com",
  },
  {
    id: 4,
    title: "Coneiz Corporate",
    tools: "Web Design, Corporate",
    tags: ["CORPORATE", "DESIGN", "BUSINESS"],
    image: project4,
    slug: "coneiz",
    link: "https://coneiz.com",
  },
];

const Projects = () => {
  return (
    <section id="work" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center font-mono">Clients</h2>
        
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
                    {project.title}
                  </h3>
                  <Link
                    to={`/project/${project.slug}`}
                    className="flex-shrink-0 text-muted-foreground hover:text-accent transition-all p-2 hover:bg-secondary rounded-lg hover:scale-110 flex items-center gap-1"
                  >
                    <span className="text-xs font-mono hidden md:inline">View More</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
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
