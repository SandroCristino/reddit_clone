import React, { useState, useEffect } from 'react'
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function FeedList() {
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        const fetchFeeds = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'feeds'))
                const fetchFeeds = querySnapshot.doc.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                setFeeds(fetchFeeds)
            } catch (error) {
                console.log(error)
            }
        }
        fetchFeeds()
    }, [])

    return (
        <div>
            {feeds.map((feed) => (
                <div key={feed.id}>
                    <h3>{feed.description}</h3>
                    <p>Category: {feed.category}</p>
                    <img src={feed.pictureUrl} alt="Feed Picture" />
                </div>
            ))} 
        </div>
    )
}
