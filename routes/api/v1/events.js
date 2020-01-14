const express = require('express');
const router = express.Router();
const events = require('../../../models/events.js');
const cors = require('cors')

router.get('/', cors(), (request, response) => {
  events.all()
    .then((data) => {
      let result = { "events": data }
      return response.status(200).json(result);
    })
    .catch((error) => {
      return response.status(500).json({ error });
    });
})

router.get('/:id/medalists', cors(), (request, response) => {
  var id = request.params.id
  // total number of unique events = 79
  if (id < 1 || id > 79) {
    return response.status(404).json({'message': 'id is out of range. Valid range of id is 0 < id < 80'});
  }
  events.findMedalistsById(id)
    .then((result) => {
      return response.status(200).json(result);
    })
    .catch((error) => {
      return response.status(500).json({ error });
    });
})

module.exports = router;
