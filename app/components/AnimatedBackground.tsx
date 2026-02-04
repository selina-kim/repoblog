"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseY: number;
  speed: number;
  size: number;
  opacity: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles.length = 0;
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseY: Math.random() * canvas.height,
          speed: 0.2 + Math.random() * 0.3,
          size: 1 + Math.random() * 2,
          opacity: 0.1 + Math.random() * 0.2,
        });
      }
    };

    const animate = () => {
      time += 0.005;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach((particle) => {
        // Wave motion
        const wave = Math.sin(time + particle.x * 0.01) * 20;
        particle.y = particle.baseY + wave;

        // Move horizontally
        particle.x += particle.speed;

        // Wrap around
        if (particle.x > canvas.width) {
          particle.x = 0;
          particle.y = Math.random() * canvas.height;
          particle.baseY = particle.y;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 116, 139, ${particle.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      className="fixed inset-0 -z-10"
      ref={canvasRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
