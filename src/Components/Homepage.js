import React, { useEffect, useState } from "react";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';

export default function Homepage() {
  
  return (
    <div>
      <Navbar />
      <Sidebar />
    </div>
  );
}
