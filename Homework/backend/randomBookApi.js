const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://books-api7.p.rapidapi.com/books/get/random/",
    headers: {
      "X-RapidAPI-Key": "bbb42f97demsh6c22c777ca12ad7p1932ccjsn9fbe8ab92fc2",
      "X-RapidAPI-Host": "books-api7.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
