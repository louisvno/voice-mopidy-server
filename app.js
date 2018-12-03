const Promise = require('bluebird')
const express = require('express')
const sqlite = require('sqlite')
const cors = require ('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => res.send('Hello World!'))

const port = process.env.PORT || 3000;
const dbPromise = sqlite.open('./database.sqlite', { Promise });

app.get('/track-list', async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
  try {
    const db = await dbPromise;
    const tracks = await db.all('SELECT * FROM tracks');
    console.log(tracks);
    res.send(JSON.stringify(tracks));
  } catch (err) {
    next(err);
  }
});

app.post('/add-track', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
try {
  console.log(req);
  const db = await dbPromise;
  await db.run('INSERT INTO tracks(id,youtubeId) VALUES(?,?)',4, req.body.youtubeId);
  const tracks = await db.all('SELECT * FROM tracks');
  res.send(JSON.stringify(tracks));
} catch (err) {
  next(err);
}
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))