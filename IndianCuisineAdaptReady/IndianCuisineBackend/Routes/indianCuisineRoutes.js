const express = require('express');
const jsonService = require('../Services/jsonService');
const cuisineJson = require('../output.json')

const router = express.Router();

router.get('/indianCuisine', (req, res) => {
  try {
    // Send the JSON data as the response
    res.json(cuisineJson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
