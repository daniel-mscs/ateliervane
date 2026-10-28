import React, { useEffect, useRef } from 'react';
import { CursorCloudSettings } from '../types/portfolio';

interface CursorCloudEffectProps {
  settings: CursorCloudSettings;
}

interface CloudBlob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  spring: number;
  friction: number;
  color: string;
  scale: number;
  phaseOffset: number;
}

/**
 * Efeito de nuvem cromática multicor que acompanha o cursor de forma suave e orgânica.
 * Utiliza física de molas (spring/lerp) em Canvas HTML5 com aceleração por GPU
 * para criar camadas translúcidas que se misturam suavemente ao movimento do mouse.
 */
export const CursorCloudEffect: React.FC<CursorCloudEffectProps> = ({ settings }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const settingsRef = useRef<CursorCloudSettings>(settings);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    if (!settings.enabled) return;

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

    window.addEventListener('resize', handleResize, { passive: true });

    // Posição alvo do mouse (inicia no centro superior direito da tela)
    const target = {
      x: width * 0.65,
      y: height * 0.35,
      isMoving: false,
      lastMoveTime: performance.now(),
    };

    const handlePointerMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      target.isMoving = true;
      target.lastMoveTime = performance.now();
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Camadas de nuvens cromáticas com diferentes constantes elásticas para criar rastro fluido
    const blobs: CloudBlob[] = [
      {
        x: target.x,
        y: target.y,
        vx: 0,
        vy: 0,
        spring: 0.09,
        friction: 0.82,
        color: '242, 183, 5', // Âmbar Ouro (#F2B705)
        scale: 0.9,
        phaseOffset: 0,
      },
      {
        x: target.x - 40,
        y: target.y + 30,
        vx: 0,
        vy: 0,
        spring: 0.065,
        friction: 0.85,
        color: '37, 99, 235', // Azul Cobalto (#2563EB)
        scale: 1.15,
        phaseOffset: 1.6,
      },
      {
        x: target.x + 50,
        y: target.y - 30,
        vx: 0,
        vy: 0,
        spring: 0.048,
        friction: 0.87,
        color: '225, 29, 72', // Rosa Carmim (#E11D48)
        scale: 1.05,
        phaseOffset: 3.1,
      },
      {
        x: target.x - 25,
        y: target.y - 45,
        vx: 0,
        vy: 0,
        spring: 0.036,
        friction: 0.89,
        color: '16, 185, 129', // Verde Esmeralda (#10B981)
        scale: 0.95,
        phaseOffset: 4.5,
      },
      {
        x: target.x + 30,
        y: target.y + 45,
        vx: 0,
        vy: 0,
        spring: 0.028,
        friction: 0.9,
        color: '139, 92, 246', // Violeta Profundo (#8B5CF6)
        scale: 1.25,
        phaseOffset: 5.8,
      },
    ];

    const render = (time: number) => {
      const currentSettings = settingsRef.current;
      ctx.clearRect(0, 0, width, height);

      if (!currentSettings.enabled) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const t = time * 0.0012;
      const baseRadius = currentSettings.radius;
      const baseAlpha = currentSettings.intensity;
      const speedMultiplier = currentSettings.smoothing / 0.08;

      ctx.globalCompositeOperation = 'screen';

      for (let i = 0; i < blobs.length; i++) {
        const blob = blobs[i];

        // Movimento respiratório orgânico mesmo quando o mouse está parado
        const orbitX = Math.cos(t + blob.phaseOffset) * (28 + i * 10);
        const orbitY = Math.sin(t * 1.15 + blob.phaseOffset) * (28 + i * 10);

        const destX = target.x + orbitX;
        const destY = target.y + orbitY;

        const effectiveSpring = Math.min(0.25, Math.max(0.015, blob.spring * speedMultiplier));

        // Interpolação suave com inércia
        const dx = destX - blob.x;
        const dy = destY - blob.y;

        blob.vx = (blob.vx + dx * effectiveSpring) * blob.friction;
        blob.vy = (blob.vy + dy * effectiveSpring) * blob.friction;

        blob.x += blob.vx * 0.28;
        blob.y += blob.vy * 0.28;

        const radius = baseRadius * blob.scale * (1 + Math.sin(t * 1.5 + blob.phaseOffset) * 0.08);

        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          radius
        );

        const peakAlpha = Math.min(0.65, baseAlpha * (i === 0 ? 0.55 : 0.45));
        const midAlpha = peakAlpha * 0.48;

        gradient.addColorStop(0, `rgba(${blob.color}, ${peakAlpha})`);
        gradient.addColorStop(0.45, `rgba(${blob.color}, ${midAlpha})`);
        gradient.addColorStop(1, `rgba(${blob.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, [settings.enabled]);

  if (!settings.enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-90 transition-opacity duration-500"
    />
  );
};
