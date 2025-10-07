import { calculateExperience } from "../lib/calculateExperience";
import AnimatedCounter from "./animated-counter";

export default function AboutSection() {
  const technologies = [
    { name: "Python", icon: "fab fa-python", color: "text-[#3776AB]", bg: "bg-[#3776AB]/10" },
    { name: "HTML5", icon: "fab fa-html5", color: "text-[#E34F26]", bg: "bg-[#E34F26]/10" },
    { name: "CSS3", icon: "fab fa-css3-alt", color: "text-[#1572B6]", bg: "bg-[#1572B6]/10" },
    { name: "JavaScript", icon: "fab fa-js-square", color: "text-[#F7DF1E]", bg: "bg-[#F7DF1E]/10" },
    { name: "React", icon: "fab fa-react", color: "text-[#61DAFB]", bg: "bg-[#61DAFB]/10" },
    { name: "Node.js", icon: "fab fa-node-js", color: "text-[#339933]", bg: "bg-[#339933]/10" },
    { name: "Git", icon: "fab fa-git-alt", color: "text-[#F05032]", bg: "bg-[#F05032]/10" },
    { name: "GitHub", icon: "fab fa-github", color: "text-[#E6EDF3]", bg: "bg-gray-800/30" },
    { name: "VS Code", icon: "fas fa-code", color: "text-[#007ACC]", bg: "bg-[#007ACC]/10" },
    { name: "Firebase", icon: "fas fa-fire", color: "text-[#FFCA28]", bg: "bg-[#FFCA28]/10" },
    { name: "MongoDB", icon: "fas fa-leaf", color: "text-[#47A248]", bg: "bg-[#47A248]/10" },
    { name: "PostgreSQL", icon: "fas fa-database", color: "text-[#336791]", bg: "bg-[#336791]/10" },
    { name: "Docker", icon: "fab fa-docker", color: "text-[#2496ED]", bg: "bg-[#2496ED]/10" },
    { name: "AWS", icon: "fab fa-aws", color: "text-[#FF9900]", bg: "bg-[#FF9900]/10" },
    { name: "TypeScript", icon: "fab fa-js-square", color: "text-[#3178C6]", bg: "bg-[#3178C6]/10" },
  ];

  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-light/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full">
        <div className="text-center mb-20 max-w-7xl mx-auto px-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-ranade font-bold mb-8 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            About Sushant Sharma
          </h2>
          <p className="text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed font-light">
            I'm a passionate <span className="text-accent font-semibold">full-stack developer</span> and creative problem solver who transforms ideas into 
            elegant digital experiences. With a strong foundation in modern web technologies and a keen eye 
            for design, I craft <span className="text-accent-light font-semibold">scalable applications</span> that deliver real value. Let's build something amazing together.
          </p>
        </div>

        {/* What I Know Section */}
        <div className="mb-16 w-full">
          <h3 className="text-2xl sm:text-3xl font-ranade font-bold text-center mb-12 bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
            Technologies & Tools
          </h3>
          
          {/* Tech Logo Loop */}
          <div className="relative overflow-hidden py-12 w-full">
            <div className="flex animate-scroll gap-12 sm:gap-16">
              {[...technologies, ...technologies].map((tech, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 group cursor-pointer flex flex-col items-center"
                  title={tech.name}
                >
                  <i className={`${tech.icon} text-5xl sm:text-6xl ${tech.color} group-hover:scale-110 transition-all duration-300`} />
                  <p className="text-center text-xs sm:text-sm text-gray-400 mt-3 font-medium group-hover:text-accent transition-colors">
                    {tech.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <style jsx>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            
            .animate-scroll {
              animation: scroll 50s linear infinite;
              width: fit-content;
            }
            
            .animate-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12 max-w-7xl mx-auto px-4">
          {[
            { number: calculateExperience(), label: calculateExperience().includes('month') ? "Experience in Months" : "Experience", icon: "fas fa-clock" },
            { number: "7+", label: "Projects Completed", icon: "fas fa-check-circle" },
            { number: "4+", label: "Happy Clients", icon: "fas fa-users" },
            { number: "100%", label: "Client Satisfaction", icon: "fas fa-heart" },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <i className={`${stat.icon} text-accent text-2xl mb-3 block group-hover:scale-110 transition-transform duration-300`}></i>
              <div className="text-5xl font-ranade font-bold bg-gradient-to-br from-accent to-accent-light bg-clip-text text-transparent mb-2">
                <AnimatedCounter end={stat.number} />
              </div>
              <div className="text-gray-400 font-medium text-sm uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
