import { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import './MagicBento.css';

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '34, 197, 94';
const MOBILE_BREAKPOINT = 768;

const createParticleElement = (x, y, color) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

export const MagicCard = ({
  children,
  className = '',
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const isHoveredRef = useRef(false);

  const clearParticles = useCallback(() => {
    particlesRef.current.forEach(p => p.remove());
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();

    for (let i = 0; i < particleCount; i++) {
      const p = createParticleElement(Math.random() * width, Math.random() * height, glowColor);
      cardRef.current.appendChild(p);
      particlesRef.current.push(p);

      gsap.fromTo(p, { scale: 0, opacity: 0 }, {
        scale: 1,
        opacity: 1,
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, [particleCount, glowColor]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const onMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
    };

    const onMouseLeave = () => {
      isHoveredRef.current = false;
      clearParticles();
      gsap.to(el, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.5 });
    };

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (enableTilt) {
        const ax = -(y - rect.height / 2) / 10;
        const ay = (x - rect.width / 2) / 10;
        gsap.to(el, { rotateX: ax, rotateY: ay, duration: 0.1 });
      }
      
      if (enableMagnetism) {
        const mx = (x - rect.width / 2) * 0.1;
        const my = (y - rect.height / 2) * 0.1;
        gsap.to(el, { x: mx, y: my, duration: 0.2 });
      }
      el.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
      el.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
    };

    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mousemove', onMouseMove);

    return () => {
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mousemove', onMouseMove);
    };
  }, [animateParticles, clearParticles, enableTilt, enableMagnetism]);

  return (
    <div 
      ref={cardRef} 
      className={`${className} magic-bento-card--border-glow`} 
      style={{ position: 'relative', overflow: 'hidden', '--glow-color': glowColor }}
    >
      {children}
    </div>
  );
};

const MagicBento = ({ children, glowColor = DEFAULT_GLOW_COLOR }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const moveSpotlight = (e) => {
      const spotlight = document.getElementById('global-magic-spotlight');
      if (spotlight) {
        gsap.to(spotlight, {
          left: e.clientX,
          top: e.clientY,
          duration: 0.1,
          opacity: 1
        });
      }
    };

    window.addEventListener('mousemove', moveSpotlight);
    return () => window.removeEventListener('mousemove', moveSpotlight);
  }, []);

  return (
    <div ref={containerRef} className="magic-bento-container w-full h-full">
      <div 
        id="global-magic-spotlight"
        className="fixed w-[600px] h-[600px] pointer-events-none z-[1] opacity-0"
        style={{
          background: `radial-gradient(circle, rgba(${glowColor}, 0.1) 0%, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'screen'
        }}
      />
      {children}
    </div>
  );
};

export default MagicBento;