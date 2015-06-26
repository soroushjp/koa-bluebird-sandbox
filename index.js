'use strict';

const koa = require('koa');
// const Promise = require('bluebird');
const route = require('koa-route');
const handlers = require('./handlers');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

var app = koa();

// Connect to mongo
mongoose.connect('mongodb://localhost/koa-sandbox');

app.use(function* (next) {
  const start = new Date();
  yield next;
  console.log("%s %s - %s ms", this.method, this.url, new Date() - start);
});

app.use(bodyParser());

app.use(route.get('/', handlers.home.index));
app.use(route.get('/pets', handlers.pets.index));
app.use(route.post('/pets', handlers.pets.create));
app.use(route.get('/pets/:id', handlers.pets.read));

const port = 3000;
console.log("Listening on port %d ...", port);
app.listen(port);
