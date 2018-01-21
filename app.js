var app = require('./config/express')();
var routesUsers = require("./app/routes/users")(app);

app.listen(3000, 'localhost', function(){
    console.log("Server is running!");
});


