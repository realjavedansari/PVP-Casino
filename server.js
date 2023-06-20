const http = require('http');
const express = require('express');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
let counter = 5;

// Enable CORS
app.use(cors());

// SSE endpoint
app.get('/sse', (req, res) => {
    // Set the response header for text/event-stream
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': 'http://localhost:3000', // Allow requests from your React app
    });
    
    // Send data to the client at regular intervals
    const intervalId = setInterval(() => {
        const data = 'This is the continuous data sent at regular intervals.';
        const eventData = `data: ${counter}${data}\n\n`;
        res.write(eventData);
    }, 1000);

    // Handle client disconnect
    req.socket.on('close', () => {
        clearInterval(intervalId);
    });
});

const port = 3001;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});