require('dotenv').config(); //Use for hidden info
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection
    .on('open', () => {
        console.log('Mongoose connection open');
    })
    .on('error', (err)=> {
        console.log(`Connection error: ${err.message}`);
    });

require('./models/Registration.js');

const app = require('./app'); //importing the Express app we created in app.js.

const server = app.listen(process.env.PORT || 3000, function(){//This can be done in app.js without having a separate file here
    console.log(`Express is running on port ${server.address().port}`);
})

