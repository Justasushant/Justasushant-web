import { Link, useLocation } from "wouter";
import { useSound } from "../contexts/sound-context";

export default function Navigation() {
  const [location] = useLocation();
  const { playHoverSound, playClickSound } = useSound();

  const navItems = [
    { href: "/", label: "Home", icon: "fas fa-home" },
    { href: "/about", label: "About", icon: "fas fa-user" },
    { href: "/work", label: "Work", icon: "fas fa-briefcase" },
    { href: "/contact", label: "Contact", icon: "fas fa-envelope" }
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden bg-transparent">
                  <img 
                    src="https://i.postimg.cc/C1ZQC9Tt/Pheonix-logo-png.png" 
                    alt="Sushant Portfolio Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-ranade font-bold text-white text-lg">
                  Sushant
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="flex">
              <div className="bg-white/5 backdrop-blur-md rounded-full px-2 py-2 border border-white/10 shadow-lg shadow-black/20">
                <div className="flex space-x-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onMouseEnter={playHoverSound}
                      onClick={playClickSound}
                      className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        isActive(item.href)
                          ? "text-white bg-white/20 shadow-lg shadow-black/20"
                          : "text-gray-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar with Logo Only */}
      <nav className="fixed w-full top-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10 md:hidden">
        <div className="px-4 py-3">
          <div className="flex justify-center">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden bg-transparent">
                <img 
                  src="https://i.postimg.cc/C1ZQC9Tt/Pheonix-logo-png.png" 
                  alt="Sushant Portfolio Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-ranade font-bold text-white text-lg">
                Sushant
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-t border-white/10 md:hidden">
        <div className="grid grid-cols-4 py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className={`flex flex-col items-center py-2 px-1 transition-all duration-300 ${
                isActive(item.href)
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <div className={`p-2 rounded-full transition-all duration-300 ${
                isActive(item.href)
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`}>
                <i className={`${item.icon} text-lg`} />
              </div>
              <span className="text-xs font-medium mt-1 tracking-wide">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}