import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, Github, Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import videos and images
import desigamblersVideo from "@/assets/Desigamblers.mp4";
import homeyrewardsVideo from "@/assets/Loggd in.mp4";
import shreeshyamVideo from "@/assets/ShreeShyamMobile.mp4";
import coneizVideo from "@/assets/coneiz.mp4";

import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";
import project4 from "@/assets/project4.jpg";

interface ProjectData {
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  features: string[];
  video: string;
  image: string;
  liveLink: string;
  category: string;
  timeline: string;
  role: string;
}

const projectsData: Record<string, ProjectData> = {
  desigamblers: {
    title: "Desigamblers.in",
    description: "A comprehensive gaming platform with interactive features",
    fullDescription: "Desigamblers.in is a full-stack gaming platform that combines interactive game features with a modern web design. Built with HTML, CSS, and JavaScript, this project showcases advanced frontend techniques and responsive design principles. The platform offers users an engaging gaming experience with seamless navigation and dynamic content.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Full Stack"],
    features: [
      "Interactive gaming interface",
      "Real-time game updates",
      "Responsive design for all devices",
      "User authentication system",
      "Dynamic content loading",
      "Optimized performance"
    ],
    video: desigamblersVideo,
    image: project1,
    liveLink: "https://desigamblers.in",
    category: "Gaming Platform",
    timeline: "2024",
    role: "Full Stack Developer & Designer"
  },
  homeyrewards: {
    title: "HomeyRewards",
    description: "A complete rewards management system",
    fullDescription: "HomeyRewards is a comprehensive rewards management platform that connects users with exciting offers and rewards. This full-stack application features both frontend and backend development, providing a seamless user experience. The platform includes user authentication, reward tracking, and a modern interface designed for maximum engagement.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Full Stack Development"],
    features: [
      "User registration and authentication",
      "Rewards tracking system",
      "Real-time updates",
      "Admin dashboard",
      "Responsive mobile design",
      "Secure payment integration"
    ],
    video: homeyrewardsVideo,
    image: project2,
    liveLink: "https://homeyrewards.pro",
    category: "Web Application",
    timeline: "2024",
    role: "Full Stack Developer"
  },
  shreeshyammobile: {
    title: "ShreeshyamMobile",
    description: "Modern e-commerce platform for mobile retail",
    fullDescription: "ShreeshyamMobile is a fully-featured e-commerce platform designed for mobile retail. The project encompasses product catalog management, shopping cart functionality, order processing, and payment integration. Built with a focus on user experience, the platform offers intuitive navigation and a clean, modern design that drives conversions.",
    technologies: ["E-commerce", "Full Stack", "Payment Gateway", "Responsive Design"],
    features: [
      "Product catalog management",
      "Shopping cart functionality",
      "Secure checkout process",
      "Order tracking system",
      "Admin inventory management",
      "Mobile-optimized interface"
    ],
    video: shreeshyamVideo,
    image: project3,
    liveLink: "https://shreeshyammobile.com",
    category: "E-commerce",
    timeline: "2024",
    role: "Full Stack Developer & UX Designer"
  },
  coneiz: {
    title: "Coneiz Corporate",
    description: "Professional corporate website design",
    fullDescription: "Coneiz Corporate is a professional corporate website that showcases modern web design principles. The project features a clean, business-oriented design with smooth animations and intuitive navigation. Built to represent the brand's professional image, the website includes company information, services, and contact functionality.",
    technologies: ["Web Design", "Corporate Branding", "Responsive Layout", "Modern CSS"],
    features: [
      "Professional corporate design",
      "Services showcase",
      "Company portfolio",
      "Contact form integration",
      "Smooth animations",
      "SEO optimized"
    ],
    video: coneizVideo,
    image: project4,
    liveLink: "https://coneiz.com",
    category: "Corporate Website",
    timeline: "2024",
    role: "Web Designer & Developer"
  }
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectsData[slug] : null;
  const [showSocialPopup, setShowSocialPopup] = useState(false);

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/" className="text-accent hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8 font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          {/* Project Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4">{project.title}</h1>
            <p className="text-xl text-muted-foreground">{project.description}</p>
          </div>

          {/* Project Info Grid */}
          {/* Project Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-6 bg-card border border-border rounded-2xl">
            <div>
              <h3 className="text-sm text-muted-foreground font-mono mb-2">CATEGORY</h3>
              <p className="font-semibold">{project.category}</p>
            </div>
            <div>
              <h3 className="text-sm text-muted-foreground font-mono mb-2">TIMELINE</h3>
              <p className="font-semibold">{project.timeline}</p>
            </div>
            <div>
              <h3 className="text-sm text-muted-foreground font-mono mb-2">ROLE</h3>
              <p className="font-semibold">{project.role}</p>
            </div>
          </div>

          {/* Video Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 font-mono">Project Demo</h2>
            <div className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-2xl">
              <video 
                controls 
                className="w-full"
                poster={project.image}
              >
                <source src={project.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Full Description */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 font-mono">About This Project</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 font-mono">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-secondary text-foreground rounded-full font-mono text-sm border border-border hover:border-accent transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 font-mono">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl hover:border-accent transition-colors"
                >
                  <span className="text-accent font-bold">✓</span>
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center p-8 bg-card border border-border rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 font-mono">Interested in a similar project?</h3>
            <p className="text-muted-foreground mb-6">Let's discuss how I can help bring your ideas to life.</p>
            <button
              onClick={() => setShowSocialPopup(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-background rounded-full font-semibold hover:scale-105 transition-all font-mono"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </main>

      {/* Social Popup Modal */}
      {showSocialPopup && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowSocialPopup(false)}
        >
          <div 
            className="bg-card border border-border rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-2 font-mono text-center">Get In Touch</h3>
            <p className="text-muted-foreground text-center mb-6">Choose your preferred way to connect</p>
            
            <div className="space-y-3">
              <a
                href="mailto:contact@sushantsharma.me"
                className="flex items-center gap-4 p-4 bg-secondary hover:bg-accent hover:text-background rounded-xl transition-all group w-full"
              >
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-foreground group-hover:text-accent" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Email</div>
                  <div className="text-sm text-muted-foreground group-hover:text-background/80">contact@sushantsharma.me</div>
                </div>
              </a>

              <a
                href="https://github.com/justasushant"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-secondary hover:bg-accent hover:text-background rounded-xl transition-all group w-full"
              >
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Github className="w-6 h-6 text-foreground group-hover:text-accent" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">GitHub</div>
                  <div className="text-sm text-muted-foreground group-hover:text-background/80">@justasushant</div>
                </div>
              </a>

              <a
                href="https://instagram.com/justasushant"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-secondary hover:bg-accent hover:text-background rounded-xl transition-all group w-full"
              >
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Instagram className="w-6 h-6 text-foreground group-hover:text-accent" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Instagram</div>
                  <div className="text-sm text-muted-foreground group-hover:text-background/80">@justasushant</div>
                </div>
              </a>

              <a
                href="https://discord.com/users/justasushant"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-secondary hover:bg-accent hover:text-background rounded-xl transition-all group w-full"
              >
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-foreground group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold">Discord</div>
                  <div className="text-sm text-muted-foreground group-hover:text-background/80">@justasushant</div>
                </div>
              </a>
            </div>

            <button
              onClick={() => setShowSocialPopup(false)}
              className="mt-6 w-full py-3 border border-border rounded-xl hover:bg-secondary transition-colors font-mono"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProjectDetail;