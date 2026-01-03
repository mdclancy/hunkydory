import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from "motion/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';

const BASE_URL = import.meta.env.BASE_URL;

const transition = {
    duration: 4,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
}

const PATH =
"M 1190.73 310.28 L 1338.45 484.76 L 2071.73 1506.96"

const PATH_2 =
"M -416.68 719.93 C -297.06 685.85 572.55 629.03 431.98 318.88 C 391.97 230.61 54.78 202.9 157.89 490.62 C 215.99 652.72 980.13 349.43 1127.42 277.97"


function Mountain({ windowWidth, setAbout, bounce }) {
  return (
    <div className="relative">
        <Flag setAbout={setAbout} bounce={bounce}/>
      <div
        className="
          relative
          top-[47dvw] md:top-[17dvw] lg:top-[10dvw] xl:top-[7dvw]
          right-[60dvw]
          w-[170dvw]
        ">
        <div>
          <img
            src={`${BASE_URL}mountain.svg`}
            alt="Mountain"
            className="
              w-full
              h-auto
              max-w-none
              max-h-none
              rotate-[-15deg]
              z-[1]
            "
            draggable={false}
          />
          <HunkyDory windowWidth={windowWidth}/>
        </div>
      </div>
    </div>
  );
}


function Flag({ setAbout, bounce }) {

    return (
        <div>
            <style>{`
                @keyframes bounce-click {
                    0%, 100% { transform: translateY(0) rotate(10deg); }
                    50% { transform: translateY(-3dvw) rotate(10deg); }
                }
                .animate-bounce-click {
                    animation: bounce-click 0.7s ease-in-out;
                }
            `}</style>
            <div
                onClick={() => setAbout(true)}
                className={`
                    absolute
                    top-[39dvw] md:top-[8dvw] lg:top-[3dvw] xl:top-[0dvw]
                    left-[-4dvw]
                    w-[26dvw]
                    z-[2]
                    rotate-[10deg] hover:rotate-[2deg]
                    ${bounce ? 'animate-bounce-click' : ''}
                    transition-transform
                    duration-300
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                `}
                style={{ cursor: `url('${BASE_URL}fish.png'), auto` }}
            >
            <img
                src={`${BASE_URL}flag.png`}
                alt="Flag"
                className="w-full h-auto block"
                draggable="false"
                style={{ display: 'block' }}
            />
            <span
                className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    text-[2.8dvw] font-bold
                    top-[-8dvw]
                    left-[1dvw]
                    text-black
                    select-none
                    rotate-[-25deg]
                    pointer-events-none
                "
                style={{
                  fontFamily: 'Bohemian Typewriter',
                  letterSpacing: '0.07em',
                }}
            >
                about
            </span>
          </div>
        </div>
    );
}


function HunkyDory({ windowWidth }) {

    const container = useRef(null);
    const { scrollY } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    });

    const threshold = windowWidth * 0.1;
    const speed = 0.8

    const translateY = useTransform(
        scrollY, 
        [0, threshold, threshold + windowWidth / 6], 
        [0, threshold, threshold + windowWidth * 0.06]
    );

    const rotate = useTransform(scrollY, [threshold, threshold + windowWidth / 6], [-54, -15]);
    const startOffset = useTransform(
        scrollY, 
        [threshold, threshold + windowWidth / 6, threshold + speed * windowWidth], 
        ["40%", "30%", "110%"]
    );

    return (
      <motion.div
        ref={container}
        style={{ y: translateY, rotate, willChange: 'transform' }}
        className="
          absolute top-[-15%] sm:top-[-17%] left-[0%] w-[100%] h-auto z-[2]
          pointer-events-none selection-none gpu-accelerate
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2091 1533"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d={PATH}
            id="hunkyPath"
            fill="transparent"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <motion.text
            className="text-[6em] fill-black"
            style={{ fontFamily: "Bohemian Typewriter", letterSpacing: "0.05em" }}
            dominantBaseline="central"
            textAnchor="middle"
          >
            <motion.textPath href="#hunkyPath" style={{ startOffset }}>
              Hunky Dory
            </motion.textPath>
          </motion.text>
        </svg>
      </motion.div>
    );
  }

