const libroCtrl = {}

const Libro = require('../models/Libro');

libroCtrl.getLibro = async (req, res) => {
    const libros = await Libro.find();
    res.json(libros);
};

libroCtrl.createLibro = async(req, res) => {
    const {autor, titulo, editorial, categoria, enlace } = req.body;
    const newLibro = new Libro({
        autor: autor,
        titulo: titulo,
        editorial: editorial,
        categoria: categoria,
        enlace: enlace,
    })
    await newLibro.save();
    res.json({message: "El libro ha sido creado"})
}

libroCtrl.getLib = async(req, res) => {
    const libro = await Libro.findById(req.params.id)
    res.json(libro)
}

libroCtrl.deleteLibro = async(req, res) => {
    await Libro.findByIdAndDelete(req.params.id)
    res.json({message: "El libro ha sido eliminado"})
}

libroCtrl.updateLibro = async(req, res) => {
    const {autor, titulo, editorial, categoria, enlace} = req.body;
    await Libro.findByIdAndUpdate(req.params.id, {
        autor, titulo, editorial, categoria, enlace 
    })
    res.json({message: "El libro ha sido actualizado"})
}

module.exports = libroCtrl;