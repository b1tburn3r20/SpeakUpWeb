import React, { useEffect, useState } from 'react';
import 'aos/dist/aos.css';
import Card from '../../components/Card/Card';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import './UpcomingBills.css';
import * as billsAPI from '../../utilities/billUtils';

export default function UpcomingBills({ user }) {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const billsPerPage = 9;

  useEffect(() => {
    async function fetchData() {
      const billsWithUserVotes = await billsAPI.getAllBillsWithUserVotes(user._id);
      console.log(billsWithUserVotes);
      setBills(billsWithUserVotes);
      setLoading(false);
    }
    fetchData();
  }, [user._id]);

  const indexOfLastBill = currentPage * billsPerPage;
  const indexOfFirstBill = indexOfLastBill - billsPerPage;
  const currentBills = bills.slice(indexOfFirstBill, indexOfLastBill);

  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  return (
    <div className="upcoming-bills">
      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          height: '100vh',
          paddingTop: '200px'
        }}>
          <ReactLoading type="spin" color="#207adf" height={'10%'} width={'10%'} />
        </div>
      ) : (
        <>
          <h1 className='page-title' data-aos="fade">Upcoming Bills</h1>
          <div className="pagination">
            <button
              className="pagination-chevron"
              onClick={goToPreviousPage}
              style={{ visibility: currentPage > 1 ? 'visible' : 'hidden' }}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              className="pagination-chevron"
              onClick={goToNextPage}
              style={{ visibility: indexOfLastBill < bills.length ? 'visible' : 'hidden' }}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          <div className="bills-list">
            {currentBills.map((bill) => {
              console.log(bill.userVote);
              return (
                <Link to={`/bill/${bill._id}`} key={bill._id}>
                  <Card
                    bill_name={bill.bill_name}
                    summary={bill.summary}
                    tags={bill.tags}
                    userVote={bill.userVote}
                    showHelpsAndHurts={false}
                    className="fade-in"
                    data-aos="fade-in"
                    data-aos-duration="1000"
                  />
                </Link>
              )
            })}
          </div>
        </>
      )}
    </div>
  );
}
