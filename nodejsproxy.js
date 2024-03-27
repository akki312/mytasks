const http = require('http');
const httpProxy = require('http-proxy');

// Create a new HTTP proxy server instance
const proxy = httpProxy.createProxyServer({});

// Create an HTTP server that forwards requests to the proxy
const server = http.createServer((req, res) => {
  // Log the incoming request
  console.log(`Proxying request to: ${req.url}`);

  // Forward the request to the target server
  proxy.web(req, res, {
    target: 'http://google.co.in', // Replace with your target server URL
    changeOrigin: true // Changes the origin of the host header to the target URL
  });
});

// Log errors if they occur
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err);
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end('Proxy error occurred.');
});

// Start the HTTP server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
