import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './PassConfirm.css';
import useBills from '../../hooks/useBills';
import useRandomBillId from '../../hooks/useRandomBillId';

export default function PassConfirm() {
    const { billName } = useParams();
    const bills = useBills();
    const [randomBillId, setRandomBillId] = useRandomBillId(bills);

    return (
        <div className="pass-confirm-container" data-aos="fade-down"
            data-aos-anchor-placement="top-center">
            <div className="confirm-card">
                <h1>Thanks for Voting!</h1>
                <p>You voted to pass {billName}</p>
                <p>Make your voice heard and vote again!</p>
                <Link to={`/bill/${randomBillId}`} className="random-vote-button" onClick={setRandomBillId}>
                    Vote on a another bill
                </Link>
            </div>
        </div>
    );
}