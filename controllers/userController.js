const { User, Thought } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends')
      .then(user =>
        !user ? res.status(404).json({ message: 'No user found' }) : res.json(user)
      )
      .catch(err => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true })
      .then(user =>
        !user ? res.status(404).json({ message: 'No user found' }) : res.json(user)
      )
      .catch(err => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findByIdAndDelete(req.params.userId)
      .then(user => {
        if (!user) return res.status(404).json({ message: 'No user found' });
        return Thought.deleteMany({ _id: { $in: user.thoughts } });
      })
      .then(() => res.json({ message: 'User and thoughts deleted' }))
      .catch(err => res.status(500).json(err));
  },

  addFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then(user =>
        !user
          ? res.status(404).json({ message: 'User not found' })
          : res.json(user)
      )
      .catch(err => res.status(500).json(err));
  },
  removeFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then(user =>
        !user
          ? res.status(404).json({ message: 'User not found' })
          : res.json(user)
      )
      .catch(err => res.status(500).json(err));
  },
};