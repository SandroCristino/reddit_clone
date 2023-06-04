import React, { useState, useEffect } from 'react';
import { db, storage, getUserServerData } from './Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from './userReducer';
import Feed from './Feed';
import '../Styles/FeedList.css'

export default function FeedList({isUserPage}) {
  const [totalFeedsCount, setTotalFeedsCount] = useState('')
  const [feeds, setFeeds] = useState([]);
  const [userFeeds, setUserFeeds] = useState([])
  const currentUser = useSelector((state) => state.user.userData);
  const [displayCount, setDisplayCount] = useState(5)
  const [fetchFeedsLoading, setFetchFeedsLoading] = useState(true); 
  const loadingFeets = useSelector((state) => state.user.loading)
  const loadedObjects = useSelector((state) => state.user.loadedObjects);
  const dispatch = useDispatch();
 
  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        // Fetch data from database
        const querySnapshot = await getDocs(collection(db, 'feeds'));
        const fetchedFeeds = [];

        for (const doc of querySnapshot.docs) {
          const feed = {
            id: doc.id,
            ...doc.data(),
          };

          // Fetch the download URL for the picture from Firebase Storage
          const pictureRef = ref(storage, `images/${feed.id}`);
          const pictureURL = await getDownloadURL(pictureRef);

          // Fetch user data
          const fetchedUserData = await getUserServerData(currentUser.uid)
          const userData = fetchedUserData.feedList

          // Add to feeds. Either user or general
          if (isUserPage) {
            if (userData.findIndex(userFeed => userFeed === feed.id) >= 0) {
              feed.pictureUrl = pictureURL;
              fetchedFeeds.push(feed);          
            }
          } else {
            feed.pictureUrl = pictureURL;
            fetchedFeeds.push(feed);
          }
         
        }
        setFeeds(fetchedFeeds);
      } catch (error) {
        console.log(error);
      } finally {
        setFetchFeedsLoading(false)
      }
    };

    fetchFeeds();
  }, []);

  useEffect(() => {
    console.log(`Feeds lenght ${feeds.length}`)
    console.log(`Loaded objects ${loadedObjects}`)
    if (loadedObjects === displayCount || feeds.length === loadedObjects && !fetchFeedsLoading) dispatch(setLoading(false))
  },[loadedObjects, feeds, loadingFeets])

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 5);
  };

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
