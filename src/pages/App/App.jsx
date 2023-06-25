import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';
import UpcomingBills from '../UpcomingBills/UpcomingBills';
import BillDetails from '../BillDetails/BillDetails';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch('/api/summaries')
      .then(response => response.json())
      .then(data => setBills(data));
  }, []);

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} bills={bills} />
          <Routes>
            {/* Route components in here */}
            <Route path="/bill/:billId" element={<BillDetails />} />
            <Route path="/upcoming-bills" element={<UpcomingBills userId={user._id} />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
