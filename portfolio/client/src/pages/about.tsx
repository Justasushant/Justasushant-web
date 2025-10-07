import Layout from "../components/Layout";
import { Link } from "wouter";
import { calculateExperience, calculateAge } from "../lib/calculateExperience";
import { useState, useEffect } from "react";
import LoadingScreen from "../components/loading-screen";
import AnimatedCounter from "../components/animated-counter";

export default function About() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

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
    { name: "Tailwind CSS", icon: "fas fa-wind", color: "text-[#06B6D4]", bg: "bg-[#06B6D4]/10" },
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
              <div className="flex animate-scroll gap-12 sm:gap-16">
                {[...technologies, ...technologies].map((tech, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 group cursor-pointer flex flex-col items-center"
                    title={tech.name}
                  >
                    <i className={`${tech.icon} text-6xl ${tech.color} group-hover:scale-110 transition-all duration-300`} />
                    <p className="text-center text-sm text-gray-400 mt-3 font-medium group-hover:text-accent transition-colors max-w-[96px]">
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
                <button onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/CV.pdf';
                  link.download = 'Sushant_Sharma_CV.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }} className="btn-primary group text-lg">
                  <i className="fas fa-download mr-2 group-hover:animate-bounce" />
                  Download CV
                </button>
                <Link href="/contact" className="btn-secondary text-lg group">
                  Let's Connect
                  <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}