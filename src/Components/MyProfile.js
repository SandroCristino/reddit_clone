import React, { useEffect, useState} from "react"
import Navbar from "./Navbar.js"
import SummarizeMainContent from "./SummarizeMainContent.js"
import '../Styles/MyProfile.css'
import Sidebar from "./Sidebar.js"

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
      <Navbar />
      {!isScreenSmall && <Sidebar />}
      <SummarizeMainContent isUserPage={true}/>
    </div>
  );
}
