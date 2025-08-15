export default function AboutSection() {
  const skills = [
    {
      icon: "fas fa-code",
      title: "Web Development",
      description: "Creating responsive and modern web applications using latest technologies."
    },
    {
      icon: "fab fa-python",
      title: "Python Development",
      description: "Building powerful backend solutions and automation scripts with Python."
    },
    {
      icon: "fas fa-palette",
      title: "Logo Design",
      description: "Crafting unique and memorable brand identities through creative logo design."
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-poppins font-bold mb-8">
          About <span className="text-flame-gradient">Me</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="bg-gray-900/50 p-6 rounded-xl hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-flame/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${skill.icon} text-2xl text-flame`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
              <p className="text-gray-400">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
