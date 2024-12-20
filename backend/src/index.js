const app = require('./app'); // Importing the express app object 
const { PORT } = require('./config'); // Importing the env variables

// Start running a server on the specified port
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});