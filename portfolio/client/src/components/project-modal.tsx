
import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

interface ProjectModalProps {
  project: {
    id: number;
    title: string;
    description: string;
    longDescription?: string;
    status: string;
    statusColor: string;
    features: string[];
    tech: string[];
    icon: string;
    image: string;
    link?: string;
    videoFile?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
    }
  }, [isOpen]);

  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-surface border border-border">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <i className={`${project.icon} text-xl text-accent`} />
            </div>
            <div>
              <DialogTitle className="text-2xl font-ranade font-bold text-text">
                {project.title}
              </DialogTitle>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${project.statusColor} mt-2 inline-block`}>
                {project.status}
              </span>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Video */}
          {project.videoFile && (
            <div className="relative rounded-xl overflow-hidden bg-gray-900">
              <video
                ref={videoRef}
                className="w-full h-64 md:h-80 object-cover"
                controls
                muted
                loop
                poster={project.image}
              >
                <source src={project.videoFile} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {/* Project Image Fallback */}
          {!project.videoFile && (
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-lg font-ranade font-bold text-text mb-3">Project Overview</h3>
            <DialogDescription className="text-muted text-base leading-relaxed">
              {project.longDescription || project.description}
            </DialogDescription>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-ranade font-bold text-text mb-3">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <i className="fas fa-check-circle text-accent text-sm" />
                  <span className="text-muted text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-lg font-ranade font-bold text-text mb-3">Technology Stack</h3>
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

          {/* Live Project Button */}
          {project.link && (
            <div className="flex justify-center pt-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center space-x-2 group"
              >
                <span>View Live Project</span>
                <i className="fas fa-external-link-alt text-sm group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
