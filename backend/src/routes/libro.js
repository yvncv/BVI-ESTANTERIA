const {Router} = require('express')
const router = Router()
const libroCtrl = require('../controller/libro.controller.js');

router.route('/')
    .get(libroCtrl.getLibro)
    .post(libroCtrl.createLibro)

router.route('/:id')
    .get(libroCtrl.getLib)
    .delete(libroCtrl.deleteLibro)
    .put(libroCtrl.updateLibro)

module.exports = router;