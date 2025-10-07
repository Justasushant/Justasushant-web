
import { useParams, Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import LoadingScreen from "../components/loading-screen";

export default function ProjectDetail() {
  const { projectName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const projects = [
    {
      id: 1,
      title: "Desigambler.in",
      slug: "desigambler-in",
      description: "Economy, spin & redeem, daily reward, redeem code coins system created",
      longDescription: "Desigambler.in is a comprehensive gaming platform featuring a robust economy system with coin-based transactions, engaging spin and redeem mechanics, daily reward systems to keep users coming back, and flexible redeem code functionality. Built with modern web technologies to ensure smooth performance and user experience.",
      detailedDescription: "This gaming platform represents a complete ecosystem where users can engage with various game mechanics while managing their virtual economy. The platform features a sophisticated coin-based transaction system that allows users to earn, spend, and manage virtual currency through multiple interactive features. The spin and redeem system provides an engaging way for users to win rewards, while the daily reward system ensures consistent user engagement. The redeem code functionality allows for promotional activities and special events, making the platform dynamic and exciting for users.",
      status: "Development Completed",
      statusColor: "bg-warning/20 text-warning border-warning/30",
      features: [
        "Economy System with Virtual Currency",
        "Interactive Spin & Redeem Mechanics", 
        "Daily Reward System",
        "Promotional Redeem Codes",
        "User Account Management",
        "Real-time Coin Transactions",
        "Responsive Gaming Interface",
        "Admin Dashboard for Management"
      ],
      tech: ["React", "Node.js", "MongoDB", "Socket.io", "Express.js", "JWT Authentication"],
      icon: "fas fa-coins",
      image: "https://i.postimg.cc/FsQ1sQF8/image.png",
      videoFile: "/assets/Desigamblers.mp4",
      challenges: "Building a secure economy system while maintaining engaging gameplay mechanics.",
      outcome: "Successfully created a feature-rich gaming platform with robust coin management."
    },
    {
      id: 2,
      title: "Homeyrewards.pro",
      slug: "homeyrewards-pro",
      description: "Created whole website including all features from first website",
      longDescription: "Homeyrewards.pro is a complete rewards platform built from the ground up, featuring comprehensive user management systems, sophisticated reward mechanisms, and a powerful admin panel for seamless platform administration. This full-stack application demonstrates expertise in modern web development practices.",
      detailedDescription: "Homeyrewards.pro stands as a testament to full-stack development expertise, built entirely from scratch to provide a comprehensive rewards ecosystem. The platform features an advanced user management system that handles registration, authentication, and profile management with sophisticated security measures. The reward system is designed to be flexible and scalable, allowing administrators to create various types of rewards and manage distribution efficiently. The admin panel provides complete control over platform operations, user management, and analytics, making it a powerful tool for business operations.",
      status: "No Longer Active",
      statusColor: "bg-gray-500/20 text-gray-400 border-gray-500/30",
      features: [
        "Complete Full Stack Development",
        "Advanced User Management System",
        "Flexible Reward Distribution System",
        "Comprehensive Admin Panel",
        "Real-time Analytics Dashboard",
        "Secure Authentication System",
        "Responsive Design for All Devices",
        "API Integration for Third-party Services"
      ],
      tech: ["React", "Express", "PostgreSQL", "Redis", "JWT", "Chart.js"],
      icon: "fas fa-home",
      image: "https://i.postimg.cc/15cX8Yft/image.png",
      videoFile: "/assets/homey.mp4",
      challenges: "Creating a scalable reward system that could handle multiple reward types and user tiers.",
      outcome: "Successfully developed a fully functional rewards platform with comprehensive features."
    },
    {
      id: 3,
      title: "Shreeshyammobile.com",
      slug: "shreeshyammobile-com",
      description: "Mobile shopping website online ecommerce platform",
      longDescription: "Shreeshyammobile.com is a feature-rich e-commerce platform specialized for mobile device sales. It includes comprehensive product catalogs, secure payment processing through Stripe integration, efficient order management systems, and responsive design optimized for all devices to provide the best shopping experience.",
      detailedDescription: "Shreeshyammobile.com represents a complete e-commerce solution tailored specifically for the mobile device market. The platform features an extensive product catalog system that allows for detailed product descriptions, multiple image galleries, and comprehensive specifications for each mobile device. The integration with Stripe ensures secure and reliable payment processing, supporting multiple payment methods and currencies. The order management system provides complete tracking from purchase to delivery, with automated notifications and status updates. The platform is built with mobile-first design principles, ensuring optimal performance across all devices.",
      status: "Live & Running",
      statusColor: "bg-success/20 text-success border-success/30",
      features: [
        "Complete E-commerce Platform",
        "Mobile Device Specialization",
        "Secure Stripe Payment Integration",
        "Advanced Order Management System",
        "Product Catalog with Detailed Specs",
        "Customer Account Management",
        "Mobile-First Responsive Design",
        "Shopping Cart and Wishlist Functionality"
      ],
      tech: ["React", "Node.js", "Stripe", "MongoDB", "Express.js", "Cloudinary"],
      icon: "fas fa-mobile-alt",
      link: "https://shreeshyammobile.com",
      image: "https://i.postimg.cc/LsyZnQQf/image.png",
      videoFile: "/assets/ShreeShyamMobile.mp4",
      challenges: "Implementing secure payment processing and creating an intuitive mobile shopping experience.",
      outcome: "Successfully launched an e-commerce platform with active sales and positive customer reviews."
    },
    {
      id: 4,
      title: "Coneiz",
      slug: "coneiz",
      description: "Parent company platform providing comprehensive business solutions",
      longDescription: "Coneiz serves as a comprehensive parent company platform designed to provide end-to-end business solutions. The platform features advanced client management systems, digital solution frameworks, and scalable architecture built with modern technologies to support growing business needs.",
      detailedDescription: "Coneiz represents a sophisticated business platform designed to serve as a comprehensive solution for modern enterprises. The platform integrates multiple business functions into a unified ecosystem, featuring advanced client relationship management, project tracking, and service delivery systems. The digital solution framework allows businesses to streamline their operations while maintaining high levels of customization and scalability. Built with enterprise-grade architecture, the platform supports multiple business units and can scale to accommodate growing organizational needs.",
      status: "Live & Running",
      statusColor: "bg-success/20 text-success border-success/30",
      features: [
        "Comprehensive Business Solutions Platform",
        "Advanced Client Management System",
        "Project Tracking and Management",
        "Digital Solution Frameworks",
        "Scalable Enterprise Architecture",
        "Multi-tenant Support",
        "Analytics and Reporting Dashboard",
        "Integration with Third-party Services"
      ],
      tech: ["React", "Node.js", "PostgreSQL", "AWS", "Docker", "Redis"],
      icon: "fas fa-building",
      link: "https://coneiz.com",
      image: "https://i.postimg.cc/MTVxhvBT/image.png",
      videoFile: "/assets/coneiz.mp4",
      challenges: "Building a scalable platform that could serve multiple business units with different requirements.",
      outcome: "Successfully deployed an enterprise platform supporting multiple clients and business operations."
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const foundProject = projects.find(p => p.slug === projectName);
    setProject(foundProject);
  }, [projectName]);

  useEffect(() => {
    if (project && videoRef.current) {
      videoRef.current.play();
    }
  }, [project]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!project) {
    return (
      <Layout>
        <div className="py-20 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-ranade font-bold text-text mb-6">Project Not Found</h1>
          <p className="text-muted mb-8">The requested project could not be found.</p>
          <Link href="/work" className="btn-primary">
            Back to Projects
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/work" className="inline-flex items-center space-x-2 text-accent hover:text-accent-600 transition-colors">
              <i className="fas fa-arrow-left" />
              <span>Back to Projects</span>
            </Link>
          </div>

          {/* Project Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center">
                <i className={`${project.icon} text-3xl text-accent`} />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-ranade font-bold text-text">
                  {project.title}
                </h1>
                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${project.statusColor} mt-2 inline-block`}>
                  {project.status}
                </span>
              </div>
            </div>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              {project.description}
            </p>
          </div>

          {/* Video Section */}
          <div className="mb-12">
            <div className="relative rounded-2xl overflow-hidden bg-surface-2 shadow-2xl">
              <video
                ref={videoRef}
                className="w-full h-64 md:h-96 lg:h-[500px] object-cover"
                controls
                muted
                loop
                poster={project.image}
              >
                <source src={project.videoFile} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <div className="card p-8">
                <h2 className="text-2xl font-ranade font-bold text-text mb-4">About This Project</h2>
                <p className="text-muted text-lg leading-relaxed mb-6">
                  {project.detailedDescription}
                </p>
                
                {/* Challenge & Outcome */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-ranade font-bold text-text mb-2">Challenge</h3>
                    <p className="text-muted">{project.challenges}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-ranade font-bold text-text mb-2">Outcome</h3>
                    <p className="text-muted">{project.outcome}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="card p-8">
                <h2 className="text-2xl font-ranade font-bold text-text mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <i className="fas fa-check-circle text-accent text-lg" />
                      <span className="text-muted">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tech Stack */}
              <div className="card p-6">
                <h3 className="text-lg font-ranade font-bold text-text mb-4">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-2 bg-accent-50 text-accent text-sm font-medium rounded-full border border-accent/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              <div className="card p-6">
                <h3 className="text-lg font-ranade font-bold text-text mb-4">Project Links</h3>
                <div className="space-y-3">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full inline-flex items-center justify-center space-x-2"
                    >
                      <span>View Live Project</span>
                      <i className="fas fa-external-link-alt text-sm" />
                    </a>
                  )}
                  <Link href="/contact" className="btn-secondary w-full inline-flex items-center justify-center space-x-2">
                    <span>Discuss Similar Project</span>
                    <i className="fas fa-comments text-sm" />
                  </Link>
                </div>
              </div>

              {/* Project Stats */}
              <div className="card p-6">
                <h3 className="text-lg font-ranade font-bold text-text mb-4">Project Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted">Status:</span>
                    <span className="text-text font-medium">{project.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Technologies:</span>
                    <span className="text-text font-medium">{project.tech.length}+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Features:</span>
                    <span className="text-text font-medium">{project.features.length}+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center card p-12">
            <h2 className="text-3xl font-ranade font-bold text-text mb-4">
              Interested in a Similar Project?
            </h2>
            <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
              Let's discuss how we can bring your ideas to life with modern web technologies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                <i className="fas fa-paper-plane mr-2" />
                Start a Conversation
              </Link>
              <Link href="/work" className="btn-secondary text-lg px-8 py-4">
                <i className="fas fa-briefcase mr-2" />
                View All Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
