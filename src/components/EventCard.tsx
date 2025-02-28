
import { useState } from 'react';
import PixelButton from './PixelButton';
import { Calendar, Clock, MapPin, Users, Award, ChevronDown, ChevronUp } from 'lucide-react';

export interface EventData {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  capacity: string;
  prizes: string;
  image: string;
}

interface EventCardProps {
  event: EventData;
}

const EventCard = ({ event }: EventCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getCategoryColor = (category: string) => {
    const colors: {[key: string]: string} = {
      'Creative': 'bg-minecraft-emerald border-minecraft-emerald-dark',
      'Art': 'bg-minecraft-diamond border-minecraft-diamond-dark',
      'Technical': 'bg-minecraft-redstone border-minecraft-redstone-dark',
      'Gaming': 'bg-minecraft-gold border-minecraft-gold-dark',
      'Workshops': 'bg-minecraft-iron border-minecraft-iron-dark',
      'Music': 'bg-minecraft-water border-minecraft-water-dark',
      'default': 'bg-minecraft-grass border-minecraft-grass-dark'
    };
    
    return colors[category] || colors.default;
  };
  
  return (
    <div 
      className={`minecraft-card overflow-hidden transform transition-all duration-300 ${
        isExpanded ? 'translate-y-0 scale-[1.02] z-10' : ''
      }`}
      style={{ 
        transform: isExpanded ? 'translateZ(30px)' : 'translateZ(0)',
        boxShadow: isExpanded ? '0 25px 50px rgba(0,0,0,0.4)' : undefined 
      }}
    >
      <div className="relative overflow-hidden group">
        <div className={`absolute top-0 left-0 px-3 py-1 z-10 border-b-2 border-r-2 text-white ${getCategoryColor(event.category)}`}>
          <span className="font-pixel uppercase text-xs">{event.category}</span>
        </div>
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-5 bg-minecraft-obsidian-light">
        <h3 className="font-minecraft text-xl mb-3 text-white pixel-text-shadow">{event.title}</h3>
        
        <div className="flex items-center text-sm mb-2 text-white/80">
          <Calendar size={16} className="mr-2 text-minecraft-grass" />
          <span>{event.date}</span>
        </div>
        
        <div className="flex items-center text-sm mb-4 text-white/80">
          <Clock size={16} className="mr-2 text-minecraft-grass" />
          <span>{event.time}</span>
        </div>
        
        {isExpanded && (
          <div className="animate-block-build overflow-hidden">
            <p className="mb-4 text-sm leading-relaxed text-white/90">{event.description}</p>
            
            <div className="bg-minecraft-obsidian/60 p-4 mb-5 border-l-4 border-minecraft-grass rounded">
              <div className="flex items-center text-sm mb-3 text-white/90">
                <MapPin size={16} className="mr-2 text-minecraft-grass" />
                <span><strong>Venue:</strong> {event.venue}</span>
              </div>
              
              <div className="flex items-center text-sm mb-3 text-white/90">
                <Users size={16} className="mr-2 text-minecraft-grass" />
                <span><strong>Team:</strong> {event.capacity}</span>
              </div>
              
              <div className="flex items-center text-sm text-white/90">
                <Award size={16} className="mr-2 text-minecraft-gold" />
                <span><strong>Prizes:</strong> {event.prizes}</span>
              </div>
            </div>
            
            <div className="flex justify-between gap-3">
              <PixelButton variant="gold" className="flex-1">
                Register Now
              </PixelButton>
              <PixelButton 
                variant="secondary" 
                onClick={() => setIsExpanded(false)}
                className="px-3"
              >
                <ChevronUp size={18} />
              </PixelButton>
            </div>
          </div>
        )}
        
        {!isExpanded && (
          <PixelButton 
            className="w-full flex items-center justify-center"
            onClick={() => setIsExpanded(true)}
          >
            <span className="mr-2">View Details</span>
            <ChevronDown size={18} />
          </PixelButton>
        )}
      </div>
      
      {/* Add special effect based on category */}
      {event.category === 'Technical' && (
        <div className="absolute top-0 right-0 m-1 redstone-ore-glow w-2 h-2 rounded-full bg-minecraft-redstone"></div>
      )}
      {event.category === 'Art' && (
        <div className="absolute top-0 right-0 m-1 diamond-ore-glow w-2 h-2 rounded-full bg-minecraft-diamond"></div>
      )}
    </div>
  );
};

export default EventCard;
