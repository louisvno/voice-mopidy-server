const Promise = require('bluebird')
const express = require('express')
const sqlite = require('sqlite')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

const port = process.env.PORT || 3000;
const dbPromise = sqlite.open('./database.sqlite', { Promise });

app.get('/post/:id', async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
  try {
    const db = await dbPromise;
    const [post] = await Promise.all([
      db.get('SELECT * FROM department WHERE id = ?', req.params.id),
    ]);
    res.send(JSON.stringify({'post': post}));
  } catch (err) {
    next(err);
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))