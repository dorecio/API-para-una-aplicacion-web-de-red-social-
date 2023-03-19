const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addAmigo,
    deleteAmigo
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/:userId/:amigoId').post(addAmigo);
router.route('/:userId/:amigoId').delete(deleteAmigo);

module.exports = router;
