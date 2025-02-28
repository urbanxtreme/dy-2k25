
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Interactive Map', path: '/map' },
    { name: 'About & Contact', path: '/about' },
  ];
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
    
    // Handle scroll events for header appearance
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-minecraft-bedrock/95 backdrop-blur-sm shadow-lg py-1' 
          : 'bg-minecraft-bedrock py-2'
      } border-b-4 border-minecraft-magenta px-4`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="font-pixel text-2xl md:text-3xl text-white pixel-text-shadow flex items-center shimmer-effect transition-transform duration-300 hover:scale-105 minecraft-3d-element"
        >
          <span className="text-minecraft-magenta">Mine</span>
          <span className="text-minecraft-cyan">Fest</span>
          <span className="ml-2 text-sm bg-minecraft-magenta text-white px-2 py-0.5 transform rotate-2 hover:rotate-0 transition-transform duration-300">2024</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-2">
            {navItems.map((item) => (
              <li key={item.name} className="nav-item">
                <Link 
                  to={item.path}
                  className={`font-minecraft px-3 py-2 block uppercase text-sm transition-all duration-200 ${
                    location.pathname === item.path 
                      ? 'bg-minecraft-magenta text-white border-b-2 border-minecraft-magenta-dark shadow-minecraft' 
                      : 'text-white hover:bg-minecraft-obsidian-light'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white rounded-full p-2 hover:bg-minecraft-magenta/20 transition-colors duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X size={24} className="animate-in fade-in" />
          ) : (
            <Menu size={24} className="animate-in fade-in" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-minecraft-bedrock border-t-2 border-minecraft-magenta/50 animate-block-build">
          <ul className="px-4 py-4">
            {navItems.map((item, index) => (
              <li 
                key={item.name} 
                className="mb-2 last:mb-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link 
                  to={item.path}
                  className={`font-minecraft px-3 py-3 block uppercase text-sm ${
                    location.pathname === item.path 
                      ? 'bg-minecraft-magenta text-white border-b-2 border-minecraft-magenta-dark' 
                      : 'text-white hover:bg-minecraft-cyan/20'
                  } rounded transition-all duration-200 flex items-center justify-between`}
                >
                  <span>{item.name}</span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-200 ${
                      location.pathname === item.path ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Add torch lights with magenta/cyan glow */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-8 hidden md:block">
        <div className="magenta-ore-glow w-4 h-4 bg-minecraft-magenta/70"></div>
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-8 hidden md:block">
        <div className="cyan-ore-glow w-4 h-4 bg-minecraft-cyan/70"></div>
      </div>
    </header>
  );
};

export default Navigation;
