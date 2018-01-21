var app = require('./config/express')();

app.listen(3000, 'localhost', function(){
    console.log("Server is running!");
});


