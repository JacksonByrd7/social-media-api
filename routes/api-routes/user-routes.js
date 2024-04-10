// Import the necessary dependencies and controllers
const router = require('express').Router();
const {
  getAllusers,
  getuserById,
  createuser,
  updateuserById,
  deleteuserById,
  addFriend,
  removeFriend,
//   checkFriendRemoved,
} = require('../../controllers/user-controller');

// GET and POST all users
router.route('/').get(getAllusers).post(createuser);

// GET user id, PuT update user id and DELETE user by id
router.route('/:userId').get(getuserById).put(updateuserById).delete(deleteuserById);

// POST add friend and DELETE remove Friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);
// Export the router
module.exports = router;