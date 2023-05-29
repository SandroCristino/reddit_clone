import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { uuidv4 } from 'uuid'; 


export default function Feed({ picture, description, category }) {
    const currentUser = useSelector((state) => state.user.userData);
    const [uniqueID, setUniqueID] = useState(currentUser.userData.email)
    const [category, setCategory] = useState(category)
    const [likes, setLikes] = useState(0)
    const [commentList, setCommentList] = useState([])
    const [newComment, setNewComment] = useState([])
    const [recentComments, setRecentComments] = useState([])
    const [showAllComments, setShowAllComments] = useState(false)

    useEffect(() => {
        setRecentComments(commentList.slice(-3))
    },[commentList])

    function increaseLikes() {
        setLikes(likes + 1)
    }

    function decreaseLikes() {
        if (like > 0) setLikes(likes - 1)
    }

    function addComment() {
        if (newComment) {
          const comment = {
            id: uuidv4(),
            text: newComment,
            userEmail: currentUser.userData.email
          };
    
          setCommentList([...commentList, comment]);
          setNewComment('');
        }
    }

    function toggleShowAllComments() {
        setShowAllComments(!showAllComments)
    }

    return (
        <div>
            {/* Picture and Description */}
            <div>
                <input type="text" placeholder="Picture URL" value={picture} readOnly />
                <textarea className='mt-1' placeholder="Description" value={description} readOnly></textarea>
            </div>

            {/* Like and Dislike */}
            <div className='d-flex mt-2'>
                <button className='mx-2' onClick={increaseLikes}>👍</button>
                <button onClick={decreaseLikes}>👎</button>
            </div>

            {/* Recent comments  */}
            <div>
                <ul onClick={toggleShowAllComments}>
                { showAllComments 
                    ? commentList.map((comment) => (<li key={comment.id}>{comment.text}</li>))
                    : recentComments.map((comment) => ( <li key={comment.id}>{comment.text}</li>))
                }
                </ul>
            </div>

            {/* Write own comment */}
            <div className="searchbar input-group mx-auto">
                <input 
                type="text" 
                className="form-control" 
                placeholder='Message'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}/>
                <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={addComment}>
                    Post
                </button>
            </div>
          
        </div>
    )
}
