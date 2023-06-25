// src/pages/UpcomingBills/UpcomingBills.jsx

import { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';

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
      {bills.map((bill, index) => (
        <Card key={index} name={bill.pdf_name} summary={bill.summary} />
      ))}
    </div>
  );
}
