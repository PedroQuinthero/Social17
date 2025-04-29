const mongoose = require('mongoose');
const { User, Thought } = require('./models');

mongoose.connect('mongodb://127.0.0.1:27017/social17DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const users = [
  { username: 'jonatan', email: 'jonatan@email.com' },
  { username: 'alex',    email: 'alex@example.com'  },
  { username: 'emma',    email: 'emma@example.com'  },
];

async function seed() {
  try {
    /* 1. Clear existing data */
    await Promise.all([User.deleteMany({}), Thought.deleteMany({})]);

    /* 2. Insert users */
    const insertedUsers = await User.insertMany(users);
    console.log('\n📦  Users seeded:');
    insertedUsers.forEach(u => console.log(`   – ${u.username} (${u._id})`));

    /* 3. Build two thoughts for every user */
    const thoughtOps = insertedUsers.flatMap(user => {
      const otherUsers = insertedUsers.filter(u => u.username !== user.username);

      return [1, 2].map(i => {
        // pick a random other user to react
        const reactor = otherUsers[Math.floor(Math.random() * otherUsers.length)];

        const thoughtDoc = {
          thoughtText: `${user.username}'s thought #${i}`,
          username: user.username,
          reactions: [
            {
              reactionBody: `Reply to ${user.username}'s thought #${i}`,
              username: reactor.username,
            },
          ],
        };

        /* create thought, then attach it to the author */
        return Thought.create(thoughtDoc).then(async created => {
          await User.findByIdAndUpdate(
            user._id,
            { $push: { thoughts: created._id } },
            { new: true },
          );

          console.log(
            `   • Thought ${created._id} for ${user.username} (reaction by ${reactor.username})`,
          );
        });
      });
    });

    /* 4. Execute all creates/updates */
    await Promise.all(thoughtOps);
    console.log('\n✅  Database seeding finished.\n');
  } catch (err) {
    console.error('❌  Seed error:', err);
  } finally {
    mongoose.connection.close();
  }
}

seed();