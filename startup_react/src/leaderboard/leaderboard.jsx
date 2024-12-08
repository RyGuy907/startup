import React, { useEffect, useState } from 'react';
import './leaderboard.css';

export function Leaderboard() {
  const [scores, setScores] = useState(() => {
    const storedScores = localStorage.getItem('scores');
    return storedScores ? JSON.parse(storedScores) : [];
  });

  const userName = localStorage.getItem('userName') || 'Anonymous';
  const creationDate = localStorage.getItem('creationDate') || new Date().toLocaleDateString();

  const fetchScores = async () => {
    try {
      const response = await fetch('/api/scores');
      if (response.ok) {
        const data = await response.json();
        const enrichedScores = data.map((score) => ({
          ...score,
          username: score.username || userName,
          date: score.date || creationDate,
        }));
        setScores(enrichedScores);
        localStorage.setItem('scores', JSON.stringify(enrichedScores));
      } else {
        console.error('Failed to fetch scores:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  useEffect(() => {
    const socket = new WebSocket(
      `${window.location.origin.replace(/^http/, 'ws')}/ws`
    );

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'updateScores') {
        const enrichedScores = message.data.map((score) => ({
          ...score,
          username: score.username || userName,
          date: score.date || creationDate,
        }));
        setScores(enrichedScores);
        localStorage.setItem('scores', JSON.stringify(enrichedScores));
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => socket.close();
  }, [userName, creationDate]);

  const scoreRows = scores.length
    ? scores
        .slice() // Create a copy to avoid mutating state
        .sort((a, b) => b.score - a.score) // Sort by score in descending order
        .map((score, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{score.username}</td>
            <td>{score.score + 1}</td> {/* Display score + 1 */}
            <td>{score.date}</td>
          </tr>
        ))
    : [
        <tr key="0">
          <td colSpan="4">Be the first to score!</td>
        </tr>,
      ];

  return (
    <main className="container-fluid bg-secondary text-center">
      <h1>Leaderboard</h1>
      <table className="table table-warning table-striped-columns">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{scoreRows}</tbody>
      </table>
    </main>
  );
}

export default Leaderboard;
