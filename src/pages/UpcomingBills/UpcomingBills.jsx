import { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';

export default function UpcomingBills() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch('/api/summaries')
      .then(response => response.json())
      .then(data => setBills(data));
  }, []);

  return (
    <div>
      <h1>Bills</h1>
      {bills.map((bill) => (
        <Link to={`/bill/${bill._id}`} key={bill._id}>
          <Card name={bill.pdf_name} summary={bill.summary} />
        </Link>
      ))}
    </div>
  );
}
