const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // Import your routes

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors()); // Allow CORS for development
app.use(express.json()); // Parse JSON request bodies
app.use('/api', routes); // Mount the routes under the /api path

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
