"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      if (dot) {
        dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ring) {
        ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      }
      requestAnimationFrame(animate);
    };

    const raf = requestAnimationFrame(animate);

    // Scale up ring on hovering interactive elements
    const handleHoverIn = () => {
      if (ring) {
        ring.style.width = "50px";
        ring.style.height = "50px";
        ring.style.borderColor = "rgba(184, 247, 39, 0.9)";
      }
    };
    const handleHoverOut = () => {
      if (ring) {
        ring.style.width = "32px";
        ring.style.height = "32px";
        ring.style.borderColor = "rgba(184, 247, 39, 0.6)";
      }
    };

    const interactiveEls = document.querySelectorAll("a, button, [role=button]");
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverIn);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Only show on desktop
  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
}
