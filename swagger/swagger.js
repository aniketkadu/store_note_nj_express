// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Replace with your actual server URL
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/*.js')], // Important! // Path to your route files with JSDoc 
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
