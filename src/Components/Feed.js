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
    const [selectedCategory, setSelectedCategory] = useState(category);
    const categoryOptions = ['Crypto', 'Gaming', 'Televison', 'Any'];

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
            // userId: userId,
          };
    
          setCommentList([...commentList, comment]);
          setNewComment('');
        }
      }

    return (
        <div>
            <div>
                <input type="text" placeholder="Picture URL" value={picture} readOnly />
                <textarea className='mt-1' placeholder="Description" value={description} readOnly></textarea>
            </div>
            <div className='d-flex mt-2'>
                <button className='mx-2' onClick={increaseLikes}>👍</button>
                <button onClick={decreaseLikes}>👎</button>
            </div>
            <div className="searchbar input-group mx-auto">
                <input 
                type="text" 
                className="form-control" 
                placeholder='Message'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}/>
                // OnClick - get User data with e????
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    {categoryOptions.map((option) => (
                        <option key={option} value={option}>
                        {option}
                        </option>
                    ))}
                </select>
                <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={addComment}>
                    Post
                </button>
            </div>
            <div>

            </div>
        </div>
    )
}
