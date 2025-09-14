import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/contact", label: "Contact" }
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800/50">
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
              <span className="font-ranade font-bold text-white text-lg hidden sm:block">
                Sushant
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-full px-2 py-2 border border-gray-700/50">
              <div className="flex space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? "text-black bg-orange-500 shadow-lg shadow-orange-500/25"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-pulse" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-orange-500 transition-colors duration-200 p-2"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black backdrop-blur-sm border-t border-gray-800 rounded-b-xl">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-black bg-orange-500"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}