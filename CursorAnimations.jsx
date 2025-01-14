"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CursorAnimation = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const outerX = useSpring(cursorX, { stiffness: 150, damping: 30 });
  const outerY = useSpring(cursorY, { stiffness: 150, damping: 30 });

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <motion.div
        style={{
          x: outerX,
          y: outerY,
          width: "36px",
          height: "36px",
          backgroundColor: "rgba(255, 159, 28, 0.4)",

          borderRadius: "50%",
          mixBlendMode: "difference",
        }}
        className="fixed top-0 left-0 pointer-events-none z-50"
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.7 : 0.5,
        }}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          width: "12px",
          height: "12px",
          backgroundColor: "#f97316",

          borderRadius: "50%",
        }}
        className="fixed top-0 left-0 pointer-events-none z-50"
        animate={{
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};

export default CursorAnimation;
