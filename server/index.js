const express = require('express');
const app = express();
const crypto = require('crypto');

const PORT = 5050;

app.use(express.json());

const hashedPasswordReturn = (str) => {
  const hash = crypto.createHash('sha256');
  return hash.update(str).digest('hex');
};

const plaintextPassword = '1234'; //for ogata
const salt = 'a1b92z7';

const plaintextPassword2 = 'abcd'; //for kazuyoshi
const salt2 = 'Ulztl2';
// const salt = crypto.randomBytes(6).toString('hex');
const hashedPassword = hashedPasswordReturn(`${salt}${plaintextPassword}`);
const hashedPassword2 = hashedPasswordReturn(`${salt2}${plaintextPassword2}`);

console.log('hashedPassword : ', hashedPassword);
console.log('hashedcheck :', hashedPasswordReturn('a1b92z71234'));
console.log('hashedPassword2 : ', hashedPassword2);

app.get('/hash/:name/:pw', (req, res) => {
  const userName = req.params.name;
  const password = req.params.pw;
  const hashed = hashedPasswordReturn(`${salt}${password}`);
  if (hashed === hashedPassword) {
    res.send('認証OK');
  } else {
    res.send('PWが違います');
  }
});

app.listen(PORT, () => {
  console.log('server is running');
});
