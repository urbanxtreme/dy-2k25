import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PixelButton from "@/components/PixelButton";
import { Calendar, ArrowRight, Star, Trophy, Zap, Clock } from "lucide-react";
import gsap from "gsap";

const FeaturedEventsSection = ({ featuredEvents }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Reset refs array
  const setCardRef = (el, index) => {
    cardsRef.current[index] = el;
  };

  useEffect(() => {
    // Create a more dynamic timeline for staggered entrance
    const tl = gsap.timeline();

    // More dramatic entrance for the section title
    tl.from(".events-title-animation", {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "elastic.out(1, 0.5)",
      clearProps: "all",
    });

    // Add a glowing pulse to the title
    gsap.to(titleRef.current, {
      textShadow: "0 0 10px rgba(52, 211, 153, 0.7)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Create a more dramatic entrance for cards
    if (cardsRef.current.length > 0) {
      gsap.set(cardsRef.current, {
        y: 100,
        opacity: 0,
        rotationY: 15,
        scale: 0.9,
      });

      // Staggered entrance animation with 3D effects
      tl.to(cardsRef.current, {
        y: 0,
        opacity: 1,
        rotationY: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        clearProps: "transform,opacity,scale",
        delay: 0.5,
        onComplete: () => {
          // Add more dynamic floating animation after entrance
          cardsRef.current.forEach((card, index) => {
            if (card) {
              gsap.to(card, {
                y: "-8px",
                duration: 2 + index * 0.3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.1,
              });
            }
          });
        },
      });

      // Add shine effect across cards
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const shine = document.createElement("div");
          shine.className = "shine-effect";
          card.appendChild(shine);

          gsap.set(shine, {
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "50%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            transform: "skewX(-20deg)",
            zIndex: 10,
            pointerEvents: "none",
          });

          // Repeating shine animation
          gsap.to(shine, {
            left: "200%",
            duration: 3,
            delay: index * 2 + 2,
            repeat: -1,
            repeatDelay: 7,
            ease: "power2.inOut",
          });
        }
      });
    }

    // Add parallax effect to section background
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(".decorative-element", {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: "power1.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup animations on component unmount
    return () => {
      gsap.killTweensOf(cardsRef.current);
      gsap.killTweensOf(".events-title-animation");
      gsap.killTweensOf(titleRef.current);
      gsap.killTweensOf(".decorative-element");
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [featuredEvents.length]);

  // Enhanced particle effects
  const createParticles = (e, colors) => {
    const card = e.currentTarget;
    const cardRect = card.getBoundingClientRect();

    // Create 12 particles (increased from 6)
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement("div");

      // Random particle shape (square or diamond)
      const isSquare = Math.random() > 0.5;
      const size = 4 + Math.random() * 8;

      // Styling the particle
      particle.style.position = "absolute";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = `${e.clientX - cardRect.left}px`;
      particle.style.top = `${e.clientY - cardRect.top}px`;
      particle.style.pointerEvents = "none";
      particle.style.zIndex = "100";

      // Add rotation for diamond shape
      if (!isSquare) {
        particle.style.transform = "rotate(45deg)";
      }

      // Add glow effect
      particle.style.boxShadow = `0 0 ${Math.random() * 8}px ${
        colors[Math.floor(Math.random() * colors.length)]
      }`;

      // Add particle to card
      card.appendChild(particle);

      // More dramatic particle animation
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 120,
        y: (Math.random() - 0.5) * 120,
        opacity: 0,
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
        duration: 1 + Math.random() * 1.5,
        ease: "power2.out",
        onComplete: () => particle.remove(),
      });
    }
  };

  // 3D tilt effect for cards
  const handleCardHover = (e, index) => {
    if (!cardsRef.current[index]) return;

    const card = cardsRef.current[index];
    const cardRect = card.getBoundingClientRect();
    const centerX = cardRect.left + cardRect.width / 2;
    const centerY = cardRect.top + cardRect.height / 2;
    const posX = e.clientX - centerX;
    const posY = e.clientY - centerY;

    // Calculate tilt based on mouse position
    const tiltX = (posY / cardRect.height) * 10;
    const tiltY = -(posX / cardRect.width) * 10;

    // Apply tilt transformation
    gsap.to(card, {
      rotateX: tiltX,
      rotateY: tiltY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
      transformOrigin: "center",
    });

    // Add subtle glow effect
    gsap.to(card, {
      boxShadow: `0 20px 30px rgba(0,0,0,0.3), 
                 0 0 20px rgba(52, 211, 153, 0.5), 
                 inset 0 0 15px rgba(52, 211, 153, 0.3)`,
      duration: 0.4,
    });

    setHoveredCard(index);
  };

  // Reset card on mouse leave
  const handleCardLeave = (index) => {
    if (!cardsRef.current[index]) return;

    gsap.to(cardsRef.current[index], {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
      clearProps: "boxShadow",
    });

    setHoveredCard(null);
  };

  return (
    <div
      ref={sectionRef}
      className="container mx-auto relative py-12 md:py-16 overflow-hidden px-4 sm:px-6"
    >
      {/* Decorative elements - hidden on mobile */}
      <div className="hidden md:block absolute -top-10 -left-10 opacity-40 pointer-events-none decorative-element">
        <div className="w-32 h-32 border-t-8 border-l-8 border-green-500 rounded-tl-2xl" />
      </div>
      <div className="hidden md:block absolute -bottom-10 -right-10 opacity-40 pointer-events-none decorative-element">
        <div className="w-32 h-32 border-b-8 border-r-8 border-green-500 rounded-br-2xl" />
      </div>

      {/* Pixel decorations - adjusted for mobile */}
      <div className="absolute top-1/4 left-0 w-8 h-8 md:w-12 md:h-12 bg-green-600/10 transform rotate-45 decorative-element" />
      <div className="absolute bottom-1/3 right-4 md:right-10 w-12 h-12 md:w-16 md:h-16 bg-green-600/10 transform rotate-12 decorative-element" />
      <div className="absolute top-1/2 right-1/4 w-6 h-6 md:w-8 md:h-8 bg-green-600/10 transform -rotate-12 decorative-element" />

      <div className="text-center mb-8 md:mb-16 relative">
        <h2
          ref={titleRef}
          className="font-minecraft text-3xl md:text-4xl mb-3 text-green-400 events-title-animation inline-block relative"
        >
          <Trophy
            size={28}
            className="inline-block mr-2 md:mr-3 mb-1 text-yellow-500 animate-bounce"
          />
          <span className="bg-gradient-to-r from-green-600 to-green-400 text-white px-3 py-1.5 md:px-4 md:py-2 mr-2 rounded-lg text-sm md:text-base">
            Featured
          </span>
          Events
          <Zap
            size={20}
            className="inline-block ml-2 md:ml-3 mb-1 text-yellow-400 animate-pulse"
          />
          <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600" />
          <div className="absolute -bottom-3 left-0 w-16 h-1 bg-white animate-pulse-width" />
        </h2>

        <p className="text-gray-300 max-w-2xl mx-auto font-minecraft mt-4 md:mt-6 text-base md:text-lg events-title-animation relative z-10">
          Check out these highlighted events from our Minecraft-themed festival!
        </p>
        <div className="w-32 md:w-40 h-1 bg-gradient-to-r from-green-600 via-green-400 to-green-600 mx-auto mt-4 md:mt-6 rounded-full events-title-animation" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        {featuredEvents.map((event, index) => (
          <div
            key={index}
            ref={(el) => setCardRef(el, index)}
            className="bg-gray-800/90 rounded-lg overflow-hidden border-4 border-gray-600 hover:border-green-500 shadow-xl transform-gpu transition-all duration-500"
            style={{
              transformStyle: "preserve-3d",
              transform: "perspective(1000px)",
            }}
            onMouseMove={(e) => {
              handleCardHover(e, index);
              createParticles(e, [
                "#34D399",
                "#10B981",
                "#059669",
                "#047857",
                "#FBBF24",
              ]);
            }}
            onMouseLeave={() => handleCardLeave(index)}
          >
            <div className="relative h-48 md:h-52 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-115"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
              <div
                className={`absolute inset-0 bg-gradient-to-b from-green-600/30 to-transparent transition-opacity duration-500 ${
                  hoveredCard === index ? "opacity-100" : "opacity-0"
                }`}
              />

              <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3">
                <span className="bg-gradient-to-r from-green-600 to-green-500 text-white text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded-md font-minecraft inline-block shadow-lg">
                  {event.category}
                </span>
              </div>

              <div className="absolute top-2 right-2 md:top-3 md:right-3">
                <div className="relative">
                  <Star
                    size={18}
                    className="text-yellow-400 animate-pulse"
                    style={{
                      filter: "drop-shadow(0 0 8px rgba(250, 204, 21, 0.8))",
                    }}
                  />
                  <div className="absolute inset-0 animate-spin-slow opacity-60">
                    <Star size={18} className="text-yellow-300" />
                  </div>
                </div>
              </div>

              <div className="absolute top-2 left-2 md:top-3 md:left-3">
                <div className="flex items-center bg-gray-900/70 text-green-400 text-xs md:text-sm px-1.5 py-1 md:px-2 md:py-1 rounded font-minecraft">
                  <Clock size={12} className="mr-1" />
                  <span>{event.time || "2:00 PM"}</span>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 relative">
              <h3 className="font-minecraft text-lg md:text-xl mb-2 md:mb-3 text-green-400 relative inline-block group">
                {event.title}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-green-300 group-hover:w-full transition-all duration-500" />
              </h3>

              <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">
                {event.description}
              </p>

              <div className="flex items-center text-gray-400 mb-3 md:mb-5 text-sm">
                <Calendar size={16} className="mr-2 text-green-500" />
                <span>{event.date}</span>
              </div>

              <div className="relative overflow-hidden group perspective">
                <Link
                  to={`/events/${event.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  <PixelButton
                    variant="secondary"
                    className="w-full bg-gray-700 group-hover:bg-green-600 transition-colors relative z-10 text-sm md:text-base"
                  >
                    <span className="flex items-center justify-center">
                      View Details
                      <ArrowRight
                        size={14}
                        className="ml-1 md:ml-2 group-hover:translate-x-2 transition-transform duration-300"
                      />
                    </span>
                  </PixelButton>

                  <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 md:w-3 md:h-3 bg-green-400/30"
                        style={{
                          left: `${i * 8.33}%`,
                          top: "50%",
                          transform: "translateY(-50%) rotate(45deg)",
                          animation: `float-pixel ${
                            1 + Math.random() * 2
                          }s ease-in-out infinite alternate`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8 md:mt-16">
        <Link to="/events">
          <PixelButton
            variant="primary"
            className="bg-green-600 hover:bg-green-700 relative overflow-hidden group px-6 py-2 md:px-8 md:py-3"
          >
            <span className="relative z-10 flex items-center text-base md:text-lg">
              View All Events
              <ArrowRight
                size={18}
                className="ml-2 md:ml-3 group-hover:translate-x-2 transition-transform duration-300"
              />
            </span>

            <div className="absolute inset-0 w-full h-full">
              <div className="absolute inset-0 bg-green-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-full w-1 bg-green-300/20"
                    style={{
                      left: `${i * 12.5}%`,
                      animation: `shimmer 2s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </PixelButton>
        </Link>
      </div>

      {/* Add improved keyframe animations */}
      <style>{`
        @keyframes float-pixel {
          0% { transform: translateY(-50%) rotate(45deg) scale(1); }
          100% { transform: translateY(-50%) translateX(10px) rotate(45deg) scale(1.5); }
        }
        
        @keyframes shimmer {
          0% { opacity: 0; transform: translateY(100%); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-100%); }
        }
        
        @keyframes pulse-width {
          0% { width: 0; left: 0; }
          50% { width: 100%; left: 0; }
          100% { width: 0; left: 100%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-pulse-width {
          animation: pulse-width 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        @keyframes float-pixel {
          0% { transform: translateY(-50%) rotate(45deg) scale(1); }
          100% { transform: translateY(-50%) translateX(10px) rotate(45deg) scale(1.5); }
        }
        
        @keyframes shimmer {
          0% { opacity: 0; transform: translateY(100%); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-100%); }
        }
        
        @keyframes pulse-width {
          0% { width: 0; left: 0; }
          50% { width: 100%; left: 0; }
          100% { width: 0; left: 100%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-pulse-width {
          animation: pulse-width 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default FeaturedEventsSection;
