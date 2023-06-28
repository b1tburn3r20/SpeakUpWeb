// src/hooks/useBills.js
import { useState, useEffect } from 'react';

export default function useBills() {
    const [bills, setBills] = useState([]);

    useEffect(() => {
        fetch('/api/summaries')
            .then(response => response.json())
            .then(data => {
                setBills(data);
            });
    }, []);

    return bills;
}