function Article({ windowWidth }) {
  return (
    <div className="relative top-[20dvw]
    md:top-[-15dvw] lg:top-[-20dvw] xl:top-[-25dvw]
    mb-[3dvw] md:mb-[-15dvw] lg:mb-[-20dvw] xl:mb-[-25dvw]
    w-full h-[450dvw] md:h-[320dvw] bg-[#48A75C] [overflow-x:clip]">
      <div className="h-[70dvw] sm:h-[0]"></div>
      <BoxHunkyDory windowWidth={windowWidth} />
    </div>
  )
}


function BoxHunkyDory({ windowWidth }) {
  const container = useRef(null);
  const { scrollY } = useScroll({
      target: container,
      offset: ["start end", "end start"]
  });

  const threshold = windowWidth;
  const speed = 1.5


  const startOffset = useTransform(
      scrollY, 
      [threshold, threshold + speed * windowWidth], 
      ["110%", "-10%"]
  );

  return (
    <div
      ref={container}
      className="sticky top-[30%] sm:top-[10%] md:top-[0] w-full h-[50dvw]"
    >
      <motion.div
        className="absolute top-[-45dvw] md:top-[-11dvw] w-[400dvw]
        md:w-[200%] left-[-185%] md:left-[-67%] h-auto z-[3]
        pointer-events-none selection-none gpu-accelerate"
        style={{ willChange: 'transform' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-1000 0 2200 1100"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d={PATH_2}
            id="hunkyPath2"
            fill="transparent"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <motion.text
            className="text-[6em] fill-black"
            style={{ fontFamily: "Bohemian Typewriter", letterSpacing: "0.05em" }}
            dominantBaseline="central"
            textAnchor="middle"
          >
            <motion.textPath href="#hunkyPath2" startOffset={startOffset}>
              Hunky Dory
            </motion.textPath>
          </motion.text>
        </svg>
      </motion.div>
      <HdBox scrollY={scrollY} windowWidth={windowWidth}/>
    </div>
  );
}


function HdBox({ scrollY, windowWidth }) {

  const threshold = windowWidth * 2.3;
  const speed = 0.4;
  const [isClickable, setIsClickable] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (value) => {
      setIsClickable(value > threshold + speed * 2 * windowWidth);
    });
    return () => unsubscribe();
  }, [scrollY, windowWidth]);

  const side_size = useTransform(
      scrollY, 
      [threshold, threshold + speed * windowWidth], 
      [windowWidth > 700 ? "10dvw": "20dvw", windowWidth > 700 ? "20dvw": "35dvw"]
  );

  const font_size = useTransform(
    scrollY, 
    [threshold, threshold + speed * 2 * windowWidth], 
    ["5dvw", "10dvw"]
);

  const opacity_scroll = useTransform(
    scrollY, 
    [threshold, threshold + speed * 2 *windowWidth], 
    ["1", "0"]
  )

  return (
    <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]">
      <motion.div 
        style={{ 
            height: side_size,
            width: side_size,
            willChange: 'transform, width, height',
        }}
        className="gpu-accelerate"
        whileHover={isClickable ? { y: -15 } : undefined}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <a 
          href={`${BASE_URL}hdv1.pdf`}
          className="block w-full h-full"
          style={isClickable ? { cursor: `url('${BASE_URL}fish.png'), auto` } :{
          cursor: `url('${BASE_URL}fish2.png'), auto`}}
          onClick={(e) => { if (!isClickable) e.preventDefault(); }}
        >
        <div 
          className="bg-[#bedbff] rounded-xl shadow-inner relative w-full h-full"
          style={{ 
              boxShadow: "inset 0 0 5px 1px rgba(14, 17, 32, 0.35)",
          }}
        >
          <motion.div
            className="absolute inset-0 flex items-center
            justify-center rounded-xl pointer-events-none bg-[#bedbff]"
            style={{
              fontFamily: 'Bohemian Typewriter',
              fontSize: font_size,
              opacity: opacity_scroll,
            }}
          >
            <img src={`${BASE_URL}vol1.png`} alt="vol1 link"/>
          </motion.div>
          <img src={`${BASE_URL}hdv1-thumbnail.png`} alt="vol1 thumbnail"
          className="w-full h-full rounded-xl object-cover"/>
        </div>
      </a>
      </motion.div>
    </div>
  )
}


