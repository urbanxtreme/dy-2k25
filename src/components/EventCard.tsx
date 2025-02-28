
import { useState } from 'react';
import PixelButton from './PixelButton';
import { Calendar, Clock, MapPin, Users, Award } from 'lucide-react';

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
      className={`bg-white/90 border-4 border-minecraft-stone transition-all duration-300 ${
        isExpanded ? 'transform translate-y-0' : 'hover:-translate-y-2'
      }`}
    >
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 bg-minecraft-dirt px-3 py-1 z-10 border-b-2 border-r-2 border-black/30">
          <span className="font-pixel text-white uppercase text-xs">{event.category}</span>
        </div>
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-minecraft text-xl mb-2 text-minecraft-obsidian">{event.title}</h3>
        
        <div className="flex items-center text-sm mb-2">
          <Calendar size={16} className="mr-2 text-minecraft-grass" />
          <span>{event.date}</span>
        </div>
        
        <div className="flex items-center text-sm mb-4">
          <Clock size={16} className="mr-2 text-minecraft-grass" />
          <span>{event.time}</span>
        </div>
        
        {isExpanded && (
          <div className="animate-block-build">
            <p className="mb-4 text-sm">{event.description}</p>
            
            <div className="bg-minecraft-dirt/20 p-3 mb-4 border-l-4 border-minecraft-dirt">
              <div className="flex items-center text-sm mb-2">
                <MapPin size={16} className="mr-2 text-minecraft-grass" />
                <span><strong>Venue:</strong> {event.venue}</span>
              </div>
              
              <div className="flex items-center text-sm mb-2">
                <Users size={16} className="mr-2 text-minecraft-grass" />
                <span><strong>Team:</strong> {event.capacity}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Award size={16} className="mr-2 text-minecraft-gold" />
                <span><strong>Prizes:</strong> {event.prizes}</span>
              </div>
            </div>
            
            <div className="flex justify-between">
              <PixelButton variant="gold">
                Register Now
              </PixelButton>
              <PixelButton 
                variant="secondary" 
                onClick={() => setIsExpanded(false)}
              >
                Close
              </PixelButton>
            </div>
          </div>
        )}
        
        {!isExpanded && (
          <PixelButton 
            className="w-full"
            onClick={() => setIsExpanded(true)}
          >
            View Details
          </PixelButton>
        )}
      </div>
    </div>
  );
};

export default EventCard;
