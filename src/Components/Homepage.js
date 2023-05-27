import React, { useEffect, useState } from "react";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';

export default function Homepage() {
  const user = useSelector(state => state.user);
  console.log(user); // Check if user state is correctly retrieved

  
  return (
    <div>
      <Navbar />
      <Sidebar />
    </div>
  );
}
