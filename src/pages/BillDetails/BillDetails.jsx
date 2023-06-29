import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import './BillDetails.css';

function BillDetails({ user }) {
    const { billId } = useParams();
    const navigate = useNavigate();
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
        })
            .then(response => response.json())
            .then(data => {
                // Update state if needed
                navigate(`/${vote}-confirm/${billData.pdf_name}`); // Redirect to PassConfirm or VetoConfirm
            });
    }

    if (!billData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bill-details-container">
            <div className="flex-container">
                <button className="veto-button" onClick={() => handleVote('veto')}>
                    Reject
                </button>
                <div className="card-container">
                    <Card
                        bill_name={billData.bill_name}
                        summary={billData.summary}
                        tags={billData.tags}
                        helps={billData.helps}
                        hurts={billData.hurts}
                        showDetails={true}
                    />
                </div>


                <button className="pass-button" onClick={() => handleVote('pass')}>
                    Approve
                </button>
            </div>
        </div>
    );
}

export default BillDetails;