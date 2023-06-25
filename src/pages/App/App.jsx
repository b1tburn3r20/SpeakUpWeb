
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import UpcomingBills from '../UpcomingBills/UpcomingBills';
import BillDetails from '../BillDetails/BillDetails';
import Home from '../Home/Home';


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
            <Route path="/" element={<Home />} />
            <Route path="/bill/:billId" element={<BillDetails user={user} />} />
            <Route path="/upcoming-bills" element={<UpcomingBills userId={user._id} />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
