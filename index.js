const server = require('./server.js');

const port = 5002;
server.listen(port, function() {
    console.log(`server port ${port} open`);
});