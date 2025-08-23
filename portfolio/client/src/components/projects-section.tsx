export default function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: "Desigambler.in",
      description:
        "Economy, spin & redeem, daily reward, redeem code coins system created",
      status: "Currently down",
      statusColor: "bg-red-500/20 text-red-400 border-red-500/30",
      features: [
        "Economy System",
        "Spin & Redeem",
        "Daily Rewards",
        "Redeem Codes",
      ],
      tech: ["React", "Node.js", "MongoDB", "Socket.io"],
      icon: "fas fa-coins",
    },
    {
      id: 2,
      title: "Homeyrewards.pro",
      description:
        "Created whole website including all features from first website",
      status: "Currently running",
      statusColor: "bg-green-500/20 text-green-400 border-green-500/30",
      features: [
        "Full Stack Development",
        "User Management",
        "Reward System",
        "Admin Panel",
      ],
      tech: ["React", "Express", "PostgreSQL", "Redis"],
      icon: "fas fa-home",
      link: "https://homeyrewards.pro",
    },
    {
      id: 3,
      title: "Shreeshyammobile.com",
      description: "Mobile shopping website online ecommerce platform",
      status: "Currently up",
      statusColor: "bg-green-500/20 text-green-400 border-green-500/30",
      features: [
        "E-commerce Platform",
        "Mobile Shopping",
        "Payment Integration",
        "Order Management",
      ],
      tech: ["React", "Node.js", "Stripe", "MongoDB"],
      icon: "fas fa-mobile-alt",
      link: "https://shreeshyammobile.com",
    },
    {
      id: 4,
      title: "Coneiz",
      description:
        "Parent company platform providing comprehensive business solutions",
      status: "Currently active",
      statusColor: "bg-green-500/20 text-green-400 border-green-500/30",
      features: [
        "Business Solutions",
        "Platform Management",
        "Client Services",
        "Digital Solutions",
      ],
      tech: ["React", "Node.js", "PostgreSQL", "AWS"],
      icon: "fas fa-building",
      link: "https://coneiz.com",
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold mb-6">
            Sushant Sharma's Featured Projects
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
              className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-flame/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-flame/10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 bg-flame/20 rounded-xl flex items-center justify-center group-hover:bg-flame/30 transition-colors"
                  role="img"
                  aria-label={`${project.title} project icon`}
                >
                  <i
                    className={`${project.icon} text-xl text-flame`}
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
              <h3 className="text-xl font-poppins font-bold mb-3 group-hover:text-flame transition-colors">
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
                      className="px-2 py-1 bg-flame/10 text-xs text-flame rounded-md border border-flame/20"
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
                  className="inline-flex items-center space-x-2 text-flame hover:text-flame-light transition-colors group/link"
                >
                  <span className="text-sm font-medium">View Project</span>
                  <i className="fas fa-external-link-alt text-xs group-hover/link:translate-x-1 transition-transform"></i>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
