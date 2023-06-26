// src/pages/BillDetails/BillDetails.jsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../components/Card/Card';
import './BillDetails.css'; // Import the CSS file

export default function BillDetails({ user }) {
    const { billId } = useParams();
    const [billData, setBillData] = useState(null);

    useEffect(() => {
        fetch(`/api/bills/${billId}`)
            .then(response => response.json())
            .then(data => setBillData(data));
    }, [billId]);

    function handleVote(vote) {
        fetch('/api/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user._id,
                billId: billId,
                vote: vote
            })
        }).then(response => response.json())
            .then(data => {
                // Update state if needed
            });
    }

    if (!billData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bill-details-container">
            <div className="flex-container">
                <button className="veto-button" onClick={() => handleVote('veto')}>
                    Veto
                </button>
                <div className="card-container">
                    <Card name={billData.pdf_name} summary={billData.summary} />
                </div>
                <button className="pass-button" onClick={() => handleVote('pass')}>
                    Pass
                </button>
            </div>
        </div>
    );
}