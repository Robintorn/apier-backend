const port = process.env.PORT || 8000;
const http = require('http');
const app = require('../app');

http.createServer(app).listen(port);