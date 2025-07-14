import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedBackgroundProps {
    variant?: 'default' | 'dark' | 'gradient' | 'particles';
    intensity?: 'low' | 'medium' | 'high';
    className?: string;
}

export default function AnimatedBackground({ 
    variant = 'default', 
    intensity = 'medium',
    className = ''
}: AnimatedBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;

        // Create floating particles
        const createParticles = () => {
            const container = containerRef.current;
            if (!container) return;

            const particleCount = intensity === 'low' ? 30 : intensity === 'medium' ? 50 : 80;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'absolute opacity-20 pointer-events-none';
                
                // Random particle types - reduced sizes
                const particleType = Math.random();
                if (particleType < 0.4) {
                    // Dots - smaller
                    particle.style.width = `${Math.random() * 3 + 1}px`;
                    particle.style.height = particle.style.width;
                    particle.style.backgroundColor = Math.random() < 0.7 ? '#dc2626' : '#ffffff';
                    particle.style.borderRadius = '50%';
                    particle.style.boxShadow = '0 0 5px rgba(220, 38, 38, 0.3)';
                } else if (particleType < 0.7) {
                    // Lines - shorter
                    particle.style.width = `${Math.random() * 15 + 8}px`;
                    particle.style.height = `${Math.random() * 1 + 0.5}px`;
                    particle.style.backgroundColor = Math.random() < 0.8 ? '#dc2626' : '#ffffff';
                    particle.style.boxShadow = '0 0 3px rgba(220, 38, 38, 0.2)';
                } else {
                    // Squares and diamonds - smaller
                    const size = Math.random() * 2 + 1;
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    particle.style.backgroundColor = Math.random() < 0.6 ? '#dc2626' : '#ffffff';
                    particle.style.transform = `rotate(${Math.random() * 360}deg)`;
                    particle.style.boxShadow = '0 0 4px rgba(220, 38, 38, 0.3)';
                }
                
                // Random position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                container.appendChild(particle);
                particlesRef.current.push(particle);
            }
        };

        // Animate particles
        const animateParticles = () => {
            particlesRef.current.forEach((particle, index) => {
                const duration = 10 + Math.random() * 20;
                const delay = Math.random() * 5;
                
                gsap.to(particle, {
                    x: `${(Math.random() - 0.5) * 200}px`,
                    y: `${(Math.random() - 0.5) * 200}px`,
                    rotation: Math.random() * 360,
                    duration,
                    delay,
                    repeat: -1,
                    yoyo: true,
                    ease: 'none',
                });

                // Opacity animation - more dynamic
                gsap.to(particle, {
                    opacity: Math.random() * 0.5 + 0.2,
                    duration: 2 + Math.random() * 3,
                    repeat: -1,
                    yoyo: true,
                    ease: 'power2.inOut',
                    delay: Math.random() * 2,
                });
            });
        };

        // Create gradient orbs
        const createGradientOrbs = () => {
            const container = containerRef.current;
            if (!container) return;

            for (let i = 0; i < 4; i++) {
                const orb = document.createElement('div');
                orb.className = 'absolute rounded-full pointer-events-none';
                
                const orbType = Math.random();
                if (orbType < 0.5) {
                    orb.style.background = `radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, rgba(220, 38, 38, 0.05) 50%, transparent 70%)`;
                } else {
                    orb.style.background = `radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(220, 38, 38, 0.08) 40%, transparent 70%)`;
                }
                
                orb.style.width = `${200 + Math.random() * 300}px`;
                orb.style.height = orb.style.width;
                orb.style.left = `${Math.random() * 120 - 10}%`;
                orb.style.top = `${Math.random() * 120 - 10}%`;
                orb.style.filter = 'blur(50px)';
                
                container.appendChild(orb);

                // Animate orbs - more dramatic movement
                gsap.to(orb, {
                    x: `${(Math.random() - 0.5) * 600}px`,
                    y: `${(Math.random() - 0.5) * 600}px`,
                    scale: 0.6 + Math.random() * 0.8,
                    duration: 15 + Math.random() * 20,
                    repeat: -1,
                    yoyo: true,
                    ease: 'none',
                });
            }
        };

        // Animated grid lines
        const createGridLines = () => {
            const container = containerRef.current;
            if (!container) return;

            // Vertical lines
            for (let i = 0; i < 5; i++) {
                const line = document.createElement('div');
                line.className = 'absolute w-px bg-gradient-to-b from-transparent via-red-600 to-transparent opacity-10';
                line.style.height = '100%';
                line.style.left = `${20 + i * 20}%`;
                line.style.top = '0';
                
                container.appendChild(line);

                gsap.to(line, {
                    scaleY: 0.5 + Math.random() * 0.5,
                    opacity: 0.05 + Math.random() * 0.1,
                    duration: 4 + Math.random() * 6,
                    repeat: -1,
                    yoyo: true,
                    ease: 'power2.inOut',
                });
            }

            // Horizontal lines
            for (let i = 0; i < 3; i++) {
                const line = document.createElement('div');
                line.className = 'absolute h-px bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-10';
                line.style.width = '100%';
                line.style.top = `${30 + i * 20}%`;
                line.style.left = '0';
                
                container.appendChild(line);

                gsap.to(line, {
                    scaleX: 0.3 + Math.random() * 0.7,
                    opacity: 0.05 + Math.random() * 0.1,
                    duration: 6 + Math.random() * 8,
                    repeat: -1,
                    yoyo: true,
                    ease: 'power2.inOut',
                });
            }
        };

        // Initialize animations based on variant
        createParticles();
        animateParticles();
        
        if (variant === 'gradient' || variant === 'default') {
            createGradientOrbs();
        }
        
        if (variant === 'particles' || variant === 'default') {
            createGridLines();
        }

        // Cleanup function
        return () => {
            gsap.killTweensOf(particlesRef.current);
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
            particlesRef.current = [];
        };
    }, [variant, intensity]);

    // Background variants
    const getBackgroundStyle = () => {
        switch (variant) {
            case 'dark':
                return 'bg-gradient-to-br from-black via-gray-900 to-black';
            case 'gradient':
                return 'bg-gradient-to-br from-black via-red-900 to-red-950';
            case 'particles':
                return 'bg-gradient-to-br from-black via-red-950 to-black';
            default:
                return 'bg-gradient-to-br from-black via-red-950 to-black';
        }
    };

    return (
        <div 
            ref={containerRef}
            className={`fixed inset-0 z-0 overflow-hidden ${getBackgroundStyle()} ${className}`}
        >
            {/* Base gradient overlay - enhanced red/black */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-red-950/20 to-black/80" />
            
            {/* Additional red accent overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-900/10 to-transparent" />
            
            {/* Animated background pattern - enhanced */}
            <div className="absolute inset-0 opacity-40">
                <div 
                    className="absolute inset-0 bg-repeat"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at 2px 2px, rgba(220, 38, 38, 0.2) 1px, transparent 0),
                            radial-gradient(circle at 18px 18px, rgba(255, 255, 255, 0.05) 1px, transparent 0),
                            radial-gradient(circle at 10px 10px, rgba(220, 38, 38, 0.1) 0.5px, transparent 0)
                        `,
                        backgroundSize: '20px 20px',
                        animation: 'backgroundMove 60s linear infinite'
                    }}
                />
            </div>

            {/* Enhanced pulsing overlay */}
            <div 
                className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-transparent to-red-600/5"
                style={{
                    animation: 'pulse 8s ease-in-out infinite'
                }}
            />

            <style>{`
                @keyframes backgroundMove {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(20px, 20px); }
                }

                @keyframes pulse {
                    0%, 100% { opacity: 0.8; }
                    50% { opacity: 1; }
                }
            `}</style>
        </div>
    );
}