const express = require('express');
require('./models/index'); // TODO: Remove this later when router and controllers are done
require('dotenv').config();

const app = express();
var port = process.env.BE_PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
