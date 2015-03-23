var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.status(200).json(['Kirk', 'Spock', 'Bones', 'Scotty', 'Sulu', 'Uhura']);
});

router.get('/:server', function(req, res, next) {
  res.status(200).json(['01/01/2015', '02/01/2015']);
});

router.get('/:server/:date', function(req, res, next) {
  res.status(200).json('OK');
});

module.exports = router;