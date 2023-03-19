const router = require('express').Router();
const {
    getPensamientos,
    getSinglePensamiento,
    addPensamiento,
    updatePensamiento,
    deletePensamientos,
    addReaccion,
    deleteReaccion
} = require('../../controllers/pensamientosController.js');

// /api/pensamientos
router.route('/').get(getPensamientos).post(addPensamiento);

// /api/pensamientos/:pensamientoId
router.route('/:pensamientoId').get(getSinglePensamiento).put(updatePensamiento).delete(deletePensamientos);
router.route('/:pensamientoId/reacciones').post(addReaccion);
router.route('/:pensamientoId/:idReaccion').delete(deleteReaccion);

module.exports = router;
