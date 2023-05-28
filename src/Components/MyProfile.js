import React, { useEffect, useState } from "react";
import { useAuthState, useSendSignInLinkToEmail } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../Components/Firebase.js";
import { query, collection, getDocs, where, memoryLruGarbageCollector } from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from './userReducer';
import Navbar from "./Navbar.js";




export default function MyProfile() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) {
      fetchUserName();
      const userData = { ...user, name }; // Combine user data with the name property
      dispatch(setUser(userData)); // Dispatch setUser action with the combined user data
    }
  }, [user, loading, navigate, dispatch, name]);

  return (
    <div>
      < Navbar />
      <div className="dashboard__container">
        Logged in as
         <div>{name}</div>
         <div>{user?.email}</div>
       </div>
    </div>
  );
}
