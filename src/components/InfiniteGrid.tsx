
import React, { useEffect, useRef } from 'react';

const InfiniteGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let time = 0;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Configuration de la grille
      const cellSize = 50;
      const lineWidth = 0.3;
      const lineColor = 'rgba(255, 255, 255, 0.07)';
      
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      
      // Effet de déplacement (très léger)
      const offset = time * 0.1 % cellSize;
      
      // Dessiner les lignes verticales
      for (let x = offset; x < canvas.width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Dessiner les lignes horizontales
      for (let y = offset; y < canvas.height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Points lumineux d'intersection
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      for (let x = offset; x < canvas.width; x += cellSize) {
        for (let y = offset; y < canvas.height; y += cellSize) {
          const pulseSize = Math.sin(time * 0.01 + x * 0.01 + y * 0.01) * 1 + 1;
          ctx.beginPath();
          ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      time++;
      animationFrameId = requestAnimationFrame(drawGrid);
    };
    
    drawGrid();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10" 
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default InfiniteGrid;
