import React, { useEffect, useRef } from 'react';

interface SparkleCanvasProps {
  mode?: 'stars' | 'petals' | 'hearts';
}

export const SparkleCanvas: React.FC<SparkleCanvasProps> = ({ mode = 'stars' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      maxOpacity: number;
      fadeSpeed: number;
      color: string;
      rotation: number;
      rotSpeed: number;
    }

    const particles: Particle[] = [];
    const count = 70;

    const colors = [
      'rgba(254, 205, 211, ', // rose-200
      'rgba(244, 114, 182, ', // pink-400
      'rgba(253, 224, 71, ',  // yellow-300 / starlight
      'rgba(255, 255, 255, ', // pure white
      'rgba(216, 180, 254, ', // purple-300
    ];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.8 + 1,
        speedY: Math.random() * 0.4 + 0.15,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.7 + 0.2,
        maxOpacity: Math.random() * 0.5 + 0.5,
        fadeSpeed: (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    // Interactive cursor trail
    const trail: { x: number; y: number; life: number; size: number }[] = [];

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      trail.push({
        x: clientX,
        y: clientY,
        life: 1,
        size: Math.random() * 4 + 2,
      });
      if (trail.length > 25) trail.shift();
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render floating particles
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.opacity += p.fadeSpeed;
        p.rotation += p.rotSpeed;

        if (p.opacity > p.maxOpacity || p.opacity < 0.1) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (mode === 'petals') {
          // Draw falling soft petal
          ctx.beginPath();
          ctx.fillStyle = `rgba(244, 63, 94, ${p.opacity * 0.6})`;
          ctx.ellipse(0, 0, p.size * 2, p.size * 1.2, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (mode === 'hearts') {
          // Draw mini heart
          const s = p.size * 1.3;
          ctx.fillStyle = `rgba(244, 114, 182, ${p.opacity * 0.8})`;
          ctx.beginPath();
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s * 0.6, -s * 0.4, -s * 1.1, s * 0.3, 0, s * 1.1);
          ctx.bezierCurveTo(s * 1.1, s * 0.3, s * 0.6, -s * 0.4, 0, s * 0.3);
          ctx.fill();
        } else {
          // Draw twinkling star / glow bokeh
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2.5);
          gradient.addColorStop(0, `${p.color}${p.opacity})`);
          gradient.addColorStop(1, `${p.color}0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Star cross light
          ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity * 0.7})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(-p.size * 1.8, 0);
          ctx.lineTo(p.size * 1.8, 0);
          ctx.moveTo(0, -p.size * 1.8);
          ctx.lineTo(0, p.size * 1.8);
          ctx.stroke();
        }

        ctx.restore();
      });

      // Render touch / mouse trail
      for (let i = trail.length - 1; i >= 0; i--) {
        const pt = trail[i];
        pt.life -= 0.035;
        if (pt.life <= 0) {
          trail.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(pt.x, pt.y);
        ctx.fillStyle = `rgba(244, 114, 182, ${pt.life * 0.5})`;
        ctx.beginPath();
        ctx.arc(0, 0, pt.size * pt.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
