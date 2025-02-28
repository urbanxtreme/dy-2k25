
import MinecraftMap from '@/components/MinecraftMap';
import { MapPin, MousePointer, ZoomIn, RefreshCw } from 'lucide-react';

const MapPage = () => {
  return (
    <div className="min-h-screen py-28 px-4 bg-minecraft-dirt/10">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-minecraft text-4xl mb-4 shimmer-effect inline-block">Interactive Map</h1>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Explore the MineFest campus with our interactive Minecraft-style map!
            Click on buildings and locations to discover where events will be held.
          </p>
        </div>
        
        <div className="bg-white/90 border-4 border-minecraft-stone p-6 mb-8 rounded shadow-lg">
          <h2 className="font-minecraft text-2xl mb-4 flex items-center">
            <MapPin className="mr-2 text-minecraft-grass" /> How to Use the Map
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-minecraft-dirt/10 p-4 rounded flex items-start">
              <MousePointer size={24} className="mr-3 text-minecraft-grass mt-1" />
              <div>
                <h3 className="font-minecraft text-lg mb-1">Pan</h3>
                <p className="text-sm">Click and drag to move around the map</p>
              </div>
            </div>
            <div className="bg-minecraft-dirt/10 p-4 rounded flex items-start">
              <ZoomIn size={24} className="mr-3 text-minecraft-grass mt-1" />
              <div>
                <h3 className="font-minecraft text-lg mb-1">Zoom</h3>
                <p className="text-sm">Use the buttons to zoom in and out of the map</p>
              </div>
            </div>
            <div className="bg-minecraft-dirt/10 p-4 rounded flex items-start">
              <RefreshCw size={24} className="mr-3 text-minecraft-grass mt-1" />
              <div>
                <h3 className="font-minecraft text-lg mb-1">Reset</h3>
                <p className="text-sm">Click the reset button to return to the default view</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <MinecraftMap />
        </div>
        
        <div className="mt-12 bg-white/90 border-4 border-minecraft-stone p-6 rounded shadow-lg">
          <h2 className="font-minecraft text-2xl mb-6 text-center">Venue Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 border-l-4 border-minecraft-grass rounded shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-minecraft text-xl mb-3 text-minecraft-grass">Tech Block</h3>
              <p className="mb-3 leading-relaxed">Home to all technical events and coding competitions.</p>
              <p className="text-sm bg-minecraft-dirt/10 p-3 rounded">
                <strong>Facilities:</strong> Computer labs, presentation rooms, innovation spaces
              </p>
            </div>
            
            <div className="bg-white p-5 border-l-4 border-minecraft-grass rounded shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-minecraft text-xl mb-3 text-minecraft-grass">Culture Village</h3>
              <p className="mb-3 leading-relaxed">Cultural performances, art exhibitions, and creative workshops.</p>
              <p className="text-sm bg-minecraft-dirt/10 p-3 rounded">
                <strong>Facilities:</strong> Auditorium, gallery spaces, workshop rooms
              </p>
            </div>
            
            <div className="bg-white p-5 border-l-4 border-minecraft-grass rounded shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-minecraft text-xl mb-3 text-minecraft-grass">Gaming Arena</h3>
              <p className="mb-3 leading-relaxed">All gaming tournaments and competitions take place here.</p>
              <p className="text-sm bg-minecraft-dirt/10 p-3 rounded">
                <strong>Facilities:</strong> Gaming PCs, consoles, VR equipment
              </p>
            </div>
            
            <div className="bg-white p-5 border-l-4 border-minecraft-grass rounded shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-minecraft text-xl mb-3 text-minecraft-grass">Workshop Hall</h3>
              <p className="mb-3 leading-relaxed">Interactive workshops and learning sessions for all attendees.</p>
              <p className="text-sm bg-minecraft-dirt/10 p-3 rounded">
                <strong>Facilities:</strong> Hands-on labs, demonstration areas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
