const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:4000/movies");
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error occurred while fetching data");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/movies/${req.params.id}`
    );
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error occurred while fetching data");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/movies/${req.params.id}`,
      req.body
    );
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error occurred while updating data");
  }
});

router.post("/", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:4000/movies", req.body);
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error occurred while posting data");
  }
});

module.exports = router;
