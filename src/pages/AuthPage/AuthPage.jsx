import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import './AuthPage.css'; // Import your custom stylesheet for the AuthPage

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(true);

  return (
    <main className="auth-page">
      <h1 className="auth-heading">SpeakUp</h1>
      {showSignUp ? (
        <>
          <LoginForm setUser={setUser} />
          <p className="signup-text">
            New to SpeakUp?
            <button className="signup-link" onClick={() => setShowSignUp(false)}>Sign Up</button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm setUser={setUser} />
          <p className="login-text">
            Already a User?
            <button className="login-link" onClick={() => setShowSignUp(true)}>Login</button>
          </p>
        </>
      )}
    </main>
  );
}
