const express = require('express');
const router = express.Router();
const olympian = require('../../../models/olympian.js');

router.get('/olympians', (request, response) => {
    olympian.all()
      .then((data) => {
        let result = { "olympians": data }
        return response.status(200).json(result);
      })
      .catch((error) => {
        return response.status(500).json({ error });
      });
});

module.exports = router;
