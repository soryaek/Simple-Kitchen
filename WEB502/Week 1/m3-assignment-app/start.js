const app = require('./app'); //importing the Express app we created in app.js.

const server = app.listen(3000, function(){//This can be done in app.js without having a separate file here
    console.log(`Express is running on port ${server.address().port}`);
})