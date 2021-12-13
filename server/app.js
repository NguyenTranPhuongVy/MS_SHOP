const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const connectData = require('./config/database/connect');

// * Link router
const productRouter = require('../server/routers/productRouter');

app.use(cors())
// *Connect router
app.use("", productRouter);

// Connect Database
connectData.connect();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})