const libroCtrl = {}

const Libro = require('../models/Libro');
const mongoose = require('mongoose');

libroCtrl.getLibro = async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los libros', error });
    }
};

libroCtrl.createLibro = async (req, res) => {

    if (!req.user || req.user.role !== 'admin') {
        return res.status(401).json({ message: 'No estás autorizado para realizar esta acción' });
    }

    const { carrera, ciclo, curso, autor, titulo, lugar, tipo, categoria, enlace, portada } = req.body;
    const newLibro = new Libro({
        carrera, ciclo, curso, autor, titulo, lugar, tipo, categoria, enlace, portada
    });
    try {
        await newLibro.save();
        res.json({ message: "El libro ha sido creado" });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el libro', error });
    }
};

libroCtrl.getLib = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const libro = await Libro.findById(id);

        if (!libro) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        res.json(libro);
    } catch (error) {
        console.error('Error al obtener el libro:', error); 
        res.status(500).json({ message: 'Error al obtener el libro', error: error.message });
    }
};

libroCtrl.deleteLibro = async (req, res) => {
    
    if (!req.user || req.user.role !== 'admin') {
        return res.status(401).json({ message: 'No estás autorizado para realizar esta acción' });
    }

    try {
        const id = (req.params.id); 
        await Libro.findByIdAndDelete(id);
        res.json({ message: "El libro ha sido eliminado" });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el libro', error });
    }
};

libroCtrl.updateLibro = async (req, res) => {
    
    if (!req.user || req.user.role !== 'admin') {
        return res.status(401).json({ message: 'No estás autorizado para realizar esta acción' });
    }
    
    const { carrera, ciclo, curso, autor, titulo, lugar, tipo, categoria, enlace, portada } = req.body;
    try {
        const id = (req.params.id); 
        await Libro.findByIdAndUpdate(id, {
            carrera, ciclo, curso, autor, titulo, lugar, tipo, categoria, enlace, portada
        });
        res.json({ message: "El libro ha sido actualizado" });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el libro', error });
    }
}

module.exports = libroCtrl;