const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://stephen-king-api.onrender.com/api/books"
    );
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error occurred while fetching data");
  }
});

module.exports = router;
