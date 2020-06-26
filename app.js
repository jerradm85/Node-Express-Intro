const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Express!')
})

app.get('/sum', (req, res) => {

  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if(!a) { 
    return res.status(400).send('Number a is required.')
  }
  if(!b) {
    return res.status(400).send('Number b is required.')
  }

  const c = (a + b).toString();

  const answer = `The sum of ${a} and ${b} is ${c}`;

  res.send(answer);

})









app.listen(8000, () => {
  console.log('Express server is listening to port 8000...')
})