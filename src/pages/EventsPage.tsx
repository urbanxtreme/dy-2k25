
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EventCard, { EventData } from '@/components/EventCard';
import PixelButton from '@/components/PixelButton';
import { Filter } from 'lucide-react';

const categories = [
  "All",
  "Technical",
  "Cultural",
  "Gaming",
  "Workshop",
  "Creative"
];

const EventsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All');
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    // Get category from URL params on mount
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);
  
  useEffect(() => {
    // Filter events based on active category
    if (activeCategory === 'All') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => 
        event.category.toLowerCase() === activeCategory.toLowerCase()
      ));
    }
    
    // Update URL params
    if (activeCategory === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', activeCategory);
    }
    setSearchParams(searchParams);
  }, [activeCategory, searchParams, setSearchParams]);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen py-28 px-4 bg-minecraft-dirt/10">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-minecraft text-4xl mb-4">MineFest Events</h1>
          <p className="max-w-2xl mx-auto">
            Discover all the exciting events and competitions at MineFest 2024!
            Filter by category to find the perfect events for you.
          </p>
        </div>
        
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-6 flex justify-center">
          <PixelButton 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center"
          >
            <Filter size={18} className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </PixelButton>
        </div>
        
        {/* Category Filter */}
        <div className={`mb-8 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
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
        
        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/90 border-4 border-minecraft-stone">
            <h3 className="font-minecraft text-2xl mb-4">No events found</h3>
            <p className="mb-6">There are no events in this category yet. Please check back later!</p>
            <PixelButton onClick={() => handleCategoryChange('All')}>
              View All Events
            </PixelButton>
          </div>
        )}
      </div>
    </div>
  );
};

// Sample data
const events: EventData[] = [
  {
    id: 1,
    title: "Minecraft Building Competition",
    category: "Creative",
    date: "May 15, 2024",
    time: "10:00 AM - 2:00 PM",
    venue: "Digital Design Lab",
    description: "Show off your architectural skills in this epic building contest! Participants will have 4 hours to create amazing structures based on a theme revealed at the start of the event.",
    capacity: "Individual or Teams of 2",
    prizes: "1st: $300 | 2nd: $200 | 3rd: $100",
    image: "/images/event-building.jpg"
  },
  {
    id: 2,
    title: "Pixel Art Challenge",
    category: "Creative",
    date: "May 15, 2024",
    time: "2:00 PM - 5:00 PM",
    venue: "Art Studio",
    description: "Create stunning pixel art designs and win amazing prizes! Participants will be given themes and must create artwork using limited color palettes and tools.",
    capacity: "Individual",
    prizes: "1st: $200 | 2nd: $150 | 3rd: $75",
    image: "/images/event-pixel.jpg"
  },
  {
    id: 3,
    title: "Coding Quest",
    category: "Technical",
    date: "May 16, 2024",
    time: "9:00 AM - 12:00 PM",
    venue: "Computer Lab Alpha",
    description: "Solve programming challenges and puzzles in this exciting competition! Each challenge gets progressively harder, testing your problem-solving and coding skills.",
    capacity: "Teams of 3",
    prizes: "1st: $500 | 2nd: $300 | 3rd: $150",
    image: "/images/event-coding.jpg"
  },
  {
    id: 4,
    title: "AI Minecraft Workshop",
    category: "Workshop",
    date: "May 15, 2024",
    time: "3:00 PM - 5:00 PM",
    venue: "Technology Hall",
    description: "Learn how to create AI-powered Minecraft mods! This workshop will cover the basics of machine learning and how to implement simple AI in Minecraft environments.",
    capacity: "Open to all (Limited to 30 seats)",
    prizes: "Participation certificates",
    image: "/images/event-workshop.jpg"
  },
  {
    id: 5,
    title: "Minecraft Speedrun Challenge",
    category: "Gaming",
    date: "May 16, 2024",
    time: "1:00 PM - 6:00 PM",
    venue: "Gaming Arena",
    description: "Race against other players to complete Minecraft as quickly as possible! Various categories will be available including Any%, All Achievements, and more.",
    capacity: "Individual",
    prizes: "1st: Gaming PC | 2nd: Gaming Monitor | 3rd: Gaming Headset",
    image: "/images/event-speedrun.jpg"
  },
  {
    id: 6,
    title: "Redstone Engineering Competition",
    category: "Technical",
    date: "May 15, 2024",
    time: "11:00 AM - 3:00 PM",
    venue: "Engineering Block",
    description: "Put your redstone skills to the test! Design and build functional redstone contraptions that solve specific problems or perform impressive tasks.",
    capacity: "Teams of 2",
    prizes: "1st: $400 | 2nd: $250 | 3rd: $100",
    image: "/images/event-redstone.jpg"
  },
  {
    id: 7,
    title: "Minecraft Music Festival",
    category: "Cultural",
    date: "May 15, 2024",
    time: "6:00 PM - 9:00 PM",
    venue: "Main Auditorium",
    description: "Experience incredible live performances inspired by Minecraft music! Local bands and musicians will perform original compositions and covers of the game's iconic soundtrack.",
    capacity: "Open to all",
    prizes: "N/A",
    image: "/images/event-music.jpg"
  },
  {
    id: 8,
    title: "Mob Costume Contest",
    category: "Cultural",
    date: "May 16, 2024",
    time: "4:00 PM - 6:00 PM",
    venue: "Central Plaza",
    description: "Show off your creative costume-making skills by dressing up as your favorite Minecraft mobs! Prizes for most accurate, most creative, and funniest costumes.",
    capacity: "Individual",
    prizes: "Various gift cards and merchandise",
    image: "/images/event-costume.jpg"
  },
  {
    id: 9,
    title: "Minecraft VR Experience",
    category: "Gaming",
    date: "May 16, 2024",
    time: "10:00 AM - 4:00 PM",
    venue: "Innovation Lab",
    description: "Experience Minecraft like never before in virtual reality! Try out custom-built VR scenarios and games in this hands-on exhibition.",
    capacity: "Open to all (Sign-up required)",
    prizes: "N/A",
    image: "/images/event-vr.jpg"
  }
];

export default EventsPage;
