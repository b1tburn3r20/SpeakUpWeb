import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import axios from 'axios'; // Import axios for making HTTP requests

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(true);

  // Function to set the JWT token in the request header
  const setAuthHeader = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  return (
    <main className="auth-page">
      <h1 className="auth-heading">SpeakUp</h1>
      {showSignUp ? (
        <>
          <LoginForm setUser={setUser} setAuthHeader={setAuthHeader} />
          <p className="signup-text">
            New to SpeakUp?
            <button className="signup-link" onClick={() => setShowSignUp(false)}>Sign Up</button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm setUser={setUser} setAuthHeader={setAuthHeader} />
          <p className="login-text">
            Already a User?
            <button className="login-link" onClick={() => setShowSignUp(true)}>Login</button>
          </p>
        </>
      )}
    </main>
  );
}
