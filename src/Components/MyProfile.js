import React, { useEffect, useState } from "react";
import { useAuthState  } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Components/Firebase.js";
import { query, collection, getDocs, where  } from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setShowCreateFeed } from './userReducer';
import Navbar from "./Navbar.js";
import CreateFeed from "./CreateFeed.js";
import AddFeedButton from "./AddFeedButton.js";
import loadingSpinner from "../Assets/loading-spinner.gif";
import FeedList from "./FeedList.js";
import '../Styles/MyProfile.css'


export default function MyProfile() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadingFeets = useSelector((state) => state.user.loading)
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const showCreateFeed = useSelector((state) => state.user.showCreateFeed)

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

  // Keep loading while loading user data
  useEffect(() => {
    if (loading) {
      setShowLoadingSpinner(true);
      return;
    }
    if (user) {
      fetchUserName();
      const userData = { ...user, name };
      dispatch(setUser(userData));
      // setShowLoadingSpinner(true);
    }
  }, [user, loading, navigate, dispatch, name]);


  // Keep loading scene while fetching/ displaying data
  useEffect(() => {
    if (!loadingFeets) {
      setShowLoadingSpinner(false)
    }
  }, [loading, loadingFeets, showLoadingSpinner]);

  // Handle createFeed button
  const handleToggleCreateFeed = () => {
    dispatch(setShowCreateFeed(!showCreateFeed));
  };

  return (
    <div>
    <Navbar />

    {/* Loading */}
    {showLoadingSpinner && (
        <div className="loading-overlay">
          <img src={loadingSpinner} alt="Loading" className="loading-spinner" />
        </div>
    )}

    {/* Create Feed    */}
    <div className="d-flex justify-content-end feedButton">
      <div onClick={handleToggleCreateFeed} >
      <AddFeedButton />
      </div>
    </div>

    {showCreateFeed && <CreateFeed />}
    

    {/* Display feed */}
    <FeedList />

    <div className="dashboard__container">
      Logged in as
      <div>{name}</div>
      <div>{user?.email}</div>
    </div>
  </div>
  );
}
