import { useState, useRef } from 'react';
import './Profile.css';
import { format } from 'date-fns';
import axios from 'axios';
import * as usersAPI from '../../utilities/users-api';
import { useDropzone } from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';

const Profile = ({ user, setUser }) => {
    const [profileImage, setProfileImage] = useState(user.profilePicture || 'https://i.imgur.com/7mXutdU.jpg');
    const [formImage, setFormImage] = useState(null);
    const [image, setImage] = useState(null);
    const [editor, setEditor] = useState(null);
    const [scale, setScale] = useState(1.0);
    const fileInputRef = useRef();

    const setEditorRef = (editor) => setEditor(editor);

    const onDrop = (acceptedFiles) => {
        setFormImage(URL.createObjectURL(acceptedFiles[0]));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


    const handleScale = (e) => {
        setScale(parseFloat(e.target.value));
    }
    const onSave = async (evt) => {
        evt.preventDefault();
        if (editor) {
            const canvasScaled = editor.getImageScaledToCanvas();
            const formData = new FormData();
            canvasScaled.toBlob((blob) => {
                formData.append('photo', blob);
                // Upload the image to your server
                usersAPI.profilePic(formData).then((updatedUser) => {
                    setUser(updatedUser)
                    setProfileImage(URL.createObjectURL(blob))
                });
            });
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
            <section>
                <form onSubmit={onSave}>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                <p>Drop the files here ...</p> :
                                <p>Drag 'n' drop some files here, or click to select files</p>
                        }
                    </div>
                    {formImage &&
                        <div>
                            <AvatarEditor
                                ref={setEditorRef}
                                image={formImage}
                                width={250}
                                height={250}
                                border={50}
                                color={[255, 255, 255, 0.6]} // RGBA
                                scale={scale}
                                borderRadius={125} // to create a circular crop
                            />
                            <input
                                name="scale"
                                type="range"
                                onChange={handleScale}
                                min={1}
                                max={2}
                                step={0.01}
                                defaultValue={scale}
                            />
                        </div>
                    }
                    <button type='submit'>Save Photo</button>
                </form>
            </section>
        </div>
    );
};

export default Profile;
