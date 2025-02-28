
import MinecraftMap from '@/components/MinecraftMap';

const MapPage = () => {
  return (
    <div className="min-h-screen py-28 px-4 bg-minecraft-dirt/10">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-minecraft text-4xl mb-4">Interactive Map</h1>
          <p className="max-w-2xl mx-auto mb-8">
            Explore the MineFest campus with our interactive Minecraft-style map!
            Click on buildings and locations to discover where events will be held.
          </p>
        </div>
        
        <div className="bg-white/90 border-4 border-minecraft-stone p-6 mb-8">
          <h2 className="font-minecraft text-2xl mb-4">How to Use the Map</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Pan:</strong> Click and drag to move around the map</li>
            <li><strong>Interact:</strong> Click on location icons to view details about venues and events</li>
            <li><strong>Explore:</strong> Use the information to plan your MineFest journey</li>
          </ul>
        </div>
        
        <MinecraftMap />
        
        <div className="mt-12 bg-white/90 border-4 border-minecraft-stone p-6">
          <h2 className="font-minecraft text-2xl mb-4">Venue Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-minecraft-dirt/20 p-4 border-l-4 border-minecraft-dirt">
              <h3 className="font-minecraft text-xl mb-2">Tech Block</h3>
              <p className="mb-2">Home to all technical events and coding competitions.</p>
              <p className="text-sm"><strong>Facilities:</strong> Computer labs, presentation rooms, innovation spaces</p>
            </div>
            
            <div className="bg-minecraft-dirt/20 p-4 border-l-4 border-minecraft-dirt">
              <h3 className="font-minecraft text-xl mb-2">Culture Village</h3>
              <p className="mb-2">Cultural performances, art exhibitions, and creative workshops.</p>
              <p className="text-sm"><strong>Facilities:</strong> Auditorium, gallery spaces, workshop rooms</p>
            </div>
            
            <div className="bg-minecraft-dirt/20 p-4 border-l-4 border-minecraft-dirt">
              <h3 className="font-minecraft text-xl mb-2">Gaming Arena</h3>
              <p className="mb-2">All gaming tournaments and competitions take place here.</p>
              <p className="text-sm"><strong>Facilities:</strong> Gaming PCs, consoles, VR equipment</p>
            </div>
            
            <div className="bg-minecraft-dirt/20 p-4 border-l-4 border-minecraft-dirt">
              <h3 className="font-minecraft text-xl mb-2">Workshop Hall</h3>
              <p className="mb-2">Interactive workshops and learning sessions for all attendees.</p>
              <p className="text-sm"><strong>Facilities:</strong> Hands-on labs, demonstration areas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
