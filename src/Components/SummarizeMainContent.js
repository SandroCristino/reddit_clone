import React, {useState, useEffect} from 'react'
import FeedList from './FeedList'
import CreateFeed from './CreateFeed'
import AddFeedButton from './AddFeedButton'
import { useAuthState  } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, getUserServerData } from "../Components/Firebase.js";
import { query, collection, getDocs, where  } from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setShowCreateFeed } from './userReducer';
import Navbar from "./Navbar.js";
import loadingSpinner from "../Assets/loading-spinner.gif";
import '../Styles/MyProfile.css'

export default function SummarizeMainContent({isUserPage}) {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loadingFeets = useSelector((state) => state.user.loading)
    const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
    const showCreateFeed = useSelector((state) => state.user.showCreateFeed)
  
  
    // Keep loading while loading user data
    useEffect(() => {
      if (loading) {
        setShowLoadingSpinner(true);
        return;
      }
    }, [user, loading, navigate, dispatch]);
  
  
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

      {/* Create Feed    */}
      <div className="d-flex justify-content-end feedButton">
        <div onClick={handleToggleCreateFeed} >
        <AddFeedButton />
        </div>
      </div>
  
      {/* Headline */}
      <div className="d-flex justify-content-center">
        <h1 className="text-center p-1 mt-3 w-50 bg-light bg-gradient rounded shadow">Your Feeds</h1>
      </div>
  
      {/* Loading */}
      {showLoadingSpinner && (
          <div className="loading-overlay">
            <img src={loadingSpinner} alt="Loading" className="loading-spinner" />
          </div>
      )}
  
      {showCreateFeed && <CreateFeed />}
      
      {/* Display feed */}
      <FeedList isUserPage={true} />
      
    </div>
    );
}
