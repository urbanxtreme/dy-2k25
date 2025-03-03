import React, { useRef, useEffect } from 'react';
import videobg from '../../public/videos/About-Book-vid.webm';

const VideoComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const video = videoRef.current;
        const scrollPosition = window.scrollY || window.pageYOffset;
        const windowHeight = window.innerHeight;
        const videoHeight = video.offsetHeight;

        // Calculate the scroll progress within the video's height
        const scrollProgress = (scrollPosition / videoHeight) * 100;

        // Play the video based on scroll progress
        if (scrollProgress >= 0 && scrollProgress <= 100) {
          video.currentTime = (scrollProgress / 100) * video.duration;
          if (video.paused) {
            video.play();
          }
        } else {
          video.pause();
        }
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