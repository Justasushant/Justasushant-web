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

  const skills = [
    {
      icon: "fas fa-code",
      title: "Frontend Development",
      description: "Creating responsive and modern web applications using React, TypeScript, and modern CSS frameworks.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vue.js"],
    },
    {
      icon: "fab fa-python",
      title: "Backend Development",
      description: "Building powerful backend solutions, APIs, and data processing applications with Python and Node.js.",
      technologies: ["Python", "Node.js", "Django", "FastAPI", "Express.js"],
    },
    {
      icon: "fas fa-database",
      title: "Database & DevOps",
      description: "Designing efficient databases and implementing modern deployment strategies with cloud platforms.",
      technologies: ["PostgreSQL", "MongoDB", "Redis", "AWS", "Docker"],
    },
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
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-ranade font-bold text-text mb-6">
              About Sushant
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              I'm a passionate {calculateAge()} old full-stack developer who loves creating innovative digital solutions. 
              With expertise in React, TypeScript, Python, and modern web technologies, I transform 
              ideas into powerful, user-friendly applications that make a real difference.
            </p>
          </div>

          {/* Skills Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-ranade font-bold text-text text-center mb-12">
              What I Do
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="card p-8 text-center group hover:shadow-xl transition-all duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-accent-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-100 transition-colors duration-300">
                    <i className={`${skill.icon} text-2xl text-accent group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <h3 className="text-xl font-ranade font-bold text-text mb-4 group-hover:text-accent transition-colors">
                    {skill.title}
                  </h3>
                  <p className="text-muted mb-6 leading-relaxed">
                    {skill.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {skill.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-surface-2 text-text-light text-xs font-medium rounded-full border border-border-light hover:border-accent/20 hover:bg-accent-50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-ranade font-bold text-accent mb-2">
                    <AnimatedCounter end={stat.number} />
                  </div>
                  <div className="text-muted font-medium uppercase tracking-wide text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Story */}
          <div className="card p-12 text-center">
            <h2 className="text-2xl font-ranade font-bold text-text mb-6">
              My Journey
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-8">
              At just {calculateAge()}, I've discovered my passion for web development and creating digital solutions. 
              Starting as a curious teenager exploring the endless possibilities of web technologies, 
              I've grown into a developer who believes in the power of clean code, user-centered design, 
              and continuous learning. Every project is an opportunity to create something meaningful and impactful.
            </p>
            <div className="flex justify-center space-x-4">
              <button onClick={() => {
                const link = document.createElement('a');
                link.href = '/CV.pdf';
                link.download = 'Sushant_Sharma_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }} className="btn-primary">
                <i className="fas fa-download mr-2" />
                Download CV
              </button>
              <Link href="/contact" className="btn-secondary">
                Let's Connect
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}