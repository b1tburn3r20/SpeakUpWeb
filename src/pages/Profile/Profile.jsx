import React, { useState } from 'react';
import './Profile.css';
import { format } from 'date-fns';
import axios from 'axios';
import { userDropzone } from 'react-dropzone'

const Profile = ({ user, setUser }) => {
    const [editingFields, setEditingFields] = useState({
        bio: false,
        dateJoined: false,
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
                '/profile',
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
                    <i
                        className="fa-solid fa-pen"
                        style={{ color: '#ababab', cursor: 'pointer' }}
                        onClick={() => editField(field)}
                    ></i>
                </>
            );
        }
    };

    return (
        <div className="profile-card">
            <h2>{user.name}</h2>
            <p className="label">Email:</p>
            {renderField('email')}
            <p className="label">Bio:</p>
            {renderField('bio')}
            <p className="label">Pronouns:</p>
            {renderField('pronouns')}
            <p className="label">Bills voted on:</p>
            <div>{user.votes ? user.votes.length : 0}</div>
            <p className="label">Date Joined:</p>
            {renderField('dateJoined')}
        </div>
    );
};

export default Profile;