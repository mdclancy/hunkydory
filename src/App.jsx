import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import AddressForm from './components/Subscribe.jsx'

const BASE_URL = import.meta.env.BASE_URL

export default function App() {
  return (
    <div className="relative w-screen min-h-screen bg-[#bedbff]"
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subscribe" element={<AddressForm />} />
      </Routes>
    </div>
  )
}
