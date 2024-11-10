import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

// Define AuthState values
const AuthState = {
  Authenticated: 'Authenticated',
  Unauthenticated: 'Unauthenticated'
};

export function Profile() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [authState, setAuthState] = useState(userName ? AuthState.Authenticated : AuthState.Unauthenticated);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creationDate, setCreationDate] = useState(localStorage.getItem('creationDate') || '');
  const [bestScore, setBestScore] = useState(localStorage.getItem('bestScore') || 0);
  const [bestTime, setBestTime] = useState(localStorage.getItem('bestTime') || '');


  useEffect(() => {
    const StorageChange = () => {
      setBestScore(localStorage.getItem('bestScore') || 0);
      setBestTime(localStorage.getItem('bestTime') || 'N/A');
    };
    window.addEventListener('storage', StorageChange);

    return () => {
      window.removeEventListener('storage', StorageChange);
    };
  }, []);

  const login = () => {
    if (email && password) {
      localStorage.setItem('userName', email);
      setUserName(email);
      if (!localStorage.getItem('creationDate')) {
        const currentDate = new Date().toLocaleDateString();
        localStorage.setItem('creationDate', currentDate);
        setCreationDate(currentDate);
      } else {
        setCreationDate(localStorage.getItem('creationDate'));
      }

      setAuthState(AuthState.Authenticated);
      setEmail('');
      setPassword('');
    }
  };

  const logout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('creationDate');
    setUserName('');
    setAuthState(AuthState.Unauthenticated);
    localStorage.setItem('bestScore', 0);
    localStorage.setItem('bestTime', '');
    setBestScore=0
    setBestTime=""
  };


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
                  placeholder="email"
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
                  placeholder="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="button" className="btn btn-primary me-2" onClick={login}>Login</button>
              <button type="button" className="btn btn-secondary">Create Account (WIP)</button>
            </>
          ) : (
            <>
              <h2>Your Profile</h2>
              <table className="user_data table">
                <thead>
                  <tr>
                    <th>Ranking</th>
                    <th>Username</th>
                    <th>Best Score</th>
                    <th>Best Time</th>
                    <th>Account Created</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>N/A</td>
                    <td>{userName}</td>
                    <td>{bestScore}</td>
                    <td>0:{bestTime}</td>
                    <td>{creationDate || 'N/A'}</td>
                  </tr>
                </tbody>
              </table>
              <button className="btn btn-danger" onClick={logout}>Logout</button>
              </>
            )}
          <hr />
        </div>

        <div className="col-md-4">
          <div className="rec-box">
            <h4>Recommended Quizzes</h4>
            <ul className="recquiz list-group">
              <li className="recquiz list-group-item">
                <button className="btn" onClick={() => navigate('/quiz/seven-years-war')}>The Seven Years' War</button>
              </li>
              <li className="recquiz list-group-item">
                <button className="btn" onClick={() => navigate('/quiz/napoleon')}>Napoleon Bonaparte</button>
              </li>
              <li className="recquiz list-group-item">
                <button className="btn" onClick={() => navigate('/quiz/monarchs-france')}>Monarchs of France</button>
              </li>
              <li className="recquiz list-group-item">
                <button className="btn" onClick={() => navigate('/quiz/american-revolution')}>The American Revolution</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
