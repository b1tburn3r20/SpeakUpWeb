import React, { useEffect, useState } from 'react';
import 'aos/dist/aos.css';
import Card from '../../components/Card/Card';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import './BillStatistics.css';
import * as billsAPI from '../../utilities/billUtils';

export default function BillStatistics() {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const billStats = await billsAPI.getBillsStats();
                console.log(billStats[0]); // Logs the first bill object

                setBills(billStats);
            } catch (error) {
                console.error('Error:', error);
                setBills([]);
            } finally {
                setLoading(false);
            }
        }


        fetchData();
    }, []);



    return (
        <div className="bill-stats">
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
                    <h1 className='page-title' data-aos="fade">Bill Statistics</h1>
                    <div className="bills-list">
                        {bills.map((bill) => (
                            <Link to={`/bill-statistics/${bill._id}`} key={bill._id}>
                                <Card
                                    bill_name={bill.bill_name}
                                    showHelpsAndHurts={false}
                                    className="fade-in"
                                    data-aos="fade-in"
                                    data-aos-duration="1000"
                                />
                            </Link>

                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
