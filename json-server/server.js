const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const db = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "72676376";
const expiresIn = "1h";

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function isLoginAuthenticated({ email, password }) {
  return (
    db.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1

  );
}

function isRegisterAuthenticated({ email }) {
  return db.users.findIndex((user) => user.email.toLowerCase() === email) !== -1;
}

server.post("/api/auth/register", (req, res) => {
  const { email, password } = req.body;

  if (isRegisterAuthenticated({ email })) {
    const status = 401;
    const message = "Email already exists";
    res.status(status).json({ status, message });
    return;
  }

  try {
    let lastUserId = db.users.length > 0 ? db.users[db.users.length - 1].id : 0;

    const newUser = { id: lastUserId + 1, email, password };
    db.users.push(newUser);

    fs.writeFileSync("./db.json", JSON.stringify(db));

    const access_token = createToken({ email, password });
    res.status(200).json({ access_token });
  } catch (err) {
    const status = 500;
    const message = "Internal Server Error";
    res.status(status).json({ status, message });
  }
});

server.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!isLoginAuthenticated({ email, password })) {
    const status = 401;
    const message = "Incorrect Email or Password";
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({ email, password });
  res.status(200).json({ access_token });
});

// Fetch all flights
server.get("/flights", (req, res) => {
  // Assuming you want to return the list of flights from db.json
  const flights = db.flights;
  res.status(200).json(flights);
});

// Fetch a specific flight by ID
server.get("/flights/:id", (req, res) => {
  const flightId = req.params.id;
  const flight = db.flights.find((flight) => flight.id === +flightId);

  if (flight) {
    res.status(200).json(flight);
  } else {
    res.status(404).json({ message: "Flight not found" });
  }
});

// Add a new flight
server.post("/flights", (req, res) => {
  let lastFlightId = db.flights.length > 0 ? db.flights[db.flights.length - 1].id : 0;
  const newFlight = { ...req.body, id: lastFlightId + 1 };
  db.flights.push(newFlight);

  fs.writeFileSync("./db.json", JSON.stringify(db));

  res.status(201).json(newFlight);
});

// Edit an existing flight
server.patch("/flights/:id", (req, res) => {
  const flightId = req.params.id;
  const updatedFlight = req.body;
  const index = db.flights.findIndex((flight) => flight.id === +flightId);

  if (index === -1) {
    res.status(404).json({ message: "Flight not found" });
  } else {
    db.flights[index] = { ...db.flights[index], ...updatedFlight };
    fs.writeFileSync("./db.json", JSON.stringify(db));
    res.status(200).json(updatedFlight);
  }
});

// Delete a flight
server.delete("/flights/:id", (req, res) => {
  const flightId = req.params.id;
  const index = db.flights.findIndex((flight) => flight.id === +flightId);
  if (index === -1) {
    res.status(404).json({ message: "Flight not found" });
  } else {
    const deletedFlight = db.flights.splice(index, 1)[0];
    fs.writeFileSync("./db.json", JSON.stringify(db));
    res.status(200).json(deletedFlight);
  }
});


server.listen(5000, () => {
  console.log("Running fake api json server");
});
