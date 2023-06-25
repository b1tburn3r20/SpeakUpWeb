import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import { useEffect, useState } from 'react';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  const [bills, setBills] = useState([]);
  const [randomBillId, setRandomBillId] = useState(null);
  const [hasClickedVote, setHasClickedVote] = useState(false);

  useEffect(() => {
    fetch('/api/summaries')
      .then(response => response.json())
      .then(data => {
        setBills(data);
        if (!hasClickedVote && data.length > 0) {
          const initialRandomBillId = getRandomBillId(data);
          setRandomBillId(initialRandomBillId);
          setHasClickedVote(true);
        }
      });
  }, []);

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  function getRandomBillId(billsData) {
    const randomIndex = Math.floor(Math.random() * billsData.length);
    return billsData[randomIndex]._id;
  }

  function handleClickVote() {
    const newRandomBillId = getRandomBillId(bills);
    setRandomBillId(newRandomBillId);
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/upcoming-bills" className="nav-link">Upcoming Bills</Link>
      <Link to={`/bill/${randomBillId}`} className="nav-link" onClick={handleClickVote}>Vote</Link>
      <span className="spacer"></span>
      <span className="welcome-msg">Welcome, {user.name}</span>
      <Link to="" className="nav-link logout-link" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}
