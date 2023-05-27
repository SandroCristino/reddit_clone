import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../Components/Firebase.js";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from './userReducer';
import { useSelector } from 'react-redux';




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
      dispatch(setUser(user)); // Dispatch setUser action with the user data
      console.log('Done')
    } 
    // else {
    //   dispatch(clearUser()); // Dispatch clearUser action if user is not logged in
    //   navigate("/");
    //   console.log('Cleared')
    // }

  }, [user, loading, navigate, dispatch]);

  return (
    <div>
      <div className="dashboard__container">
        Logged in as
         <div>{name}</div>
         <div>{user?.email}</div>
         <button className="dashboard__btn" onClick={logout}>
          Logout
         </button>
       </div>
    </div>
  );
}
