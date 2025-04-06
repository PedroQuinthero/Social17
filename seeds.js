const mongoose = require('mongoose');
const { User, Thought } = require('./models');

mongoose.connect('mongodb://127.0.0.1:27017/vibelinkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const users = [
  { username: 'jonatan', email: 'jonatan@email.com' },
  { username: 'alex', email: 'alex@example.com' },
  { username: 'emma', email: 'emma@example.com' }
];

async function seed() {
  try {
    // Remove existing data
    await User.deleteMany({});
    await Thought.deleteMany({});
    
    // Insert Users
    const insertedUsers = await User.insertMany(users);
    console.log('Seeded Users:');
    insertedUsers.forEach(user => {
      console.log(`Username: ${user.username}, ID: ${user._id}`);
    });
    
    // Find jonathan's user document
    const jonatan = insertedUsers.find(user => user.username === 'jonatan');
    if (!jonatan) throw new Error('Jonatan not found');

    // Create a thought for Jonatan with a reaction
    const thoughtData = {
      thoughtText: "What is this all about!?",
      username: "jonatan",
      reactions: [
        {
          reactionBody: "I am so lost too!",
          username: "alex"
        }
      ]
    };
    const createdThought = await Thought.create(thoughtData);
    
    // Update jonatan to add this thought to his thoughts array
    await User.findByIdAndUpdate(
      jonatan._id,
      { $push: { thoughts: createdThought._id } },
      { new: true }
    );
    
    console.log(`Seeded Thought for jonatan: ID: ${createdThought._id}`);
    if (createdThought.reactions && createdThought.reactions.length > 0) {
      createdThought.reactions.forEach((reaction, index) => {
        console.log(`Seeded Reaction ${index + 1} for thought ${createdThought._id}: ID: ${reaction.reactionId}`);
      });
    }
    
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
}

seed();