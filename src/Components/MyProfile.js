import React from "react";
import Navbar from "./Navbar.js";
import SummarizeMainContent from "./SummarizeMainContent.js";
import '../Styles/MyProfile.css'

export default function MyProfile() {
  return (
    <div>
    <Navbar />
    <SummarizeMainContent isUserPage={true}/>
  </div>
  );
}
