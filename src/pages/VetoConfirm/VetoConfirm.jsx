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
        <div className="veto-confirm-wrapper">
            <div className="veto-confirm-container" data-aos="fade-down" data-aos-anchor-placement="top-center">
                <div className="confirm-card">
                    <h1>Thanks for Voting!</h1>
                    <p>You voted to veto "{billName}"</p>
                    <Link to={`/bill/${randomBillId}`} className="random-vote-button" onClick={setRandomBillId}>
                        Vote on another bill
                    </Link>
                </div>
            </div>
        </div>
    );
}
