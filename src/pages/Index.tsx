
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to home page
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-minecraft-bedrock">
      <div className="text-center minecraft-3d-element animate-3d-float">
        <h1 className="text-4xl font-minecraft text-white mb-4 pixel-text-shadow">Loading MineFest...</h1>
        <div className="grid grid-cols-3 gap-2 mt-6">
          <div className="bg-minecraft-dirt w-12 h-12 mx-auto animate-block-build" style={{ animationDelay: '0.1s' }}></div>
          <div className="bg-minecraft-stone w-12 h-12 mx-auto animate-block-build" style={{ animationDelay: '0.2s' }}></div>
          <div className="bg-minecraft-grass w-12 h-12 mx-auto animate-block-build" style={{ animationDelay: '0.3s' }}></div>
        </div>
        <p className="text-xl text-white mt-4">Please wait while we build the blocks...</p>
      </div>
    </div>
  );
};

export default Index;
