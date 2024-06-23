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

    try {
        const id = (req.params.id); 
        await Libro.findByIdAndDelete(id);
        res.json({ message: "El libro ha sido eliminado" });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el libro', error });
    }
};

libroCtrl.updateLibro = async (req, res) => {
    
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

libroCtrl.addToFavorites = async (req, res) => {
    try {
      const { id } = req.params; // Asegúrate de que `id` es el ID del libro
      const userId = req.user._id; // Asume que `verifyUser` ha añadido `user` al request
  
      // Encuentra el libro por ID
      const libro = await Libro.findById(id);
      if (!libro) {
        return res.status(404).json({ message: 'Libro no encontrado' });
      }
  
      // Verifica si el usuario ya ha añadido el libro a favoritos
      if (libro.usuarios.includes(userId)) {
        return res.status(400).json({ message: 'El libro ya está en tus favoritos' });
      }
  
      // Añade el usuario a la lista de usuarios del libro y actualiza el contador
      libro.usuarios.push(userId);
      libro.contador += 1;
  
      // Guarda los cambios en el libro
      await libro.save();
  
      // También añade el libro a la lista de libros favoritos del usuario
      const usuario = await Usuario.findById(userId);
      usuario.libros.push(id);
      await usuario.save();
  
      res.json({ message: 'Libro añadido a favoritos', libro });
    } catch (error) {
      res.status(500).json({ message: 'Error al añadir a favoritos', error });
    }
  };

module.exports = libroCtrl;