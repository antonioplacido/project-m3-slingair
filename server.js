"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const {
  plainPlaneArray,
  handleFlight,
  handleRezconfirm,
  handleGetRez,
  clientConfirm,
  informationPage,
} = require("./handlers/handles");
const PORT = process.env.PORT || 8000;
express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("dev"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .set("view engine", "ejs")
  // endpoints
  .get("/flights", plainPlaneArray) // just plain array of flights
  .get("/flights/:flightID", handleFlight) // Contains the array of the flight with all seats, with properties ID & isAvailable
  .post("/users", handleRezconfirm) // Will post reservation confirmation
  .get("/users", handleGetRez) // Will display all current reservations
  .get("/:id", clientConfirm)
  .get("/info/:id", informationPage) // End point to determine the Reservation ID confirmation
  .use((req, res) => res.send("Not Found"))
  .listen(PORT, () => console.log(`Listening on port 8000`));
