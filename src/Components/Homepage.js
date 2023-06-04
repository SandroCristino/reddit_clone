import React, { useEffect, useState } from "react";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SummarizeMainContent from "./SummarizeMainContent";

export default function Homepage() {
  
  return (
    <div>
      <Navbar />
      <Sidebar />
      <SummarizeMainContent />
    </div>
  );
}


