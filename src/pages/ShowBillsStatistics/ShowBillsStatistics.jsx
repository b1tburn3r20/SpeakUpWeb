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
        totalVotes: 0,
        turnout: 0
    });
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const billStats = await billsAPI.getBillStats(billId);
                console.log("Bill Stats:", billStats);
                setBill(billStats);

                const userStats = await billsAPI.getBillUserStats(billId);
                console.log("User Stats:", userStats);
                setTotalUsers(userStats.totalUsers);

                const passCount = billStats.pass.length;
                const vetoCount = billStats.veto.length;
                const totalVotes = passCount + vetoCount;
                const turnout = totalVotes / userStats.totalUsers;

                setVotingData({
                    passCount,
                    vetoCount,
                    totalVotes,
                    turnout
                });
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, [billId]);

    // Create graph data and options based on votingData
    const voteOption = {
        title: {
            text: 'Vote Comparison'
        },
        tooltip: {},
        legend: {
            data: ['Pass', 'Veto']
        },
        xAxis: {
            data: ["Pass", "Veto"]
        },
        yAxis: {},
        series: [{
            name: 'Votes',
            type: 'bar',
            data: [votingData.passCount, votingData.vetoCount]
        }]
    };

    const turnoutOption = {
        title: {
            text: 'Voting Turnout',

        },
        tooltip: {},
        legend: {
            orient: 'vertical',
            top: 50, // Adjust this value to fit your needs
            left: 10,
            data: ['Voted', 'Did Not Vote']
        },
        series: [{
            name: 'Voters',
            type: 'pie',
            radius: '50%',
            data: [
                { value: votingData.totalVotes, name: 'Voted' },
                { value: totalUsers - votingData.totalVotes, name: 'Did Not Vote' },
            ]
        }]
    };

    if (!bill || !votingData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bill-stats-container">
            <div className="flex-container">
                <div className="card-container" style={{ width: '60%', float: 'left' }}>
                    <Card
                        bill_name={bill.bill_name}
                        summary={bill.summary}
                        tags={bill.tags}
                        helps={bill.helps}
                        hurts={bill.hurts}
                    />
                </div>
                <div className="chart-container" style={{ width: '65%', float: 'right', display: 'flex', flexDirection: 'column', borderRadius: 15, marginRight: 50, paddingRight: 0, paddingLeft: 20, paddingTop: 15, }}>
                    <ReactECharts
                        option={voteOption}
                        notMerge={true}
                        lazyUpdate={true}
                        theme={"theme_name"}
                        style={{ height: '250px', width: '100%' }}
                    />
                    <ReactECharts
                        option={turnoutOption}
                        notMerge={true}
                        lazyUpdate={true}
                        theme={"theme_name"}
                        style={{ height: '250px', width: '100%' }}
                    />
                </div>
            </div>
        </div>
    );
}
