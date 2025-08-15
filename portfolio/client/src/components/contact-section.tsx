
export default function ContactSection() {
  const contactMethods = [
    {
      icon: "fab fa-discord",
      title: "Discord",
      value: "justasushant#1234",
      link: "https://discord.com"
    },
    {
      icon: "fab fa-instagram", 
      title: "Instagram",
      value: "@justasushant",
      link: "https://instagram.com/justasushant"
    },
    {
      icon: "fas fa-envelope",
      title: "Email", 
      value: "contact@justasushant.dev",
      link: "mailto:contact@justasushant.dev"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-flame/20 rounded-full blur-3xl transform -translate-x-1/2"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold mb-6">
          Get In <span className="bg-gradient-to-r from-flame to-flame-light bg-clip-text text-transparent">Touch</span>
        </h2>
        
        <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          Ready to bring your ideas to life? Let's collaborate and create something amazing together. 
          I'm always excited to work on new and challenging projects.
        </p>
        
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {contactMethods.map((method, index) => (
            <a 
              key={index}
              href={method.link}
              target={method.link.startsWith('http') ? '_blank' : undefined}
              rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-flame/30 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-flame/10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-flame/20 to-flame-light/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-flame/30 group-hover:to-flame-light/30 transition-all duration-300">
                <i className={`${method.icon} text-2xl text-flame group-hover:scale-110 transition-transform duration-300`}></i>
              </div>
              <h3 className="text-xl font-poppins font-bold mb-3 group-hover:text-flame transition-colors">
                {method.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {method.value}
              </p>
            </a>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-flame/10 to-flame-light/10 rounded-2xl p-8 border border-flame/20">
          <h3 className="text-2xl font-poppins font-bold mb-4">
            Let's Build Something <span className="text-flame">Amazing</span>
          </h3>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">
            Have a project in mind? I'd love to hear about it and discuss how we can make it a reality.
          </p>
          <button className="flame-gradient text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 relative overflow-hidden group">
            <span className="relative z-10">Start a Conversation</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      </div>
    </section>
  );
}
