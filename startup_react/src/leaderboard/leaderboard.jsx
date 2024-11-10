import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './leaderboard.css';

export function Leaderboard() {
  const navigate = useNavigate();

  return (
    <main className="container">
      <div className="row">
        <div className="col-md-8">
          <h2>Leaderboard</h2>
          <table className="leaderboard table">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Points</th>
                <th>Account Created</th>
              </tr>
            </thead>
            {/* <tbody>
              {leaderboardData.map((user, index) => (
                <tr key={index}>
                  <td>{user.rank}</td>
                  <td>{user.username}</td>
                  <td>{user.points}</td>
                  <td>{user.created}</td>
                </tr>
              ))}
            </tbody> */}
          </table>
        </div>

        <div className="col-md-4">
          <div className="rec-box">
            <h4>Recommended Quizzes</h4>
            <ul className="recquiz list-group">
              <li className="recquiz list-group-item">
                <button
                  className="btn"
                  onClick={() => navigate('/quiz/seven-years-war')}
                >
                  The Seven Years' War
                </button>
              </li>
              <li className="recquiz list-group-item">
                <button
                  className="btn"
                  onClick={() => navigate('/quiz/napoleon')}
                >
                  Napoleon Bonaparte
                </button>
              </li>
              <li className="recquiz list-group-item">
                <button
                  className="btn"
                  onClick={() => navigate('/quiz/monarchs-france')}
                >
                  Monarchs of France
                </button>
              </li>
              <li className="recquiz list-group-item">
                <button
                  className="btn"
                  onClick={() => navigate('/quiz/american-revolution')}
                >
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

export default Leaderboard;
