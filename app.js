const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Express!')
})

//question 1
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

//question 2
app.get('/cipher', (req, res) => {
  //declare variables
  const text = req.query.text.toUpperCase().split().map();
  const shift = Math.abs(Number(req.query.shift));
  const asciiArr = [];
  

  //validation
  if(!text){
    return res.status(400).send("Must provide text input.");
  }

  if(!shift){
    return res.status(400).send("Must provide shift value.");
  }

  if (shift > 26) {
    return res.status(400).send("Shift must be 26 or less.");
  }
  

  //logic
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

  res.status(200).send([text, cipher]);

})

//question 3
app.get('/lotto', (req, res) => {
  const numbers = req.query.numbers
  const numbersArr = [];
  let counter = 0;

  if(numbers.length !== 6 || !numbers) {
    "Must provide six different numbers between 1 and 20"
  }

  for(let i=0; i < 6; i++) {
    const number = Math.floor(Math.random() * 20);
    numbersArr.push(number);
  }

  const matches = numbers.filter(value => {
    return numbersArr.includes(value);
  })


  // for(let i=0; i < numbers.length; i++) {
  //   for(let j=0; j < numbersArr.length; j++) {
  //     if(numbers[i] == numbersArr[j]) {
  //       counter ++
  //     }
  //   }
  // }

  if(matches.length == 6) {
    res.status(200).send("Wow! Unbelievable! You could have won the mega millions!")
  }else if(matches.length == 5) {
    res.status(200).send("Congratulations! You win $100!")
  }else if(matches.length == 4) {
    res.status(200).send("Congratulations, you win a free ticket") 
  }else {
    res.status(200).send("Sorry, you lose.")
  }

})






app.listen(8000, () => {
  console.log('Express server is listening to port 8000...')
})