
import { useEffect, useState } from "react";
import loadingVideo from "../assets/loading.mp4";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps = {}) {
  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    if (onLoadingComplete) {
      onLoadingComplete();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center" 
      style={{backgroundColor: '#000000'}}
    >
      <video
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="w-full h-full object-contain max-w-2xl"
        style={{ maxHeight: '90vh' }}
      >
        <source src={loadingVideo} type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        <div className="flex space-x-2">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="w-3 h-3 bg-accent rounded-full animate-bounce"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: '1.2s'
              }}
            ></div>
          ))}
        </div>
      </video>
    </div>
  );
}
