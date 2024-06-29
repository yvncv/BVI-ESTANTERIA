const libroCtrl = {}

const Libro = require('../models/Libro');
const mongoose = require('mongoose');
const Usuario = require('../models/Usuario');

libroCtrl.getLibro = async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los libros', error });
    }
};

libroCtrl.createLibro = async (req, res) => {

    const { carrera, ciclo, plan, curso, autor, titulo, lugar, tipo, categoria, enlace, portada, sugeridoPorProfesor } = req.body;
    const newLibro = new Libro({
        carrera, ciclo, plan, curso, autor, titulo, lugar, tipo, categoria, enlace, portada, sugeridoPorProfesor
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

    try {
        const id = (req.params.id); 
        await Libro.findByIdAndDelete(id);
        res.json({ message: "El libro ha sido eliminado" });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el libro', error });
    }
};

libroCtrl.updateLibro = async (req, res) => {
    
    const { carrera, ciclo, plan, curso, autor, titulo, lugar, tipo, categoria, enlace, portada, sugeridoPorProfesor } = req.body;
    try {
        const id = (req.params.id); 
        await Libro.findByIdAndUpdate(id, {
            carrera, ciclo, plan, curso, autor, titulo, lugar, tipo, categoria, enlace, portada, sugeridoPorProfesor
        });
        res.json({ message: "El libro ha sido actualizado" });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el libro', error });
    }
}

module.exports = libroCtrl;