const http = require('http');
const port = process.env.port || 3000;
const server = http.createServer((req, res)=>{
    res.statusCode = 200;
    res.setHeader('content-type', 'text/plain');
    res.end('node.js server is running\n');
    });
    server.listen(port, () => {
        console.log('server running on port ${port}');
    })