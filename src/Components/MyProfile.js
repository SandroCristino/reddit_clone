import React, { useEffect, useState} from "react"
import Navbar from "./Navbar.js"
import SummarizeMainContent from "./SummarizeMainContent.js"
import '../Styles/MyProfile.css'
import Sidebar from "./Sidebar.js"
import Footer from "./Footer.js"

export default function MyProfile() {
  const [isScreenSmall, setIsScreenSmall] = useState(false)

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
      {!isScreenSmall && <Sidebar />}
      <Navbar />
      <Footer />
      <SummarizeMainContent isUserPage={true}/>
    </div>
  );
}
