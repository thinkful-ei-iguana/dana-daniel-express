const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/pizza', (req, res) => {
  res.send("We have da pizza!");
});

app.get('/burgers', (req, res) => {
  res.send("We have da MEAT!");
});

app.get('/pizza/pineapple', (req, res) => {
  res.send("We have da pineapples!");
});

app.get('/echo', (req, res) => {
  const resText = `Here are some more details for you:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
  `;
  res.send(resText);
});

app.get('/queryViewer', (req, res) => {
  const name = req.query.name;
  const race = req.query.race;
  if (!name) {
    return res.status(400).send.apply('need a name');
  }
  if (!race) {
    return res.status(400).send('need a race');
  }
  const str = `${name} is an ${race}`;
  res.send(str); 
});

app.listen(8000, () => {
  console.log("listening to 8000");
});
