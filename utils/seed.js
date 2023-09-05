// Dependencies for MongoDB
const mongoose = require('mongoose');
const { User, Thought, Reaction } = require('./models');

// Connect to the database
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

// Seed data for database (Users, Thoughts and Reactions)
const seedData = {
  users: [
    {
      username: 'jared.stratton',
      email: 'jared@seeds.com',
      friends: [],
    },
    {
      username: 'sarah.stone',
      email: 'sarah@seeds.com',
      friends: [],
    },
    {
      username: 'scott.ogrins',
      email: 'scott@seeds.com',
      friends: [],
    },
    {
        username: 'nikki.vigneault',
        email: 'nikki@seeds.com',
        friends: [],
      },
  ],
  thoughts: [
    {
      thoughtText: 'Hi, this is thought 1.',
      user: '',
      reactions: [],
    },
    {
      thoughtText: 'Hello, this is thought 2.',
      user: '',
      reactions: [],
    },
  ],
  reactions: [
    {
      reactionBody: 'Wow, this is a reaction to thought 1.',
      user: '', 
    },
    {
      reactionBody: 'Fantastic, this is a reaction to thought 2.',
      user: '', 
    },
  ],
};

// Function for seeding the database
async function seedDatabase() {
  try {
    const createdUsers = await User.insertMany(seedData.users);
    
    seedData.thoughts.forEach((thought, index) => {
      thought.user = createdUsers[index % createdUsers.length]._id;
    });
    
    const createdThoughts = await Thought.insertMany(seedData.thoughts);
    
    seedData.reactions.forEach((reaction, index) => {
      reaction.user = createdUsers[index % createdUsers.length]._id;
    });
    
    await Reaction.insertMany(seedData.reactions);

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();
