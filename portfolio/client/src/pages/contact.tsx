import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import LoadingScreen from "../components/loading-screen";
import { Link } from "wouter";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(true);
  const [showPlatformModal, setShowPlatformModal] = useState(false);

  const contactMethods = [
    {
      icon: "fas fa-envelope",
      title: "Email",
      value: "contact@sushantsharma.me",
      link: "mailto:contact@sushantsharma.me",
      description: "Send me an email for professional inquiries",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: "fab fa-discord",
      title: "Discord",
      value: "Justasushant",
      link: "https://discord.com/users/1054399503052050512",
      description: "Quick chat and project discussions",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      icon: "fab fa-instagram",
      title: "Instagram",
      value: "@justasushant",
      link: "https://instagram.com/justasushant",
      description: "Follow my creative journey",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      icon: "fab fa-github",
      title: "GitHub",
      value: "@Justasushant",
      link: "https://github.com/Justasushant",
      description: "Check out my open source work",
      color: "text-gray-700",
      bgColor: "bg-gray-50",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-ranade font-bold text-text mb-6">
              Let's Connect
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Ready to bring your ideas to life? I'd love to hear about your project and 
              discuss how we can create something amazing together.
            </p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                target={method.link.startsWith("http") ? "_blank" : undefined}
                rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className="card p-4 sm:p-8 group hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className={`w-10 h-10 sm:w-14 sm:h-14 ${method.bgColor} rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <i className={`${method.icon} text-base sm:text-xl ${method.color}`} />
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <h3 className="text-base sm:text-xl font-ranade font-bold text-text mb-1 sm:mb-2 group-hover:text-accent transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-accent font-medium mb-1 sm:mb-2 text-xs sm:text-base break-all overflow-hidden">
                      {method.value}
                    </p>
                    <p className="text-muted text-xs sm:text-sm leading-relaxed">
                      {method.description}
                    </p>
                  </div>
                  <i className="fas fa-arrow-right text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 hidden sm:block text-sm" />
                </div>
              </a>
            ))}
          </div>

          {/* CTA Section */}
          <div className="card p-12 text-center bg-gradient-to-br from-accent-50 to-accent-100/50">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-ranade font-bold text-text mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-lg text-muted mb-8">
                Whether you need a new website, web application, or want to improve 
                an existing project, I'm here to help bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowPlatformModal(true)}
                  className="btn-primary text-lg px-8 py-4"
                >
                  <i className="fas fa-paper-plane mr-2" />
                  Get In Touch
                </button>
                <Link
                  href="/work"
                  className="btn-secondary text-lg px-8 py-4"
                >
                  <i className="fas fa-eye mr-2" />
                  View My Work
                </Link>
              </div>
            </div>
          </div>

          {/* Platform Selection Modal */}
          {showPlatformModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-border max-w-md w-full relative shadow-2xl" style={{ backgroundColor: '#0F0F0F' }}>
                <button
                  onClick={() => setShowPlatformModal(false)}
                  className="absolute top-4 right-4 text-muted hover:text-text transition-colors p-2"
                >
                  <i className="fas fa-times text-xl" />
                </button>

                <h3 className="text-2xl font-ranade font-bold text-text mb-6 text-center">
                  Choose Your <span className="text-accent">Platform</span>
                </h3>

                <div className="space-y-3">
                  {contactMethods.slice(0, 3).map((method, index) => (
                    <a
                      key={index}
                      href={method.link}
                      target={method.link.startsWith("http") ? "_blank" : undefined}
                      rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="w-full bg-surface-2 hover:bg-accent-50 border border-border-light hover:border-accent/30 rounded-xl p-3 sm:p-4 flex items-center space-x-3 sm:space-x-4 transition-all duration-300 group"
                      onClick={() => setShowPlatformModal(false)}
                      style={{ backgroundColor: '#1A1A1A' }}
                    >
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 ${method.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <i className={`${method.icon} text-base sm:text-lg ${method.color}`} />
                      </div>
                      <div className="min-w-0 overflow-hidden">
                        <h4 className="font-semibold text-text group-hover:text-accent transition-colors text-sm sm:text-base">
                          {method.title}
                        </h4>
                        <p className="text-muted text-xs sm:text-sm break-all">
                          {method.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}