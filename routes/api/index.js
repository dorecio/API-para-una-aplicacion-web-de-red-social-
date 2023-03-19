const router = require('express').Router();
const pensamientoRoutes = require('./pensamientoRoutes');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/pensamientos', pensamientoRoutes);


module.exports = router;