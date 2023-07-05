import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css';
import { format } from 'date-fns';
import axios from 'axios';
import * as usersAPI from '../../utilities/users-api';
import * as usersService from '../../utilities/users-service'
import { useDropzone } from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';

const Profile = ({ user, setUser }) => {
    const { userId } = useParams(); // Get the userId from the URL parameters
    const [profileImage, setProfileImage] = useState(
        user.profilePicture || 'https://i.imgur.com/7mXutdU.jpg'
    );
    const [formImage, setFormImage] = useState(null);
    const [imageSelected, setImageSelected] = useState(false); // Track if an image is selected for uploading
    const [editor, setEditor] = useState(null);
    const [scale, setScale] = useState(1.0);
    const [isEditing, setIsEditing] = useState(false); // Track if the profile is in editing mode
    const fileInputRef = useRef();
    const [displayButtons, setDisplayButtons] = useState(false);
    const [displayDropzone, setDisplayDropzone] = useState(false);
    const [displaySaveButton, setDisplaySaveButton] = useState(false);
    const pronounsOptions = ['He/Him', 'She/Her', 'They/Them', 'It/Its', 'Other'];

    useEffect(() => {
        const fetchUser = async () => {
            // Fetch the user data from the server...
            const updatedUser = await usersService.getUser(userId);
            // Update the user state with the fetched data...
            setUser(updatedUser);
        };

        fetchUser();
    }, [userId]); // Refetch when userId changes

    const setEditorRef = (editor) => setEditor(editor);

    const onDrop = (acceptedFiles) => {
        setFormImage(URL.createObjectURL(acceptedFiles[0]));
        setImageSelected(true);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleScale = (e) => {
        setScale(parseFloat(e.target.value));
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setDisplayButtons(true); // show the Cancel button and dropzone when the edit button is clicked
        setDisplayDropzone(true);


    };

    const onSave = async (evt) => {
        evt.preventDefault();
        if (editor) {
            const canvasScaled = editor.getImageScaledToCanvas();
            const formData = new FormData();
            canvasScaled.toBlob((blob) => {
                formData.append('photo', blob);
                // Upload the image to your server
                usersAPI.profilePic(formData).then((updatedUser) => {
                    setUser(updatedUser);
                    setProfileImage(URL.createObjectURL(blob));
                    setFormImage(null); // Reset the form image to close the avatar editor
                    setEditor(null); // Reset the editor reference to close the avatar editor
                    setIsEditing(false); // Exit editing mode
                });
            });
        }
        setDisplayButtons(false);
        setDisplayDropzone(false);
        setDisplaySaveButton(false);

    };
    const handleCancel = () => {
        setDisplayButtons(false);
        setDisplayDropzone(false);
        setDisplaySaveButton(false);
        setFormImage(false);
        setIsEditing(false); // Exit editing mode
    };

    const handleDelete = async () => {
        if (
            window.confirm(
                'Are you sure you want to delete your account? This action cannot be undone.'
            )
        ) {
            // The user clicked "OK", so we proceed with the deletion.
            try {
                // Delete the user's profile
                await axios.delete('/api/users/profile', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                // After the account has been deleted and summaries updated, clear the localStorage.
                localStorage.clear();

                // Refresh the page after the account has been deleted
                window.location.reload();
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const [editingFields, setEditingFields] = useState({
        bio: false,
        pronouns: false,
    });

    const [editUser, setEditUser] = useState({ ...user });

    const editField = (field) => {
        setEditingFields((prevState) => ({
            ...prevState,
            [field]: true,
        }));
        setEditUser({ ...user });
    };

    const saveField = async (field) => {
        try {
            const res = await axios.put(
                // assuming your backend accepts a PUT request for updating user details
                '/api/users/profile',
                {
                    userId: user._id,
                    bio: editUser.bio,
                    pronouns: editUser.pronouns,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            const updatedUser = res.data; // assuming your backend returns the updated user as a response
            setUser(updatedUser);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setEditingFields((prevState) => ({
                ...prevState,
                [field]: false,
            }));
        }
    };

    const renderField = (field) => {
        if (editingFields[field]) {
            if (field === 'pronouns') {
                return (
                    <>
                        <select
                            value={editUser[field]}
                            onChange={(e) => setEditUser({ ...editUser, [field]: e.target.value })}
                        >
                            {pronounsOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <i
                            className="fa-solid fa-check save-button"
                            onClick={() => saveField(field)}
                        ></i>                    </>
                );
            } else {
                return (
                    <>
                        <input
                            type="text"
                            value={editUser[field]}
                            onChange={(e) => setEditUser({ ...editUser, [field]: e.target.value })}
                        />
                        <i
                            className="fa-solid fa-check save-button"
                            onClick={() => saveField(field)}
                        ></i>                    </>
                );
            }
        } else if (field === 'dateJoined') {
            const dateJoined = new Date(user[field]);
            const formattedDate = isNaN(dateJoined)
                ? ''
                : format(dateJoined, 'MMMM do, yyyy');
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
            <div className="activeUser">
                <h2>{user.name}</h2>
                <div className="profileImageWrapper">
                    <img src={profileImage} alt="Profile Picture" />
                </div>
                {!isEditing && (
                    <i
                        className="fa-solid fa-pen edit-icon"
                        style={{ color: '#ababab', cursor: 'pointer' }}
                        onClick={handleEditClick}
                    ></i>
                )}
            </div>

            {isEditing && (
                <>
                    <div className="drag-n-drop" {...getRootProps()}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p>Drop the files here ...</p>
                        ) : (
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        )}
                    </div>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            )}

            <div className="info-group-container">
                {/* Personal Info */}
                <div className="info-group">
                    <h3>Personal Info</h3>
                    <p className="label">Bio:</p>
                    {renderField('bio')}
                    <p className="label">Pronouns:</p>
                    {renderField('pronouns')}
                </div>

                {/* Account Details */}
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
                    {/* Avatar Editor */}
                    {isEditing && formImage && (
                        <div>
                            <AvatarEditor
                                ref={setEditorRef}
                                image={formImage}
                                width={150}
                                height={150}
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
                            {imageSelected && <button type="submit">Save Photo</button>} {/* Show the save button only if an image is selected */}
                        </div>
                    )}
                </form>
            </section>
            <button className="delete-button" onClick={handleDelete}>
                Delete User
            </button>
        </div>
    );



};


export default Profile;