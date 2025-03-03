import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronDown,
  Sparkles,
  Users,
  Award,
} from "lucide-react";
import Countdown from "react-countdown";
import { motion, AnimatePresence } from "framer-motion";
import { Tilt } from "react-tilt";
import { TypeAnimation } from "react-type-animation";
import MinecraftCharacter from "@/components/MinecraftCharacter";

// Minecraft quotes to cycle through
const quotes = [
  "Creativity is intelligence having fun!",
  "The only way to learn something is to build it!",
  "Just one more block...",
  "Dream big, build bigger!",
  "In a world of blocks, imagination is limitless.",
];

const AboutSection = () => {
  const [quote, setQuote] = useState(quotes[0]);
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});
  const [hoveredFeature, setHoveredFeature] = useState(null);

  // For parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse move for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Change quote every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        setIsFading(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.sectionId;
          setIsVisible((prev) => ({ ...prev, [id]: entry.isIntersecting }));
        });
      },
      { threshold: 0.2 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref as Element);
    });

    return () => observer.disconnect();
  }, []);

  const addToSectionRefs = (el) => {
    if (el && el.dataset.sectionId) {
      sectionRefs.current[el.dataset.sectionId] = el;
    }
  };

  // Create Minecraft-style pixel blocks
  const createPixelBlocks = (count) => {
    const blocks = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 20 + 10;
      const colors = ["#4ade80", "#60a5fa", "#f87171", "#fbbf24", "#a78bfa"];
      blocks.push(
        <motion.div
          key={i}
          className="absolute rounded-sm opacity-20 minecraft-pixel"
          initial={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            opacity: 0,
            rotate: Math.random() * 360,
          }}
          animate={{
            opacity: [0, 0.2, 0],
            y: [0, -50, -100],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      );
    }
    return blocks;
  };

  // Features list with icons and descriptions
  const features = [
    {
      icon: <Users size={28} />,
      title: "Multiplayer Challenges",
      description:
        "Team up with friends for collaborative building challenges.",
    },
    {
      icon: <Award size={28} />,
      title: "Prize Pool",
      description: "Win amazing tech prizes worth over ₹50,000.",
    },
    {
      icon: <Sparkles size={28} />,
      title: "Innovation Zone",
      description: "Showcase your tech skills and creativity.",
    },
  ];

  // Tilt options for 3D effect
  const tiltOptions = {
    max: 25,
    scale: 1.05,
    speed: 1000,
    glare: true,
    "max-glare": 0.5,
  };

  return (
    <motion.div
      ref={addToSectionRefs}
      data-section-id="about"
      className="section-container py-16 px-4 bg-gray-800/90 relative overflow-hidden"
      initial={{ opacity: 0, y: 100 }}
      animate={
        isVisible["about"] ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
      }
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background animation effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-900/50 z-0" />

      {/* Create minecraft pixel blocks for ambient background */}
      {createPixelBlocks(100)}

      {/* Grid lines effect */}
      <div className="absolute inset-0 grid grid-cols-12 gap-4 pointer-events-none z-0 opacity-5">
        {Array(12)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="h-full w-px bg-green-500 transform translate-x-full"
            />
          ))}
      </div>
      <div className="absolute inset-0 grid grid-rows-12 gap-4 pointer-events-none z-0 opacity-5">
        {Array(12)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="w-full h-px bg-green-500 transform translate-y-full"
            />
          ))}
      </div>

      {/* 3D Decorative Minecraft Cubes with parallax effect */}
      <motion.div
        className="absolute top-10 left-10 minecraft-cube w-12 h-12 z-0"
        animate={{
          x: mousePosition.x * -20,
          y: mousePosition.y * -20,
          rotateX: mousePosition.y * 20,
          rotateY: mousePosition.x * -20,
        }}
        transition={{ type: "spring", damping: 10 }}
      >
        <div className="cube-face cube-face-front bg-cyan-700"></div>
        <div className="cube-face cube-face-back bg-cyan-700"></div>
        <div className="cube-face cube-face-right bg-cyan-800"></div>
        <div className="cube-face cube-face-left bg-cyan-800"></div>
        <div className="cube-face cube-face-top bg-cyan-600"></div>
        <div className="cube-face cube-face-bottom bg-cyan-900"></div>
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 minecraft-cube w-16 h-16 z-0"
        animate={{
          x: mousePosition.x * 30,
          y: mousePosition.y * 30,
          rotateX: mousePosition.y * -30,
          rotateY: mousePosition.x * 30,
        }}
        transition={{ type: "spring", damping: 10 }}
      >
        <div className="cube-face cube-face-front bg-purple-700"></div>
        <div className="cube-face cube-face-back bg-purple-700"></div>
        <div className="cube-face cube-face-right bg-purple-800"></div>
        <div className="cube-face cube-face-left bg-purple-800"></div>
        <div className="cube-face cube-face-top bg-purple-600"></div>
        <div className="cube-face cube-face-bottom bg-purple-900"></div>
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-1/4 minecraft-cube w-8 h-8 z-0"
        animate={{
          x: mousePosition.x * 15,
          y: mousePosition.y * 15,
          rotateX: mousePosition.y * 15,
          rotateY: mousePosition.x * -15,
        }}
        transition={{ type: "spring", damping: 15 }}
      >
        <div className="cube-face cube-face-front bg-green-700"></div>
        <div className="cube-face cube-face-back bg-green-700"></div>
        <div className="cube-face cube-face-right bg-green-800"></div>
        <div className="cube-face cube-face-left bg-green-800"></div>
        <div className="cube-face cube-face-top bg-green-600"></div>
        <div className="cube-face cube-face-bottom bg-green-900"></div>
      </motion.div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch gap-12">
          {/* Left Column */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col justify-between"
            initial={{ opacity: 0, x: -50 }}
            animate={
              isVisible["about"] ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-8">
              <motion.div
                className="border-l-4 border-green-600 pl-6 mb-8 relative"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute left-0 top-0 w-1 h-full bg-green-600/30"></div>
                <motion.h2
                  className="font-minecraft text-3xl md:text-4xl mb-4 text-gray-200 minecraft-3d-text"
                  animate={{ opacity: isFading ? 0 : 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <TypeAnimation
                    sequence={[quote, 5000]}
                    wrapper="span"
                    speed={50}
                    repeat={0}
                  />
                </motion.h2>
              </motion.div>

              <motion.p
                className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 font-minecraft tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible["about"]
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Join us at{" "}
                <motion.span
                  className="text-green-500 font-bold minecraft-glow inline-block"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Daksha Yanthra 2025
                </motion.span>{" "}
                for an unforgettable Minecraft-themed extravaganza! Dive into a
                world where creativity meets innovation across 48 hours of
                non-stop excitement.
              </motion.p>

              <Tilt options={tiltOptions} className="perspective-1000">
                <motion.div
                  className="bg-gray-700/40 p-6 border-l-4 border-gray-600 rounded-r-lg shadow-lg backdrop-blur-sm"
                  whileHover={{
                    boxShadow: "0 0 30px rgba(74, 222, 128, 0.3)",
                    borderColor: "#4ade80",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isVisible["about"]
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="space-y-4">
                    <motion.div
                      className="flex items-center bg-gray-800/60 p-3 rounded-lg hover:bg-gray-800/80 transition-colors"
                      whileHover={{
                        scale: 1.03,
                        backgroundColor: "rgba(22, 101, 52, 0.3)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, 0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Calendar
                          size={24}
                          className="mr-4 text-green-500 shrink-0"
                        />
                      </motion.div>
                      <div>
                        <p className="font-minecraft text-lg font-bold text-gray-200">
                          Date
                        </p>
                        <p className="text-gray-400">March 24-25, 2025</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center bg-gray-800/60 p-3 rounded-lg hover:bg-gray-800/80 transition-colors"
                      whileHover={{
                        scale: 1.03,
                        backgroundColor: "rgba(22, 101, 52, 0.3)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Clock
                          size={24}
                          className="mr-4 text-green-500 shrink-0"
                        />
                      </motion.div>
                      <div>
                        <p className="font-minecraft text-lg font-bold text-gray-200">
                          Time
                        </p>
                        <p className="text-gray-400">9:00 AM - 8:00 PM</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center bg-gray-800/60 p-3 rounded-lg hover:bg-gray-800/80 transition-colors"
                      whileHover={{
                        scale: 1.03,
                        backgroundColor: "rgba(22, 101, 52, 0.3)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <motion.div
                        animate={{ y: [0, -5, 0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <MapPin
                          size={24}
                          className="mr-4 text-green-500 shrink-0"
                        />
                      </motion.div>
                      <div>
                        <p className="font-minecraft text-lg font-bold text-gray-200">
                          Venue
                        </p>
                        <p className="text-gray-400">
                          College Of Engineering, Attingal
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </Tilt>

              {/* Event features section */}
              <motion.div
                className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isVisible["about"]
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 40 }
                }
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-800/40 border border-gray-700 rounded-lg p-4 backdrop-blur-sm relative overflow-hidden"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(74, 222, 128, 0.2)",
                      borderColor: "#4ade80",
                    }}
                    onHoverStart={() => setHoveredFeature(index)}
                    onHoverEnd={() => setHoveredFeature(null)}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {/* Background pattern */}
                    <div className="absolute top-0 right-0 opacity-5 p-2">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 bg-green-500 mb-1 opacity-20"
                          />
                        ))}
                    </div>

                    <motion.div
                      className="text-green-500 mb-3 bg-green-900/20 p-2 rounded-lg inline-block"
                      animate={
                        hoveredFeature === index
                          ? {
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, 0, -10, 0],
                            }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="font-minecraft text-lg text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Countdown Timer */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 50 }}
              animate={
                isVisible["about"]
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.8, delay: 1 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.h3
                className="font-minecraft text-2xl mb-6 text-center text-green-500 minecraft-3d-text"
                animate={{
                  textShadow: [
                    "0 0 5px #4ade80",
                    "0 0 20px #4ade80",
                    "0 0 5px #4ade80",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span
                  className="inline-block"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⏳
                </motion.span>{" "}
                Event Starts In{" "}
                <motion.span
                  className="inline-block"
                  animate={{ rotate: [0, -10, 0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⏳
                </motion.span>
              </motion.h3>
              <Countdown
                date={new Date("March 24, 2025 09:00:00")}
                renderer={({ days, hours, minutes, seconds }) => (
                  <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto">
                    {[
                      { value: days, label: "Days" },
                      { value: hours, label: "Hours" },
                      { value: minutes, label: "Minutes" },
                      { value: seconds, label: "Seconds" },
                    ].map((item, index) => (
                      <Tilt
                        options={{ max: 15, scale: 1.02 }}
                        className="perspective-500"
                        key={index}
                      >
                        <motion.div
                          className="text-center bg-gray-700/20 p-3 rounded-lg border-2 border-gray-600 minecraft-box-shadow relative overflow-hidden"
                          whileHover={{
                            borderColor: "#4ade80",
                            boxShadow: "0 0 20px rgba(74, 222, 128, 0.3)",
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={
                            isVisible["about"]
                              ? { opacity: 1, y: 0 }
                              : { opacity: 0, y: 20 }
                          }
                          transition={{ duration: 0.5, delay: 0.2 * index + 1 }}
                        >
                          {/* Animated dots in background */}
                          {Array(4)
                            .fill(null)
                            .map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-green-500/30 rounded-full"
                                initial={{
                                  top: `${Math.random() * 100}%`,
                                  left: `${Math.random() * 100}%`,
                                  opacity: 0,
                                }}
                                animate={{
                                  opacity: [0, 0.8, 0],
                                  scale: [0, 1, 0],
                                }}
                                transition={{
                                  duration: 2 + Math.random() * 2,
                                  repeat: Infinity,
                                  delay: Math.random() * 2,
                                }}
                              />
                            ))}

                          <motion.div
                            className="font-minecraft text-3xl md:text-4xl text-green-500 mb-1 minecraft-glow relative"
                            animate={{
                              textShadow: [
                                "0 0 5px #4ade80",
                                "0 0 15px #4ade80",
                                "0 0 5px #4ade80",
                              ],
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            {item.value < 10 ? `0${item.value}` : item.value}
                          </motion.div>
                          <div className="font-minecraft text-sm text-gray-400 uppercase tracking-wide">
                            {item.label}
                          </div>
                        </motion.div>
                      </Tilt>
                    ))}
                  </div>
                )}
              />
            </motion.div>
          </motion.div>

          {/* Right Column - Minecraft Character */}
          <motion.div
            className="w-full lg:w-1/2 h-[600px] relative z-10 minecraft-box-shadow"
            initial={{ opacity: 0, x: 50 }}
            animate={
              isVisible["about"] ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
            }
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Character container with enhanced animations */}
            <motion.div
              className="w-full h-full relative"
              animate={{
                rotateY: mousePosition.x * 10,
                rotateX: mousePosition.y * -10,
              }}
              transition={{ type: "spring", damping: 25 }}
            >
              {/* <MinecraftCharacter className="w-full h-full object-contain" /> */}

              {/* Particle effects around character */}
              {Array(20)
                .fill(null)
                .map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-green-500/30 rounded-full"
                    initial={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      opacity: 0,
                    }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      scale: [0, 1, 0],
                      y: [0, -20, -40],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}

              {/* Glowing platform under character */}
              <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-green-500/20 rounded-full blur-xl"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  width: ["70%", "80%", "70%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Add floating blocks with parallax around character */}
              <motion.div
                className="absolute top-10 right-10 minecraft-cube w-8 h-8"
                animate={{
                  y: [0, -10, 0],
                  x: mousePosition.x * 15,
                  rotateY: 360,
                }}
                transition={{
                  y: { duration: 2, repeat: Infinity },
                  rotateY: { duration: 5, repeat: Infinity, ease: "linear" },
                }}
              >
                <div className="cube-face cube-face-front bg-yellow-600"></div>
                <div className="cube-face cube-face-back bg-yellow-600"></div>
                <div className="cube-face cube-face-right bg-yellow-700"></div>
                <div className="cube-face cube-face-left bg-yellow-700"></div>
                <div className="cube-face cube-face-top bg-yellow-500"></div>
                <div className="cube-face cube-face-bottom bg-yellow-800"></div>
              </motion.div>

              <motion.div
                className="absolute bottom-20 left-10 minecraft-cube w-10 h-10"
                animate={{
                  y: [0, 10, 0],
                  x: mousePosition.x * -20,
                  rotateY: -360,
                }}
                transition={{
                  y: { duration: 3, repeat: Infinity },
                  rotateY: { duration: 7, repeat: Infinity, ease: "linear" },
                }}
              >
                <div className="cube-face cube-face-front bg-blue-600"></div>
                <div className="cube-face cube-face-back bg-blue-600"></div>
                <div className="cube-face cube-face-right bg-blue-700"></div>
                <div className="cube-face cube-face-left bg-blue-700"></div>
                <div className="cube-face cube-face-top bg-blue-500"></div>
                <div className="cube-face cube-face-bottom bg-blue-800"></div>
              </motion.div>

              <motion.div
                className="absolute top-1/3 left-1/4 minecraft-cube w-6 h-6"
                animate={{
                  y: [0, 5, 0, -5, 0],
                  x: mousePosition.x * 10,
                  rotateX: 360,
                }}
                transition={{
                  y: { duration: 4, repeat: Infinity },
                  rotateX: { duration: 6, repeat: Infinity, ease: "linear" },
                }}
              >
                <div className="cube-face cube-face-front bg-red-600"></div>
                <div className="cube-face cube-face-back bg-red-600"></div>
                <div className="cube-face cube-face-right bg-red-700"></div>
                <div className="cube-face cube-face-left bg-red-700"></div>
                <div className="cube-face cube-face-top bg-red-500"></div>
                <div className="cube-face cube-face-bottom bg-red-800"></div>
              </motion.div>
            </motion.div>

            {/* Call to action button */}
            <motion.button
              className="font-minecraft absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl border-b-4 border-green-800"
              whileHover={{
                scale: 1.05,
                backgroundColor: "#16a34a",
                boxShadow: "0 0 20px rgba(74, 222, 128, 0.5)",
              }}
              whileTap={{ scale: 0.95, borderBottomWidth: "2px", y: 2 }}
              initial={{ opacity: 0, y: 30 }}
              animate={
                isVisible["about"]
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {/* REGISTER NOW */}
              {/* Button particle effects */}
              <motion.span
                className="absolute inset-0 bg-green-500/20 rounded-lg"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0, 0.2],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
        </motion.div>
      </div>

      {/* Custom styles */}
      <style>{`
        .minecraft-3d-text {
          text-shadow: 2px 2px 0 #4ade80, 4px 4px 0 rgba(0, 0, 0, 0.3);
          letter-spacing: 1px;
        }

        .minecraft-glow {
          text-shadow: 0 0 10px rgba(74, 222, 128, 0.7);
          animation: pulse 2s infinite;
        }

        .minecraft-box-shadow {
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.3),
            0 10px 20px rgba(0, 0, 0, 0.3),
            inset 0 0 10px rgba(74, 222, 128, 0.2);
        }

        .minecraft-cube {
          transform-style: preserve-3d;
          transform: rotateX(-20deg) rotateY(30deg);
          position: relative;
        }

        .cube-face {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px solid rgba(0, 0, 0, 0.3);
        }

        .cube-face-front {
          transform: translateZ(calc(var(--size) / 2));
        }

        .cube-face-back {
          transform: translateZ(calc(-1 * var(--size) / 2)) rotateY(180deg);
        }

        .cube-face-right {
          transform: translateX(calc(var(--size) / 2)) rotateY(90deg);
        }

        .cube-face-left {
          transform: translateX(calc(-1 * var(--size) / 2)) rotateY(-90deg);
        }

        .cube-face-top {
          transform: translateY(calc(-1 * var(--size) / 2)) rotateX(90deg);
        }

        .cube-face-bottom {
          transform: translateY(calc(var(--size) / 2)) rotateX(-90deg);
        }

        @keyframes pulse {
          0%,
          100% {
            text-shadow: 0 0 5px rgba(74, 222, 128, 0.7);
          }
          50% {
            text-shadow: 0 0 20px rgba(74, 222, 128, 0.9);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float 6s ease-in-out infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .perspective-500 {
          perspective: 500px;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
          }
        }

        @keyframes character {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.02);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default AboutSection;