import React, { useEffect, useRef } from 'react';
import '../../assets/css/ParallaxStock.css';

// Import images
import Navbar from '../Layout/Navbar'
// import Features from '../Guest/Features'
import Footer from '../Layout/Footer'
import sky from '../../assets/images/sky.png';
import city from '../../assets/images/city.png';
import rail from '../../assets/images/rail.png';
import train from '../../assets/images/train.png';
import sun from '../../assets/images/sun.png';
import waterfall from '../../assets/images/waterfall.png';
import desert_rock from '../../assets/images/desert_rock.png'
import work from '../../assets/images/work.png';
import hillleft from '../../assets/images/hill_left.png';
import hillright from '../../assets/images/hill_right.png';
const ParallaxStock = () => {
  const skyRef = useRef();
  const sunRef = useRef();
  const trainRef = useRef();
  const titleRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
  
      if (skyRef.current) skyRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
      if (sunRef.current) sunRef.current.style.transform = `translateY(${scrollY * 0.7}px)`;
      if (trainRef.current)
        trainRef.current.style.transform = `translateX(calc(${scrollY * 0.9}px))`;
      
      if (titleRef.current) titleRef.current.style.transform = `translateY(${100 - scrollY * 4}px)`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="parallax-container">
      <Navbar/>
      <img ref={skyRef} src={sky} alt="sky" className="parallax-layer sky" />
      <img ref={sunRef} src={sun} alt="sun" className="parallax-layer sun" />
      <div className="parallax-layer water"></div>
      <img src={city} alt="city" className="parallax-layer city" />
      <img src={rail} alt="rail" className="parallax-layer rail" />
      <img ref={trainRef} src={train} alt="train" className="parallax-layer train" />
      <img src={waterfall} alt="waterfall" className="parallax-layer waterfall" />
      <img src={hillleft} alt="left rock" className="parallax-layer rork left-rock" />
      <img src={hillright} alt="right rock" className="parallax-layer rork right-rock" /> 
      <img src={hillright} alt="right rock" className="parallax-layer rork right-rock" /> 
      <img src={desert_rock} alt="desert rock" className="parallax-layer desert-rock" /> 
      <div className="parallax-layer work-container">
        <img src={work} alt="work" className="work" />
      </div> 
      <h1 ref={titleRef} className="parallax-layer parallax-title">Stock Prediction</h1>
      {/* <Features className ="features-section"/> */}
      {/* <Footer/> */}
    </div>

  );
};

export default ParallaxStock;
