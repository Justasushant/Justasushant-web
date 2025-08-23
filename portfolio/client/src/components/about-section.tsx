export default function AboutSection() {
  const skills = [
    {
      icon: "fas fa-code",
      title: "Frontend Development",
      description:
        "Creating responsive and modern web applications using React, TypeScript, and modern CSS frameworks.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    },
    {
      icon: "fab fa-python",
      title: "Python Development",
      description:
        "Building powerful backend solutions, automation scripts, and data processing applications with Python.",
      technologies: ["Django", "FastAPI", "Flask", "Pandas"],
    },
    {
      icon: "fas fa-database",
      title: "Full Stack Development",
      description:
        "End-to-end application development with modern databases, APIs, and deployment strategies.",
      technologies: ["PostgreSQL", "MongoDB", "REST APIs", "Docker"],
    },
  ];

  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-flame/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-flame-light/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold mb-6">
            About Me
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            I'm a passionate developer who loves creating innovative digital
            solutions. With expertise in modern web technologies and a keen eye
            for design, I transform ideas into powerful, user-friendly
            applications that make a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-flame/30 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-flame/10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="w-16 h-16 bg-gradient-to-br from-flame/20 to-flame-light/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-flame/30 group-hover:to-flame-light/30 transition-all duration-300"
                role="img"
                aria-label={`${skill.title} icon`}
              >
                <i
                  className={`${skill.icon} text-2xl text-flame group-hover:scale-110 transition-transform duration-300`}
                  aria-hidden="true"
                ></i>
              </div>

              <h3 className="text-xl font-poppins font-bold mb-4 text-center group-hover:text-flame transition-colors">
                {skill.title}
              </h3>

              <p className="text-gray-400 text-center mb-6 leading-relaxed">
                {skill.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap justify-center gap-2">
                {skill.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-flame/10 text-flame text-xs font-medium rounded-full border border-flame/20 hover:bg-flame/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { number: "4+", label: "Projects Completed" },
            { number: "5+", label: "Clients Served" },
            { number: "100%", label: "Client Satisfaction" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-flame mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
