import serverless from 'serverless-http';
import app from './server';

// Wrap Express app as a Netlify Function handler
export const handler = serverless(app);
