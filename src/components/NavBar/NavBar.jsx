import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css'; // Import the CSS file

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/upcoming-bills" className="nav-link">Upcoming Bills</Link>
      <span className="spacer"></span>
      <span className="welcome-msg">Welcome, {user.name}</span>
      <Link to="" className="nav-link logout-link" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}
