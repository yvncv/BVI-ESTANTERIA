const {Router} = require('express')
const router = Router()

const {createLibro, getLibro, getLib, deleteLibro, updateLibro} = require('../controller/libro.controller.js')

router.route('/')
    .get(getLibro)
    .post(createLibro)

router.route('/:id')
    .get(getLib)
    .delete(deleteLibro)
    .put(updateLibro)

module.exports = router;