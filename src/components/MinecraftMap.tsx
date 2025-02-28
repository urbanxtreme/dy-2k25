
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

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
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3 }
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
    <div className="relative overflow-hidden h-[500px] w-full border-4 border-minecraft-stone bg-minecraft-grass/70">
      <div 
        ref={mapRef}
        className="absolute w-[1000px] h-[1000px] bg-[url('/images/minecraft-map.jpg')] bg-cover"
        style={{ 
          transform: `translate(${mapPosition.x}px, ${mapPosition.y}px)`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {locations.map(location => (
          <div 
            key={location.id}
            className="absolute w-12 h-12 transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110"
            style={{ left: `${location.x}%`, top: `${location.y}%` }}
            onClick={(e) => handleLocationClick(location, e)}
          >
            <div className="w-full h-full flex items-center justify-center bg-white border-4 border-minecraft-stone rounded-full animate-minecraft-bounce">
              <span className="text-2xl">{location.icon}</span>
            </div>
          </div>
        ))}
      </div>
      
      {activeLocation && (
        <div 
          ref={tooltipRef}
          className="absolute z-10 bg-minecraft-dirt border-4 border-minecraft-stone p-4 max-w-xs"
          style={{ 
            left: `${activeLocation.x}%`, 
            top: `${activeLocation.y > 50 ? activeLocation.y - 20 : activeLocation.y + 20}%`,
            transform: 'translateX(-50%)'
          }}
        >
          <h3 className="font-minecraft text-xl text-white mb-2">{activeLocation.name}</h3>
          <p className="text-white/90 mb-4">{activeLocation.description}</p>
          <Link 
            to={activeLocation.link}
            className="minecraft-btn inline-block"
            onClick={() => setActiveLocation(null)}
          >
            Explore
          </Link>
          <button 
            className="absolute top-2 right-2 text-white hover:text-minecraft-gold"
            onClick={() => setActiveLocation(null)}
          >
            ✖
          </button>
        </div>
      )}
      
      <div className="absolute bottom-4 left-4 bg-minecraft-dirt/80 p-2 text-white text-sm">
        <p>Click and drag to explore the map</p>
        <p>Click on locations to learn more</p>
      </div>
    </div>
  );
};

export default MinecraftMap;
