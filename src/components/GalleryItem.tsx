
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
      className="relative overflow-hidden bg-minecraft-stone border-4 border-minecraft-stone"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={image} 
        alt={title} 
        className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
      />
      
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-minecraft-dirt/90 p-4 transform transition-transform duration-300 ${
          isHovered ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <h3 className="font-minecraft text-lg text-white mb-2">{title}</h3>
        <p className="text-sm text-white/90">{description}</p>
      </div>
    </div>
  );
};

export default GalleryItem;
