// src/pages/BillDetails/BillDetails.jsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../components/Card/Card';

export default function BillDetails({ user }) { // add user prop
    const { billId } = useParams();
    const [billData, setBillData] = useState(null);

    useEffect(() => {
        fetch(`/api/bills/${billId}`)
            .then(response => response.json())
            .then(data => setBillData(data));
    }, [billId]);

    function handleVote(vote) { // move inside BillDetails
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
                // update state if needed
            });
    }

    if (!billData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Card name={billData.pdf_name} summary={billData.summary} />
            <button onClick={() => handleVote('pass')}>Pass</button>
            <button onClick={() => handleVote('veto')}>Veto</button>
        </div>
    );
}
