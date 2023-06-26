// src/components/NavBar/NavBar.jsx
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';
import useBills from '../../hooks/useBills';
import useRandomBillId from '../../hooks/useRandomBillId';

export default function NavBar({ user, setUser }) {
  const bills = useBills();
  const [randomBillId, setRandomBillId] = useRandomBillId(bills);

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/upcoming-bills" className="nav-link">Upcoming Bills</Link>
      <Link to={`/bill/${randomBillId}`} className="nav-link" onClick={setRandomBillId}>Vote</Link>
      <span className="spacer"></span>
      <span className="welcome-msg">Welcome, {user.name}</span>
      <Link to="" className="nav-link logout-link" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}