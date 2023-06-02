import React, { useState, useEffect } from 'react';
import { db, storage } from './Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import Feed from './Feed';
import '../Styles/FeedList.css'

export default function FeedList() {
  const [feeds, setFeeds] = useState([]);
  const [displayCount, setDisplayCount] = useState(5)
 
  useEffect(() => {
    const fetchFeeds = async () => {
      try {
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

          feed.pictureUrl = pictureURL;
          fetchedFeeds.push(feed);
        }

        setFeeds(fetchedFeeds);
      } catch (error) {
        console.log(error);
      } 
    };

    fetchFeeds();
  }, []);

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 5);
  };

  return (
    <div className="d-flex justify-content-center mt-4">
    <div className="col-lg-6 d-flex flex-column justify-content-center">
      {feeds.slice(0, displayCount).map((feed) => (
        <div key={feed.id} className='feedContainer mb-4 shadow'>
            <Feed 
            picture={feed.pictureUrl} 
            description={feed.description} 
            category={feed.category} 
            feedId={feed.id}
            feedCommentList={feed.commentList}
            feedLikes={feed.likes}
            />
        </div>
      ))}
      <button onClick={handleLoadMore} className='btn btn-light'>More Feeds</button>
    </div>
    
  </div>
  );
}
