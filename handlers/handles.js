const { flights } = require("../test-data/flightSeating"); // To draw on the flights array of clients
const { reservations } = require("../test-data/reservations"); // To draw on the flights array of clients
function findClient(email) {
  return reservations.find((client) => client.email == email);
}
function findID(id) {
  return reservations.find((client) => client.id === id); //Looksup the provided ID inside the reservations with the user input as the id
}
function findFlight(flightNumber) {
  return flights[flightNumber];
}
function plainPlaneArray(req, res) {
  /// This function returns the json'd array of flights - [SA123, SA231, SA666]
  res.status(200).json(Object.keys(flights));
}
function handleFlight(req, res) {
  const flightNo = req.params.flightID;
  const flightcheck = findFlight(flightNo); // reference to the findFlight function to return the array with the flightID
  console.log(flightNo);
  if (flightcheck === undefined) {
    res.status(404).send("Grounded");
  } else {
    res.status(200).json(flightcheck);
  }
}
function handleGetRez(req, res) {
  res.status(200).json(reservations);
  console.log(reservations);
}
function handleRezconfirm(req, res) {
  const clientEmail = req.body.email;
  const client = findClient(clientEmail);
  const newclient = req.body;
  console.log(newclient);
  if (client) {
    console.log("we have an email");
    res.status(404).send("404");
  } else {
    console.log("200");
    reservations.push(newclient);
    console.log(reservations);
    res.status(200).send("200");
  }
}
function clientConfirm(req, res) {
  const clientID = req.params.id;
  console.log(clientID);
  const bookedClient = findID(clientID);
  console.log(bookedClient);
  if (bookedClient !== undefined) {
    res.render("./pages/confirm", { client: bookedClient });
  } else {
    res.render("./pages/rerror");
  }
}
function informationPage(req, res) {
  const confirmID = req.params.id;
  console.log(confirmID);
  const bookedClient = findID(confirmID);
  console.log(bookedClient);
  if (bookedClient !== undefined) {
    console.log("all good");
    res.render("./pages/reserveinfo", { client: bookedClient });
  } else {
    console.log("keep working");
    res.render("./pages/reserror");
  }
}
module.exports = {
  plainPlaneArray,
  handleFlight,
  handleRezconfirm,
  handleGetRez,
  clientConfirm,
  informationPage,
};
