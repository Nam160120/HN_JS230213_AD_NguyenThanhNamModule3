const express = require("express");
const server = express();
const fs = require("fs");
const bodyParser = require("body-parser");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("public"));

server.get("/api/v1/players", (req, res) => {
  fs.readFile("./data-game/players.json", (err, data) => {
    if (err) throw err;
    const players = JSON.parse(data);
    res.status(200).json(players);
  });
});

//
server.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/players/players.html`);
});

//
server.get("/round/:id", (req, res) => {
  res.sendFile(`${__dirname}/public/scores/scores.html`);
});

//
server.get("*", (req, res) => {
  res.send("<h1>PAGE NOT FOUND</h1>");
});

//
server.post("/api/v1/players", (req, res) => {
  fs.readFile("./data-game/players.json", (err, data) => {
    if (err) {
      throw err;
    }

    const players = JSON.parse(data);
    const newPlayers = req.body;
    players.push(...newPlayers);

    fs.writeFile("./data-game/players.json", JSON.stringify(players), (err) => {
      if (err) {
        throw err;
      }

      res.status(200).json(players);
    });
  });
});

server.put("/api/v1/players", (req, res) => {
  fs.readFile("./data-game/players.json", (err, data) => {
    if (err) {
      throw err;
    }
    const players = JSON.parse(data);
    const updatedPlayerData = req.body;
    const playerIndex = players.length - 1;
    players[playerIndex] = updatedPlayerData;

    fs.writeFile("./data-game/players.json", JSON.stringify(players), (err) => {
      if (err) {
        throw err;
      }

      res.status(200).json(updatedPlayerData);
    });
  });
});

server.listen(3000, () => {
  console.log(`server is running on http://localhost:3000`);
});
