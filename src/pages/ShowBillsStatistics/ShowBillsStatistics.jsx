import React, { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import { useParams } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import * as billsAPI from '../../utilities/billUtils';

import './ShowBillStatistics.css';

export default function ShowBillStatistics() {
    const { billId } = useParams();
    const [bill, setBill] = useState(null);
    const [votingData, setVotingData] = useState({
        passCount: 0,
        vetoCount: 0,
        turnout: 0
    });
    const [totalUsers, setTotalUsers] = useState(0);




    useEffect(() => {
        async function fetchData() {
            try {
                const billStats = await billsAPI.getBillStats(billId);
                console.log(billStats);
                setBill(billStats);

                const userStats = await billsAPI.getBillUserStats(billId);
                setTotalUsers(userStats.totalUsers);

                const passCount = billStats.pass.length;
                const vetoCount = billStats.veto.length;
                const totalVotes = passCount + vetoCount;

                setVotingData({
                    passCount,
                    vetoCount,
                    turnout: totalVotes / userStats.totalUsers
                });

            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, [billId]);


    // Create graph data and options based on votingData
    const option = {
        title: {
            text: 'Voting Statistics'
        },
        tooltip: {},
        legend: {
            data: ['Pass', 'Veto']
        },
        xAxis: {
            data: ["Pass", "Veto", "Turnout"]
        },
        yAxis: {},
        series: [{
            name: 'Votes',
            type: 'bar',
            data: [votingData?.passCount, votingData?.vetoCount, votingData?.turnout]
        }]
    };

    if (!bill || !votingData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bill-stats-container">
            <div className="flex-container">
                <div className="card-container">
                    <Card
                        bill_name={bill.bill_name}
                        summary={bill.summary}
                        tags={bill.tags}
                        helps={bill.helps}
                        hurts={bill.hurts}
                    />
                </div>
                <div className="chart-container">
                    <ReactECharts option={option} />
                </div>
            </div>
        </div>
    );
}
