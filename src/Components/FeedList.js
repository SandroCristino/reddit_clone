import React, { useState, useEffect } from 'react'
import { db, storage, getUserServerData } from './Firebase'
import { collection, getDocs } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setSearchInputSpan, setRunFilterFromSearchBar } from './userReducer'
import Feed from './Feed'
import '../Styles/FeedList.css'

export default function FeedList({isUserPage}) {
  const [feeds, setFeeds] = useState([])
  const [originalFeeds, setOriginalFeeds] = useState([])
  const [displayCount, setDisplayCount] = useState(5)
  const [fetchFeedsLoading, setFetchFeedsLoading] = useState(true)
  const loadingFeets = useSelector((state) => state.user.loading)
  const loadedObjects = useSelector((state) => state.user.loadedObjects)
  const currentUser = useSelector((state) => state.user.userData)
  const sorting = useSelector((state) => state.user.sorting)
  const searchInput = useSelector((state) => state.user.searchInput)
  const runFilterFromSearchBar = useSelector((state) => state.user.runFilterFromSearchBar)
  const dispatch = useDispatch()
 
  useEffect(() => {
    const fetchFeeds = async () => {
      try {

        // Fetch data from database
        const querySnapshot = await getDocs(collection(db, 'feeds'))
        const fetchedFeeds = []

        for (const doc of querySnapshot.docs) {
          const feed = {
            id: doc.id,
            ...doc.data(),
          };

          // Fetch the download URvL for the picture from Firebase Storage
          const pictureRef = ref(storage, `images/${feed.id}`)
          const pictureURL = await getDownloadURL(pictureRef)

          // Check if user logged in
          if (currentUser !== null) {
            // Fetch user data
            var fetchedUserData = await getUserServerData(currentUser.uid)
            if (fetchedUserData.feedList) var userData = fetchedUserData.feedList
          } 
          
            // Add to feeds. Either user or general
            if (isUserPage) {
              if (userData.findIndex(userFeed => userFeed === feed.id) >= 0) {
                feed.pictureUrl = pictureURL
                fetchedFeeds.push(feed)      
              }
            } else {
              feed.pictureUrl = pictureURL
              fetchedFeeds.push(feed)
            }
        }
        setFeeds(fetchedFeeds)
        setOriginalFeeds(fetchedFeeds)
      } catch (error) {
        console.log(error)
      } finally {
        setFetchFeedsLoading(false)
      }
    };

    fetchFeeds()
  }, [])

  useEffect(() => {
    console.log(`Feeds lenght ${feeds.length}`)
    console.log(`Loaded objects ${loadedObjects}`)
    if ((loadedObjects === displayCount || feeds.length === loadedObjects) && !fetchFeedsLoading) dispatch(setLoading(false))
  },[loadedObjects, feeds, loadingFeets])

  useEffect(() => {
    handleResorting()
    handleSearch()
  },[sorting, searchInput])

  useEffect(() => {
    handleSearch()
  },[runFilterFromSearchBar])

  const handleResorting = async () => {
    if (sorting === 'Popular') {

      // Sort regarding to likes
      const newFeeds = [...originalFeeds] 
      
      newFeeds.sort((a, b) => {
        console.log('Feed A likes:', a.likes.length)
        console.log('Feed B likes:', b.likes.length)
        return b.likes.length - a.likes.length
      });
      
      setFeeds(newFeeds)
    } else if (sorting === 'Any') {

      // Display all feeds
      setFeeds(originalFeeds)
    } else {

      // Sort regarding topic
      const newFeeds = await originalFeeds.filter((feed) => feed.category === sorting);
      setFeeds(newFeeds)
    }
  }

  const handleSearch = async () => {
    if (searchInput === '') return

    const newFeedsDescription = await originalFeeds.filter(feed => feed.description.includes(searchInput))
    
    if (newFeedsDescription[0]) {
      // Update span description 
      const newSpanDescription = await newFeedsDescription[0].description
      await dispatch(setSearchInputSpan(`Feed: ${newSpanDescription}`))
      // console.log(`Feed: ${newSpanDescription}`)
    }  else {
      dispatch(setSearchInputSpan(''))
    }


    if (runFilterFromSearchBar === true) {
      await setFeeds(newFeedsDescription)
      await dispatch(setRunFilterFromSearchBar(false))
      // dispatch(setSearchInputSpan(''))
    }
  }

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 5)
  }

  return (
    <div className="d-flex justify-content-center mt-4">
    <div className="d-flex flex-column justify-content-center">
      {feeds.length === 0 
      ? (
        <div className="d-flex justify-content-center">
          <h3 className="text-center p-1 mt-3 w-100 bg-light bg-gradient rounded shadow">No feeds so far</h3>
        </div>
      ) : (
            feeds.slice(0, displayCount).map((feed) => (
              <div key={feed.id} className='feedlist-container mb-4 shadow'>
                  <Feed 
                  picture={feed.pictureUrl} 
                  description={feed.description} 
                  category={feed.category} 
                  feedId={feed.id}
                  feedCommentList={feed.commentList}
                  feedLikes={feed.likes}
                  />
              </div>
            ))
          )
      }

      {feeds.length > 0 && feeds.length > loadedObjects
      ? <button onClick={handleLoadMore} className='btn btn-light mb-5'>More Feeds</button>
      : ''
      }
    </div>
    
  </div>
  );
}
