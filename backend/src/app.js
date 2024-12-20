const express = require('express'); // Importing expressJS
const cors = require('cors'); // Importing cors library
const cookieParser = require('cookie-parser'); // Importing cookie-parser library

const router = require('./routes');
const { ROUTE_PREFIX } = require('./config');

// Create a new express app object
const app = express();

// Setup all the relevant middlewares
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing
app.use(express.urlencoded({ extended: true })); // Enable URL-encoded parsing
app.use(express.text()); // Enable text parsing
app.use(cookieParser()); // Enable cookie parsing

app.use(ROUTE_PREFIX, router); // Use router for /api/v1 path

module.exports = app; // Exporting app object