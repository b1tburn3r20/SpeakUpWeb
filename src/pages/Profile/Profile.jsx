import React, { useState, useRef, useEffect } from 'react';
import './Profile.css';
import { format } from 'date-fns';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';
import * as photosAPI from '../../utilities/photos-api';


const Profile = ({ user, setUser }) => {
    const [photos, setPhotos] = useState([]);
    const fileInputRef = useRef();
    const [title, setTitle] = useState('');
    const [profileImage, setProfileImage] = useState(user.profileImage || '');
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState(null);
    const [editor, setEditor] = useState(null);

    const onDrop = (acceptedFiles) => {
        setImage(URL.createObjectURL(acceptedFiles[0]));
    };
    useEffect(function () {
        photosAPI.getAll().then(photos => setPhotos(photos));
    }, []);
    const setEditorRef = (editor) => setEditor(editor);

    async function handleUpload() {
        // Use FormData object to send the inputs in the fetch request
        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_a_file
        const formData = new FormData();
        formData.append('title', title);
        formData.append('photo', fileInputRef.current.files[0]);
        const newPhoto = await photosAPI.upload(formData);
        setPhotos([newPhoto, ...photos]);
        // Clear the description and file inputs
        setTitle('');
        fileInputRef.current.value = '';
    }






    const [editingFields, setEditingFields] = useState({
        bio: false,
        pronouns: false
    });

    const [editUser, setEditUser] = useState({ ...user });
    const editField = (field) => {
        setEditingFields((prevState) => ({
            ...prevState,
            [field]: true
        }));
        setEditUser({ ...user });
    };

    const saveField = async (field) => {
        try {
            await axios.put(
                '/api/users/profile',
                {
                    userId: user._id,
                    [field]: editUser[field]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            const updatedUser = { ...user, [field]: editUser[field] };
            setUser(updatedUser);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setEditingFields((prevState) => ({
                ...prevState,
                [field]: false
            }));
            setEditUser({ ...user });
        }
    };

    const renderField = (field) => {
        if (editingFields[field]) {
            return (
                <>
                    <input
                        type="text"
                        value={editUser[field]}
                        onChange={(e) => setEditUser({ ...editUser, [field]: e.target.value })}
                    />
                    <button onClick={() => saveField(field)}>Save</button>
                </>
            );
        } else if (field === 'dateJoined') {
            const dateJoined = new Date(user[field]);
            const formattedDate = isNaN(dateJoined) ? '' : format(dateJoined, 'MMMM do, yyyy');
            return <div>{formattedDate}</div>;
        } else {
            return (
                <>
                    <div>{user[field]}</div>
                    {field !== 'email' && (
                        <i
                            className="fa-solid fa-pen"
                            style={{ color: '#ababab', cursor: 'pointer' }}
                            onClick={() => editField(field)}
                        ></i>
                    )}
                </>
            );
        }
    };

    return (
        <div className="profile-card">
            <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps()} className='drag-n-drop'>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </section>
                )}
            </Dropzone>
            {image && (
                <AvatarEditor
                    ref={setEditorRef}
                    image={image}
                    width={250}
                    height={250}
                    border={50}
                    color={[255, 255, 255, 0.6]} // RGBA
                    scale={1.2}
                    rotate={0}
                />
            )}
            <button onClick={handleUpload}>Upload Photo</button>
            <h2>{user.name}</h2>
            <div className="info-group">
                <h3>Personal Info</h3>
                <p className="label">Bio:</p>
                {renderField('bio')}
                <p className="label">Pronouns:</p>
                {renderField('pronouns')}
            </div>
            <div className="info-group">
                <h3>Account Details</h3>
                <p className="label">Email:</p>
                <div>{user.email}</div>
                <p className="label">Bills voted on:</p>
                <div>{user.votes ? user.votes.length : 0}</div>
                <p className="label">Date Joined:</p>
                {renderField('dateJoined')}
            </div>
        </div>
    );
};

export default Profile;
