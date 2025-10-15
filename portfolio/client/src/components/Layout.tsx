import { ReactNode, useEffect, useState } from "react";
import Navigation from "./navigation";
import Footer from "./footer";
import LoadingScreen from "./loading-screen";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [hasLoadedBefore, setHasLoadedBefore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user has visited before and when
    const lastLoadTime = localStorage.getItem('lastLoadTime');
    const now = Date.now();
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
    const twoHours = 2 * oneHour; // 2 hours in milliseconds
    
    if (!lastLoadTime) {
      // First time visiting
      setIsLoading(true);
    } else {
      const timeSinceLastLoad = now - parseInt(lastLoadTime);
      
      // Random time between 1-2 hours
      const minTime = oneHour;
      const maxTime = twoHours;
      
      if (timeSinceLastLoad >= minTime && timeSinceLastLoad <= maxTime) {
        // Show loading screen if it's been between 1-2 hours
        setIsLoading(true);
      } else if (timeSinceLastLoad > maxTime) {
        // Definitely show if it's been more than 2 hours
        setIsLoading(true);
      } else {
        // Less than 1 hour, skip loading screen
        setHasLoadedBefore(true);
      }
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    localStorage.setItem('lastLoadTime', Date.now().toString());
    setHasLoadedBefore(true);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background text-text">
      <Navigation />
      <main className="pt-16 pb-20 md:pb-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}