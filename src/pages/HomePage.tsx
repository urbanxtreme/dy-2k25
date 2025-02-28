
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PixelButton from '@/components/PixelButton';
import MinecraftCharacter from '@/components/MinecraftCharacter';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
      
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);
  
  const addToSectionRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };
  
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div ref={parallaxRef} className="relative h-screen overflow-hidden">
        <div className="parallax-layer absolute inset-0 z-0">
          <div className="absolute inset-0 bg-minecraft-sky"></div>
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
          <h1 className="font-pixel text-4xl md:text-6xl lg:text-7xl text-white mb-6 pixel-text-shadow">
            <span className="text-minecraft-grass">Mine</span>
            <span className="text-minecraft-gold">Fest</span>
            <span className="block mt-2 text-white">2024</span>
          </h1>
          <p className="font-minecraft text-xl md:text-2xl text-white mb-8 max-w-2xl pixel-text-shadow">
            Join us for an epic two-day college fest themed around Minecraft!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <PixelButton variant="primary">
              Register Now
            </PixelButton>
            <Link to="/events">
              <PixelButton variant="gold">
                Explore Events
              </PixelButton>
            </Link>
          </div>
          
          <div className="absolute bottom-8 animate-bounce">
            <ChevronRight size={40} className="text-white rotate-90" />
          </div>
        </div>
      </div>
      
      {/* About Section */}
      <div ref={addToSectionRefs} className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <h2 className="font-minecraft text-3xl mb-6 text-minecraft-obsidian">
                <span className="bg-minecraft-grass text-white px-3 py-1 mr-2">About</span>
                MineFest
              </h2>
              <p className="mb-4">
                Welcome to MineFest 2024, the most exciting college festival of the year! 
                Get ready for two days of intense competitions, creative workshops, and 
                unforgettable experiences – all themed around the world's most popular 
                sandbox game.
              </p>
              <p className="mb-6">
                Whether you're a hardcore gamer, a coding whiz, or a creative artist, 
                MineFest has something special for everyone. Join us as we transform our 
                campus into an interactive Minecraft world!
              </p>
              <div className="bg-minecraft-dirt/20 p-4 border-l-4 border-minecraft-dirt">
                <div className="flex items-center mb-2">
                  <Calendar size={20} className="mr-2 text-minecraft-grass" />
                  <span><strong>Date:</strong> May 15-16, 2024</span>
                </div>
                <div className="flex items-center mb-2">
                  <Clock size={20} className="mr-2 text-minecraft-grass" />
                  <span><strong>Time:</strong> 9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={20} className="mr-2 text-minecraft-grass" />
                  <span><strong>Venue:</strong> University Main Campus</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-96 bg-minecraft-dirt/10 border-4 border-minecraft-stone">
              <MinecraftCharacter />
            </div>
          </div>
        </div>
      </div>
      
      {/* Events Preview */}
      <div ref={addToSectionRefs} className="py-16 px-4 bg-minecraft-dirt/10">
        <div className="container mx-auto">
          <h2 className="font-minecraft text-3xl mb-8 text-center text-minecraft-obsidian">
            <span className="bg-minecraft-grass text-white px-3 py-1 mr-2">Featured</span>
            Events
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <div key={index} className="bg-white border-4 border-minecraft-stone hover:-translate-y-2 transition-transform duration-300">
                <div className="relative">
                  <div className="absolute top-0 left-0 bg-minecraft-grass px-3 py-1 z-10 border-b-2 border-r-2 border-black/30">
                    <span className="font-pixel text-white uppercase text-xs">{event.category}</span>
                  </div>
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-minecraft text-xl mb-2">{event.title}</h3>
                  <p className="text-sm mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-minecraft-dirt font-bold">{event.date}</span>
                    <Link to="/events">
                      <PixelButton variant="secondary" className="text-sm px-3 py-1">
                        Details
                      </PixelButton>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/events">
              <PixelButton variant="gold">
                View All Events
              </PixelButton>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Interactive Map Preview */}
      <div ref={addToSectionRefs} className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="font-minecraft text-3xl mb-6 text-minecraft-obsidian">
            <span className="bg-minecraft-grass text-white px-3 py-1 mr-2">Interactive</span>
            MineFest Map
          </h2>
          <p className="max-w-2xl mx-auto mb-8">
            Explore our interactive Minecraft-style map to discover all event locations!
            Click on buildings to learn more about different event categories.
          </p>
          <div className="relative h-72 bg-minecraft-dirt/10 border-4 border-minecraft-stone mb-8">
            <div className="absolute inset-0 bg-[url('/images/minecraft-map-preview.jpg')] bg-cover bg-center opacity-70"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-minecraft-dirt/80 p-6 border-4 border-minecraft-stone">
                <h3 className="font-minecraft text-2xl text-white mb-4">Explore The Map</h3>
                <Link to="/map">
                  <PixelButton variant="gold">
                    Open Map
                  </PixelButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sponsors */}
      <div ref={addToSectionRefs} className="py-16 px-4 bg-minecraft-dirt/10">
        <div className="container mx-auto text-center">
          <h2 className="font-minecraft text-3xl mb-10 text-minecraft-obsidian">
            <span className="bg-minecraft-grass text-white px-3 py-1 mr-2">Our</span>
            Sponsors
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="bg-white p-6 border-4 border-minecraft-stone hover:-translate-y-2 transition-transform duration-300">
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name} 
                  className="h-16 mx-auto"
                />
                <h3 className="font-minecraft mt-4">{sponsor.name}</h3>
              </div>
            ))}
          </div>
          
          <div className="mt-12">
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
      <div ref={addToSectionRefs} className="py-20 px-4 bg-minecraft-obsidian text-white text-center">
        <div className="container mx-auto">
          <h2 className="font-pixel text-4xl mb-6">Ready to Join MineFest 2024?</h2>
          <p className="font-minecraft text-xl mb-8 max-w-2xl mx-auto">
            Don't miss out on the most exciting college fest of the year!
            Register now to participate in events and workshops.
          </p>
          <PixelButton variant="gold" className="text-lg px-8 py-3">
            Register Now
          </PixelButton>
        </div>
      </div>
    </div>
  );
};

// Sample data
const featuredEvents = [
  {
    title: "Minecraft Building Competition",
    category: "Creative",
    description: "Show off your architectural skills in this epic building contest!",
    date: "May 15, 2024",
    image: "/images/event-building.jpg"
  },
  {
    title: "Pixel Art Challenge",
    category: "Art",
    description: "Create stunning pixel art designs and win amazing prizes!",
    date: "May 15, 2024",
    image: "/images/event-pixel.jpg"
  },
  {
    title: "Coding Quest",
    category: "Technical",
    description: "Solve programming challenges and puzzles in this exciting competition!",
    date: "May 16, 2024",
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
