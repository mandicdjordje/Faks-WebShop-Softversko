require('express-async-errors');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

require('./models/index'); // TODO: Remove this later when router and controllers are done
require('dotenv').config();

const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRoute');

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/product', productRouter);

var port = process.env.BE_PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