function Footer() {
  return (
    <div className="relative bg-[#51372C] w-full h-[17dvw]
    md:h-[15dvw] lg:h-[10dvw] z-[2]">
      
      <p className="text-[#9c7e71] absolute
      bottom-[1dvw] right-[1.5dvw] text-[2.2dvw] md:text-[1.7dvw]
      lg:text-[1.2dvw] text-right leading-relaxed mb-[1dvw] md:mb-[0]
      font-['Helvetica','Arial',sans-serif]"
      style={{ fontFamily: "'Times New Roman', Times, serif"}}>
          <a style={{ cursor: `url('${BASE_URL}fish.png'), auto` ,
          fontFamily: "'Times New Roman', Times, serif" }}
          className="underline"
          href="mailto:hello@hunkydory.online">hello@hunkydory.online</a>
        <br />
        Developed by{' '}
        <a href="https://github.com/nshaff3r" className="underline"
        style={{ fontFamily: "'Times New Roman', Times, serif",
          cursor: `url('${BASE_URL}fish.png'), auto`
         }}>
          Nolan Shaffer
        </a>
      </p>
    </div>
  )
}

function Trees() {
  const treeCount = 1;
  return (
    <div className="absolute bottom-[14dvw] md:bottom-[13dvw]
    lg:bottom-[8dvw] left-[5dvw] lg:left-[10dvw] w-full z-[5] flex 
    [overflow-x:clip] ">
      {[...Array(treeCount)].map((_, i) => (
        <img 
          key={i}
          src={`${BASE_URL}tree.png`}
          alt="tree"
          className="w-[30vw] md:w-[25dvw] z-[5] flex-shrink-0 ml-[0px]"
          draggable={false}
          style={{ pointerEvents: "auto" }}
        />
      ))}
    </div>
  )
}

function About({ trigger, onAnimationEnd }) {
  return (
    <div>
      <style>{`
        @keyframes slide-across {
          0% { right: -100%; }
          30% { right: -.5%; }
          70% { right: -.5%; }
          100% { right: 100%; }
        }
      `}</style>
      <img 
        className="absolute top-[25dvw] md:top-[28dvw] w-full z-[10]"
        style={{
          right: '-100%',
          animation: trigger ? 'slide-across 10s ease-in-out forwards' : 'none',
        }}
        onAnimationEnd={onAnimationEnd}
        src={`${BASE_URL}about.svg`} 
        alt="about" 
      />
    </div>
  )
}

function Planet({ windowWidth }) {
  const [isDark, setIsDark] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className="absolute"
    style={{
      top: isDark ? windowWidth < 768 ? '7dvw' : '-3dvw' : '-15dvw',
      right: isDark ? windowWidth < 768 ? '2dvw' : '-4dvw' : '-15dvw' }}>
      <img src={`${BASE_URL}${isDark ? 'moon.png' : 'sun.png'}`} alt="planet"
      className={isDark ? "w-[20dvw]" :
      windowWidth < 768 ? "w-[50dvw]" : "w-[35dvw]"} />
    </div>
  )
}

export default function Home() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [about, setAbout] = useState(false);
    
    return (
        <div className="relative w-screen min-h-screen bg-[#bedbff]
        [overflow-x:clip]"
        style={{ cursor: `url('${BASE_URL}fish2.png'), auto` }}>
          <style>{`
            @font-face {
              font-family: 'Bohemian Typewriter';
              src: url('${BASE_URL}Bohemian-Typewriter.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
            }
            @keyframes upDown {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            ::selection {
              background: #48A75C;
              color: #bedbff;
            }
            .gpu-accelerate {
              transform: translateZ(0);
              backface-visibility: hidden;
              -webkit-backface-visibility: hidden;
            }
          `}</style>
          <div className="absolute left-0 top-[90dvh] xl:top-[85dvh]
          w-screen flex justify-center z-[10]">
            {/* <FontAwesomeIcon
              icon={faAnglesDown}
              className="text-black text-[7dvw]"
              style={{ animation: "upDown 1.5s ease-in-out infinite" }}
            /> */}
          </div>
            <Planet windowWidth={windowWidth}/>
            <Mountain windowWidth={windowWidth} setAbout={setAbout} bounce={about}/>
            <About trigger={about} onAnimationEnd={() => setAbout(false)}/>
            <Article windowWidth={windowWidth}/>
            <Trees />
            <Footer />
        </div>
    );
}
