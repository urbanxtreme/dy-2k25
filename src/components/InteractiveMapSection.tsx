import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  Compass,
  Map as MapIcon,
  ChevronRight,
  Info,
  Layers,
  Maximize,
  Target,
  Menu,
  Zap,
} from "lucide-react";

// Type definitions


interface MapPointData {
  id: number;
  x: number;
  y: number;
  name: string;
  icon: string;
  description: string;
}

interface MapControlProps {
  icon: React.ReactNode;
  tooltip: string;
  onClick: () => void;
  active: boolean;
}

interface PixelButtonProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}

// Constants
const MAP_THEMES = {
  normal: "url('/images/minecraft-map-preview.jpg')",
  night:
    "linear-gradient(rgba(0, 0, 40, 0.7), rgba(0, 0, 40, 0.7)), url('/images/minecraft-map-preview.jpg')",
  satellite:
    "linear-gradient(rgba(0, 100, 0, 0.2), rgba(0, 100, 0, 0.2)), url('/images/minecraft-map-preview.jpg')",
} as const;

const MAP_POINTS: MapPointData[] = [
  {
    id: 1,
    x: 33,
    y: 30,
    name: "LAB 1",
    icon: "🖥",
    description: "COMPETE WITH FELLOW PEERS",
  },
  {
    id: 2,
    x: 53,
    y: 30,
    name: "LAB 2",
    icon: "🖥",
    description: "COMPETE WITH FELLOW PEERS",
  },
  {
    id: 3,
    x: 57,
    y: 70,
    name: "MAIN STAGE",
    icon: "🏦",
    description: "Central hub for keynotes and major announcements",
  },
  {
    id: 4,
    x: 70,
    y: 65,
    name: "SDPK HALL",
    icon: "🏢",
    description: "Join PvP tournaments with prizes for top players.",
  },
  {
    id: 5,
    x: 20,
    y: 50,
    name: "STAGE 2",
    icon: "⛩",
    description: "Exchange items and meet with collectors.",
  },
  {
    id: 6,
    x: 33,
    y: 17,
    name: "AUDITORIUM ",
    icon: "🪟",
    description: "Exchange items and meet with collectors.",
  },
  {
    id: 7,
    x: 20,
    y: 25,
    name: "CANTEEN ",
    icon: "🍜",
    description: "EAT FOOD DO NOTHING",
  },
  {
    id: 8,
    x: 75,
    y: 65,
    name: "FOSS LAB",
    icon: "👩🏿‍💻",
    description: "Join PvP tournaments with prizes for top players.",
  },
];


