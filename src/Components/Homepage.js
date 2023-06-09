import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SummarizeMainContent from "./SummarizeMainContent";

export default function Homepage() {
  const [isScreenSmall, setIsScreenSmall] = useState(false)

  // Check screen
  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth <= 1024); // Adjust the screen size threshold as needed
    }

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div>
      <Navbar />
      {!isScreenSmall && <Sidebar />}
      <SummarizeMainContent />
      <Footer />
    </div>
  );
}


