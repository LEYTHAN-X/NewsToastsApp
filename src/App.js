import './App.css';
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import About from './components/About'; // ✅ Import your About component
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const apikey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative">
      <div 
        className="mouse-glow" 
        style={{ 
          transform: `translate(${mousePosition.x - 10}px, ${mousePosition.y - 10}px)` 
        }} 
      />
      <Router>
        <NavBar />
        <LoadingBar
          color="#f11946"
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News apikey={apikey} setProgress={setProgress} key="general" pageSize={8} country="us" category="general" />} />
          <Route exact path="/business" element={<News apikey={apikey} setProgress={setProgress} key="business" pageSize={8} country="us" category="business" />} />
          <Route exact path="/entertainment" element={<News apikey={apikey} setProgress={setProgress} key="entertainment" pageSize={8} country="us" category="entertainment" />} />
          <Route exact path="/health" element={<News apikey={apikey} setProgress={setProgress} key="health" pageSize={8} country="us" category="health" />} />
          <Route exact path="/science" element={<News apikey={apikey} setProgress={setProgress} key="science" pageSize={8} country="us" category="science" />} />
          <Route exact path="/sports" element={<News apikey={apikey} setProgress={setProgress} key="sports" pageSize={8} country="us" category="sports" />} />
          <Route exact path="/technology" element={<News apikey={apikey} setProgress={setProgress} key="technology" pageSize={8} country="us" category="technology" />} />
          
          {/* ✅ Updated to use About component */}
          <Route path="/about" element={<About />} />

          <Route path="/general" element={<News apikey={apikey} setProgress={setProgress} key="general" pageSize={8} country="us" category="general" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
