import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Interactive Map", path: "/map" },
    { name: "About & Contact", path: "/about" },
    { name: "Registeration", path: "/event-registration" },
  ];

  useEffect(() => {
    setIsMenuOpen(false);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/25 backdrop-blur-sm shadow-lg py-1"
          : "bg-transparent py-2"
      } border-b-4 border-minecraft-stone px-4`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side - Logo & Mobile Registration Button */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="font-pixel text-2xl md:text-3xl text-white pixel-text-shadow flex items-center transition-transform duration-300"
          >
            <img
              src="/images/logolast.svg"
              alt="DY25"
              className="w-20 h-13 hover:animate-pulse"
              onMouseEnter={(e) => {
                (e.target as HTMLImageElement).src = "/images/DY25.png";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLImageElement).src = "/images/logolast.svg";
              }}
            />
          </Link>

          {/* Mobile-only Registration Button */}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block flex-1 mx-4">
          <ul className="flex justify-center space-x-3 lg:space-x-5">
            {navItems.map((item) => (
              <li key={item.name} className="nav-item text-center">
                <Link
                  to={item.path}
                  className={`font-minecraft px-3 py-2 block uppercase text-sm transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-minecraft-grass text-white border-b-2 border-black/30"
                      : "text-white hover:bg-minecraft-stone/50"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side - Desktop Registration Button & Mobile Menu */}
        <div className="flex items-center gap-3 ml-4">
          {/* Desktop-only Registration Button */}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white rounded-full p-2 hover:bg-minecraft-stone/30 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
                      ? "bg-navy text-white border-b-2 border-black/30"
                      : "text-white hover:bg-minecraft-stone/50"
                  } rounded transition-all duration-200 flex items-center justify-between`}
                >
                  <span>{item.name}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      location.pathname === item.path
                        ? "rotate-180"
                        : "rotate-0"
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
