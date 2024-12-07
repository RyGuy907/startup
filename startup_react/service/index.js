import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

let users = {};
let scores = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(express.static('public'));

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
  
      scores = scores.filter(score => score.user === email);
  
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

app.post('/api/auth/create', (req, res) => {
    const { email, password } = req.body;
    if (users[email]) {
      return res.status(409).send({ msg: 'User already exists' });
    }
    const token = uuidv4();
    users[email] = { email, password, token };
    res.status(201).send({ token });
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

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});