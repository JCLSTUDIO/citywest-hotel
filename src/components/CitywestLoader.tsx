import React, { useEffect, useRef, useState } from 'react';
import './CitywestLoader.css';

export const CitywestLoader = ({ onComplete, logoSrc = '/images/logo/citywest-logo-dark.png' }) => {
    const loaderTextRef = useRef(null);
    const [isAssembled, setIsAssembled] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    
    const words = ["CITYWEST", "HOTEL"];
    const fullText = "CITYWEST HOTEL";

    useEffect(() => {
        const loaderText = loaderTextRef.current;
        if (!loaderText) return;

        let animationTimeout;
        let wordCycleTimeout;
        let assemblyTimeout;
        let jitterInterval;
        let currentWordIndex = 0;

        function animateWord() {
            const word = words[currentWordIndex];
            loaderText.innerHTML = '';

            const chars = word.split('').map((char, index) => {
                const span = document.createElement('span');
                span.className = 'char';
                span.textContent = char;
                
                const fromX = (Math.random() - 0.5) * 800;
                const fromY = (Math.random() - 0.5) * 800;
                const fromZ = (Math.random() - 0.5) * 800;
                const fromRotX = (Math.random() - 0.5) * 360;
                const fromRotY = (Math.random() - 0.5) * 360;
                
                span.style.setProperty('--transform-from', 
                    `translate3d(${fromX}px, ${fromY}px, ${fromZ}px) rotateX(${fromRotX}deg) rotateY(${fromRotY}deg)`);
                span.style.setProperty('--transform-to', 'translate3d(0,0,0) rotateX(0) rotateY(0)');
                
                span.style.animationName = 'fly-in';
                span.style.animationDelay = `${index * 0.08}s`;
                span.style.animationDuration = '0.8s';
                span.style.animationFillMode = 'forwards';
                
                loaderText.appendChild(span);
                return span;
            });

            // If this is the second word (HOTEL), trigger assembly complete after fly-in
            if (currentWordIndex === words.length - 1) {
                assemblyTimeout = setTimeout(() => {
                    setIsAssembled(true);
                    startJitter(chars);
                }, (chars.length * 80) + 800);
            }

            if (currentWordIndex < words.length - 1) {
                wordCycleTimeout = setTimeout(() => {
                    currentWordIndex++;
                    animateWord();
                }, (chars.length * 80) + 1000);
            }
        }

        function startJitter(chars) {
            // Add space between words and re-render with jitter capability
            loaderText.innerHTML = '';
            
            const allChars = fullText.split('').map((char, index) => {
                const span = document.createElement('span');
                span.className = 'char assembled';
                span.textContent = char;
                if (char === ' ') span.style.width = '0.5em';
                
                // Start with slight random offsets for jitter base
                const baseX = (Math.random() - 0.5) * 4;
                const baseY = (Math.random() - 0.5) * 4;
                const baseRot = (Math.random() - 0.5) * 2;
                span.style.transform = `translate3d(${baseX}px, ${baseY}px, 0) rotateZ(${baseRot}deg)`;
                
                loaderText.appendChild(span);
                return span;
            });

            // Continuous jitter animation
            jitterInterval = setInterval(() => {
                allChars.forEach((span) => {
                    if (span.textContent === ' ') return;
                    const jitterX = (Math.random() - 0.5) * 6;
                    const jitterY = (Math.random() - 0.5) * 6;
                    const jitterRot = (Math.random() - 0.5) * 3;
                    const jitterScale = 0.98 + Math.random() * 0.04;
                    
                    span.style.transition = 'transform 0.15s ease-out';
                    span.style.transform = 
                        `translate3d(${jitterX}px, ${jitterY}px, 0) rotateZ(${jitterRot}deg) scale(${jitterScale})`;
                });
            }, 150);

            // Complete after loading time (adjust as needed)
            animationTimeout = setTimeout(() => {
                clearInterval(jitterInterval);
                setIsComplete(true);
                setTimeout(() => onComplete?.(), 500);
            }, 4000);
        }

        animateWord();

        return () => {
            clearTimeout(animationTimeout);
            clearTimeout(wordCycleTimeout);
            clearTimeout(assemblyTimeout);
            clearInterval(jitterInterval);
        };
    }, [onComplete]);

    return (
        <div className={`loader-container ${isComplete ? 'fade-out' : ''}`}>
            <div className="loader-content">
                <div className="logo-wrapper">
                    <img src={logoSrc} alt="Citywest Hotel" className="loader-logo" />
                </div>
                <h1 ref={loaderTextRef} className="kinetic-text">
                </h1>
                {isAssembled && (
                    <div className="loading-indicator">
                        <div className="loading-bar">
                            <div className="loading-progress"></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
