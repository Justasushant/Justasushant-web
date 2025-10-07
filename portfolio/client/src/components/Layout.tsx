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
    // Check if user has visited before
    const loaded = sessionStorage.getItem('hasLoadedBefore');
    
    if (!loaded) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('hasLoadedBefore', 'true');
        setHasLoadedBefore(true);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setHasLoadedBefore(true);
    }
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
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