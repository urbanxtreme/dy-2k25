
import { useState } from 'react';

interface GalleryItemProps {
  image: string;
  title: string;
  description: string;
}

const GalleryItem = ({ image, title, description }: GalleryItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative overflow-hidden bg-minecraft-stone border-4 border-minecraft-stone rounded shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden aspect-square">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-minecraft-dirt to-minecraft-dirt/80 p-4 transform transition-transform duration-300 ${
          isHovered ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <h3 className="font-minecraft text-lg text-white mb-2 pixel-text-shadow">{title}</h3>
        <p className="text-sm text-white/90">{description}</p>
      </div>
      
      {/* Pixelated corner effect on hover */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-white/40"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-white/40"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-white/40"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-white/40"></div>
      </div>
    </div>
  );
};

export default GalleryItem;
