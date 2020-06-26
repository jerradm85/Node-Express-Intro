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

app.get('/cipher', (req, res) => {

  const text = req.query.text.toUpperCase();
  const shift = Math.abs(Number(req.query.shift));

  if (shift > 26) {
    return res.send("Shift must be 26 or less.");
  }
  // const charArray = text.split("");
  const asciiArr = [];

  for(let i=0; i < text.length; i++) {
    asciiArr.push(text[i].charCodeAt(0))
  }

  const shifted = asciiArr.map(i => {
    if(i === 32) {
      return i;
    }

    if((i + shift) > 90) {
      return (i + shift - 91) + 65
    }
    return (i + shift);
  })

  const cipher = String.fromCharCode(...shifted);



  // const asciiArr = charArray.map(i => {
  //   charArray[i].charCodeAt(0);
  // })

  res.send([text, shift, asciiArr, shifted, cipher]);

})







app.listen(8000, () => {
  console.log('Express server is listening to port 8000...')
})