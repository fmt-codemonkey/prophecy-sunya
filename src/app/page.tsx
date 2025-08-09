"use client";
import styles from './page.module.css'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

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
                        <Image
                            src="/logo.png"
                            alt="Prophecy Sunya"
                            className={styles.logo}
                            width={200}
                            height={200}
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
                            <span>DEX SCREENER</span>
                            <div className={styles.commandArrow}>→</div>
                        </div>
                        <div className={styles.commandGlow} />
                    </a>

                    {/* <a
                        href="YOUR_WHITE_PAPER_URL_HERE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.secondaryCommand}
                    >
                        <span>WHITE PAPER</span>
                        <div className={styles.comingSoonIndicator}>
                            <span>Study</span>
                        </div>
                    </a> */}
                    <button className={styles.secondaryCommand}>
                        <span>WHITE PAPER</span>
                        <div className={styles.comingSoonIndicator}>
                            <span>SOON</span>
                        </div>
                    </button>
                </div>

                {/* Social links */}
                <div className={styles.socialLinks}>
                    <a
                        href="https://github.com/Prophecy-Sunya/ProphecySunya"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                    >
                        <div className={styles.socialIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </div>
                        <span>GITHUB</span>
                    </a>

                    <a
                        href="https://t.me/Jimpsons"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                    >
                        <div className={styles.socialIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                            </svg>
                        </div>
                        <span>TELEGRAM</span>
                    </a>

                    <a
                        href="https://x.com/PJimpsons"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                    >
                        <div className={styles.socialIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                        </div>
                        <span>X (Twitter)</span>
                    </a>
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