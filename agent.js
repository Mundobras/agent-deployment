#!/usr/bin/env node

import { Agent } from '@livekit/agents';

console.log('LiveKit Agent starting...');

// Basic agent setup
const agent = new Agent({
  // Add your agent configuration here
});

console.log('LiveKit Agent started successfully!');

// Keep the process running
process.on('SIGINT', () => {
  console.log('Shutting down agent...');
  process.exit(0);
}); 