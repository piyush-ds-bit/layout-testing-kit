
import React, { useState, useEffect } from 'react';

const AnimatedGreeting: React.FC = () => {
  const greetings = [
    "Hello",
    "Namaste", 
    "Vanakkam",
    "Sat Sri Akal",
    "Ram Ram",
    "Kem Cho",
    "Nomoshkar",
    "Hola",
    "Pranam",
    "Nǐ hǎo",
    "Bonjour",
    "Hola"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % greetings.length);
        setIsVisible(true);
      }, 300); // Half of the transition duration for smooth effect
    }, 3000);

    return () => clearInterval(interval);
  }, [greetings.length]);

  return (
    <span 
      className={`inline-block transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ minWidth: '120px' }} // Prevent layout shift on mobile
    >
      {greetings[currentIndex]}
    </span>
  );
};

export default AnimatedGreeting;
