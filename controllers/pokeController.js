const express = require('express'),
      Pokedex = require('pokedex-promise-v2'),
      router = express.Router();

var P = new Pokedex();

router.get('/browse', function (req, res) {
  P.getPokemonByName('?limit=151')
  .then(function (response) {
    res.send(response);
  })
  .catch(function (err) {
    console.log('Error: ', err);
  })
})

router.get('/details/:pokemon', function (req, res) {
  P.getPokemonByName(req.params.pokemon)
  .then(function (response) {
    res.send(response);
  })
  .catch(function (err) {
    console.log('Error: ', err);
  })
})

// router.get('/evolution/:pokemon', function (req, res) {
//   P.getPokemonByName()
// })


module.exports = router;