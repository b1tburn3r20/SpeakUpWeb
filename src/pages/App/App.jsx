import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import UpcomingBills from '../UpcomingBills/UpcomingBills';
import BillDetails from '../BillDetails/BillDetails';
import VetoConfirm from '../VetoConfirm/VetoConfirm';
import PassConfirm from '../PassConfirm/PassConfirm';
import Footer from '../../components/Footer/Footer';
import UserProfile from '../UserProfile/UserProfile';
import Home from '../Home/Home';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [bills, setBills] = useState([]);

  useEffect(() => {
    if (user) {
      fetch('/api/bills/upcoming-bills', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        credentials: 'include',
      })
        .then(response => response.json())
        .then(data => setBills(data))
        .catch((error) => console.error('Error:', error));
    }
  }, [user]);

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} bills={bills} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:userId" element={<UserProfile user={user} />} />
            <Route path="/bill/:billId" element={<BillDetails user={user} />} />
            <Route path="/upcoming-bills" element={<UpcomingBills userId={user._id} />} />
            <Route path="/veto-confirm/:billName" element={<VetoConfirm />} />
            <Route path="/pass-confirm/:billName" element={<PassConfirm />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
      <Footer />
    </main>
  );
}
