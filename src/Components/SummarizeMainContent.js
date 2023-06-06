import React, {useState, useEffect} from 'react'
import FeedList from './FeedList'
import CreateFeed from './CreateFeed'
import AddFeedButton from './AddFeedButton'
import { useAuthState  } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import { auth, db, getUserServerData } from "../Components/Firebase.js"
import { useDispatch, useSelector } from 'react-redux'
import { setShowCreateFeed } from './userReducer'
import loadingSpinner from "../Assets/loading-spinner.gif"
import '../Styles/SummarizeMainContent.css'

export default function SummarizeMainContent({isUserPage}) {
    const [user, loading] = useAuthState(auth)
    const [userLoggedState, setUserLoggedState] = useState(false)
    const [showLoadingSpinner, setShowLoadingSpinner] = useState(false)
    const loadingFeets = useSelector((state) => state.user.loading)
    const showCreateFeed = useSelector((state) => state.user.showCreateFeed)
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    // Keep loading while loading user data
    useEffect(() => {
      if (loading) {
        setShowLoadingSpinner(true);
        return;
      }
      const storedData = JSON.parse(localStorage.getItem('user'))
      if (storedData) {
        if (storedData.isLoggedIn === true) setUserLoggedState(true)
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
    <div className='mt-5'>

     {/* Loading */}
     {showLoadingSpinner && (
          <div className="loading-overlay">
            <img src={loadingSpinner} alt="Loading" className="loading-spinner" />
          </div>
      )}

      {/* Create Feed */}
      <div className="d-flex justify-content-end feed-button">
        <div onClick={handleToggleCreateFeed} >
        {  userLoggedState &&
          <AddFeedButton />
        }
        </div>
      </div>
  
      {/* Headline */}
      <div className="d-flex justify-content-center mt-3">
        <h1 className="text-center p-1 mt-3 bg-light bg-gradient rounded shadow main-content-headline">Your Feeds</h1>
      </div>
  
      {   showCreateFeed && <CreateFeed />}
      
      {/* Display feed */}
      <FeedList isUserPage={isUserPage} />
      
    </div>
    );
}
