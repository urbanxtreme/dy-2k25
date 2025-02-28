
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Map, MapPin, Search, Move, X } from 'lucide-react';
import PixelButton from './PixelButton';

interface MapLocation {
  id: number;
  name: string;
  description: string;
  x: number;
  y: number;
  icon: string;
  link: string;
}

const MinecraftMap = () => {
  const [activeLocation, setActiveLocation] = useState<MapLocation | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showHelp, setShowHelp] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Sample map locations
  const locations: MapLocation[] = [
    {
      id: 1,
      name: "Tech Block",
      description: "Technical events and coding competitions",
      x: 20,
      y: 30,
      icon: "🖥️",
      link: "/events?category=technical"
    },
    {
      id: 2,
      name: "Culture Village",
      description: "Cultural performances and art exhibitions",
      x: 70,
      y: 40,
      icon: "🎭",
      link: "/events?category=cultural"
    },
    {
      id: 3,
      name: "Gaming Arena",
      description: "Gaming tournaments and competitions",
      x: 50,
      y: 60,
      icon: "🎮",
      link: "/events?category=gaming"
    },
    {
      id: 4,
      name: "Workshop Hall",
      description: "Workshops and learning sessions",
      x: 30,
      y: 70,
      icon: "📚",
      link: "/events?category=workshops"
    },
    {
      id: 5,
      name: "Food Court",
      description: "Various food and refreshment stalls",
      x: 80,
      y: 20,
      icon: "🍔",
      link: "/map?point=food"
    }
  ];

  useEffect(() => {
    if (activeLocation && tooltipRef.current) {
      gsap.fromTo(
        tooltipRef.current,
        { opacity: 0, y: 10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [activeLocation]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({
      x: e.clientX - mapPosition.x,
      y: e.clientY - mapPosition.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    setMapPosition({
      x: e.clientX - startPosition.x,
      y: e.clientY - startPosition.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleLocationClick = (location: MapLocation, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveLocation(location);
  };

  const handleZoomIn = () => {
    if (zoomLevel < 2) {
      setZoomLevel(prevZoom => prevZoom + 0.2);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.6) {
      setZoomLevel(prevZoom => prevZoom - 0.2);
    }
  };

  const handleReset = () => {
    setMapPosition({ x: 0, y: 0 });
    setZoomLevel(1);
  };

  useEffect(() => {
    const handleMouseLeave = () => {
      setIsDragging(false);
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative overflow-hidden h-[600px] w-full border-4 border-minecraft-stone bg-minecraft-grass/70 rounded shadow-lg">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <button
          onClick={handleZoomIn}
          className="bg-minecraft-stone p-2 text-white hover:bg-minecraft-stone/80 transition-colors rounded"
          aria-label="Zoom in"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-minecraft-stone p-2 text-white hover:bg-minecraft-stone/80 transition-colors rounded"
          aria-label="Zoom out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
        <button
          onClick={handleReset}
          className="bg-minecraft-stone p-2 text-white hover:bg-minecraft-stone/80 transition-colors rounded"
          aria-label="Reset view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" />
            <path d="M14 12H8" />
            <path d="M12 10v4" />
          </svg>
        </button>
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="bg-minecraft-stone p-2 text-white hover:bg-minecraft-stone/80 transition-colors rounded"
          aria-label="Help"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
        </button>
      </div>
      
      {/* Help Popup */}
      {showHelp && (
        <div className="absolute top-4 left-4 z-20 bg-minecraft-dirt border-4 border-minecraft-stone p-4 max-w-xs animate-in fade-in rounded shadow-lg">
          <button 
            className="absolute top-2 right-2 text-white hover:text-minecraft-gold"
            onClick={() => setShowHelp(false)}
          >
            <X size={18} />
          </button>
          <h3 className="font-minecraft text-lg text-white mb-3">Map Controls</h3>
          <ul className="text-white/90 space-y-2 text-sm">
            <li className="flex items-center"><Move size={16} className="mr-2 text-minecraft-gold" /> Click and drag to pan</li>
            <li className="flex items-center"><Search size={16} className="mr-2 text-minecraft-gold" /> Use buttons to zoom in/out</li>
            <li className="flex items-center"><MapPin size={16} className="mr-2 text-minecraft-gold" /> Click on icons to see details</li>
            <li className="flex items-center"><Map size={16} className="mr-2 text-minecraft-gold" /> Reset to default view</li>
          </ul>
        </div>
      )}

      <div 
        ref={mapRef}
        className="absolute w-[1000px] h-[1000px] bg-[url('/images/minecraft-map.jpg')] bg-cover origin-center transition-transform duration-200"
        style={{ 
          transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${zoomLevel})`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {locations.map(location => (
          <div 
            key={location.id}
            className="absolute w-14 h-14 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-110"
            style={{ left: `${location.x}%`, top: `${location.y}%` }}
            onClick={(e) => handleLocationClick(location, e)}
          >
            <div className="w-full h-full flex items-center justify-center bg-white border-4 border-minecraft-stone rounded-full shadow-lg animate-minecraft-bounce relative group">
              <span className="text-3xl">{location.icon}</span>
              
              {/* Hover tooltip */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-minecraft-dirt text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {location.name}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {activeLocation && (
        <div 
          ref={tooltipRef}
          className="absolute z-10 bg-minecraft-dirt border-4 border-minecraft-stone p-5 max-w-xs rounded-lg shadow-xl"
          style={{ 
            left: `${activeLocation.x}%`, 
            top: `${activeLocation.y > 50 ? activeLocation.y - 20 : activeLocation.y + 20}%`,
            transform: 'translateX(-50%)'
          }}
        >
          <h3 className="font-minecraft text-xl text-white mb-3 pixel-text-shadow">{activeLocation.name}</h3>
          <p className="text-white/90 mb-5 leading-relaxed">{activeLocation.description}</p>
          <div className="flex justify-between items-center">
            <Link 
              to={activeLocation.link}
              className="minecraft-btn inline-block"
              onClick={() => setActiveLocation(null)}
            >
              Explore
            </Link>
            <button 
              className="text-white hover:text-minecraft-gold transition-colors ml-3"
              onClick={() => setActiveLocation(null)}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
      
      <div className="absolute bottom-4 left-4 z-10 bg-minecraft-dirt/90 p-3 text-white text-sm rounded shadow-lg">
        <h4 className="font-minecraft mb-1">Navigation</h4>
        <p className="opacity-80 mb-1">Click and drag to explore the map</p>
        <p className="opacity-80">Click on locations to learn more</p>
      </div>
    </div>
  );
};

export default MinecraftMap;
