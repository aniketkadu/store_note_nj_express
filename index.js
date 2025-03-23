
const express = require("express");
const app = express();
const pool = require("./database"); // Import the database connection pool
const userRoute =  require('./routes/user')

// Middleware to parse JSON request bodies
app.use(express.json());
app.get('/',(req,res) => {
  res.json({message:'Welcome!'});
})
app.use('/users',userRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
