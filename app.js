var app = require('./config/express')();

var port_number = server.listen(process.env.PORT || 3000);
app.listen(port_number);

