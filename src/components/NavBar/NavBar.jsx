import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as userService from '../../utilities/users-service';
import './NavBar.css';
import useBills from '../../hooks/useBills';
import useRandomBillId from '../../hooks/useRandomBillId';

export default function NavBar({ user, setUser }) {
  const bills = useBills();
  const [randomBillId, setRandomBillId] = useRandomBillId(bills);
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  return (
    <nav className="navbar" data-aos="fade-down" data-aos-duration="500">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/upcoming-bills" className="nav-link">Upcoming Bills</Link>
      <Link to={`/bill/${randomBillId}`} className="nav-link" onClick={setRandomBillId}>Vote</Link>
      <span className="spacer"></span>
      <div className="user-dropdown" onClick={() => setShowDropdown(!showDropdown)}>
        <span className="welcome-msg">Welcome, {user.name}</span>
        {showDropdown && (
          <div className="dropdown-options">
            <Link to="/sample1" className="dropdown-option">Sample 1</Link>
            <Link to="/sample2" className="dropdown-option">Sample 2</Link>
            <button onClick={toggleTheme} className="dropdown-option">Toggle Dark Mode</button>
          </div>
        )}
      </div>
      <Link to="" className="nav-link logout-link" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}
