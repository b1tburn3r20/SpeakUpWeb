// src/hooks/useRandomBillId.js
import { useState, useEffect } from 'react';

export default function useRandomBillId(bills) {
    const [randomBillId, setRandomBillId] = useState(null);

    function getRandomBillId(billsData) {
        const randomIndex = Math.floor(Math.random() * billsData.length);
        return billsData[randomIndex]._id;
    }

    useEffect(() => {
        if (bills.length > 0) {
            setRandomBillId(getRandomBillId(bills));
        }
    }, [bills]);

    return [randomBillId, () => setRandomBillId(getRandomBillId(bills))];
}
