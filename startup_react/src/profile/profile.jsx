import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const AuthState = {
  Authenticated: 'Authenticated',
  Unauthenticated: 'Unauthenticated',
};

export function Profile() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [authState, setAuthState] = useState(userName ? AuthState.Authenticated : AuthState.Unauthenticated);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creationDate, setCreationDate] = useState(localStorage.getItem('creationDate') || '');
  const [bestScore, setBestScore] = useState(0);
  const [bestTime, setBestTime] = useState(null);

const clearUserData = () => {
  // Clear user-specific local storage data
  localStorage.removeItem('userName');
  localStorage.removeItem('creationDate');

  // Reset state variables
  setUserName('');
  setBestScore(0);
  setBestTime(null);
  setCreationDate('');
};
  // Fetch scores directly in the component
  const fetchScores = async () => {
    try {
      const response = await fetch('/api/scores', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`, // Include user-specific token if required
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        const highestScore = data.reduce((max, score) => (score.score > max ? score.score : max), 0);
        const fastestTime = data.reduce(
          (min, score) => (min === null || score.timeLeft > min ? score.timeLeft : min),
          null
        );
  
        setBestScore(highestScore);
        setBestTime(fastestTime);
      }
    } catch (error) {
      console.error('Failed to fetch scores:', error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // Clear previous user data
        clearUserData();
  
        // Set new user data
        localStorage.setItem('userName', email);
        setUserName(email);
        setAuthState(AuthState.Authenticated);
  
        const currentDate = new Date().toLocaleDateString();
        localStorage.setItem('creationDate', currentDate);
        setCreationDate(currentDate);
  
        // Re-fetch scores for the new user
        await fetchScores();
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };
  
  const createAccount = async (email, password) => {
    try {
      const response = await fetch('/api/auth/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        alert('Account created successfully. Logging you in...');
        clearUserData();
        await login(email, password);
      } else if (response.status === 409) {
        alert('An account with this email already exists.');
      } else {
        alert('Failed to create account. Please try again.');
      }
    } catch (error) {
      console.error('Failed to create account:', error);
    }
  };

  
  const handleLogout = () => {
    localStorage.clear();
  
    setUserName('');
    setAuthState(AuthState.Unauthenticated);
    setBestScore(0);
    setBestTime(null);
    setCreationDate('');
  
    navigate('/');
  };

  useEffect(() => {
    if (authState === AuthState.Authenticated) {
      fetchScores();
    }
  }, [authState]);

  return (
    <main className="container">
      <div className="row">
        <div className="col-md-8">
          {authState === AuthState.Unauthenticated ? (
            <>
              <h2>Login or Create an Account</h2>
              <div className="mb-3">
                <label htmlFor="email" className="label">E-mail:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="label">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={() => login(email, password)}
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => createAccount(email, password)}
              >
                Create Account
              </button>
            </>
          ) : (
            <>
              <h2>Your Profile</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Best Score</th>
                    <th>Best Time</th>
                    <th>Account Created</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{userName}</td>
                    <td>{bestScore+1}</td>
                    <td>{bestTime !== null ? `${bestTime}s` : 'N/A'}</td>
                    <td>{creationDate}</td>
                  </tr>
                </tbody>
              </table>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
        <div className="col-md-4">
          <h4>Recommended Quizzes</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <button className="btn" onClick={() => navigate('/quiz/seven-years-war')}>
                The Seven Years' War
              </button>
            </li>
            <li className="list-group-item">
              <button className="btn" onClick={() => navigate('/quiz/napoleon')}>
                Napoleon Bonaparte
              </button>
            </li>
            <li className="list-group-item">
              <button className="btn" onClick={() => navigate('/quiz/monarchs-france')}>
                Monarchs of France
              </button>
            </li>
            <li className="list-group-item">
              <button className="btn" onClick={() => navigate('/quiz/american-revolution')}>
                The American Revolution
              </button>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Profile;
