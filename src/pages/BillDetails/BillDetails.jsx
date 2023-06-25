import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../components/Card/Card';

export default function BillDetails() {
    const { billId } = useParams();
    const [billData, setBillData] = useState(null);

    useEffect(() => {
        fetch(`/api/bills/${billId}`)
            .then(response => response.json())
            .then(data => setBillData(data));
    }, [billId]);

    if (!billData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Card name={billData.pdf_name} summary={billData.summary} />
        </div>
    );
}
