import express from 'express';
// const express = require('express');
const route = require('./route');
import './db';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', route);

app.listen(port, () => {
  console.log(`Listening  on PORT ${port}`)
})

module.exports = app