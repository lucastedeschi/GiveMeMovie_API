var app = require('./config/express')();

app.listen(process.env.PORT, function(){
    console.log("Server is running!");
});
