import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import './BillDetails.css';

function BillDetails({ user }) {
    const { billId } = useParams();
    const navigate = useNavigate();
    const [billData, setBillData] = useState(null);
    const [userVote, setUserVote] = useState(null);

    useEffect(() => {
        fetch(`/api/bills/${billId}`)
            .then(response => response.json())
            .then(data => {
                setBillData(data);
                if (data.pass.includes(user._id)) {
                    setUserVote('pass');
                } else if (data.veto.includes(user._id)) {
                    setUserVote('veto');
                }
            });
    }, [billId, user._id]);

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
                setUserVote(vote);
                navigate(`/${vote}-confirm/${billData.bill_name}`); // Redirect to PassConfirm or VetoConfirm
            });
    }

    if (!billData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bill-details-container">
            <div className="flex-container">
                {!userVote && (
                    <button className="veto-button" onClick={() => handleVote('veto')}>
                        Veto
                    </button>
                )}
                <div className="card-container">
                    <Card
                        bill_name={billData.bill_name}
                        summary={billData.summary}
                        tags={billData.tags}
                        helps={billData.helps}
                        hurts={billData.hurts}
                        showDetails={true}
                        userVote={userVote}
                    />

                </div>
                {!userVote && (
                    <button className="pass-button" onClick={() => handleVote('pass')}>
                        Pass
                    </button>
                )}
            </div>
        </div>
    );

}

export default BillDetails;
