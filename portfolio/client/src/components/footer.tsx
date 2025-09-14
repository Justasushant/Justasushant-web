
import { calculateAge } from "../lib/calculateExperience";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-surface-2 border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-ranade font-bold text-text mb-4">About Sushant</h3>
            <p className="text-muted text-sm leading-relaxed mb-3">
              {calculateAge()} old passionate full-stack developer creating innovative digital solutions.
            </p>
            <p className="text-muted text-sm">
              Email: <a href="mailto:contact@sushantsharma.me" className="text-accent hover:underline">contact@sushantsharma.me</a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-ranade font-bold text-text mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-muted hover:text-accent transition-colors text-sm">Home</a></li>
              <li><a href="/about" className="text-muted hover:text-accent transition-colors text-sm">About</a></li>
              <li><a href="/work" className="text-muted hover:text-accent transition-colors text-sm">Work</a></li>
              <li><a href="/contact" className="text-muted hover:text-accent transition-colors text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-lg font-ranade font-bold text-text mb-4">Featured Projects</h3>
            <ul className="space-y-2">
              <li><a href="https://shreeshyammobile.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors text-sm">Shreeshyammobile.com</a></li>
              <li><a href="https://homeyrewards.pro" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors text-sm">Homeyrewards.pro</a></li>
              <li><a href="https://coneiz.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors text-sm">Coneiz</a></li>
              <li><span className="text-muted text-sm">Desigambler.in</span></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-ranade font-bold text-text mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://discord.com/users/1054399503052050512" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                <i className="fab fa-discord text-xl"></i>
              </a>
              <a href="https://instagram.com/justasushant" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="https://github.com/Justasushant" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                <i className="fab fa-github text-xl"></i>
              </a>
            </div>
            <button 
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/CV.pdf';
                link.download = 'Sushant_Sharma_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="text-sm bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
            >
              Download CV
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-muted text-sm">
                © {currentYear} Sushant Sharma. All rights reserved.
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-muted text-xs max-w-md">
                <i className="fas fa-info-circle mr-1"></i>
                Information on this website may not be up-to-date. Please contact directly for the most current details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
