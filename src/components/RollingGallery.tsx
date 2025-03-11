import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const IMGS = [
  {
    img: "/images/and.jpg",
    text: "Mountain Adventure",
    link: "https://instagram.com/p/1"
  },
  {
    img: "/images/bg.png",
    text: "Forest Journey",
    link: "https://instagram.com/p/2"
  },
  {
    img: "/images/bg2.png",
    text: "Desert Trek",
    link: "https://instagram.com/p/3"
  },
];

const RollingGallery = ({
  autoplay = true,
  pauseOnHover = false,
  images = IMGS,
  speed = 25,
}) => {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const trackX = useRef(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [animationPaused, setAnimationPaused] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        const galleryItem = containerRef.current.querySelector('.gallery-item');
        if (galleryItem) {
          const computedStyle = window.getComputedStyle(galleryItem);
          const margin = parseInt(computedStyle.marginRight || '0', 10) * 2;
          setItemWidth(galleryItem.offsetWidth + margin);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (containerWidth > 0 && itemWidth > 0 && autoplay && !animationPaused) {
      const moveDistance = containerWidth + itemWidth;
      
      controls.start({
        x: [-itemWidth, -moveDistance],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        },
      });
    }
  }, [containerWidth, itemWidth, autoplay, animationPaused, controls, speed]);

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      setAnimationPaused(true);
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      setAnimationPaused(false);
      const moveDistance = containerWidth;
      
      controls.start({
        x: [trackX.current, trackX.current - moveDistance],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        },
      });
    }
  };

  const duplicatedImages = [...images, ...images, ...images];

  return (
    <div className="gallery-container" ref={containerRef}>
      <h2 className="sponsors-heading">Our Sponsors</h2>
      <div className="gallery-gradient gallery-gradient-left"></div>
      <div className="gallery-gradient gallery-gradient-right"></div>
      <div className="gallery-content">
        <motion.div 
          className="gallery-track"
          animate={controls}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          initial={{ x: -itemWidth }}
          onUpdate={(latest) => {
            trackX.current = Number(latest.x);
          }}
        >
          {duplicatedImages.map((item, i) => (
            <div key={`img-${i}`} className="gallery-item">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="gallery-link"
              >
                <img 
                  src={item.img} 
                  alt={item.text} 
                  className="gallery-img" 
                />
                <div className="image-overlay">
                  <p className="image-text">{item.text}</p>
                  <div className="instagram-label">
                    <span>View {item.text}</span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </motion.div>
      </div>
      <style>{`
        .gallery-container {
          position: relative;
          height: 50vh;
          min-height: 300px;
          max-height: 600px;
          width: 100%;
          overflow: hidden;
          background-color: #060606;
        }

        .sponsors-heading {
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          font-size: 2rem;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .gallery-gradient {
          position: absolute;
          top: 0;
          height: 100%;
          width: 150px;
          z-index: 10;
          pointer-events: none;
        }

        .gallery-gradient-left {
          left: 0;
          background: linear-gradient(to left, rgba(6, 6, 6, 0) 0%, #060606 100%);
        }

        .gallery-gradient-right {
          right: 0;
          background: linear-gradient(to right, rgba(6, 6, 6, 0) 0%, #060606 100%);
        }

        .gallery-content {
          display: flex;
          height: 100%;
          align-items: center;
          overflow: hidden;
          position: relative;
        }

        .gallery-track {
          display: flex;
          flex-direction: row;
          align-items: center;
          position: absolute;
          will-change: transform;
        }

        .gallery-item {
          flex: 0 0 auto;
          margin: 0 15px;
          position: relative;
          transition: transform 0.3s ease;
        }

        .gallery-link {
          display: block;
          position: relative;
          text-decoration: none;
          color: white;
        }

        .gallery-img {
          height: 25vh;
          min-height: 200px;
          max-height: 400px;
          width: 40vw;
          max-width: 500px;
          min-width: 300px;
          border-radius: 15px;
          object-fit: cover;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          transition: transform 0.3s ease;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-link:hover .image-overlay {
          opacity: 1;
        }

        .image-text {
          font-size: 1.2rem;
          margin: 0;
          font-weight: 600;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .instagram-label {
          background: #E1306C;
          padding: 5px 10px;
          border-radius: 5px;
          margin-top: 10px;
          align-self: flex-start;
          font-size: 0.8rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .gallery-item {
            margin: 0 10px;
          }

          .gallery-img {
            height: 20vh;
            min-height: 150px;
            width: 60vw;
            min-width: 250px;
          }

          .image-overlay {
            padding: 10px;
          }

          .image-text {
            font-size: 1rem;
          }

          .instagram-label {
            font-size: 0.7rem;
            padding: 4px 8px;
          }

          .gallery-gradient {
            width: 80px;
          }
        }

        @media (max-width: 480px) {
          .gallery-img {
            height: 18vh;
            min-height: 120px;
            width: 70vw;
            min-width: 200px;
          }

          .image-text {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default RollingGallery;