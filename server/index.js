const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const buildPath = path.join(__dirname, "../client/build");

app.use(express.static(buildPath));

const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../client/build", "index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
