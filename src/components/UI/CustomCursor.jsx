import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    // Center the custom cursors
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.15; // Follower speed

    const xSetCursor = gsap.quickSetter(cursor, "x", "px");
    const ySetCursor = gsap.quickSetter(cursor, "y", "px");
    const xSetFollower = gsap.quickSetter(follower, "x", "px");
    const ySetFollower = gsap.quickSetter(follower, "y", "px");

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      xSetCursor(mouse.x);
      ySetCursor(mouse.y);
    };

    window.addEventListener("mousemove", onMouseMove);

    const ticker = gsap.ticker.add(() => {
      // Smooth interpolation for the follower
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSetFollower(pos.x);
      ySetFollower(pos.y);
    });

    const handleHoverEnter = () => setIsHovering(true);
    const handleHoverLeave = () => setIsHovering(false);

    // Initial attachment for hover states
    const attachHoverStates = () => {
      const interactables = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverEnter);
        el.removeEventListener('mouseleave', handleHoverLeave);
        el.addEventListener('mouseenter', handleHoverEnter);
        el.addEventListener('mouseleave', handleHoverLeave);
      });
    };

    attachHoverStates();

    // Use MutationObserver to catch dynamically added elements
    const observer = new MutationObserver((mutations) => {
      let shouldReattach = false;
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          shouldReattach = true;
        }
      });
      if (shouldReattach) {
        attachHoverStates();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(ticker);
      observer.disconnect();
      const interactables = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverEnter);
        el.removeEventListener('mouseleave', handleHoverLeave);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      <div 
        ref={followerRef}
        className={`fixed top-0 left-0 w-10 h-10 border-[1.5px] border-white rounded-full pointer-events-none z-[9998] mix-blend-difference transition-all duration-300 ease-out flex items-center justify-center ${
          isHovering ? 'scale-[1.5] bg-white' : 'scale-100'
        }`}
      />
    </>
  );
};

export default CustomCursor;
