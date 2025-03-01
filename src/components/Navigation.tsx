
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
          ? 'bg-black/25 backdrop-blur-sm shadow-lg py-1' 
          : 'bg-transparent py-2'
      } border-b-4 border-minecraft-stone px-4`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="font-pixel text-2xl md:text-3xl text-white pixel-text-shadow flex items-center shimmer-effect transition-transform duration-300 hover:scale-105"
        >
          <img src="/images/DY25.png" alt="DY25" className="w-20 h-20" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block mx-auto">
          <ul className="flex justify-center space-x-5">
            {navItems.map((item) => (
              <li key={item.name} className="nav-item text-center">
                <Link 
                  to={item.path}
                  className={`font-minecraft px-3 py-2 block uppercase text-sm transition-all duration-200 ${
                    location.pathname === item.path 
                      ? 'bg-minecraft-grass text-white border-b-2 border-black/30' 
                      : 'text-white hover:bg-minecraft-stone/50'
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
          className="md:hidden text-white rounded-full p-2 hover:bg-minecraft-stone/30 transition-colors duration-200"
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
        <nav className="md:hidden bg-minecraft-dirt border-t-2 border-minecraft-stone animate-block-build">
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
                      ? 'bg-minecraft-grass text-white border-b-2 border-black/30' 
                      : 'text-white hover:bg-minecraft-stone/50'
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
    </header>
  );
};

export default Navigation;
