//require the libraay
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/tasks_list_db');

// acquire the connection (to check if it is successful)
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'error connecting to db'));

// is it up and running print message
db.once('open', function () {
    console.log('Successfully connected to the database!!');
})