import Layout from "../components/Layout";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import LoadingScreen from "../components/loading-screen";
import AnimatedCounter from "../components/animated-counter";

// Utility function to calculate experience in months and format it
const calculateExperience = () => {
  const startDate = new Date("2025-04-01");
  const currentDate = new Date();
  let months = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 30.44)); // Approximate months

  if (months < 0) {
    months = 0; // Ensure experience is not negative if current date is before April 2025
  }

  let experienceString;
  if (months < 12) {
    experienceString = `${months}+ months`;
  } else {
    const years = Math.floor(months / 12);
    experienceString = `${years}+ year${years > 1 ? 's' : ''}`;
  }
  return experienceString;
};

export default function Home() {
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

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/CV.pdf';
    link.download = 'Sushant_Sharma_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const skills = ["Web Developer", "Full Stack Developer", "UI/UX Designer"];
  const currentSkillIndex = 0;

  const experience = calculateExperience();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent-50/50 to-surface">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <p className="text-accent text-lg font-medium mb-4 animate-fade-in">
              Hi! I am
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-ranade font-bold text-text mb-6 animate-slide-up">
              Sushant
            </h1>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-ranade font-semibold text-muted mb-8">
              I am a <span className="text-accent-gradient">{skills[currentSkillIndex]}</span>
            </div>
          </div>

          <p className="text-xl text-muted max-w-3xl mx-auto mb-12 leading-relaxed">
            Passionate developer creating beautiful, responsive web applications with modern technologies. 
            Specializing in React, TypeScript, and exceptional user experience design.
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-12">
            {[
              { icon: "fab fa-discord", href: "https://discord.com/users/1054399503052050512", label: "Discord" },
              { icon: "fab fa-instagram", href: "https://instagram.com/justasushant", label: "Instagram" },
              { icon: "fab fa-github", href: "https://github.com/Justasushant", label: "GitHub" },
              { icon: "fas fa-envelope", href: "mailto:sushantsharma5128@gmail.com", label: "Email" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-contrast hover:border-accent transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                aria-label={social.label}
              >
                <i className={`${social.icon} text-lg group-hover:scale-110 transition-transform`} />
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleDownloadCV}
              className="btn-primary text-lg px-8 py-4"
            >
              <i className="fas fa-download mr-2" />
              Download CV
            </button>
            <Link href="/work" className="btn-secondary text-lg px-8 py-4">
              <i className="fas fa-eye mr-2" />
              View My Work
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-ranade font-bold text-text mb-6">
              What I Do
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Crafting digital experiences with cutting-edge technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "fas fa-code",
                title: "Frontend Development",
                description: "Creating beautiful, responsive interfaces with React, TypeScript, and modern CSS frameworks.",
                link: "/about"
              },
              {
                icon: "fas fa-server",
                title: "Backend Development", 
                description: "Building robust APIs and server-side applications with Node.js, Python, and cloud technologies.",
                link: "/about"
              },
              {
                icon: "fas fa-mobile-alt",
                title: "Full Stack Solutions",
                description: "End-to-end application development from concept to deployment with modern best practices.",
                link: "/work"
              }
            ].map((service, index) => (
              <Link key={index} href={service.link} className="card p-8 text-center group hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-accent-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-100 transition-colors duration-300">
                  <i className={`${service.icon} text-2xl text-accent group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <h3 className="text-xl font-ranade font-bold text-text mb-4 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-accent-50 to-accent-100/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: experience, label: experience.includes('month') ? "Experience in Months" : "Experience" },
              { number: "7+", label: "Projects Completed" },
              { number: "4+", label: "Happy Clients" },
              { number: "100%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div key={index}>
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
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-ranade font-bold text-text mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
            Let's collaborate and bring your ideas to life with modern web technologies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-lg px-8 py-4">
              <i className="fas fa-paper-plane mr-2" />
              Get In Touch
            </Link>
            <Link href="/work" className="btn-secondary text-lg px-8 py-4">
              <i className="fas fa-briefcase mr-2" />
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}