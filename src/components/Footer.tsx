
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-minecraft-dirt border-t-4 border-minecraft-stone px-4 py-8 text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-minecraft text-xl mb-4">
              <span className="text-minecraft-grass">Mine</span>
              <span className="text-minecraft-gold">Fest</span>
              <span className="ml-2 text-sm bg-minecraft-redstone text-white px-2 py-0.5">2024</span>
            </h3>
            <p className="mb-4">A two-day college fest themed around Minecraft, featuring technical and cultural events!</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-minecraft-gold transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-minecraft-gold transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-minecraft-gold transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-minecraft-gold transition-colors duration-200">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-minecraft text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-minecraft-gold transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-minecraft-gold transition-colors duration-200">Events</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-minecraft-gold transition-colors duration-200">Gallery</Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-minecraft-gold transition-colors duration-200">Interactive Map</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-minecraft-gold transition-colors duration-200">About & Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-minecraft text-xl mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail size={16} className="mr-2 text-minecraft-gold" />
                <a href="mailto:info@minefest.edu" className="hover:text-minecraft-gold transition-colors duration-200">info@minefest.edu</a>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-2 text-minecraft-gold" />
                <a href="tel:+123456789" className="hover:text-minecraft-gold transition-colors duration-200">+1 (234) 567-8900</a>
              </div>
              <p>
                MineFest College Campus,<br />
                Block Avenue, Pixel City,<br />
                MC 12345
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-minecraft-stone/50 mt-8 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} MineFest College Fest. All rights reserved.</p>
          <p className="text-sm mt-2">
            <Link to="/privacy" className="hover:text-minecraft-gold transition-colors duration-200 mr-4">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-minecraft-gold transition-colors duration-200">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
