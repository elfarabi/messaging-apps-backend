import express from 'express';
import route from './route';
import './db';

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', route);

app.listen(port, () => {
  console.log(`Listening  on PORT ${port}`);
});

module.exports = app;
