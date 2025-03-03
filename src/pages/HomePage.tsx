import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PixelButton from "@/components/PixelButton";
import MinecraftCharacter from "@/components/MinecraftCharacter";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, Users, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronDown,
  ArrowRight,
  Star,
  Pickaxe,
  Zap,
} from "lucide-react";
import gsap from "gsap";
import Countdown from "react-countdown";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import FeaturedEventsSection from "@/components/FeaturedEventsSection";
import AboutSection from "@/components/AboutSection";
import InteractiveMapSection from "@/components/InteractiveMapSection";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const HomePage = () => {
  const parallaxRef = useRef(null);
  const mainContainerRef = useRef(null);
  const sectionRefs = useRef([]);
  const [visibleSections, setVisibleSections] = useState([]);
  const [quote, setQuote] = useState("Loading inspiring quotes...");
  const [isFading, setIsFading] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let isMounted = true;
    let intervalId;

    const fetchNewQuote = async () => {
      try {
        const response = await fetch("https://type.fit/api/quotes");
        if (!response.ok) throw new Error("Failed to fetch quotes");
        const data = await response.json();
        const randomQuote = data[Math.floor(Math.random() * data.length)];

        if (isMounted) {
          setIsFading(true);
          setTimeout(() => {
            setQuote(randomQuote.text);
            setIsFading(false);
          }, 500);
        }
      } catch (error) {
        console.error("Error fetching quotes:", error);
        if (isMounted) {
          setQuote(
            '"Creativity is intelligence having fun!" - Albert Einstein'
          );
        }
      }
    };

    // Initial fetch
    fetchNewQuote();

    // Set up interval for rotation every 20 seconds
    intervalId = setInterval(fetchNewQuote, 20000);

    // Cleanup
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  // Handle scroll direction detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Setup animations
  useEffect(() => {
    // Setup staggered animations for each block in the hero section
    gsap.from(".hero-block", {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
    });

    // Parallax effect for hero section
    if (parallaxRef.current) {
      const layers = parallaxRef.current.querySelectorAll(".parallax-layer");

      layers.forEach((layer, i) => {
        const depth = i / layers.length;

        gsap.to(layer, {
          y: `${depth * 100}%`,
          ease: "none",
          scrollTrigger: {
            trigger: parallaxRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }

    // 3D minecraft cube rotation on scroll
    const cubes = document.querySelectorAll(".minecraft-cube");
    cubes.forEach((cube) => {
      gsap.to(cube, {
        rotateY: 360,
        scrollTrigger: {
          trigger: cube.parentElement,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      });
    });

    // Staircase effect between sections
    if (mainContainerRef.current) {
      const sections =
        mainContainerRef.current.querySelectorAll(".section-container");

      sections.forEach((section, index) => {
        if (index === 0) return; // Skip first section

        // Create the stair-step effect with clipping
        gsap.set(section, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          y: 50,
        });

        ScrollTrigger.create({
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: 0.5,
          onEnter: () => {
            gsap.to(section, {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              y: 0,
              duration: 0.8,
              ease: "power2.inOut",
            });
          },
          onLeaveBack: () => {
            gsap.to(section, {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
              y: 50,
              duration: 0.8,
              ease: "power2.inOut",
            });
          },
        });
      });
    }

    // Animate sections on scroll with pixelated reveal effect
    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      const sectionId =
        section.getAttribute("data-section-id") || String(index);
      const pixelBlocks = section.querySelectorAll(".pixel-block");

      // Create pixel reveal animation for each section
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          setVisibleSections((prev) => [...prev, sectionId]);

          // Trigger pixel blocks reveal
          gsap.to(pixelBlocks, {
            opacity: 1,
            scale: 1,
            stagger: 0.01,
            duration: 0.4,
            ease: "power2.out",
          });

          // Fade in the whole section
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          setVisibleSections((prev) => prev.filter((id) => id !== sectionId));

          // Reverse pixel blocks animation
          gsap.to(pixelBlocks, {
            opacity: 0,
            scale: 0.8,
            stagger: 0.01,
            duration: 0.4,
            ease: "power2.in",
          });
        },
      });
    });

    // Add floating particles (like Minecraft dust)
    createMinecraftParticles();

    // Clean up ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Create floating Minecraft-style particles
  const createMinecraftParticles = () => {
    const particleContainer = document.createElement("div");
    particleContainer.className = "absolute inset-0 pointer-events-none z-50";
    document.body.appendChild(particleContainer);

    // Create particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute w-2 h-2 bg-green-500 opacity-60";
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;

      // Pixelated shape
      particle.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

      // Random colors
      const colors = ["#5cdb5c", "#4682B4", "#BA55D3", "#FFD700"];
      particle.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

      particleContainer.appendChild(particle);

      // Animate each particle
      gsap.to(particle, {
        y: -100 - Math.random() * 100,
        x: (Math.random() - 0.5) * 50,
        opacity: 0,
        duration: 5 + Math.random() * 5,
        repeat: -1,
        ease: "power1.out",
        onComplete: () => {
          particle.style.top = `${Math.random() * 100}%`;
          particle.style.left = `${Math.random() * 100}%`;
          gsap.set(particle, { y: 0, x: 0, opacity: 0.6 });
        },
      });
    }
  };

  const addToSectionRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const isVisible = (sectionId) => {
    return visibleSections.includes(sectionId);
  };

  // Create a minecraft-style pixel block grid for section reveals
  const createPixelBlocks = (numBlocks = 50) => {
    const blocks = [];
    for (let i = 0; i < numBlocks; i++) {
      blocks.push(
        <div
          key={i}
          className="pixel-block absolute w-8 h-8 bg-gray-800 opacity-0 transform scale-0"
          style={{
            top: `${Math.floor(Math.random() * 100)}%`,
            left: `${Math.floor(Math.random() * 100)}%`,
            transformOrigin: "center",
            transitionDelay: `${i * 0.02}s`,
          }}
        />
      );
    }
    return blocks;
  };

  return (
    <div ref={mainContainerRef} className="overflow-hidden bg-gray-900">
      {/* Hero Section */}
      <div ref={parallaxRef} className="relative h-screen overflow-hidden">
        {/* Parallax Layers */}
        <div className="parallax-layer absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/images/okk.jpg')] bg-repeat-x bg-cover bg-center filter blur-[0px] bg-size-[150%]"></div>
        </div>
        <div className="parallax-layer absolute inset-0 z-10">
          <div className="absolute inset-0 bg-[url('/images/minecraft-clouds.png')] bg-repeat-x bg-contain opacity-80"></div>
        </div>
        <div className="parallax-layer absolute inset-0 z-20">
          <div className="absolute inset-0 bg-[url('/images/minecraft-mountains.png')] bg-repeat-x bg-bottom"></div>
        </div>
        <div className="parallax-layer absolute inset-0 z-30">
          <div className="absolute inset-0 bg-[url('/images/minecraft-trees.png')] bg-repeat-x bg-bottom"></div>
        </div>

        {/* Floating Minecraft Blocks */}
        <div className="absolute inset-0 z-25 pointer-events-none">
          <div className="minecraft-cube absolute top-[15%] left-[10%] w-16 h-16 animate-float-slow">
            <div className="cube-face cube-face-front"></div>
            <div className="cube-face cube-face-back"></div>
            <div className="cube-face cube-face-right"></div>
            <div className="cube-face cube-face-left"></div>
            <div className="cube-face cube-face-top"></div>
            <div className="cube-face cube-face-bottom"></div>
          </div>
          <div className="minecraft-cube absolute top-[30%] right-[15%] w-12 h-12 animate-float">
            <div className="cube-face cube-face-front bg-green-700"></div>
            <div className="cube-face cube-face-back bg-green-700"></div>
            <div className="cube-face cube-face-right bg-green-800"></div>
            <div className="cube-face cube-face-left bg-green-800"></div>
            <div className="cube-face cube-face-top bg-green-600"></div>
            <div className="cube-face cube-face-bottom bg-green-900"></div>
          </div>
          <div className="minecraft-cube absolute bottom-[25%] right-[10%] w-14 h-14 animate-float-slow">
            <div className="cube-face cube-face-front bg-purple-700"></div>
            <div className="cube-face cube-face-back bg-purple-700"></div>
            <div className="cube-face cube-face-right bg-purple-800"></div>
            <div className="cube-face cube-face-left bg-purple-800"></div>
            <div className="cube-face cube-face-top bg-purple-600"></div>
            <div className="cube-face cube-face-bottom bg-purple-900"></div>
          </div>
        </div>

        <div className="relative z-40 flex flex-col items-center justify-center h-full px-4 text-center">
          <div className="pluckpluck">
            <div
              className="pluckpluck"
              style={{
                animation: "onetimezoomies 3s forwards",
              }}
            >
              <h1 className="font-Minercraftory text-4xl md:text-6xl lg:text-7xl text-white border-b-4 border-white mb-6 pixel-text-shadow shimmer-effect">
                <span>
                  <img src="/images/Daksha Yanthra logo 1.png"></img>
                </span>
              </h1>

              <img
                style={{ width: 240 + "px" }}
                src="/images/2025 - Minecraft Logo.png"
              ></img>
            </div>
            <h1 className="font-Minercraftory text-4xl md:text-6xl lg:text-7xl text-white mb-6shimmer-effect">
              <p className="font-minecraft text-xl md:text-2xl text-white mb-8 max-w-2xl">
                Join us for an epic two-day college fest themed around
                Minecraft!
              </p>
            </h1>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/events">
              <PixelButton
                variant="primary"
                className="pulse glow-purple"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #00FFFF 0%,#008080 100%)",
                }}
              >
                Register Now
              </PixelButton>
            </Link>
            <Link to="/events">
              <PixelButton
                variant="gold"
                className="glow-cyan"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #BA55D3 0%, #4B0082 100%)",
                }}
              >
                Explore Events
              </PixelButton>
            </Link>
          </div>

          <div className="absolute bottom-8 animate-bounce">
            <ChevronDown size={40} className="text-white" />
          </div>
        </div>
      </div>
      <AboutSection />
      // Replace the entire Events Preview section in your HomePage component
      with this code:
      {/* Events Preview */}
      <div
        ref={addToSectionRefs}
        data-section-id="events"
        className={`section-container py-16 px-4 bg-gray-800 transition-all duration-700 opacity-0 transform translate-y-10 relative ${
          isVisible("events") ? "opacity-100 translate-y-0" : ""
        }`}
      >
        {createPixelBlocks(100)}

        {/* Minecraft decorative elements */}
        <div className="absolute top-10 right-20 minecraft-cube w-12 h-12 animate-float z-0">
          <div className="cube-face cube-face-front bg-orange-700"></div>
          <div className="cube-face cube-face-back bg-orange-700"></div>
          <div className="cube-face cube-face-right bg-orange-800"></div>
          <div className="cube-face cube-face-left bg-orange-800"></div>
          <div className="cube-face cube-face-top bg-orange-600"></div>
          <div className="cube-face cube-face-bottom bg-orange-900"></div>
        </div>

        <div className="absolute bottom-10 left-10 minecraft-cube w-10 h-10 animate-float-slow z-0">
          <div className="cube-face cube-face-front bg-green-700"></div>
          <div className="cube-face cube-face-back bg-green-700"></div>
          <div className="cube-face cube-face-right bg-green-800"></div>
          <div className="cube-face cube-face-left bg-green-800"></div>
          <div className="cube-face cube-face-top bg-green-600"></div>
          <div className="cube-face cube-face-bottom bg-green-900"></div>
        </div>

        <FeaturedEventsSection featuredEvents={featuredEvents} />
      </div>
      {/* Interactive Map Preview */}
      <InteractiveMapSection addToSectionRefs={addToSectionRefs} isVisible={isVisible} />
      {/* Sponsors */}
      {/* Sponsors Section */}
      <div
        ref={addToSectionRefs}
        data-section-id="sponsors"
        className={`py-16 px-4 bg-gray-800/90 transition-all duration-700 opacity-0 transform translate-y-10 ${
          isVisible("sponsors") ? "opacity-100 translate-y-0" : ""
        }`}
      >
        <div className="container mx-auto text-center">
          <h2 className="font-minecraft text-3xl mb-10 text-green-500">
            <span className="bg-green-600 text-white px-3 py-1 mr-2 rounded-lg">
              Our
            </span>
            Sponsors
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="bg-gray-700 p-6 border-4 border-gray-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-lg"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  transform: `translateY(${
                    isVisible("sponsors") ? "0" : "20px"
                  })`,
                  opacity: isVisible("sponsors") ? 1 : 0,
                  transition: `transform 0.5s ease ${
                    index * 0.1
                  }s, opacity 0.5s ease ${index * 0.1}s`,
                }}
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-16 mx-auto mb-3 transition-transform duration-300 hover:scale-110"
                />
                <h3 className="font-minecraft text-gray-200">{sponsor.name}</h3>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gray-700/70 p-6 border-4 border-gray-600 inline-block rounded-lg shadow-lg">
            <h3 className="font-minecraft text-xl mb-4 text-gray-200">
              Interested in Sponsoring?
            </h3>
            <Link to="/about">
              <PixelButton
                variant="secondary"
                className="bg-green-600 hover:bg-green-700"
              >
                Contact Us
              </PixelButton>
            </Link>
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div
        ref={addToSectionRefs}
        data-section-id="cta"
        className={`py-20 px-4 bg-gradient-to-b from-minecraft-obsidian to-minecraft-obsidian/90 text-white text-center transition-all duration-700 opacity-0 transform translate-y-10 ${
          isVisible("cta") ? "opacity-100 translate-y-0" : ""
        }`}
      >
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute -top-10 -left-10 text-minecraft-gold opacity-50">
              <Star size={40} className="animate-pulse" />
            </div>
            <div className="absolute -bottom-10 -right-10 text-minecraft-gold opacity-50">
              <Star size={40} className="animate-pulse" />
            </div>

            <h2 className="font-pixel text-4xl md:text-5xl mb-6 pixel-text-shadow shimmer-effect">
              Ready to Join Daksha Yanthra 2025?
            </h2>
            <p className="font-minecraft text-xl mb-8 max-w-2xl mx-auto">
              Don't miss out on the most exciting college fest of the year!
              Register now to participate in events and workshops.
            </p>
            <PixelButton
              variant="gold"
              className="text-lg px-8 py-3 shadow-xl pulse"
            >
              Register Now
            </PixelButton>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sample data
const featuredEvents = [
  {
    title: "Hackathon",
    category: "Technical",
    description:
      "Develop innovative solutions and win exciting prizes in this thrilling competition!",
    date: "Marh 24, 2025",
    image: "/images/event-building.jpg",
  },
  {
    title: "Fashion Show",
    category: "Cultural",
    description:
      "Show off your fashion skills and win exciting prizes in this exciting competition!",
    date: "March 25, 2025",
    image: "/images/event-pixel.jpg",
  },
  {
    title: "Project Expo",
    category: "Technical",
    description:
      "Showcase your projects and innovations in this exciting competition!",
    date: "March 24, 2025",
    image: "/images/event-coding.jpg",
  },
];

const sponsors = [
  { name: "TechCraft", logo: "/images/sponsor1.png" },
  { name: "PixelWare", logo: "/images/sponsor2.png" },
  { name: "BlockByte", logo: "/images/sponsor3.png" },
  { name: "CubeCorp", logo: "/images/sponsor4.png" },
];

export default HomePage;
