import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';
import './UpcomingBills.css';
import * as billsAPI from '../../utilities/billUtils'

export default function UpcomingBills({ }) { // Assume userId is passed in props
  const [bills, setBills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const billsPerPage = 9;

  useEffect(function () {
    async function getMyBills() {
      const myBills = await billsAPI.getAllBills()
      setBills(myBills)
      console.log(myBills)
    }
    getMyBills()
  }, []);


  // const indexOfLastBill = currentPage * billsPerPage;
  // const indexOfFirstBill = indexOfLastBill - billsPerPage;
  // const currentBills = bills.slice(indexOfFirstBill, indexOfLastBill);

  // const goToNextPage = () => {
  //   setCurrentPage(prevPage => prevPage + 1);
  // };

  // const goToPreviousPage = () => {
  //   setCurrentPage(prevPage => prevPage - 1);
  // };

  return (
    <div className="upcoming-bills">
      <h1 data-aos="fade">What's New?</h1>
      <div className="pagination">
        <button
          className="pagination-chevron"
          disabled={currentPage === 1}
        // onClick={goToPreviousPage}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="pagination-chevron"
        // disabled={indexOfLastBill >= bills.length}
        // onClick={goToNextPage}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      <div className="bills-list">
        {bills.map((bill) => (
          <Link to={`/bill/${bill._id}`} key={bill._id}>
            <Card
              bill_name={bill.bill_name}
              summary={bill.summary}
              tags={bill.tags}
              showHelpsAndHurts={false}
              className="fade-in"
              data-aos="fade-in"
              data-aos-duration="1000"
            />
          </Link>
        ))}
      </div>
    </div>

  );
} 