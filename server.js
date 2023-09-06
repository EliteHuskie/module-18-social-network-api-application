// Dependencies for server
const express = require('express');
const mongoose = require('mongoose'); // Import Mongoose
const app = express();
const userRoutes = require('./routes/api/userRoutes');
const thoughtRoutes = require('./routes/api/thoughtRoutes');

// Middleware setup
app.use(express.json());

// Connect to the database using the connection string
mongoose.connect('mongodb://127.0.0.1:27017/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Once connected, set up your routes
    app.use('/api/users', userRoutes);
    app.use('/api/thoughts', thoughtRoutes);

    // Start the Express server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });