'use client';
import { useEffect, useRef } from 'react';
import ButtonGroup from './ui/ButtonGroup';
import Button from './ui/Button';
import { useRouter } from 'next/navigation';

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const router = useRouter()

    function view(p: string){
        router.push("/"+p);
    }
    
    useEffect(() => {
        const canvas = canvasRef.current!;
        const context = canvas.getContext('2d')!;
        const devicePixelRatio = Math.max(1, window.devicePixelRatio || 1);
        let canvasWidth = canvas.clientWidth;
        let canvasHeight = canvas.clientHeight;
        
        function handleResize() {
            canvasWidth = canvas.clientWidth;
            canvasHeight = canvas.clientHeight;
            canvas.width = canvasWidth * devicePixelRatio;
            canvas.height = canvasHeight * devicePixelRatio;
        }

        handleResize();

        const particleCount = 80;
        const connectionDistance = 120;
        const particleSpeed = 0.6;
        const particleRadius = 1.8;
        const fadeSpeed = 0.005;
        let fadeDirection = 1;
        let connectionOpacity = 0.15;
        
        const particles = [...Array(particleCount)].map(() => ({
            x: Math.random() * canvasWidth,
            y: Math.random() * canvasHeight,
            velocityX: (Math.random() - 0.5) * particleSpeed,
            velocityY: (Math.random() - 0.5) * particleSpeed
        }));

        let animationFrameId = 0;

        function animate() {
            context.resetTransform();
            context.scale(devicePixelRatio, devicePixelRatio);
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            
            // Update particle positions
            context.fillStyle = 'rgba(29, 78, 216, 0.8)'; // blue-700 with opacity
            for (const particle of particles) {
                particle.x += particle.velocityX;
                particle.y += particle.velocityY;
                
                // Bounce off edges
                if (particle.x < 0 || particle.x > canvasWidth) {
                    particle.velocityX *= -1;
                }
                if (particle.y < 0 || particle.y > canvasHeight) {
                    particle.velocityY *= -1;
                }
            }
            
            // Animate connection opacity
            connectionOpacity += fadeDirection * fadeSpeed;
            if (connectionOpacity >= 0.4) {
                connectionOpacity = 0.4;
                fadeDirection = -1;
            } else if (connectionOpacity <= 0.02) {
                connectionOpacity = 0.02;
                fadeDirection = 1;
            }

            // Draw connections between nearby particles
            context.beginPath();
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const particleA = particles[i];
                    const particleB = particles[j];
                    const deltaX = particleA.x - particleB.x;
                    const deltaY = particleA.y - particleB.y;
                    const distance = Math.hypot(deltaX, deltaY);
                    
                    if (distance < connectionDistance) {
                        const distanceAlpha = 1 - distance / connectionDistance;
                        context.globalAlpha = distanceAlpha * connectionOpacity;
                        context.moveTo(particleA.x, particleA.y);
                        context.lineTo(particleB.x, particleB.y);
                    }
                }
            }

            context.strokeStyle = 'rgba(255,255,255,1)';
            context.stroke();
            context.globalAlpha = 1;

            // Draw particles
            for (const particle of particles) {
                context.beginPath();
                context.arc(particle.x, particle.y, particleRadius, 0, Math.PI * 2);
                context.fill();
            }
            
            animationFrameId = requestAnimationFrame(animate);
        }
        
        animationFrameId = requestAnimationFrame(animate);
        addEventListener('resize', handleResize);
        
        return () => {
            cancelAnimationFrame(animationFrameId);
            removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="relative h-[60svh] w-full">
          <canvas
            ref={canvasRef}
            className="h-full w-full border-b border-accent/50 bg-secondary/40 pointer-events-none"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-secondary">
                Reliable. Professional. Performance-driven.
              </h1>
              <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8 text-base-400">
                Crafting enterprise-grade systems, hardened security layers, clean AI solutions, and sleek front-ends.
              </p>
      
              <div className="flex justify-center">
                <ButtonGroup>
                  <Button style="outline" onClick={() => view("projects")}>
                    View Projects
                  </Button>
                  <Button style="outline" onClick={() => view("blog")}>
                    Read Blog
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
      );
      
}
