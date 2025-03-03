import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Map as MapIcon, ChevronRight, Info } from 'lucide-react';

const PixelButton = ({ children, variant = "default", className, ...props }) => {
  return (
    <button 
      className={`font-minecraft px-4 py-2 rounded-md shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const InteractiveMapSection = ({ addToSectionRefs, isVisible }) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [isRotating, setIsRotating] = useState(false);
  const mapRef = useRef(null);
  
  const mapPoints = [
    { id: 1, x: 25, y: 30, name: "Main Stage", icon: "🎮" },
    { id: 2, x: 65, y: 20, name: "Crafting Area", icon: "⚒️" },
    { id: 3, x: 40, y: 70, name: "Pixel Art Gallery", icon: "🎨" },
    { id: 4, x: 80, y: 60, name: "Battle Arena", icon: "⚔️" },
  ];

  useEffect(() => {
    if (isVisible("map") && mapRef.current) {
      const interval = setInterval(() => {
        setIsRotating(true);
        setTimeout(() => setIsRotating(false), 4000);
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [isVisible, mapRef]);

  return (
    <div
      ref={el => addToSectionRefs(el)}
      data-section-id="map"
      className={`py-16 px-4 bg-gray-900 transition-all duration-700 ${
        isVisible("map") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-minecraft text-4xl mb-6">
            <span className="text-yellow-500 px-4 py-2 bg-gray-800 rounded-lg border-2 border-yellow-600 inline-block shadow-lg">
              <Compass className="inline-block mr-2 mb-1" size={24} />
              Interactive Fest Map
            </span>
          </h2>
        </motion.div>

        <motion.p 
          className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg font-minecraft"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Explore our interactive Minecraft-style map to discover all event locations!
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <motion.div 
              className="relative h-96 bg-gray-800 border-4 border-gray-700 rounded-lg overflow-hidden shadow-2xl group"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              whileHover={{ borderColor: "#4ade80" }}
            >
              <div 
                ref={mapRef}
                className={`absolute inset-0 bg-[url('/images/minecraft-map-preview.jpg')] bg-cover bg-center transition-all duration-1000 ${isRotating ? 'scale-110' : 'scale-100'}`} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />

              {/* Interactive Map Points */}
              {mapPoints.map((point) => (
                <motion.div 
                  key={point.id}
                  className="absolute w-6 h-6 cursor-pointer"
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + (point.id * 0.1), duration: 0.4, type: "spring" }}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setHoveredPoint(point.id === hoveredPoint ? null : point.id)}
                >
                  <div className="animate-pulse w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-lg shadow-lg shadow-yellow-500/50">
                    {point.icon}
                  </div>
                  
                  {hoveredPoint === point.id && (
                    <motion.div 
                      className="absolute top-8 left-0 bg-gray-800 border-2 border-yellow-600 p-2 rounded-md shadow-xl z-10 w-40"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <p className="font-minecraft text-white text-sm">{point.name}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}

              <motion.div 
                className="absolute bottom-6 right-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/map">
                  <PixelButton 
                    className="bg-yellow-600 hover:bg-yellow-500 border-2 border-yellow-700 text-white font-bold flex items-center shadow-lg shadow-yellow-600/30"
                  >
                    <MapIcon size={18} className="mr-2" />
                    Open Full Map
                    <ChevronRight size={18} className="ml-1" />
                  </PixelButton>
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-gray-800/90 p-6 border-4 border-gray-700 rounded-lg shadow-xl h-full flex flex-col justify-between"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              whileHover={{ borderColor: "#4ade80", boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
            >
              <div>
                <h3 className="font-minecraft text-2xl mb-4 text-green-500 drop-shadow-md">
                  <span className="bg-green-500/20 px-2 py-1 rounded">Map Features</span>
                </h3>
                
                <ul className="text-left text-gray-300 space-y-4 mb-6">
                  {[
                    "Interactive hotspots for all main locations",
                    "Realistic Minecraft terrain rendering",
                    "Real-time event updates and notifications",
                    "Custom waypoints and navigation paths"
                  ].map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + (index * 0.1), duration: 0.5 }}
                    >
                      <div className="mr-2 mt-1 h-4 w-4 bg-green-500 rounded-sm transform rotate-45" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <motion.div 
                className="mt-4 bg-gray-900/50 p-4 rounded-lg border border-gray-700"
                whileHover={{ backgroundColor: "rgba(6, 78, 59, 0.3)", borderColor: "#10b981" }}
              >
                <div className="flex items-center text-yellow-400 mb-2">
                  <Info size={16} className="mr-2" />
                  <span className="font-minecraft text-sm">INSIDER TIP</span>
                </div>
                <p className="text-gray-300 text-sm text-left">
                  Click the map points to discover hidden secrets and special events happening throughout the festival!
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <PixelButton 
            className="bg-indigo-600 hover:bg-indigo-500 border-2 border-indigo-700 text-white"
            onClick={() => {
              const link = document.createElement("a");
              link.href = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjH8fPAAAAAElFTkSuQmCC";
              link.setAttribute("download", "minecraft_map.png");
              link.style.display = "none";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            Download Map
          </PixelButton>
          
          <PixelButton 
            className="bg-gray-700 hover:bg-gray-600 border-2 border-gray-600 text-gray-300"
            onClick={() => {
              const shareData = {
                title: "Share your location at DY25!",
                text: "Check out the map: https://dy25.netlify.app/map",
                url: "https://dy25.netlify.app/map"
              };
              navigator.share(shareData)
                .then(() => console.log("Shared location successfully!"))
                .catch((error) => console.log("Error sharing location:", error));
            }}
          >
            Share Location
          </PixelButton>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveMapSection;