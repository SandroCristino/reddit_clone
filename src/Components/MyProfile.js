import React from "react"
import Navbar from "./Navbar.js"
import SummarizeMainContent from "./SummarizeMainContent.js"
import '../Styles/MyProfile.css'
import Sidebar from "./Sidebar.js"

export default function MyProfile() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <SummarizeMainContent isUserPage={true}/>
    </div>
  );
}
