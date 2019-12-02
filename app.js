const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/pizza', (req, res) => {
  res.send('We have da pizza!');
});

app.get('/burgers', (req, res) => {
  res.send('We have da MEAT!');
});

app.get('/pizza/pineapple', (req, res) => {
  res.send('We have da pineapples!');
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

app.get('/sum', (req, res) => {
  const A = parseInt(req.query.a);
  const B = parseInt(req.query.b);
  res.send(`The sum is ${A + B}`);
});

app.get('/cipher', (req, res) => {
  const text = req.query.text.toLowerCase().split('');
  const shift = parseInt(req.query.shift);
  const cipher = text.map(l => {
    if (l === ' ') return ' ';
    let newCharCode = l.charCodeAt(0) + shift;
    if (newCharCode > 122) newCharCode -= 26;
    const newChar = String.fromCharCode(newCharCode); //97 to 122
    return newChar;
  });
  res.send(`The cipher is: ${cipher.join('')}`);
});

app.get('/lotto', (req, res) => {
  const ticket = req.query.arr.map(c => Number(c));
  const winningTicket = [...Array(6).keys()].map(n => {
    return Math.floor(Math.random() * 10);
  });
  console.log(winningTicket);
  let matches = 0;
  const results = winningTicket.forEach((n, i) => {
    if (n === ticket[i]) matches = matches + 1;
  });
  let say = '';
  switch (matches) {
    case 4:
      say = 'confabulations, you win a free ticket!';
      break;
    case 5:
      say = 'Congrats, you win a hundo';
      break;
    case 6:
      say = 'megamillions';
      break;
    default:
      say = 'sorry you lose';
      break;
  }
  res.send(`${ticket} ${winningTicket} ${matches} :${say}`);
});

app.listen(8000, () => {
  console.log('listening to 8000');
});
