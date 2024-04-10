const { user } = require('../models');

const userController = {
  // 1. Get all users
  getAllusers(req, res) {
    user.find({})
      .then(userData => res.json(userData))
      .catch(err => res.status(500).json(err));
  },

  // 2. Get one user by ID
  getuserById(req, res) {
    user.findById(req.params.userId)
      .then(userData => res.json(userData))
      .catch(err => res.status(500).json(err));
  },
  
  // 3. Create a user
  createuser(req, res) {
    user.create(req.body)
      .then(userData => res.json(userData))
      .catch(err => res.status(500).json(err));
  },

  // 4. update user by ID
  updateuserById(req, res) {
    user.findOneAndupdate(req.params.id, req.body, { new: true })
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'user not found' });
        }
        res.json(userData);
      })
      .catch(err => res.status(500).json(err));
  },

  // 5. Delete user
  deleteuserById(req, res) {
    user.findOneAndDelete(req.params.id)
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'user not found' });
        }
        res.json({ message: 'user deleted successfully' });
      })
      .catch(err => res.status(500).json(err));
  },

  // 6. Add friend to user's friend list
  addFriend(req, res) {
    user.findOneAndupdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.friendId || req.params.friendId} },
      { new: true }
    )
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'user not found' });
        }
        res.json(userData);
      })
      .catch(err => res.status(500).json(err));
  },


  // NEW 7. Remove friend from user's friend list

  removeFriend({ params }, res) {
    user.findOneAndupdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbuserData) => {
        if (!dbuserData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        // check if friend was removed
        const removed = !dbuserData.friends.includes(params.friendId);
        // return response with appropriate message
        if (removed) {
          res.json({ message: "Friend removed successfully!", dbuserData });
        } else {
          res.json(dbuserData);
        }
      })
      .catch((err) => res.status(400).json(err));
  },
};


// Export userController
module.exports = userController;