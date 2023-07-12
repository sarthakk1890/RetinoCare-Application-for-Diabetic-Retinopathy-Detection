const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

connectToMongo();
const app = express();
const port = 4000;

app.use(fileUpload({
  useTempFiles: true
}));

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/history', require('./routes/previous.js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
