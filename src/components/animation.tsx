import { useRef, useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const AnimatedContent = ({
  children,
  distance = 100,
  direction = "vertical",
  reverse = false,
  config = { tension: 50, friction: 25 },
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const directions = {
    vertical: "Y",
    horizontal: "X",
  };

  const springProps = useSpring({
    from: {
      transform: `translate${directions[direction]}(${reverse ? `-${distance}px` : `0px`}) scale(${scale})`,
      opacity: animateOpacity ? initialOpacity : 1,
    },
    to: {
      transform: `translate${directions[direction]}(${Math.min(
        distance,
        scrollPosition
      )}px) scale(${Math.min(1, scrollPosition / distance)})`,
      opacity: animateOpacity ? Math.min(1, scrollPosition / distance) : 1,
    },
    config,
  });

  return (
    <animated.div ref={ref} style={springProps}>
      {children}
    </animated.div>
  );
};

export default AnimatedContent;

