const express = require('express');
const router = express.Router();
const olympian = require('../../../models/olympian.js');

router.get('/olympians', (request, response) => {
  let age = request.query.age;

  if (age === 'youngest') {
    olympian.youngest()
      .then((data) => {
        return response.status(200).json({ data });
      })
      .catch((error) => {
        return response.status(500).json({ error });
      });
  } else {
      olympian.all()
        .then((data) => {
          let result = { "olympians": data }
          return response.status(200).json(result);
        })
        .catch((error) => {
          return response.status(500).json({ error });
        });
    }
});

module.exports = router;
