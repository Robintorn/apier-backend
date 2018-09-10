const port = process.env.SERVER_PORT || 9999;
const http = require('http');
const db = require('mongoose');
const app = require('../app');

//Node JS Web Server
http.createServer(app).listen(port, () => { 
    console.log(`NODE JS API Web Server - Online on port ${port}`);
});

//MongoDB Connection
db.connect(process.env.MONGO_DB_CONNECTIONSTRING, { useNewUrlParser: true })
.then(() => console.log("MongoDB Database Server - Online"))
.catch((err) => console.log(err));

db.set('useCreateIndex', true);