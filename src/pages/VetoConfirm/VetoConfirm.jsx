import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './VetoConfirm.css';
import useBills from '../../hooks/useBills';
import useRandomBillId from '../../hooks/useRandomBillId';

export default function VetoConfirm() {
    const { billName } = useParams();
    const bills = useBills();
    const [randomBillId, setRandomBillId] = useRandomBillId(bills);

    return (
        <div className="veto-confirm-container">
            <div className="confirm-card">
                <h1>Thanks for Voting!</h1>
                <p>You voted to veto {billName}</p>
                <p>Make your voice heard and vote again!</p>
                <Link to={`/bill/${randomBillId}`} className="random-vote-button" onClick={setRandomBillId}>
                    Vote on a another bill
                </Link>
            </div>
        </div>
    );
}
