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
  } else if (age === 'oldest') {
    olympian.oldest()
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

router.get('/olympian_stats', async (request, response) => {
  let temp = await Promise.all(olympian.stats())
    .then((data) => {
      let result = {
                    "olympian_stats": {
                      "total_competing_olympians": data[0],
                      "average_weight": {
                        "unit": "kg",
                        "male_olympians": Number(data[1].toFixed(1)),
                        "female_olympians": Number(data[2].toFixed(1))
                      },
                      "average_age": Number(data[3].toFixed(1))
                    }
                  }
      return response.status(200).json(result);
    })
    .catch((error) => {
      return response.status(500).json({ error });
    });
});

module.exports = router;
