"use client";
import styles from './page.module.css'
import { useEffect, useState, useRef } from 'react'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Array<{
    x: number;
    y: number;
    z: number;
    speed: number;
  }>>([]);

  // Star field animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize stars
    const numStars = 800;
    starsRef.current = Array.from({ length: numStars }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 1000,
      speed: 0.5 + Math.random() * 2
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach(star => {
        star.z -= star.speed;
        if (star.z <= 0) {
          star.z = 1000;
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
        }

        const x = (star.x - canvas.width / 2) * (1000 / star.z) + canvas.width / 2;
        const y = (star.y - canvas.height / 2) * (1000 / star.z) + canvas.height / 2;
        const size = (1000 - star.z) / 1000;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${size})`;
        ctx.arc(x, y, size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw trail
        if (size > 0.1) {
          const prevX = (star.x - canvas.width / 2) * (1000 / (star.z + star.speed)) + canvas.width / 2;
          const prevY = (star.y - canvas.height / 2) * (1000 / (star.z + star.speed)) + canvas.height / 2;
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(242, 181, 22, ${size * 0.5})`;
          ctx.lineWidth = size;
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className={`${styles.container} ${isLoaded ? styles.loaded : ''}`}>
      
      {/* Hyperspace star field */}
      <canvas ref={canvasRef} className={styles.starField} />
      
      {/* Animated grid background */}
      <div className={styles.gridBackground}>
        <div className={styles.gridLines} />
        <div className={styles.gridLinesVertical} />
      </div>
      
      {/* Blockchain network visualization */}
      <div className={styles.networkContainer}>
        {Array.from({ length: 12 }, (_, i) => (
          <div 
            key={i}
            className={styles.networkNode}
            style={{
              left: `${10 + (i % 4) * 30}%`,
              top: `${20 + Math.floor(i / 4) * 35}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            <div className={styles.nodeCore} />
            <div className={styles.nodePulse} />
          </div>
        ))}
        
        {/* Connection lines */}
        <svg className={styles.connectionSvg} viewBox="0 0 100 100">
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i}>
              <line
                x1={10 + (i % 4) * 30}
                y1={20 + Math.floor(i / 4) * 35}
                x2={10 + ((i + 1) % 4) * 30}
                y2={20 + Math.floor((i + 1) / 4) * 35}
                className={styles.connectionLine}
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            </g>
          ))}
        </svg>
      </div>
      
      {/* Floating data streams */}
      <div className={styles.dataStreams}>
        {Array.from({ length: 6 }, (_, i) => (
          <div 
            key={i}
            className={styles.dataStream}
            style={{
              left: `${15 + i * 15}%`,
              animationDelay: `${i * 2}s`
            }}
          >
            {Array.from({ length: 10 }, (_, j) => (
              <div 
                key={j}
                className={styles.dataBlock}
                style={{ animationDelay: `${j * 0.1}s` }}
              />
            ))}
          </div>
        ))}
      </div>
      
      {/* Holographic interface elements */}
      <div className={styles.holoInterface}>
        <div className={styles.holoCorner} style={{ top: '10%', left: '10%' }} />
        <div className={styles.holoCorner} style={{ top: '10%', right: '10%' }} />
        <div className={styles.holoCorner} style={{ bottom: '10%', left: '10%' }} />
        <div className={styles.holoCorner} style={{ bottom: '10%', right: '10%' }} />
        
        <div className={styles.scanLine} />
      </div>
      
      {/* Main content */}
      <div className={styles.content}>
        
        {/* Logo with energy field */}
        <div className={styles.logoSection}>
          <div className={styles.logoContainer}>
            <div className={styles.energyRing} />
            <div className={styles.energyRing2} />
            <img 
              src="/logo.png" 
              alt="Prophecy Sunya" 
              className={styles.logo}
            />
            <div className={styles.logoGlow} />
          </div>
        </div>
        
        {/* Cinematic typography */}
        <div className={styles.textSection}>
          <h1 className={styles.title}>
            <span className={styles.titleText}>PROPHECY</span>
            <span className={styles.titleAccent}>SUNYA</span>
          </h1>
          
          <div className={styles.subtitleContainer}>
            <div className={styles.subtitleLine} />
            <p className={styles.subtitle}>
              NEXT-GENERATION BLOCKCHAIN INFRASTRUCTURE
            </p>
            <div className={styles.subtitleLine} />
          </div>
          
          <p className={styles.description}>
            Pioneering the future of decentralized finance with quantum-resistant cryptography,
            institutional-grade security protocols, and cross-chain interoperability.
          </p>
        </div>
        
        {/* Mission status */}
        <div className={styles.missionStatus}>
          <div className={styles.statusLabel}>MISSION STATUS</div>
          <div className={styles.statusDisplay}>
            <div className={styles.statusIndicator} />
            <span className={styles.statusText}>ACTIVE DEVELOPMENT</span>
            <div className={styles.statusProgress}>
              <div className={styles.progressBar} />
            </div>
          </div>
        </div>
        
        {/* Command interface */}
        <div className={styles.commandInterface}>
          <a 
            href="https://dexscreener.com/solana/5kzotp2ziwpgyjjqk1xpsnev7htrakkckgmpjnj48qs5" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.primaryCommand}
          >
            <div className={styles.commandCore}>
              <span>INITIALIZE TRACKING</span>
              <div className={styles.commandArrow}>→</div>
            </div>
            <div className={styles.commandGlow} />
          </a>
          
          <button className={styles.secondaryCommand}>
            <span>ACCESS PROTOCOLS</span>
            <div className={styles.comingSoonIndicator}>
              <span>SOON</span>
            </div>
          </button>
        </div>
        
      </div>
      
      {/* Technical readouts */}
      <div className={styles.technicalReadouts}>
        <div className={styles.readout} style={{ top: '15%', left: '5%' }}>
          <div className={styles.readoutLabel}>NETWORK</div>
          <div className={styles.readoutValue}>ONLINE</div>
          <div className={styles.readoutBar}>
            <div className={styles.readoutFill} style={{ width: '100%' }} />
          </div>
        </div>
        
        <div className={styles.readout} style={{ top: '25%', right: '5%' }}>
          <div className={styles.readoutLabel}>NODES</div>
          <div className={styles.readoutValue}>2,847</div>
          <div className={styles.readoutBar}>
            <div className={styles.readoutFill} style={{ width: '78%' }} />
          </div>
        </div>
        
        <div className={styles.readout} style={{ bottom: '15%', left: '5%' }}>
          <div className={styles.readoutLabel}>PROTOCOL</div>
          <div className={styles.readoutValue}>v2.1.0</div>
          <div className={styles.readoutBar}>
            <div className={styles.readoutFill} style={{ width: '92%' }} />
          </div>
        </div>
      </div>
      
    </main>
  );
}