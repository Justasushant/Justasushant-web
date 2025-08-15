export default function ContactSection() {
  const contactMethods = [
    {
      icon: "fab fa-discord",
      title: "Discord",
      value: "pheonix#1234",
      link: "https://discord.com"
    },
    {
      icon: "fab fa-instagram", 
      title: "Instagram",
      value: "@pheonix_dev",
      link: "https://instagram.com"
    },
    {
      icon: "fas fa-envelope",
      title: "Email", 
      value: "contact@pheonix.dev",
      link: "mailto:contact@pheonix.dev"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-poppins font-bold mb-8">
          Get In <span className="text-flame-gradient">Touch</span>
        </h2>
        
        <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
          Ready to bring your ideas to life? Let's collaborate and create something amazing together.
        </p>
        
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => (
            <a 
              key={index}
              href={method.link}
              target={method.link.startsWith('http') ? '_blank' : undefined}
              rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group bg-gray-900/50 p-8 rounded-xl hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-flame/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-flame/30 transition-colors">
                <i className={`${method.icon} text-2xl text-flame`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
              <p className="text-gray-400">{method.value}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
