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
    localStorage.removeItem('userName');
    localStorage.removeItem('userToken');
    localStorage.removeItem('creationDate');
    setUserName('');
    setAuthState(AuthState.Unauthenticated);
    setBestScore(0);
    setBestTime(null);
    setCreationDate('');
  };

  const fetchScores = async () => {
    try {
      const response = await fetch('/api/scores');
      if (response.ok) {
        const data = await response.json();

        const userScores = data.filter((score) => score.user === userName);
        const highestScore = userScores.reduce((max, score) => (score.score > max ? score.score : max), 0);
        const fastestTime = userScores.reduce(
          (min, score) => (min === null || score.timeLeft > min ? score.timeLeft : min),
          null
        );

        setBestScore(highestScore);
        setBestTime(fastestTime);
      } else {
        console.error('Failed to fetch scores:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching scores:', error);
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
        clearUserData();
        localStorage.setItem('userName', email);
        localStorage.setItem('userToken', data.token);
        setUserName(email);
        setAuthState(AuthState.Authenticated);
        const currentDate = new Date().toLocaleDateString();
        localStorage.setItem('creationDate', currentDate);
        setCreationDate(currentDate);
        await fetchScores();
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
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
      console.error('Error creating account:', error);
    }
  };

  const handleLogout = () => {
    clearUserData();
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
                    <td>{bestScore}</td>
                    <td>{bestTime !== null ? `${60 - bestTime}s` : 'N/A'}</td>
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
