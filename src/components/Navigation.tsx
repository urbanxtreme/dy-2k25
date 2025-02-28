
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-minecraft-dirt border-b-4 border-minecraft-stone px-4 py-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-pixel text-2xl md:text-3xl text-white pixel-text-shadow flex items-center">
          <span className="text-minecraft-grass">Mine</span>
          <span className="text-minecraft-gold">Fest</span>
          <span className="ml-2 text-sm bg-minecraft-redstone text-white px-2 py-0.5">2024</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-1">
            {navItems.map((item) => (
              <li key={item.name}>
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
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-minecraft-dirt border-t-2 border-minecraft-stone animate-block-build">
          <ul className="px-4 py-2">
            {navItems.map((item) => (
              <li key={item.name} className="mb-1 last:mb-0">
                <Link 
                  to={item.path}
                  className={`font-minecraft px-3 py-2 block uppercase text-sm ${
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
      )}
    </header>
  );
};

export default Navigation;
