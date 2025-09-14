import { useState } from "react";
import { Link } from "wouter";
import ProjectModal from "./project-modal";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Desigambler.in",
      description:
        "Economy, spin & redeem, daily reward, redeem code coins system created",
      longDescription: "Desigambler.in is a comprehensive gaming platform featuring a robust economy system with coin-based transactions, engaging spin and redeem mechanics, daily reward systems to keep users coming back, and flexible redeem code functionality. Built with modern web technologies to ensure smooth performance and user experience.",
      status: "Development Completed",
      statusColor: "bg-warning/20 text-warning border-warning/30",
      features: [
        "Economy System",
        "Spin & Redeem",
        "Daily Rewards",
        "Redeem Codes",
      ],
      tech: ["React", "Node.js", "MongoDB", "Socket.io"],
      icon: "fas fa-coins",
      image: "https://i.postimg.cc/FsQ1sQF8/image.png",
      videoFile: "/assets/Desigamblers.mp4",
    },
    {
      id: 2,
      title: "Homeyrewards.pro",
      description:
        "Created whole website including all features from first website",
      longDescription: "Homeyrewards.pro is a complete rewards platform built from the ground up, featuring comprehensive user management systems, sophisticated reward mechanisms, and a powerful admin panel for seamless platform administration. This full-stack application demonstrates expertise in modern web development practices.",
      status: "Live & Running",
      statusColor: "bg-success/20 text-success border-success/30",
      features: [
        "Full Stack Development",
        "User Management",
        "Reward System",
        "Admin Panel",
      ],
      tech: ["React", "Express", "PostgreSQL", "Redis"],
      icon: "fas fa-home",
      link: "https://homeyrewards.pro",
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
      features: [
        "E-commerce Platform",
        "Mobile Shopping",
        "Payment Integration",
        "Order Management",
      ],
      tech: ["React", "Node.js", "Stripe", "MongoDB"],
      icon: "fas fa-mobile-alt",
      link: "https://shreeshyammobile.com",
      image: "https://i.postimg.cc/LsyZnQQf/image.png",
      videoFile: "/assets/ShreeShyamMobile.mp4",
    },
    {
      id: 4,
      title: "Coneiz",
      description:
        "Parent company platform providing comprehensive business solutions",
      longDescription: "Coneiz serves as a comprehensive parent company platform designed to provide end-to-end business solutions. The platform features advanced client management systems, digital solution frameworks, and scalable architecture built with modern technologies to support growing business needs.",
      status: "Live & Running",
      statusColor: "bg-success/20 text-success border-success/30",
      features: [
        "Business Solutions",
        "Platform Management",
        "Client Services",
        "Digital Solutions",
      ],
      tech: ["React", "Node.js", "PostgreSQL", "AWS"],
      icon: "fas fa-building",
      link: "https://coneiz.com",
      image: "https://i.postimg.cc/MTVxhvBT/image.png",
      videoFile: "/assets/coneiz.mp4",
    },
  ];

  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/20 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid-pattern"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-ranade font-bold mb-6">
            Featured Projects
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Here are some of the projects Sushant Sharma has worked on, showcasing expertise
            in React, TypeScript, Python, full-stack development and creative problem-solving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-accent/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-accent/10 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => {
                setSelectedProject(project);
                setIsModalOpen(true);
              }}
            >
              {/* Project Image */}
              {project.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                </div>
              )}

              <div className="p-6">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4"></div>
                <div
                  className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors"
                  role="img"
                  aria-label={`${project.title} project icon`}
                >
                  <i
                    className={`${project.icon} text-xl text-accent`}
                    aria-hidden="true"
                  ></i>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${project.statusColor}`}
                >
                  {project.status}
                </span>
              </div>

              {/* Project Info */}
              <h3 className="text-xl font-ranade font-bold mb-3 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                {project.description}
              </p>

              {/* Features */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">
                  Key Features:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {project.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-800/50 text-xs text-gray-300 rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">
                  Tech Stack:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-accent/10 text-xs text-accent rounded-md border border-accent/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <Link
                  href={`/work/${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                  className="btn-secondary text-sm px-4 py-2 w-full text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  View More Details
                </Link>
                <div className="flex items-center space-x-2 text-accent/60 group-hover:text-accent transition-colors">
                  <span className="text-sm font-medium">Click card for quick preview</span>
                  <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </section>
  );
}
