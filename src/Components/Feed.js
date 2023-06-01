import { updateDoc, doc, getDocs, getDoc, collection } from 'firebase/firestore';
import { db , updateServerData, updateReplaceServerData } from './Firebase';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import '../Styles/Feed.css';


export default function Feed({ picture, description, category, feedId, feedCommentList, feedLikes }) {
    const currentUser = useSelector((state) => state.user.userData);
    const [likes, setLikes] = useState(feedLikes)
    const [commentList, setCommentList] = useState(feedCommentList)
    const [newComment, setNewComment] = useState([])
    const [recentComments, setRecentComments] = useState([])
    const [showAllComments, setShowAllComments] = useState(false)
    const [textBox, setTextBox] = useState('Show More')

    useEffect(() => {
        setRecentComments(commentList.slice(-3))
    },[commentList])

    useEffect(() => {
        // Update commentlist 
        if (commentList.length > 0 || newComment !== '') {
            updateReplaceServerData('feeds', feedId, 'commentList', commentList)
        }

        // Update likes
        getLikesFromDB()
      }, [commentList, newComment, likes]);


    async function getLikesFromDB() {
        try {
          const docRef = doc(db, 'feeds', feedId);
          const docSnapshot = await getDoc(docRef);
          
          if (docSnapshot.exists()) {
            const feedData = docSnapshot.data();
            const likesArray = feedData.likes;
            setLikes(likesArray)
          } else {
            console.log('Feed document does not exist.');
          }
        } catch (error) {
          console.log(error);
        }
    }

    function addComment() {
        let currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.toLocaleString('default', { month: 'long' });
        const year = currentDate.getFullYear();
        const time = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        currentDate = `${day} ${month} ${year} ${time}`

        if (newComment) {
          const comment = {
            id: uuidv4(),
            text: newComment,
            userName: currentUser.name,
            userID: currentUser.uid,
            date: currentDate,
          };
    
          setCommentList([...commentList, comment]);
          setNewComment('');
        }

        updateServerData('users', currentUser.uid, 'commentList', feedId)
    }


    async function handleUploadLikes() {
        //Upload to feed data
        updateServerData('feeds', feedId, 'likes', currentUser.uid)

        // Upload to user data
        updateServerData('users', currentUser.uid, 'likeList', feedId)
    }

    function toggleShowAllComments() {
        setShowAllComments(!showAllComments)
        if (textBox === 'Show More') setTextBox('Show Less')
        else setTextBox('Show More')
    }

    function categorySetter(category) {
        switch (category) {
            case 'Gaming':
                return <i class="bi bi-filter-square-fill mx-1"></i>
            case 'Crypto':
                return <i class="bi bi-currency-bitcoin mx-1"></i>
            case 'Television':
                return <i class="bi bi-tv-fill mx-1"></i>
            case 'Any':
                return <i class="bi bi-filter-square-fill mx-1"></i>
            default:
                return null
        }
    }

    function renderCommentList(comment) {
        return (
            <li className='list-group-item' key={comment.id}>
            <p className='fw-lighter dateGroup'>{comment.date}</p>
            <div className='d-flex'>
                <p className='fst-italic fw-bold'>{comment.userName}: </p>
                <textarea readOnly className='mx-2 w-100'>{comment.text}</textarea>
            </div>
            </li>
        );
    }

    return (
        <div className='feed-container'>
            {/* Picture and Description */}
            <div className=''>
                <img src={picture} alt="Should be a picture" className='picture'/>
                <h4 className='w-100 mt-3'>{categorySetter(category)} {description}</h4>
            </div>

            {/* Like and Dislike */}
            <div className='d-flex mt-2 align-items-center'>
                <div className='form-check-label'>{likes.length}</div>
                <button className='mx-2 btn btn-light' onClick={handleUploadLikes}>👍</button>
            </div>

            {/* Recent comments  */}
            <div>
                <ul className='list-group'>
                { showAllComments 
                    ? commentList.map((comment) => (renderCommentList(comment)))
                    : recentComments.map((comment) => ( renderCommentList(comment)))
                }
                </ul>
                <button className='btn text-info mt-2' onClick={toggleShowAllComments}>{textBox}</button>
            </div>

            {/* Write own comment */}
            <div className="searchbar input-group mx-auto mt-2">
                <input 
                type="text" 
                className="form-control" 
                placeholder='Message'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addComment();
                    }
                }}/>
                <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={addComment}>
                    Post
                </button>
            </div>
          
        </div>
    )
}
