import { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';
import './UpcomingBills.css'; // Import the CSS file

export default function UpcomingBills() {
  const [bills, setBills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const billsPerPage = 9;

  useEffect(() => {
    fetch('/api/summaries')
      .then(response => response.json())
      .then(data => setBills(data));
  }, []);

  // Calculate the index range for the current page
  const indexOfLastBill = currentPage * billsPerPage;
  const indexOfFirstBill = indexOfLastBill - billsPerPage;
  const currentBills = bills.slice(indexOfFirstBill, indexOfLastBill);

  // Handle pagination navigation
  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  return (
    <div className="upcoming-bills">
      <h1>Whats New?</h1>
      <div className="pagination">
        <button
          className="pagination-chevron"
          disabled={currentPage === 1}
          onClick={goToPreviousPage}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="pagination-chevron"
          disabled={indexOfLastBill >= bills.length}
          onClick={goToNextPage}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      <div className="bills-list">
        {currentBills.map((bill) => (
          <Link to={`/bill/${bill._id}`} key={bill._id}>
            <Card name={bill.pdf_name} summary={bill.summary} />
          </Link>
        ))}
      </div>
    </div>
  );
}
