const express = require('express')
const cors = require ('cors')
const app = express()
const mediaService = require('./service/mediaService')

app.use(cors())
app.use(express.json())
app.get('/', (req, res) => res.send('Hello World!'))

const port = process.env.PORT || 3000;

app.get('/media-list', async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
  try {
    const mediaList= await mediaService.getMediaList();
    res.send(JSON.stringify(mediaList));
  } catch (err) {
    next(err);
  }
});

app.post('/media-add', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const mediaList= await mediaService.addMedia(req.body.resourceId);
    res.send(JSON.stringify(mediaList));
  } catch (err) {
    next(err);
  }
});

app.delete('/media-delete', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const mediaList= await mediaService.deleteMedia(req.query.id);
    res.send(JSON.stringify(mediaList));
  } catch (err) {
    next(err);
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))