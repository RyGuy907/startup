import React from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

export function Profile() {
  const navigate = useNavigate();

  const userProfile = {
    rank: 1,
    username: 'jag_alskar_surstromming',
    points: 523,
    created: 'May 20, 2024',
  };

  return (
    <main className="container">
      <div className="row">
        <div className="col-md-8">
          <h2>Login or Create an Account</h2>
          <div className="mb-3">
            <label htmlFor="email" className="label">E-mail:</label>
            <input type="email" id="email" name="email" placeholder="email" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="label">Password:</label>
            <input type="password" id="password" name="password" placeholder="password" className="form-control" />
          </div>
          <button type="button" className="btn btn-primary me-2">Login</button>
          <button type="button" className="btn btn-secondary">Create Account</button>
          <hr />

          <h2>Your Profile</h2>
          <table className="user_data table">
            <thead>
              <tr>
                <th>Ranking</th>
                <th>Username</th>
                <th>Total Points</th>
                <th>Account Created</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userProfile.rank}</td>
                <td>{userProfile.username}</td>
                <td>{userProfile.points}</td>
                <td>{userProfile.created}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="col-md-4">
          <div className="rec-box">
            <h4>Recommended Quizzes</h4>
            <ul className="recquiz list-group">
              <li className="recquiz list-group-item">
                <button className="btn w-100" onClick={() => navigate('/quiz/seven-years-war')}>
                  The Seven Years' War
                </button>
              </li>
              <li className="recquiz list-group-item">
                <button className="btn w-100" onClick={() => navigate('/quiz/napoleon')}>
                  Napoleon Bonaparte
                </button>
              </li>
              <li className="recquiz list-group-item">
                <button className="btn w-100" onClick={() => navigate('/quiz/monarchs-france')}>
                  Monarchs of France
                </button>
              </li>
              <li className="recquiz list-group-item">
                <button className="btn w-100" onClick={() => navigate('/quiz/american-revolution')}>
                  The American Revolution
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
