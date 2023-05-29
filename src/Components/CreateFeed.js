import React, {useState} from 'react'
import { db, storage } from './Firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage";

import { v4 as uuidv4 } from 'uuid'; // Import the UUID library
import '../Styles/CreateFeed.css'

export default function CreateFeed() {
    const [picture, setPicture] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [loading, setLoading] = useState(false)
    const categoryOptions = ['Any', 'Gaming', 'Televison', 'Crypto'];


    function handlePictureUpload(e) {
        const file = e.target.files[0];
        setPicture(file);
    }

    async function handleUploadData() {

        if (!picture) return

        try {
            setLoading(true)

            // Create ID
            const feedId = uuidv4();

            // Upload picture to Firebase
            // const fileRef = storage.ref().child(picture.name);
            // await fileRef.put(picture);

            // Second attent
            const imagesRef = ref(storage, `images/${feedId}`)
            uploadBytes(imagesRef, picture).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });

            // Upload the description, category, and the picture URL to the database
            await addDoc(collection(db, "feeds"), {
                id: feedId,
                description,
                category,
            });

            // Reset
            setPicture('')
            setDescription('')
            setCategory('')
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
            window.location.reload()
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
                <button className="btn btn-primary w-100" onClick={handleUploadData}>
                    {loading ? 'Uploading ...' : 'Submit'}
                </button>
            </div>
            </div>
        </div>
    );
}