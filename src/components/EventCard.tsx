
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
  
  return (
    <div 
      className={`minecraft-card overflow-hidden ${
        isExpanded ? 'transform translate-y-0 scale-[1.02]' : ''
      }`}
    >
      <div className="relative overflow-hidden group">
        <div className="absolute top-0 left-0 bg-minecraft-dirt px-3 py-1 z-10 border-b-2 border-r-2 border-black/30">
          <span className="font-pixel text-white uppercase text-xs">{event.category}</span>
        </div>
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-5">
        <h3 className="font-minecraft text-xl mb-3 text-minecraft-obsidian">{event.title}</h3>
        
        <div className="flex items-center text-sm mb-2">
          <Calendar size={16} className="mr-2 text-minecraft-grass" />
          <span>{event.date}</span>
        </div>
        
        <div className="flex items-center text-sm mb-4">
          <Clock size={16} className="mr-2 text-minecraft-grass" />
          <span>{event.time}</span>
        </div>
        
        {isExpanded && (
          <div className="animate-block-build overflow-hidden">
            <p className="mb-4 text-sm leading-relaxed">{event.description}</p>
            
            <div className="bg-minecraft-dirt/20 p-4 mb-5 border-l-4 border-minecraft-dirt rounded">
              <div className="flex items-center text-sm mb-3">
                <MapPin size={16} className="mr-2 text-minecraft-grass" />
                <span><strong>Venue:</strong> {event.venue}</span>
              </div>
              
              <div className="flex items-center text-sm mb-3">
                <Users size={16} className="mr-2 text-minecraft-grass" />
                <span><strong>Team:</strong> {event.capacity}</span>
              </div>
              
              <div className="flex items-center text-sm">
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
    </div>
  );
};

export default EventCard;
