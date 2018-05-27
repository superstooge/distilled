const express = require('express')
const app = express()
const fetch = require('node-fetch');
app.listen(3001, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('proxy server started: running on port 3001');
    return;
  }
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('*', async (req, res) => {
  let url = req.url.split('/proxy/').join('')
  console.log('fetching from ', url);
  try {
    const response = await fetch(url);
    const song = await response.json();
    res.send(song);
  } catch (e) {
    console.log('error')
    res.status(500).send(e);
  }
});