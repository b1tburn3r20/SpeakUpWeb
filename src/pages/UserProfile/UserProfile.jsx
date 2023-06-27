// pages/UserProfile/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserProfile() {
    const [user, setUser] = useState({});
    const { userId } = useParams();

    useEffect(() => {
        fetch(`/api/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => setUser(data));
    }, [userId]);

    return (
        <div>
            <h1>{user.name}</h1>
            <h3>{user.email}</h3>
            <h2>Votes</h2>
            {user.votes?.map(vote => (
                <div key={vote._id}>
                    <p>Summary ID: {vote.summary}</p>
                    <p>Vote: {vote.vote}</p>
                </div>
            ))}
        </div>
    );
}

export default UserProfile;
