import React, { useEffect, useState } from 'react';
import './leaderboard.css';

export function Leaderboard() {
  const [scores, setScores] = useState([]); // Keep scores in state
  const userName = localStorage.getItem('userName'); // Persistent user-specific data

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch('/api/scores');
        if (response.ok) {
          const data = await response.json();
          setScores(data); // Update state only
        } else {
          console.error('Failed to fetch scores:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores();
  }, []);

  useEffect(() => {
    const socket = new WebSocket(
      `${window.location.origin.replace(/^http/, 'ws')}/ws`
    );

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'updateScores') {
        setScores(message.data); // Update state dynamically
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => socket.close();
  }, []);

  const scoreRows = scores.length
    ? scores.map((score, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{score.user || 'Anonymous'}</td> {/* Use user field */}
          <td>{score.score + 1}</td> {/* Adjust score as needed */}
          <td>{score.date ? new Date(score.date).toLocaleString() : 'N/A'}</td>
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
