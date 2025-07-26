#!/usr/bin/env node

console.log('LiveKit Agent starting...');

// Import the package to verify it's working
import('@livekit/agents').then((livekitAgents) => {
  console.log('LiveKit Agents package loaded successfully!');
  console.log('Available exports:', Object.keys(livekitAgents));
  
  console.log('LiveKit Agent started successfully!');
}).catch((error) => {
  console.error('Error loading LiveKit Agents:', error);
  process.exit(1);
});

// Keep the process running
process.on('SIGINT', () => {
  console.log('Shutting down agent...');
  process.exit(0);
});

// Simple HTTP server to keep the process alive
import('http').then((http) => {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('LiveKit Agent is running!\n');
  });
  
  server.listen(8081, () => {
    console.log('LiveKit Agent server listening on port 8081');
  });
}); 