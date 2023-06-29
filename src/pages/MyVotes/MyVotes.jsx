import React, { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';
import * as userVotesService from '../../utilities/userVotes-service'; // Replace with your actual user votes service

export default function MyVotes() {
    const [votedBills, setVotedBills] = useState([]);

    useEffect(() => {
        async function getVotedBills() {
            const bills = await userVotesService.getVotedBills(); // Replace with your actual API call
            setVotedBills(bills);
        }
        getVotedBills();
    }, []);

    return (
        <div className="voted-bills">
            <h1>My Voted Bills</h1>
            <div className="bills-list">
                {votedBills.map((bill) => (
                    <Link to={`/bill/${bill._id}`} key={bill._id}>
                        <Card
                            bill_name={bill.bill_name}
                            summary={bill.summary}
                            tags={bill.tags}
                            showHelpsAndHurts={false}
                            className="fade-in"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}
