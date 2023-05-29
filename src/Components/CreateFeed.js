import React, {useState} from 'react'
import { storage } from './Firebase'
import { db, storage } from './firebase';

export default function CreateFeed() {
    const [picture, setPicture] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(category);
    const categoryOptions = ['Crypto', 'Gaming', 'Televison', 'Any'];


    function handlePictureUpload(e) {
        const file = e.target.files[0];
        setDisplayFile(URL.createObjectURL(file));
        setPicture(file);
    }

    async function handleUploadData() {
        if (!picture) return

        try {
            // Upload picture to Firebase
            const fileRef = storage.ref().child(displayFile.name);
            await fileRef.put(displayFile);
            const fileUrl = await fileRef.getDownloadURL();

            // Upload the description, category, and the picture URL to the database
            await addDoc(collection(db, "feeds"), {
                description,
                category,
                pictureUrl: fileUrl,
            });

            // Reset
            setPicture('')
            setDescription('')
            setCategory('')
        } catch (error) {
            console.error(err);
        }
    }

    return (
        <div>

            {/* Headline */}
            <h3>Create Feed</h3>

            {/* Add picture */}
            <div>
                <input
                type="file"
                onChange={handlePictureUpload}
                />
                {picture && <img src={picture} alt="Uploaded Picture" />}
            </div>

            {/* Add description */}
            <div>
                <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            {/* Category */}
            <div>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {categoryOptions.map((option) => (
                    <option key={option} value={option}>
                    {option}
                    </option>
                ))}
                </select>
            </div>

            {/* Submit */}
            <div onClick={handleUploadData}>
                <button>Submit</button>
            </div>
        </div>
    )
}
