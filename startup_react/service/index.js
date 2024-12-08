import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { peerProxy } from './peerProxy.js';

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

let users = {}; // Users: { email: { password, token } }
let scores = []; // Scores: [{ user, score, difficulty, timeLeft, date }]

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve static files from "public"

// Router setup
const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('/auth/create', (req, res) => {
  const { email, password } = req.body;

  if (users[email]) {
    return res.status(409).send({ msg: 'User already exists' });
  }

  const token = uuidv4();
  users[email] = { password, token };
  console.log(`User created: ${email}`);
  res.status(201).send({ token });
});

apiRouter.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users[email];

  if (user && user.password === password) {
    const token = uuidv4(); // Generate a new token
    users[email].token = token; // Update the token in memory
    console.log(`User logged in: ${email}`);
    return res.status(200).send({ token });
  }

  res.status(401).send({ msg: 'Invalid email or password' });
});
// Submit a new score
apiRouter.post('/score', (req, res) => {
  const { user, score, difficulty, timeLeft } = req.body;

  if (!user) {
    return res.status(400).send({ msg: 'User is required to submit a score' });
  }

  scores.push({
    user: user || 'Anonymous',
    score,
    difficulty,
    timeLeft,
    date: new Date().toISOString(),
  });

  scores.sort((a, b) => b.score - a.score || b.timeLeft - a.timeLeft);

  if (scores.length > 9) {
    scores.length = 9;
  }

  console.log(`Score submitted by ${user}: ${score}`);
  res.status(200).send(scores);
});

apiRouter.get('/scores', (_req, res) => {
  res.status(200).send(scores);
});

apiRouter.post('/auth/logout', (req, res) => {
  const { token } = req.body;

  const user = Object.keys(users).find((email) => users[email].token === token);
  if (user) {
    delete users[user].token; // Remove the token
    console.log(`User logged out: ${user}`);
    return res.status(200).send({ msg: 'Logged out successfully' });
  }

  res.status(401).send({ msg: 'Invalid token' });
});

// Serve the React app for unknown routes
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Start the server and WebSocket
peerProxy(app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}));
 filler
filler

filler
fillerfillerfillerfiller

fillerfiller
filler

filler
filler
filler
filler
filler
