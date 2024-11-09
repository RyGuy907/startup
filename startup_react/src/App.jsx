import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Main } from './main/main';
import { Leaderboard } from './leaderboard/leaderboard';
import { Quiz } from './quiz/french-revolution';
import { Profile } from './profile/profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
  return (
    <BrowserRouter>
      <div className="body">
        <header className="header">
          <h1><strong>Norhog<sup>&reg;</sup></strong></h1>
          <nav>
            <menu className="menu">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/quiz">Quiz</NavLink></li>
              <li><NavLink to="/leaderboard">Leaderboard</NavLink></li>
              <li><NavLink to="/profile">Profile</NavLink></li>
            </menu>
          </nav>
          <hr />
        </header>

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer className="footer">
          <hr />
          <p className="foot">Ryan Russon</p>
          <div class="link-container">
          <a id="link" href="https://github.com/RyGuy907/startup">GitHub</a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}

export default App;
