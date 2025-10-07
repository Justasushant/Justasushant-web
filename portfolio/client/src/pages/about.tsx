import Layout from "../components/Layout";
import { Link } from "wouter";
import { calculateExperience, calculateAge } from "../lib/calculateExperience";
import AnimatedCounter from "../components/animated-counter";

export default function About() {
  const technologies = [
    "python", "html", "css", "js", "react", "nodejs", "tailwind",
    "git", "github", "mongodb", "firebase", "figma", "illustrator",
    "vscode", "replit", "vercel", "cursor", "chatgpt", "claude", "warp"
  ];

  const stats = [
    { number: calculateExperience(), label: calculateExperience().includes('month') ? "Experience in Months" : "Experience" },
    { number: "7+", label: "Projects Completed" },
    { number: "4+", label: "Happy Clients" },
    { number: "100%", label: "Client Satisfaction" },
  ];

  return (
    <Layout>
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-ranade font-bold mb-8 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              About Sushant
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              I'm a <span className="text-accent font-semibold">{calculateAge()}</span> passionate full-stack developer and creative problem solver who transforms 
              ideas into elegant digital experiences. With a strong foundation in modern web technologies and 
              a keen eye for design, I craft <span className="text-accent-light font-semibold">scalable applications</span> that deliver real value and make a lasting impact.
            </p>
          </div>

          {/* What I Know Section */}
          <div className="mb-20 -mx-4 sm:-mx-6 lg:-mx-8">
            <h2 className="text-3xl sm:text-4xl font-ranade font-bold text-center mb-12 bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent px-4 sm:px-6 lg:px-8">
              Technologies & Tools
            </h2>
            
            {/* Tech Logo Loop */}
            <div className="relative overflow-hidden py-16 w-full">
              {/* Gradient overlays for fade effect */}
              <div className="absolute left-0 top-0 bottom-0 w-48 sm:w-64 md:w-80 bg-gradient-to-r from-background via-background to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-48 sm:w-64 md:w-80 bg-gradient-to-l from-background via-background to-transparent z-10 pointer-events-none"></div>
              
              <div className="flex animate-scroll gap-8 sm:gap-12">
                {[...technologies, ...technologies].map((tech, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 group cursor-pointer flex items-center justify-center"
                    title={tech}
                  >
                    <img 
                      src={`https://go-skill-icons.vercel.app/api/icons?i=${tech}`}
                      alt={tech}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain group-hover:scale-110 transition-all duration-300"
                    />
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
          <div className="mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-6xl font-ranade font-bold bg-gradient-to-br from-accent to-accent-light bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform duration-300">
                    <AnimatedCounter end={stat.number} />
                  </div>
                  <div className="text-gray-400 font-semibold uppercase tracking-wider text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Story */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-light/5 rounded-3xl"></div>
            <div className="relative card p-12 md:p-16 text-center border-2 border-gray-700/30 hover:border-accent/20 transition-all duration-500">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-6">
                <i className="fas fa-rocket text-3xl text-accent"></i>
              </div>
              <h2 className="text-3xl sm:text-4xl font-ranade font-bold text-text mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                My Journey
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-3xl mx-auto font-light">
                At just <span className="text-accent font-semibold">{calculateAge()}</span>, I've discovered my passion for web development and creating digital solutions. 
                Starting as a curious teenager exploring the endless possibilities of web technologies, 
                I've grown into a developer who believes in the power of <span className="text-accent-light font-semibold">clean code</span>, user-centered design, 
                and continuous learning. Every project is an opportunity to create something meaningful and impactful.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="/CV.pdf" 
                  download="Sushant_Sharma_CV.pdf"
                  className="btn-primary group text-lg inline-flex items-center justify-center"
                >
                  <i className="fas fa-download mr-2 group-hover:animate-bounce" />
                  Download CV
                </a>
                <Link href="/contact" className="btn-secondary text-lg group">
                  Let's Connect
                  <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Project Timeline */}
          <div className="mt-20">
            <h3 className="text-3xl sm:text-4xl font-ranade font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Project Milestones
            </h3>
            <div className="relative max-w-5xl mx-auto px-4">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent via-accent-light to-accent hidden md:block"></div>
              
              {/* Timeline Items */}
              <div className="space-y-12 md:space-y-16">
                {/* Desigamblers */}
                <div className="relative flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 md:text-right md:pr-12">
                    <div className="card p-6 border border-gray-700/30 hover:border-accent/30 transition-all duration-300 bg-gray-800/30 backdrop-blur-sm">
                      <h4 className="text-2xl font-ranade font-bold text-white mb-2">Desigamblers</h4>
                      <p className="text-accent font-semibold mb-3">May 2025</p>
                      <p className="text-gray-300 text-sm">My first major project - a creative platform showcasing design and development skills.</p>
                    </div>
                  </div>
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="w-6 h-6 bg-accent rounded-full border-4 border-background shadow-lg shadow-accent/50"></div>
                  </div>
                  <div className="md:w-1/2"></div>
                </div>

                {/* Homey */}
                <div className="relative flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2"></div>
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="w-6 h-6 bg-accent-light rounded-full border-4 border-background shadow-lg shadow-accent-light/50"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="card p-6 border border-gray-700/30 hover:border-accent-light/30 transition-all duration-300 bg-gray-800/30 backdrop-blur-sm">
                      <h4 className="text-2xl font-ranade font-bold text-white mb-2">Homey</h4>
                      <p className="text-accent-light font-semibold mb-3">July 2025</p>
                      <p className="text-gray-300 text-sm">A rewards platform connecting users with exclusive benefits and experiences.</p>
                    </div>
                  </div>
                </div>

                {/* ShreeShyamMobile */}
                <div className="relative flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 md:text-right md:pr-12">
                    <div className="card p-6 border border-gray-700/30 hover:border-accent/30 transition-all duration-300 bg-gray-800/30 backdrop-blur-sm">
                      <h4 className="text-2xl font-ranade font-bold text-white mb-2">ShreeShyamMobile</h4>
                      <p className="text-accent font-semibold mb-3">July 2025</p>
                      <p className="text-gray-300 text-sm">A mobile retail business website with modern e-commerce features.</p>
                    </div>
                  </div>
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="w-6 h-6 bg-accent rounded-full border-4 border-background shadow-lg shadow-accent/50"></div>
                  </div>
                  <div className="md:w-1/2"></div>
                </div>

                {/* CONEIZ */}
                <div className="relative flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2"></div>
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="w-6 h-6 bg-accent-light rounded-full border-4 border-background shadow-lg shadow-accent-light/50 animate-pulse"></div>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="card p-6 border border-gray-700/30 hover:border-accent-light/30 transition-all duration-300 bg-gray-800/30 backdrop-blur-sm">
                      <h4 className="text-2xl font-ranade font-bold text-white mb-2">CONEIZ</h4>
                      <p className="text-accent-light font-semibold mb-3">September 2025</p>
                      <p className="text-gray-300 text-sm">Latest project - an innovative platform pushing the boundaries of web development.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}