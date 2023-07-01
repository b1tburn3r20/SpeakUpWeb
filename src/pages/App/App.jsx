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
import Profile from '../Profile/Profile';
import MyVotes from '../MyVotes/MyVotes';
import Home from '../Home/Home';
import Todo from '../Todo/Todo';
import axios from 'axios';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [isDarkMode, setIsDarkMode] = useState(() => JSON.parse(localStorage.getItem('isDarkMode')) || false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    document.body.dataset.theme = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error(error);
      // Handle error cases
    }
  };

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<Todo todos={todos} />} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
            <Route path="/bill/:billId" element={<BillDetails user={user} />} />
            <Route path="/my-votes" element={<MyVotes />} />
            <Route path="/upcoming-bills" element={<UpcomingBills user={user} />} />
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
