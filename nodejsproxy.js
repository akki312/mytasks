const http = require('http');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});
const server = http.createServer((req, res) =>{
    console.log(`proxying request to: ${req.url}`);
    // forward the request ot target server
    proxy.web(req, res, {
        target: 'http://example.com',
        changeOrigin: true

    });
});
proxy.on('error', (err, req, res) =>{
    console.error('proxy error:', err);
    res.writeHead(500, {
        'content-type': 'text/plain'
    });
    res.end('proxy error occured.');
});
const port = 3000;
server.listen(port, () =>{
    console.log(`proxy server running on port ${port}`);

});