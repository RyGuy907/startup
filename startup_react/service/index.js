// import express from 'express';
// import { v4 as uuidv4 } from 'uuid';
// import { peerProxy } from './peerProxy.js';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const app = express();

// let users = {};
// let scores = [];

// const port = process.argv.length > 2 ? process.argv[2] : 4000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static('public')); // Serve static files from "public"

// // Serve "index.html" from the correct directory
// app.use((_req, res) => {
//   res.sendFile('index.html', { root: 'public' });
// });


// const apiRouter = express.Router();
// app.use('/api', apiRouter);

// // API routes
// apiRouter.post('/auth/create', (req, res) => {
//   const { email, password } = req.body;
//   if (users[email]) {
//     return res.status(409).send({ msg: 'User already exists' });
//   }
//   const token = uuidv4();
//   users[email] = { email, password, token };
//   res.send({ token });
// });

// apiRouter.post('/auth/login', (req, res) => {
//   const { email, password } = req.body;
//   const user = users[email];

//   if (user && user.password === password) {
//     user.token = uuidv4();
//     scores = scores.filter((score) => score.user === email);
//     res.send({ token: user.token });
//   } else {
//     res.status(401).send({ msg: 'Invalid credentials' });
//   }
// });

// apiRouter.delete('/auth/logout', (req, res) => {
//   const user = Object.values(users).find((u) => u.token === req.body.token);
//   if (user) {
//     delete user.token;
//     res.status(204).end();
//   } else {
//     res.status(401).send({ msg: 'Unauthorized' });
//   }
// });

// apiRouter.get('/scores', (_req, res) => {
//   res.send(scores);
// });

// apiRouter.post('/score', (req, res) => {
//   const { difficulty, score, timeLeft } = req.body;

//   scores.push({ difficulty, score, timeLeft });
//   scores.sort((a, b) => b.score - a.score || b.timeLeft - a.timeLeft);
//   if (scores.length > 9) {
//     scores.length = 9;
//   }

//   res.send(scores);
// });

// // Serve the frontend
// app.use((_req, res) => {
//   res.sendFile('index.html', { root: 'public' });
// });

// // Start the server and WebSocket
// const httpService = app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

// peerProxy(httpService); // Initialize WebSocket server
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { peerProxy } from './peerProxy.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let users = {};
let scores = [];

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.resolve(__dirname, 'public'))); // Serve static files

// API routes
const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('/auth/create', (req, res) => {
  const { email, password } = req.body;
  if (users[email]) {
    return res.status(409).send({ msg: 'User already exists' });
  }
  const token = uuidv4();
  users[email] = { email, password, token };
  res.send({ token });
});

apiRouter.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users[email];

  if (user && user.password === password) {
    user.token = uuidv4();
    scores = scores.filter((score) => score.user === email);
    res.send({ token: user.token });
  } else {
    res.status(401).send({ msg: 'Invalid credentials' });
  }
});

apiRouter.delete('/auth/logout', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
    res.status(204).end();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

apiRouter.get('/scores', (_req, res) => {
  res.send(scores);
});

apiRouter.post('/score', (req, res) => {
  const { difficulty, score, timeLeft } = req.body;

  scores.push({ difficulty, score, timeLeft });
  scores.sort((a, b) => b.score - a.score || b.timeLeft - a.timeLeft);
  if (scores.length > 9) {
    scores.length = 9;
  }

  res.send(scores);
});

// Serve SPA
app.use((_req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// app.use((_req, res) => {
//   res.sendFile(path.resolve(__dirname, '../index.html')); // Main directory for local
// });

// Start the server and WebSocket
const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);
