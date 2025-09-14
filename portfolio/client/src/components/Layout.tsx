import { ReactNode } from "react";
import Navigation from "./navigation";
import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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