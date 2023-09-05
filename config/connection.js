// Dependency for MongoDB
const mongoose = require('mongoose');

// Connection for MongoDB with console logs for success/error
mongoose.connect('mongodb://localhost:27017/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Module export for Mongoose
module.exports = mongoose;