// Components
const PixelButton: React.FC<PixelButtonProps> = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  const baseClasses = "font-minecraft px-4 py-2 rounded-md shadow-lg transform transition-all duration-200";
  const variantClasses = {
    default: "bg-gray-700 hover:bg-gray-600 border-2 border-gray-600 text-gray-300",
    primary: "bg-indigo-600 hover:bg-indigo-500 border-2 border-indigo-700 text-white",
    secondary: "bg-yellow-600 hover:bg-yellow-500 border-2 border-yellow-700 text-white",
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={{
        scale: 1.05,
        filter: "drop-shadow(0 10px 25px -5px rgba(0, 0, 0, 0.2))",
      }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const MapTooltip: React.FC<{ point: MapPointData }> = ({ point }) => (
  <motion.div
    className="absolute top-8 left-0 bg-gray-800/90 backdrop-blur-sm border-2 border-yellow-600 p-3 rounded-lg shadow-xl z-10 w-48"
    initial={{ opacity: 0, y: -5, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -5, scale: 0.9 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
  >
    <div className="absolute -top-2 left-3 w-4 h-4 bg-gray-800 border-t-2 border-l-2 border-yellow-600 transform rotate-45" />
    <h4 className="font-minecraft text-white text-sm border-b border-yellow-600/30 pb-1 mb-1">
      {point.name}
    </h4>
    <p className="text-gray-300 text-xs">{point.description}</p>
  </motion.div>
);

const MapPoint: React.FC<{
  point: MapPointData;
  hoveredPoint: number | null;
  setHoveredPoint: (id: number | null) => void;
}> = ({ point, hoveredPoint, setHoveredPoint }) => {
  const isHovered = hoveredPoint === point.id;

  return (
    <motion.div
      className="absolute"
      style={{ left: `${point.x}%`, top: `${point.y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: 0.5 + point.id * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <motion.div
        animate={{
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.3 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 20,
        }}
        onClick={() => setHoveredPoint(isHovered ? null : point.id)}
        className="relative cursor-pointer"
        style={{ zIndex: isHovered ? 50 : 10 }}
      >
        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-xl shadow-lg shadow-yellow-500/50">
          {point.icon}
        </div>
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 animate-ping-slow bg-yellow-500/40 rounded-full" />
          <div className="absolute inset-0 animate-ping-slower bg-yellow-500/20 rounded-full scale-125" />
        </div>
        <div className="absolute top-6 left-2 w-4 h-1 bg-black/30 rounded-full blur-sm" />
        <AnimatePresence>{isHovered && <MapTooltip point={point} />}</AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const MapControl: React.FC<MapControlProps> = ({ icon, tooltip, onClick, active }) => (
  <motion.button
    className={`relative w-10 h-10 flex items-center justify-center rounded-lg shadow-lg mb-2 ${
      active ? "bg-green-600 border-green-400" : "bg-gray-800 border-gray-700"
    } border-2 text-white`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    title={tooltip}
  >
    {icon}
  </motion.button>
);

const InteractiveMapSection: React.FC<{
  addToSectionRefs: (el: HTMLElement | null) => void;
  isVisible: (section: string) => boolean;
}> = ({ addToSectionRefs, isVisible }) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [mapView, setMapView] = useState<"3d" | "2d">("3d");
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [showMapFeatures, setShowMapFeatures] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPointerPosition, setLastPointerPosition] = useState({ x: 0, y: 0 });
  const [selectedTheme, setSelectedTheme] = useState<keyof typeof MAP_THEMES>("normal");
  const mapRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const mapContainerAnimation = {
    expanded: { height: "calc(100vh - 200px)", maxHeight: "800px" },
    normal: { height: "400px", maxHeight: "400px" },
  };

  const handleRotation = useCallback(() => {
    if (!isVisible("map") || isRotating) return;

    setIsRotating(true);
    const startTime = Date.now();
    const duration = 4000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const angle = progress < 0.5 ? progress * 10 : 10 - (progress - 0.5) * 10;

      rotateX.set(angle);
      rotateY.set(angle);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsRotating(false);
        rotateX.set(0);
        rotateY.set(0);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, isRotating, rotateX, rotateY]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVisible("map")) {
      interval = setInterval(handleRotation, 10000);
    }
    return () => clearInterval(interval);
  }, [isVisible, handleRotation]);

  useEffect(() => {
    const mapElement = mapRef.current;
    if (!mapElement) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoomLevel((prev) => Math.max(0.5, Math.min(2.5, prev - e.deltaY * 0.001)));
    };

    const handlePointerDown = (e: PointerEvent) => {
      setIsDragging(true);
      setLastPointerPosition({ x: e.clientX, y: e.clientY });
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = (e.clientX - lastPointerPosition.x) / zoomLevel;
      const dy = (e.clientY - lastPointerPosition.y) / zoomLevel;
      setMapPosition({ x: mapPosition.x + dx, y: mapPosition.y + dy });
      setLastPointerPosition({ x: e.clientX, y: e.clientY });
    };

    const handlePointerUp = () => setIsDragging(false);

    mapElement.addEventListener("wheel", handleWheel, { passive: false });
    mapElement.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      mapElement.removeEventListener("wheel", handleWheel);
      mapElement.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, lastPointerPosition, mapPosition, zoomLevel]);

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.max(0.5, Math.min(2.5, prev + delta)));
  };

  const resetMapView = () => {
    setZoomLevel(1);
    setMapPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={addToSectionRefs}
      data-section-id="map"
      className="py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-800"
    >
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center font-minecraft text-4xl mb-6"
        >
          <span className="text-yellow-500 px-6 py-3 bg-gray-800/80 backdrop-blur-sm rounded-xl border-2 border-yellow-600 inline-block">
            <Compass className="inline-block mr-3 mb-1" size={28} />
            Interactive Festival Map
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg font-minecraft text-center"
        >
          Navigate our immersive 3D festival map to discover all event locations!
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="bg-gray-800/80 backdrop-blur-sm p-6 border-4 border-gray-700 rounded-xl h-full flex flex-col"
            >
              <h3 className="font-minecraft text-2xl mb-6 text-green-500">
                <span className="bg-green-500/20 px-3 py-1 rounded-lg flex items-center">
                  <Menu className="mr-2" size={18} />
                  Map Controls
                </span>
              </h3>

              <div className="space-y-4 flex-1">
                <div className="flex flex-col items-center">
                  <MapControl
                    icon={<Layers size={18} />}
                    tooltip="Toggle 3D/2D View"
                    onClick={() => setMapView(mapView === "3d" ? "2d" : "3d")}
                    active={mapView === "3d"}
                  />
                  <MapControl
                    icon={<Maximize size={18} />}
                    tooltip={isMapExpanded ? "Collapse Map" : "Expand Map"}
                    onClick={() => setIsMapExpanded(!isMapExpanded)}
                    active={isMapExpanded}
                  />
                  <MapControl
                    icon={<Target size={18} />}
                    tooltip="Reset View"
                    onClick={resetMapView}
                    active={false}
                  />
                  <MapControl
                    icon={<Zap size={18} />}
                    tooltip="Change Theme"
                    onClick={() => {
                      const themes = Object.keys(MAP_THEMES) as (keyof typeof MAP_THEMES)[];
                      const currentIndex = themes.indexOf(selectedTheme);
                      setSelectedTheme(themes[(currentIndex + 1) % themes.length]);
                    }}
                    active={selectedTheme !== "normal"}
                  />
                </div>

                <div className="flex justify-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleZoom(-0.2)}
                    className="w-10 h-10 bg-gray-700 rounded-lg text-white text-xl"
                  >
                    -
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleZoom(0.2)}
                    className="w-10 h-10 bg-gray-700 rounded-lg text-white text-xl"
                  >
                    +
                  </motion.button>
                </div>

                <motion.div
                  whileHover={{ backgroundColor: "#374151" }}
                  className="w-full py-3 px-4 bg-gray-700 rounded-lg flex items-center justify-between cursor-pointer"
                  onClick={() => setShowMapFeatures(!showMapFeatures)}
                >
                  <span className="font-minecraft text-white">Map Features</span>
                  <motion.div animate={{ rotate: showMapFeatures ? 90 : 0 }}>
                    <ChevronRight size={18} />
                  </motion.div>
                </motion.div>

                <AnimatePresence>
                  {showMapFeatures && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-gray-300 space-y-3 pl-2"
                    >
                      {[
                        "Interactive 3D map with depth perception",
                        "Multiple map themes (Day/Night/Satellite)",
                        "Zoom and pan controls for detailed viewing",
                        "Animated location markers with tooltips",
                        "Downloadable high-resolution version",
                      ].map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + index * 0.1 }}
                          className="flex items-start text-sm"
                        >
                          <div className="mr-2 mt-1 w-4 h-4 bg-green-500 rounded-sm transform rotate-45" />
                          {feature}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-3 order-1 lg:order-2">
            <motion.div
              variants={mapContainerAnimation}
              initial="normal"
              animate={isMapExpanded ? "expanded" : "normal"}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative overflow-hidden bg-gray-800 border-4 border-gray-700 rounded-xl shadow-2xl"
            >
              <motion.div
                style={{
                  perspective: "1000px",
                  width: "100%",
                  height: "100%",
                }}
                className="relative"
              >
                <motion.div
                  ref={mapRef}
                  style={{
                    rotateX,
                    rotateY,
                    cursor: isDragging ? "grabbing" : "grab",
                    backgroundImage: MAP_THEMES[selectedTheme],
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    scale: zoomLevel,
                    x: mapPosition.x,
                    y: mapPosition.y,
                  }}
                  className="absolute w-full h-full"
                  transition={{ duration: isDragging ? 0 : 0.3, ease: "easeOut" }}
                >
                  <div
                    className={`absolute inset-0 transition-all duration-500 ${
                      mapView === "3d" ? "bg-gradient-to-br from-transparent via-black/10 to-black/30" : ""
                    }`}
                  />
                </motion.div>

                {MAP_POINTS.map((point) => (
                  <MapPoint
                    key={point.id}
                    point={point}
                    hoveredPoint={hoveredPoint}
                    setHoveredPoint={setHoveredPoint}
                  />
                ))}

                {mapView === "3d" && (
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]" />
                )}

                <div className="absolute top-4 right-4 bg-gray-900/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white font-minecraft capitalize">
                  {selectedTheme} Mode
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none" />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="absolute bottom-6 right-6 z-20"
                >
                  <Link to="/map">
                    <PixelButton variant="secondary" className="flex items-center">
                      <MapIcon size={18} className="mr-2" />
                      Open Full Map
                      <ChevronRight size={18} className="ml-1" />
                    </PixelButton>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg border border-gray-700 shadow-lg max-w-xs"
                >
                  <div className="flex items-center text-yellow-400 mb-1">
                    <Info size={14} className="mr-1" />
                    <span className="font-minecraft text-xs">NAVIGATION HELP</span>
                  </div>
                  <p className="text-gray-300 text-xs">
                    Drag to navigate • Scroll to zoom • Click markers for details
                  </p>
                </motion.div>

                <div className="absolute bottom-4 left-4 bg-gray-900/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
                  Zoom: {Math.round(zoomLevel * 100)}%
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center mt-4 space-x-2"
            >
              {(Object.keys(MAP_THEMES) as (keyof typeof MAP_THEMES)[]).map((theme) => (
                <motion.button
                  key={theme}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTheme(theme)}
                  className={`px-3 py-1 rounded-full text-xs font-minecraft capitalize ${
                    selectedTheme === theme
                      ? "bg-green-600 text-white border-2 border-green-400"
                      : "bg-gray-700 text-gray-300 border-2 border-gray-600"
                  }`}
                >
                  {theme}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <PixelButton
            variant="primary"
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/images/clgmapnew.jpg";
              link.download = "clgmapnew.jpg";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            Download Map
          </PixelButton>

          <PixelButton
            variant="default"
            onClick={() => {
              navigator.share({
                title: "Share your location at DY25!",
                text: "Check out the map: https://dy25.netlify.app/map",
                url: "https://dy25.netlify.app/map",
              }).catch((error) => console.error("Error sharing:", error));
            }}
          >
            Share Location
          </PixelButton>
        </motion.div>
      </div>
    </div>
  );
};

const GlobalStyles: React.FC = () => (
  <style>{`
    @keyframes ping-slow {
      0% { transform: scale(1); opacity: 0.8; }
      100% { transform: scale(1.5); opacity: 0; }
    }
    @keyframes ping-slower {
      0% { transform: scale(1); opacity: 0.4; }
      100% { transform: scale(2); opacity: 0; }
    }
    .animate-ping-slow {
      animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
    .animate-ping-slower {
      animation: ping-slower 3s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
  `}</style>
);

const InteractiveMapSectionWithStyles: React.FC<{
  addToSectionRefs: (el: HTMLElement | null) => void;
  isVisible: (section: string) => boolean;
}> = (props) => (
  <>
    <GlobalStyles />
    <InteractiveMapSection {...props} />
  </>
);

export default InteractiveMapSectionWithStyles;