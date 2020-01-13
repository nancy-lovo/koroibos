const express = require('express');
const router = express.Router();
const events = require('../../../models/events.js');


router.get('/', (request, response) => {
  events.all()
    .then((data) => {
      let result = { "events": data }
      return response.status(200).json(result);
    })
    .catch((error) => {
      return response.status(500).json({ error });
    });
})

module.exports = router;
