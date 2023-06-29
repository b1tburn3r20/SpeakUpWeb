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
import Home from '../Home/Home';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [isDarkMode, setIsDarkMode] = useState(() => JSON.parse(localStorage.getItem('isDarkMode')) || false);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    document.body.dataset.theme = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} bills={bills} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bill/:billId" element={<BillDetails user={user} />} />
            <Route path="/upcoming-bills" element={<UpcomingBills />} />
            <Route path="/veto-confirm/:billName" element={<VetoConfirm />} />
            <Route path="/pass-confirm/:billName" element={<PassConfirm />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
