import React, {useEffect, useState} from 'react'
import { db, storage, updateServerData } from './Firebase';
import { serverTimestamp, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage";
import { useSelector, useDispatch } from 'react-redux';
import { setShowCreateFeed, setShowCreateFeedFalse } from './userReducer';

import { v4 as uuidv4 } from 'uuid';
import '../Styles/CreateFeed.css'
import { update } from 'firebase/database';

export default function CreateFeed() {
    const [picture, setPicture] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('Any')
    const [loading, setLoading] = useState(false)
    const [likes] = useState([])
    const [commentList] = useState([])
    const currentUser = useSelector((state) => state.user.userData);
    const categoryOptions = ['Any', 'Gaming', 'Television', 'Crypto'];
    const showCreateFeed = useSelector((state) => state.user.showCreateFeed)
    const dispatch = useDispatch();

    function handlePictureUpload(e) {
        const file = e.target.files[0];
        setPicture(file);
    }

    const handleToggleCreateFeed = () => {
        dispatch(setShowCreateFeed(!showCreateFeed));
    };

    

    async function handleUploadData() {
        if (!picture) return

        try {
            setLoading(true)

            // Create ID
            const feedId = uuidv4();

            // Upload picture to Firebase
            const imagesRef = ref(storage, `images/${feedId}`)
            await uploadBytes(imagesRef, picture).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });

            // Set owner data
            const newOwnerData = {
                name: currentUser.name,
                email: currentUser.email,
                id: currentUser.uid,
            }

            // Upload the description, category, and the picture URL to the database
            await setDoc(doc(db, `feeds/${feedId}`), {
                id: feedId,
                description,
                category,
                data: serverTimestamp(),
                owner: newOwnerData,
                likes,
                commentList,
            })

            // Assign to owner 
            updateServerData('users',currentUser.uid, 'feedList', feedId)
       

            // Reset
            setPicture('')
            setDescription('')
            setCategory('')
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
            handleToggleCreateFeed()
            window.location.reload()
        }
    }
    return (
        <div className='d-flex justify-content-center'>
            <div className="mt-4 createFeedContainer">
                <div classname='createFeedInnerContainer'>
                <h2>Create Feed</h2>
                <div className="mb-3">
                    <input type="file" className="form-control" onChange={handlePictureUpload} />
                    {picture && <img src={URL.createObjectURL(picture)} alt="Uploaded Picture" className="mt-3 previewPicture" />}
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control createFeedText non-resizable-textarea"
                        rows={3}
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    </div>
                <div className="mb-3">
                    <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                    {categoryOptions.map((option) => (
                        <option key={option} value={option}>
                        {option}
                        </option>
                    ))}
                    </select>
                </div>
                <div>
                    <button className="btn btn-primary w-100" onClick={handleUploadData} disabled={loading}>
                        {loading ? 'Uploading ...' : 'Submit'}
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}