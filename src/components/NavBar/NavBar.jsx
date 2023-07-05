import { Link, useRef } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as userService from '../../utilities/users-service';
import './NavBar.css';
import useBills from '../../hooks/useBills';
import useRandomBillId from '../../hooks/useRandomBillId';
import DarkModeToggle from 'react-dark-mode-toggle';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function NavBar({ user, setUser, isDarkMode, setIsDarkMode }) {
  const bills = useBills();
  const [randomBillId, setRandomBillId] = useRandomBillId(bills);
  const [showDropdown, setShowDropdown] = useState(false);

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest('.user-dropdown')) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  useEffect(() => {
    document.body.dataset.theme = isDarkMode ? "dark" : "light";
    document.body.style.transition = 'all 1s';
    AOS.init({ disable: 'mobile' });
  }, [isDarkMode]);

  return (
    <nav className={`navbar ${isDarkMode ? 'dark-mode' : ''}`} data-aos="fade-down" data-aos-duration="500">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/upcoming-bills" className="nav-link">Upcoming Bills</Link>
      <Link to={`/bill/${randomBillId}`} className="nav-link" onClick={setRandomBillId}>Vote</Link>
      <Link to={`/bill-statistics`} className="nav-link">Statistics Page</Link>
      <span className="spacer"></span>
      <div className="user-dropdown" onClick={() => setShowDropdown(!showDropdown)}>
        <p className='wlcmsg'>Welcome</p> <span className="welcome-msg">{user.name}</span>
        <div className={`dropdown-options ${showDropdown ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
          <Link to="/my-votes" className="dropdown-option">My Votes</Link> {/* Updated link */}
          <Link to="/profile" className="dropdown-option">Profile</Link>
          <DarkModeToggle
            onChange={() => {
              setIsDarkMode(prevMode => !prevMode);
              if (localStorage.getItem('isDarkMode') === 'true') {
                localStorage.removeItem('theme');
                localStorage.removeItem('isDarkMode');
              } else {
                localStorage.setItem('theme', 'dark');
                localStorage.setItem('isDarkMode', true);
              }
            }}
            checked={isDarkMode}
            size={60}
          />

        </div>
      </div>
      <Link to="" className="nav-link logout" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}