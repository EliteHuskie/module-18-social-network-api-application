// Dependencies for server
const express = require('express');
const app = express();
const userRoutes = require('./routes/api/userRoutes');
const thoughtRoutes = require('./routes/api/thoughtRoutes');
const reactionRoutes = require('./routes//api/reactionRoutes');

// Middleware setup
app.use(express.json());

// Routes setup
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/reactions', reactionRoutes);

// Port used to start/listen for application
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});