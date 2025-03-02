import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PixelButton from "@/components/PixelButton";
import MinecraftCharacter from "@/components/MinecraftCharacter";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronDown,
  ArrowRight,
  Star,
} from "lucide-react";
import gsap from "gsap";
import Countdown from "react-countdown";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [quote, setQuote] = useState<string>("Loading inspiring quotes...");
  const [isFading, setIsFading] = useState(false);

  // Quote rotation effect
  useEffect(() => {
    let isMounted = true;
    let intervalId: NodeJS.Timeout;

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
  useEffect(() => {
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

    // Animate sections on scroll
    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      const sectionId =
        section.getAttribute("data-section-id") || String(index);

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          setVisibleSections((prev) => [...prev, sectionId]);

          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.2,
          });
        },
        onLeaveBack: () =>
          setVisibleSections((prev) => prev.filter((id) => id !== sectionId)),
      });
    });

    // Clean up ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const addToSectionRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const isVisible = (sectionId: string) => {
    return visibleSections.includes(sectionId);
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div ref={parallaxRef} className="relative h-screen overflow-hidden">
        <div className="parallax-layer absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/images/newand.jpg')] bg-repeat-x bg-cover filter blur-[0px] bg-size-[150%]"></div>
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

        <div className="relative z-40 flex flex-col items-center justify-center h-full px-4 text-center">
          <div className="animate-float">
            <h1 className="font-Minercraftory text-4xl md:text-6xl lg:text-7xl text-white mb-6 pixel-text-shadow shimmer-effect">
              <span className="font-Minercraftory" style={{
                fontFamily: "Minercraftory",
                backgroundImage: "linear-gradient(135deg, #00FFFF, #008080)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>Daksha </span>
              <span
                className="font-Minercraftory"
                style={{
                  fontFamily: "Minercraftory",
                  backgroundImage: "linear-gradient(135deg, 	#BA55D3 0%, #4B0082 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Yanthra
              </span>
              <span className="block mt-3 text-white" style={{fontFamily: "Minercraftory"}}>2025</span>
            </h1>
          </div>
          <p className="font-minecraft text-xl md:text-2xl text-white mb-8 max-w-2xl pixel-text-shadow">
            Join us for an epic two-day college fest themed around Minecraft!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/events">
              <PixelButton
                variant="primary"
                className="pulse glow-purple"
                style={{ backgroundImage: "linear-gradient(135deg, 	#00FFFF 0%,#008080 100%)" }}
              >
                Register Now
              </PixelButton>
            </Link>
            <Link to="/events">
              <PixelButton
                variant="gold"
                className="glow-cyan"
                style={{ backgroundImage: "linear-gradient(135deg, 	#BA55D3 0%, #4B0082 100%)" }}
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

      {/* About Section */}
      {/* About Section */}
      <div
        ref={addToSectionRefs}
        data-section-id="about"
        className={`py-16 px-4 bg-no-repeat bg-center bg-cover transition-all duration-700 opacity-0 transform translate-y-10 ${
          isVisible("about") ? "opacity-100 translate-y-0" : ""
        }`}
      
      >
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-stretch gap-12">
            {/* Left Column */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between">
              <div className="mb-8">
                <div className="border-l-4 border-minecraft-grass pl-6 mb-8 relative">
                  <div className="absolute left-0 top-0 w-1 h-full bg-minecraft-grass/30"></div>
                  <h2
                    className={`font-minecraft text-3xl md:text-4xl mb-4 text-black transition-opacity duration-500 ${
                      isFading ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    "{quote}"
                  </h2>
                </div>

                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 font-minecraft tracking-wide">
                  Join us at{" "}
                  <span className="text-minecraft-grass font-bold">
                    Daksha Yanthra 2025
                  </span>{" "}
                  for an unforgettable Minecraft-themed extravaganza! Dive into
                  a world where creativity meets innovation across 48 hours of
                  non-stop excitement.
                </p>

                <div className="bg-minecraft-dirt/20 p-6 border-l-4 border-minecraft-dirt rounded-r-lg shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center bg-white/80 p-3 rounded-lg">
                      <Calendar
                        size={24}
                        className="mr-4 text-minecraft-grass shrink-0"
                      />
                      <div>
                        <p className="font-minecraft text-lg font-bold text-gray-800">
                          Date
                        </p>
                        <p className="text-gray-600">March 24-25, 2025</p>
                      </div>
                    </div>

                    <div className="flex items-center bg-white/80 p-3 rounded-lg">
                      <Clock
                        size={24}
                        className="mr-4 text-minecraft-grass shrink-0"
                      />
                      <div>
                        <p className="font-minecraft text-lg font-bold text-gray-800">
                          Time
                        </p>
                        <p className="text-gray-600">9:00 AM - 8:00 PM</p>
                      </div>
                    </div>

                    <div className="flex items-center bg-white/80 p-3 rounded-lg">
                      <MapPin
                        size={24}
                        className="mr-4 text-minecraft-grass shrink-0"
                      />
                      <div>
                        <p className="font-minecraft text-lg font-bold text-gray-800">
                          Venue
                        </p>
                        <p className="text-gray-600">College Of Engineering, Attingal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="mt-8">
                <h3 className="font-minecraft text-2xl mb-6 text-center text-minecraft-obsidian">
                  ⏳ Event Starts In ⏳
                </h3>
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
                        <div
                          key={index}
                          className="text-center bg-minecraft-dirt/20 p-3 rounded-lg border-2 border-minecraft-stone"
                        >
                          <div className="font-minecraft text-3xl md:text-4xl text-minecraft-obsidian mb-1">
                            {item.value}
                          </div>
                          <div className="font-minecraft text-sm text-gray-600 uppercase tracking-wide">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </div>
            </div>

            {/* Right Column - Minecraft Character */}
            <div className="w-full lg:w-1/2 h-[600px] relative">
                <MinecraftCharacter className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Events Preview */}
      <div
        ref={addToSectionRefs}
        data-section-id="events"
        className={`py-16 px-4 bg-purple-100 transition-all duration-700 opacity-100 transform translate-y-10 ${
          isVisible("events") ? "opacity-100 translate-y-0" : ""
        }`}
      >
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-minecraft text-3xl mb-3 inline-block relative">
              <span className="text-green-500 px-3 py-1 mr-2">
                Featured Events
              </span>
              <div className="absolute -right-8 -top-8">
                <Star size={24} className="text-minecraft-gold animate-pulse" />
              </div>
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              Check out these amazing events you don't want to miss!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <div
                key={index}
                className="minecraft-card group hover:z-10"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  transform: `translateY(${
                    isVisible("events") ? "0" : "20px"
                  })`,
                  opacity: isVisible("events") ? 1 : 0,
                  transition: `transform 0.5s ease ${
                    index * 0.1
                  }s, opacity 0.5s ease ${index * 0.1}s`,
                }}
              >
                <div className="relative overflow-hidden">
                  <div className="absolute top-0 left-0 bg-minecraft-grass px-3 py-1 z-10 border-b-2 border-r-2 border-black/30">
                    <span className="font-pixel text-white uppercase text-xs">
                      {event.category}
                    </span>
                  </div>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-5">
                  <h3 className="font-minecraft text-xl mb-2">{event.title}</h3>
                  <p className="text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-minecraft-dirt font-bold flex items-center">
                      <Calendar size={14} className="mr-1" /> {event.date}
                    </span>
                    <Link to="/events">
                      <PixelButton
                        variant="secondary"
                        className="text-sm px-3 py-1 flex items-center"
                      >
                        Details <ArrowRight size={14} className="ml-1" />
                      </PixelButton>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/events">
              <PixelButton
                variant="gold"
                className="text-lg px-8 py-3 shadow-lg"
              >
                View All Events
              </PixelButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Map Preview */}
      <div
        ref={addToSectionRefs}
        data-section-id="map"
        className={`py-16 px-4 bg-[url('/images/bg2.png')] bg-cover bg-center transition-all duration-700 opacity-0 transform translate-y-10 ${
          isVisible("map") ? "opacity-100 translate-y-0" : ""
        }`}
      >
        <div className="container mx-auto text-center">
          <h2 className="font-minecraft text-3xl mb-6 text-minecraft-obsidian">
            <span className="text-yellow-500 px-3 py-1 mr-2">
              Interactive MineFest Map
            </span>
          </h2>
          <p className="text-yellow-500 max-w-2xl mx-auto mb-8 text-lg">
            Explore our interactive Minecraft-style map to discover all event
            locations! Click on buildings to learn more about different event
            categories.
          </p>
          <div className="relative h-80 sm:h-96 bg-minecraft-dirt/10 border-4 border-minecraft-stone mb-8 rounded overflow-hidden shadow-xl group">
            <div className="absolute inset-0 bg-[url('/images/minecraft-map-preview.jpg')] bg-cover bg-center opacity-70 transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-minecraft-dirt/80 p-6 border-4 border-minecraft-stone rounded shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                <h3 className="font-minecraft text-2xl text-white mb-4 pixel-text-shadow">
                  Explore The Map
                </h3>
                <Link to="/map">
                  <PixelButton variant="gold" className="pulse">
                    Open Map
                  </PixelButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsors */}
      <div
        ref={addToSectionRefs}
        data-section-id="sponsors"
        className={`py-16 px-4 bg-minecraft-dirt/10 transition-all duration-700 opacity-0 transform translate-y-10 ${
          isVisible("sponsors") ? "opacity-100 translate-y-0" : ""
        }`}
      >
        <div className="container mx-auto text-center">
          <h2 className="font-minecraft text-3xl mb-10 text-minecraft-obsidian">
            <span className="bg-minecraft-grass text-white px-3 py-1 mr-2">
              Our
            </span>
            Sponsors
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="bg-white p-6 border-4 border-minecraft-stone transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded"
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
                <h3 className="font-minecraft">{sponsor.name}</h3>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white/70 p-6 border-4 border-minecraft-stone inline-block rounded shadow-lg">
            <h3 className="font-minecraft text-xl mb-4">
              Interested in Sponsoring?
            </h3>
            <Link to="/about">
              <PixelButton variant="secondary">Contact Us</PixelButton>
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
