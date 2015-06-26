'use strict';

const Promise = require('bluebird');
const mongoose = require('mongoose');

Promise.promisifyAll(require('mongoose'));

exports.home = {
  index: function*(next) {
    this.body = 'Got to home index';
    yield next;
  }
};

var petSchema = mongoose.Schema({
  name: {type: String, required: true},
  animal: {type: String, required: true},
});

var Pet = mongoose.model('Pet', petSchema);

exports.pets = {
  index: function*(next) {
    const $allPets = yield Pet.findAsync();
    this.body = $allPets;
    yield next;
  },
  create: function*(next) {

    let $pet = new Pet({
      name: this.request.body.name,
      animal: this.request.body.animal,
    });
    
    const $savedPet = yield $pet.saveAsync();
    this.body = $savedPet;

    yield next;
  },
  read: function*(id, next) {
    this.body = 'See pet id ' + id;
    yield next;
  }
};
