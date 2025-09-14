import Layout from "../components/Layout";
import ProjectsSection from "../components/projects-section";
import { useState, useEffect } from "react";
import LoadingScreen from "../components/loading-screen";

export default function Work() {
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

  const projects = [
    {
      id: 1,
      title: "Desigambler.in",
      description: "Economy, spin & redeem, daily reward, redeem code coins system created",
      status: "Development Completed",
      statusColor: "bg-warning/10 text-warning border-warning/20",
      features: ["Economy System", "Spin & Redeem", "Daily Rewards", "Redeem Codes"],
      tech: ["React", "Node.js", "MongoDB", "Socket.io"],
      icon: "fas fa-coins",
      image: "https://i.postimg.cc/FsQ1sQF8/image.png",
    },
    {
      id: 2,
      title: "Homeyrewards.pro",
      description: "Created whole website including all features from first website",
      status: "Live & Running",
      statusColor: "bg-success/10 text-success border-success/20",
      features: ["Full Stack Development", "User Management", "Reward System", "Admin Panel"],
      tech: ["React", "Express", "PostgreSQL", "Redis"],
      icon: "fas fa-home",
      link: "https://homeyrewards.pro",
      image: "https://i.postimg.cc/15cX8Yft/image.png",
    },
    {
      id: 3,
      title: "Shreeshyammobile.com",
      description: "Mobile shopping website online ecommerce platform",
      status: "Live & Running",
      statusColor: "bg-success/10 text-success border-success/20",
      features: ["E-commerce Platform", "Mobile Shopping", "Payment Integration", "Order Management"],
      tech: ["React", "Node.js", "Stripe", "MongoDB"],
      icon: "fas fa-mobile-alt",
      link: "https://shreeshyammobile.com",
      image: "https://i.postimg.cc/LsyZnQQf/image.png",
    },
    {
      id: 4,
      title: "Coneiz",
      description: "Parent company platform providing comprehensive business solutions",
      status: "Live & Running",
      statusColor: "bg-success/10 text-success border-success/20",
      features: ["Business Solutions", "Platform Management", "Client Services", "Digital Solutions"],
      tech: ["React", "Node.js", "PostgreSQL", "AWS"],
      icon: "fas fa-building",
      link: "https://coneiz.com",
      image: "https://i.postimg.cc/MTVxhvBT/image.png",
    },
  ];

  return (
    <Layout>
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-ranade font-bold text-text mb-6">
              Featured Projects
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Explore my recent work showcasing expertise in React, TypeScript, Python, and modern web development
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="card p-8 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image */}
                <div className="relative mb-6 rounded-xl overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center">
                      <i className={`${project.icon} text-xl text-accent`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-ranade font-bold text-text mb-1">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${project.statusColor} self-start`}>
                    {project.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-muted mb-6 text-lg leading-relaxed">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-text mb-3 uppercase tracking-wide">
                    Key Features
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-surface-2 text-text-light text-sm rounded-full border border-border-light"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-text mb-3 uppercase tracking-wide">
                    Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-accent-50 text-accent text-sm font-medium rounded-full border border-accent/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Link */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center space-x-2 group/link"
                  >
                    <span>View Live Project</span>
                    <i className="fas fa-external-link-alt text-sm group-hover/link:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}