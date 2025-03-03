
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to home page
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-minecraft-dirt">
      <div className="text-center">
        <h1 className="text-4xl font-minecraft text-white mb-4">Loading DY2K25...</h1>
        <p className="text-xl text-white">Please wait while we fetch the blocks...</p>
      </div>
    </div>
  );
};

export default Index;
