require('express-async-errors');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

require('dotenv').config();

const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute');
const basketRouter = require('./routes/basketRoute');

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/basket', basketRouter);

app.use((err, req, res, next) => {
  res.status(err.statusCode);
  res.json({ error: err.message });
});

var port = process.env.BE_PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
