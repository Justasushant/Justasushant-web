
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Expertise from './components/Expertise';
import Footer from './components/Footer';
import ProjectAssistant from './components/ProjectAssistant';
import ClientsPage from './components/ClientsPage';
import ClientDetailPage from './components/ClientDetailPage';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');

  const navigate = (path: string) => {
    if (path === currentPath) return;
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname || '/');
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (currentPath !== '/') {
      return;
    }

    const handleScroll = () => {
      const sections = ['home', 'work', 'about', 'expertise'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  const isClientDetailPage = currentPath.startsWith('/clients/');
  const clientSlug = isClientDetailPage ? currentPath.replace('/clients/', '') : '';

  return (
    <div className="min-h-screen bg-cream selection:bg-primary selection:text-white">
      <Navbar activeSection={activeSection} currentPath={currentPath} onNavigate={navigate} />
      
      <main>
        {currentPath === '/' && (
          <>
            <section id="home">
              <Hero />
            </section>

            <section id="work">
              <Work onNavigate={navigate} />
            </section>

            <section id="about">
              <About />
            </section>

            <section id="expertise">
              <Expertise />
            </section>
          </>
        )}

        {currentPath === '/clients' && <ClientsPage onNavigate={navigate} />}

        {isClientDetailPage && <ClientDetailPage slug={clientSlug} onNavigate={navigate} />}
      </main>

      <Footer />
      <ProjectAssistant />
    </div>
  );
};

export default App;
