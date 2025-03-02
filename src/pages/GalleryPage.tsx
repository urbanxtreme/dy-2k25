
import { useState, useEffect, useRef } from 'react';
import GalleryItem from '@/components/GalleryItem';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
}

const categories = ["All", "Events", "Competitions", "Performances"];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Filter images based on active category
    if (activeCategory === "All") {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(img => img.category === activeCategory));
    }
  }, [activeCategory]);
  
  useEffect(() => {
    if (galleryRef.current) {
      const items = galleryRef.current.querySelectorAll('.gallery-item');
      
      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }
  }, [filteredImages]);
  
  return (
    <div className="min-h-screen py-28 px-4 bg-minecraft-dirt/10">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-minecraft text-4xl mb-4">Gallery</h1>
          <p className="max-w-2xl mx-auto">
            Take a look at highlights from last year's MineFest!
            Browse photos from various events, competitions, and activities.
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`font-minecraft px-4 py-2 border-2 border-minecraft-stone transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-minecraft-grass text-white'
                    : 'bg-white hover:bg-minecraft-stone/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Gallery Grid */}
        <div 
          ref={galleryRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredImages.map(item => (
            <div key={item.id} className="gallery-item">
              <GalleryItem 
                image={item.image}
                title={item.title}
                description={item.description}
              />
            </div>
          ))}
        </div>
        
        {filteredImages.length === 0 && (
          <div className="text-center py-12 bg-white/90 border-4 border-minecraft-stone">
            <h3 className="font-minecraft text-2xl mb-4">No images found</h3>
            <p>There are no images in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Sample gallery images
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    image: "/images/img01.jpg",
    title: "Building Competition 2023",
    description: "Amazing structures from last year's Minecraft building contest.",
    category: "Performances"
  },
  {
    id: 2,
    image: "/images/img02.jpg",
    title: "Coding Challenge Winners",
    description: "The winning team from the programming competition.",
    category: "Competitions"
  },
  {
    id: 3,
    image: "/images/img17.JPG",
    title: "MineFest Opening Ceremony",
    description: "The exciting kickoff to last year's event.",
    category: "Events"
  },
  {
    id: 4,
    image: "/images/img04.jpg",
    title: "Pixel Art Exhibition",
    description: "Creative pixel artwork displayed throughout the venue.",
    category: "Performances"
  },
  {
    id: 5,
    image: "/images/img05.jpg",
    title: "Live Music Performance",
    description: "Students performing Minecraft-inspired music.",
    category: "Performances"
  },
  {
    id: 6,
    image: "/images/img03.jpg",
    title: "VR Gaming Zone",
    description: "Attendees enjoying virtual reality Minecraft experiences.",
    category: "Performances"
  },
  {
    id: 7,
    image: "/images/img07.jpg",
    title: "Redstone Workshop",
    description: "Students learning advanced redstone engineering techniques.",
    category: "Events"
  },
  {
    id: 8,
    image: "/images/img08 .jpg",
    title: "Costume Contest",
    description: "The amazing Minecraft-themed costumes from last year.",
    category: "Performances"
  },
  {
    id: 9,
    image: "/images/img09.JPG",
    title: "MineFest Afterparty",
    description: "Celebrating after a successful festival.",
    category: "Performances"
  },
  {
    id: 10,
    image: "/images/img10.JPG",
    title: "MineFest Afterparty",
    description: "Celebrating after a successful festival.",
    category: "Performances"
  },
  {
    id: 11,
    image: "/images/img11.JPG",
    title: "MineFest Afterparty",
    description: "Celebrating after a successful festival.",
    category: "Events"
  },
  {
    id: 12,
    image: "/images/img12.JPG",
    title: "MineFest Afterparty",
    description: "Celebrating after a successful festival.",
    category: "Performances"
  },
  {
    id: 13,
    image: "/images/img13.JPG",
    title: "MineFest Afterparty",
    description: "Celebrating after a successful festival.",
    category: "Performances"
  },
  {
    id: 14,
    image: "/images/img14.JPG",
    title: "MineFest Afterparty",
    description: "Celebrating after a successful festival.",
    category: "Performances"
  },
  {
    id: 15,
    image: "/images/img15.JPG",
    title: "MineFest Afterparty",
    description: "Celebrating after a successful festival.",
    category: "Performances"
  },
  {
    id: 16,
    image: "/images/img16.JPG",
    title: "MineFest Afterparty",
    description: "Celebrating after a successful festival.",
    category: "Competitions"
  }
];

export default GalleryPage;
