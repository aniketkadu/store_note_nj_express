
const express = require("express");
const app = express();
const pool = require("./database"); // Import the database connection pool
const cors = require('cors');
const userRoute =  require('./routes/user');
const loginRoute =  require('./routes/login');
const customerRoute =  require('./routes/customer');
const purchaseRoute =  require('./routes/purchase');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger'); // Adjust path as needed

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());
// app.listen(3000, () => {
//   console.log('API server running on http://localhost:3000');
// });
// Serve Swagger docs at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/',(req,res) => {
  res.json({message:'Welcome!'});
})
app.use('/users',userRoute);
app.use('/login',loginRoute);
app.use('/customers',customerRoute);
app.use('/purchase',purchaseRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
