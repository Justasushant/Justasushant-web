import Layout from "../components/Layout";
import ProjectModal from "../components/project-modal";
import { useState } from "react";
import { Link } from "wouter";

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Desigambler.in",
      description: "Economy, spin & redeem, daily reward, redeem code coins system created",
      longDescription: "Desigambler.in is a comprehensive gaming platform featuring a robust economy system with coin-based transactions, engaging spin and redeem mechanics, daily reward systems to keep users coming back, and flexible redeem code functionality. Built with modern web technologies to ensure smooth performance and user experience.",
      status: "Development Completed",
      statusColor: "bg-warning/20 text-warning border-warning/30",
      features: ["Economy System", "Spin & Redeem", "Daily Rewards", "Redeem Codes"],
      tech: ["React", "Node.js", "MongoDB", "Socket.io"],
      icon: "fas fa-coins",
      image: "https://i.postimg.cc/FsQ1sQF8/image.png",
      videoFile: "/assets/Desigamblers.mp4",
    },
    {
      id: 2,
      title: "Homeyrewards.pro",
      description: "Created whole website including all features from first website",
      longDescription: "Homeyrewards.pro is a complete rewards platform built from the ground up, featuring comprehensive user management systems, sophisticated reward mechanisms, and a powerful admin panel for seamless platform administration. This full-stack application demonstrates expertise in modern web development practices.",
      status: "No Longer Active",
      statusColor: "bg-gray-500/20 text-gray-400 border-gray-500/30",
      features: ["Full Stack Development", "User Management", "Reward System", "Admin Panel"],
      tech: ["React", "Express", "PostgreSQL", "Redis"],
      icon: "fas fa-home",
      image: "https://i.postimg.cc/15cX8Yft/image.png",
      videoFile: "/assets/homey.mp4",
    },
    {
      id: 3,
      title: "Shreeshyammobile.com",
      description: "Mobile shopping website online ecommerce platform",
      longDescription: "Shreeshyammobile.com is a feature-rich e-commerce platform specialized for mobile device sales. It includes comprehensive product catalogs, secure payment processing through Stripe integration, efficient order management systems, and responsive design optimized for all devices to provide the best shopping experience.",
      status: "Live & Running",
      statusColor: "bg-success/20 text-success border-success/30",
      features: ["E-commerce Platform", "Mobile Shopping", "Payment Integration", "Order Management"],
      tech: ["React", "Node.js", "Stripe", "MongoDB"],
      icon: "fas fa-mobile-alt",
      link: "https://shreeshyammobile.com",
      image: "https://i.postimg.cc/LsyZnQQf/image.png",
      videoFile: "/assets/ShreeShyamMobile.mp4",
    },
    {
      id: 4,
      title: "Coneiz",
      description: "Parent company platform providing comprehensive business solutions",
      longDescription: "Coneiz serves as a comprehensive parent company platform designed to provide end-to-end business solutions. The platform features advanced client management systems, digital solution frameworks, and scalable architecture built with modern technologies to support growing business needs.",
      status: "Live & Running",
      statusColor: "bg-success/20 text-success border-success/30",
      features: ["Business Solutions", "Platform Management", "Client Services", "Digital Solutions"],
      tech: ["React", "Node.js", "PostgreSQL", "AWS"],
      icon: "fas fa-building",
      link: "https://coneiz.com",
      image: "https://i.postimg.cc/MTVxhvBT/image.png",
      videoFile: "/assets/coneiz.mp4",
    },
  ];

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

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
                className="card p-8 group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleProjectClick(project)}
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

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/work/${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                    className="btn-secondary inline-flex items-center space-x-2 group/view"
                  >
                    <span>View More</span>
                    <i className="fas fa-arrow-right text-sm group-hover/view:translate-x-1 transition-transform" />
                  </Link>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center space-x-2 group/link"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                      }}
                    >
                      <span>View Live Project</span>
                      <i className="fas fa-external-link-alt text-sm group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && selectedProject && (
        <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </Layout>
  );
}