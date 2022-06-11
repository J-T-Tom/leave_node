const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const login = require('./routes/login');
const employee = require('./routes/employee');
const manager = require('./routes/manager');


const app = express();
app.use(cors());
app.use(bodyParser.json({extended: true, limit: '50mb'}));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

login(app);
employee(app);
manager(app);

app.listen(4000, function () {
  console.log('Server is running on port 4000');
});
