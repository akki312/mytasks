
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Parse the requested file path
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html'; // Serve index.html if root is requested
    }

    // Resolve the absolute path of the requested file
    const absPath = path.resolve(filePath);

    // Check if the requested file exists
    fs.access(absPath, fs.constants.F_OK, (err) => {
        if (err) {
            // If file not found, return 404 response
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404 Not Found');
            return;
        }

        // Read the file and stream it to the response
        fs.createReadStream(absPath).pipe(res);
    });
});

// Define the port to listen on
const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
