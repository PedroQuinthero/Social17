# Social17


Social17 is a NoSQL Social‑Network API built with Express.js, MongoDB, and Mongoose.  It lets users:

create accounts (Users)

post thoughts

react to friends’ thoughts (Reactions)

manage a friend list

The project demonstrates how modern social‑media back‑ends structure and manipulate large amounts of unstructured data.

Walk‑through video: see it in action—from server start‑up through CRUD requests and cascade deletes. https://your-demo-video-link.com

Table of Contents

Features

Tech Stack

Features



Capability

👤

Users – create, read, update, delete

💭

Thoughts – post & edit thoughts (1–280 chars)

🔄

Reactions – emoji‑style reactions on thoughts

🤝

Friendships – add & remove friends

📈

Virtuals for friendCount & reactionCount

🕑

Nice timestamps (Moment getters)

🗑️

Bonus: deleting a user cascades delete of their thoughts

Tech Stack

Layer

Technology

Runtime

Node.js 18+

Server

Express 4

Database

MongoDB 6 (local or Atlas)

ODM

Mongoose 8

Utilities

Moment, dotenv, Nodemon

Testing

Insomnia / Postman, MongoDB Compass




License

Distributed under the MIT License.

Author

Pedro Quintero – @PedroQuinthero
