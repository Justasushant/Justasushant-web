import { useEffect, useRef } from "react";

const skills = [
  { name: "Node.js", icon: "nodejs" },
  { name: "Python", icon: "py" },
  { name: "TypeScript", icon: "ts" },
  { name: "HTML", icon: "html" },
  { name: "JavaScript", icon: "js" },
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Tailwind CSS", icon: "tailwind" },
  { name: "CSS", icon: "css" },
];

const Skills = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scroll = () => {
      scrollPosition += 0.5;
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollPosition;
        
        // Reset scroll when reaching the end (seamless loop)
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
      }
    };

    const intervalId = setInterval(scroll, 20);
    return () => clearInterval(intervalId);
  }, []);

  const skillIcons = skills.map(s => s.icon).join(',');

  return (
    <section className="py-20 px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center font-mono">Skills & Technologies</h2>
        <p className="text-muted-foreground text-center mb-16 font-mono">
          Technologies I work with to build modern web applications
        </p>
        
        {/* Scrolling Logo Container - Desktop */}
        <div className="relative hidden md:block">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10"></div>
          
          {/* Scrolling Content */}
          <div 
            ref={scrollRef}
            className="flex gap-16 overflow-x-hidden py-8"
            style={{ scrollBehavior: 'auto' }}
          >
            {/* Duplicate the skills array for seamless loop */}
            {[...skills, ...skills, ...skills].map((skill, index) => (
              <div
                key={`${skill.name}-${index}`}
                className="flex flex-col items-center gap-4 min-w-[100px] group"
              >
                <div className="flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={`https://go-skill-icons.vercel.app/api/icons?i=${skill.icon}`}
                    alt={skill.name}
                    className="w-20 h-20"
                  />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-sky-400 transition-colors font-mono">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Static Grid for Mobile */}
        <div className="grid grid-cols-3 md:hidden gap-8">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="flex items-center justify-center group-active:scale-95 transition-transform duration-200">
                <img
                  src={`https://go-skill-icons.vercel.app/api/icons?i=${skill.icon}`}
                  alt={skill.name}
                  className="w-16 h-16"
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground text-center font-mono">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
