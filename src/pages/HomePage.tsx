
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PixelButton from '@/components/PixelButton';
import MinecraftCharacter from '@/components/MinecraftCharacter';
import { Calendar, Clock, MapPin, ChevronDown, ArrowRight, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  
  useEffect(() => {
    // Parallax effect for hero section
    if (parallaxRef.current) {
      const layers = parallaxRef.current.querySelectorAll('.parallax-layer');
      
      layers.forEach((layer, i) => {
        const depth = i / layers.length;
        
        gsap.to(layer, {
          y: `${depth * 100}%`,
          ease: "none",
          scrollTrigger: {
            trigger: parallaxRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }
    
    // Animate sections on scroll
    sectionRefs.current.forEach((section, index) => {
      if (!section) return;
      
      const sectionId = section.getAttribute('data-section-id') || String(index);
      
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          setVisibleSections(prev => [...prev, sectionId]);
          
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.2
          });
        },
        onLeaveBack: () => setVisibleSections(prev => prev.filter(id => id !== sectionId))
      });
    });
    
    // Clean up ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
          <div className="absolute inset-0 bg-[url('/images/and.jpg')] bg-repeat-x bg-cover filter blur-[5px] bg-size-[150%]"></div>
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
            <h1 className="font-pixel text-4xl md:text-6xl lg:text-7xl text-white mb-6 pixel-text-shadow shimmer-effect">
              <span className="text-minecraft-grass">Daksha </span>
              <span className="text-minecraft-gold">Yanthra</span>
              <span className="block mt-3 text-white">2025</span>
            </h1>
          </div>
          <p className="font-minecraft text-xl md:text-2xl text-white mb-8 max-w-2xl pixel-text-shadow">
            Join us for an epic two-day college fest themed around Minecraft!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <PixelButton variant="primary" className="pulse">
              Register Now
            </PixelButton>
            <Link to="/events">
              <PixelButton variant="gold">
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
      <div 
        ref={addToSectionRefs} 
        data-section-id="about"
        className={`py-16 px-4 bg-white transition-all duration-700 opacity-0 transform translate-y-10 ${
          isVisible('about') ? 'opacity-100 translate-y-0' : ''
        }`}
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <div className="border-l-4 border-minecraft-grass pl-4 mb-6">
                <h2 className="font-minecraft text-3xl mb-2 text-black">
                  About <span className="text-minecraft-grass">Daksha Yanthra</span>
                </h2>
                <p className="text-minecraft-stone">The ultimate Minecraft college experience</p>
              </div>
              <p className="mb-4 leading-relaxed">
              Experience the fusion of creativity, technology, and limitless possibilities as the College of Engineering Attingal presents the most awaited Techno-Cultural Fest: Daksha Yanthra 2025!

Step into a world where pixels become masterpieces, redstone powers innovation, and every block holds the potential for greatness. From mind-blowing tech challenges to intense hackathons, each event is designed to push the boundaries of what can be built, coded, and imagined.
              </p>
              <p className="mb-6 leading-relaxed">
              As you explore this vibrant landscape, you’ll witness a seamless fusion of skill and strategy, where visionaries craft the future—one block at a time. Whether you're competing, collaborating, or just placing your first block, this is your chance to mine ideas, craft solutions, and engineer a world of infinite possibilities.

Join us as we embark on an unforgettable journey through creativity, engineering, and the spirit of innovation.
              </p>
              <div className="bg-minecraft-dirt/20 p-5 border-l-4 border-minecraft-dirt rounded-r shadow-md">
                <div className="flex items-center mb-3">
                  <Calendar size={22} className="mr-3 text-minecraft-grass" />
                  <span><strong>Date:</strong> March 24-25, 2025</span>
                </div>
                <div className="flex items-center mb-3">
                  <Clock size={22} className="mr-3 text-minecraft-grass" />
                  <span><strong>Time:</strong> 9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={22} className="mr-3 text-minecraft-grass" />
                  <span><strong>Venue:</strong> College Campus</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-96">
              <MinecraftCharacter />
            </div>
          </div>
        </div>
      </div>
      
      {/* Events Preview */}
      <div 
        ref={addToSectionRefs} 
        data-section-id="events"
        className={`py-16 px-4 bg-minecraft-dirt/10 transition-all duration-700 opacity-0 transform translate-y-10 ${
          isVisible('events') ? 'opacity-100 translate-y-0' : ''
        }`}
      >
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-minecraft text-3xl mb-3 inline-block relative">
              <span className="text-green-500 px-3 py-1 mr-2">Featured Events</span>
              <div className="absolute -right-8 -top-8">
                <Star size={24} className="text-minecraft-gold animate-pulse" />
              </div>
            </h2>
            <p className="text-lg max-w-2xl mx-auto">Check out these amazing events you don't want to miss!</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <div 
                key={index} 
                className="minecraft-card group hover:z-10"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transform: `translateY(${isVisible('events') ? '0' : '20px'})`,
                  opacity: isVisible('events') ? 1 : 0,
                  transition: `transform 0.5s ease ${index * 0.1}s, opacity 0.5s ease ${index * 0.1}s`
                }}
              >
                <div className="relative overflow-hidden">
                  <div className="absolute top-0 left-0 bg-minecraft-grass px-3 py-1 z-10 border-b-2 border-r-2 border-black/30">
                    <span className="font-pixel text-white uppercase text-xs">{event.category}</span>
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
                  <p className="text-sm mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-minecraft-dirt font-bold flex items-center">
                      <Calendar size={14} className="mr-1" /> {event.date}
                    </span>
                    <Link to="/events">
                      <PixelButton variant="secondary" className="text-sm px-3 py-1 flex items-center">
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
              <PixelButton variant="gold" className="text-lg px-8 py-3 shadow-lg">
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
          isVisible('map') ? 'opacity-100 translate-y-0' : ''
        }`}
      >
        <div className="container mx-auto text-center">
          <h2 className="font-minecraft text-3xl mb-6 text-minecraft-obsidian">
            <span className="text-yellow-500 px-3 py-1 mr-2">Interactive MineFest Map</span>
          </h2>
          <p className="text-yellow-500 max-w-2xl mx-auto mb-8 text-lg">
            Explore our interactive Minecraft-style map to discover all event locations!
            Click on buildings to learn more about different event categories.
          </p>
          <div className="relative h-80 sm:h-96 bg-minecraft-dirt/10 border-4 border-minecraft-stone mb-8 rounded overflow-hidden shadow-xl group">
            <div className="absolute inset-0 bg-[url('/images/minecraft-map-preview.jpg')] bg-cover bg-center opacity-70 transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-minecraft-dirt/80 p-6 border-4 border-minecraft-stone rounded shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                <h3 className="font-minecraft text-2xl text-white mb-4 pixel-text-shadow">Explore The Map</h3>
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
          isVisible('sponsors') ? 'opacity-100 translate-y-0' : ''
        }`}
      >
        <div className="container mx-auto text-center">
          <h2 className="font-minecraft text-3xl mb-10 text-minecraft-obsidian">
            <span className="bg-minecraft-grass text-white px-3 py-1 mr-2">Our</span>
            Sponsors
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sponsors.map((sponsor, index) => (
              <div 
                key={index} 
                className="bg-white p-6 border-4 border-minecraft-stone transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transform: `translateY(${isVisible('sponsors') ? '0' : '20px'})`,
                  opacity: isVisible('sponsors') ? 1 : 0,
                  transition: `transform 0.5s ease ${index * 0.1}s, opacity 0.5s ease ${index * 0.1}s`
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
            <h3 className="font-minecraft text-xl mb-4">Interested in Sponsoring?</h3>
            <Link to="/about">
              <PixelButton variant="secondary">
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
          isVisible('cta') ? 'opacity-100 translate-y-0' : ''
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
            
            <h2 className="font-pixel text-4xl md:text-5xl mb-6 pixel-text-shadow shimmer-effect">Ready to Join MineFest 2024?</h2>
            <p className="font-minecraft text-xl mb-8 max-w-2xl mx-auto">
              Don't miss out on the most exciting college fest of the year!
              Register now to participate in events and workshops.
            </p>
            <PixelButton variant="gold" className="text-lg px-8 py-3 shadow-xl pulse">
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
    description: "Develop innovative solutions and win exciting prizes in this thrilling competition!",
    date: "Marh 24, 2025",
    image: "/images/event-building.jpg"
  },
  {
    title: "Fashion Show",
    category: "Cultural",
    description: "Show off your fashion skills and win exciting prizes in this exciting competition!",
    date: "March 25, 2025",
    image: "/images/event-pixel.jpg"
  },
  {
    title: "Project Expo",
    category: "Technical",
    description: "Showcase your projects and innovations in this exciting competition!",
    date: "March 24, 2025",
    image: "/images/event-coding.jpg"
  }
];

const sponsors = [
  { name: "TechCraft", logo: "/images/sponsor1.png" },
  { name: "PixelWare", logo: "/images/sponsor2.png" },
  { name: "BlockByte", logo: "/images/sponsor3.png" },
  { name: "CubeCorp", logo: "/images/sponsor4.png" }
];

export default HomePage;
