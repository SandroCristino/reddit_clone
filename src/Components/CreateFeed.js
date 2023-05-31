import React, {useState} from 'react'
import { db, storage } from './Firebase';
import { serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage";
import { useSelector, useDispatch } from 'react-redux';
import { setShowCreateFeed } from './userReducer';

import { v4 as uuidv4 } from 'uuid';
import '../Styles/CreateFeed.css'

export default function CreateFeed() {
    const [picture, setPicture] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('Any')
    const [loading, setLoading] = useState(false)
    const [likes] = useState(0)
    const [commentList] = useState([])
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

            // Upload the description, category, and the picture URL to the database
            await setDoc(doc(db, `feeds/${feedId}`), {
                id: feedId,
                description,
                category,
                data: serverTimestamp(),
                likes,
                commentList,
            })

            // Reset
            setPicture('')
            setDescription('')
            setCategory('')
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
            handleToggleCreateFeed()
        }
    }
    return (
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
    );
}