import React, { useRef, useEffect } from 'react';
import videobg from '../../public/videos/About-Book-vid.webm';

const VideoComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const video = videoRef.current;
        const scrollPosition = window.scrollY || window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Calculate the scroll progress as a percentage
        const scrollProgress = (scrollPosition / documentHeight);

        // Ensure the scroll progress is within the range [0, 1]
        const clampedScrollProgress = Math.min(Math.max(scrollProgress, 0), 1);

        // Set the video's current time based on the scroll progress
        video.currentTime = clampedScrollProgress * video.duration;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="video-container">
      <video ref={videoRef} src={videobg} muted />
    </div>
  );
};

export default VideoComponent;