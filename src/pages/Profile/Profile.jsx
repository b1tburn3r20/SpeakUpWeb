import React, { useState } from 'react';
import './Profile.css';
import { format } from 'date-fns';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';

const Profile = ({ user, setUser }) => {
    const [profileImage, setProfileImage] = useState(user.profilePicture || 'https://i.imgur.com/7mXutdU.jpg');
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState(null);
    const [editor, setEditor] = useState(null);

    const onDrop = (acceptedFiles) => {
        setImage(URL.createObjectURL(acceptedFiles[0]));
    };

    const setEditorRef = (editor) => setEditor(editor);


    const onSave = async () => {
        if (editor) {
            const canvasScaled = editor.getImageScaledToCanvas();
            const blob = await new Promise((resolve) => canvasScaled.toBlob(resolve));

            const formData = new FormData();
            formData.append('file', blob);

            try {
                const uploadResponse = await axios.post('/api/users/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (uploadResponse.data && uploadResponse.data.fileUrl) {
                    const imageUrl = uploadResponse.data.fileUrl;

                    try {
                        const profileUpdateResponse = await axios.put(
                            '/api/users/profile',
                            {
                                userId: user._id,
                                profileImage: imageUrl,
                            },
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                                },
                            }
                        );

                        if (profileUpdateResponse.status === 200) {
                            setProfileImage(imageUrl);
                            setUser({ ...user, profileImage: imageUrl });
                            console.log('Profile image saved successfully');
                        }
                    } catch (error) {
                        console.error('Error saving profile image:', error);
                    }
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };


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
            await axios.post(
                '/api/users/profile',
                {
                    userId: user._id,
                    bio: editUser.bio,
                    pronouns: editUser.pronouns
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            const updatedUser = { ...user, bio: editUser.bio, pronouns: editUser.pronouns };
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
            <div className='activeUser'>
                <h2>{user.name}</h2>
                <div className='profileImageWrapper'>
                    <img src={profileImage} alt='Profile Picture' />
                </div>
            </div>
            <div className='info-group-container'>
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
            <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps()} className='drag-n-drop'>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop image, or click to select file</p>
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
            <button disabled={!image} onClick={onSave}>Save Image</button>
        </div>
    );
};

export default Profile;
