import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Libro from '../components/Libro';

const MisLibros = () => {
    const [listaFav, setListaFav] = useState([]);
    const [listaMasTarde, setListaMasTarde] = useState([]);
    const { loggedInUser } = useContext(AuthContext);
    const user = loggedInUser;
    const [libros, setLibros] = useState([]);

    useEffect(() => {
        const obtenerDatosUsuario = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/usuarios/${user.id}`);
                const usuario = res.data;
                setListaFav(usuario.libros.favoritos);
                setListaMasTarde(usuario.libros.mas_tarde);
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };

        if (user) {
            obtenerDatosUsuario();
        }
    }, [user]);

    useEffect(() => {
        const obtenerDatosLibros = async () => {
            try {
                const resLibros = await axios.get(`http://localhost:4000/api/libros`);
                setLibros(resLibros.data);
            } catch (error) {
                console.error('Error al obtener los libros:', error);
            }
        };

        if (user) {
            obtenerDatosLibros();
        }
    }, [user]);

    const handleMostrarModal = (id) => {
        // Lógica para mostrar modal
    };

    const handleCerrarModal = () => {
        // Lógica para cerrar modal
    };

    // Función para obtener los objetos completos de los libros favoritos
    const obtenerLibrosFavoritos = () => {
        return libros.filter(libro => listaFav.includes(libro._id));
    };

    // Función para obtener los objetos completos de los libros para ver más tarde
    const obtenerLibrosMasTarde = () => {
        return libros.filter(libro => listaMasTarde.includes(libro._id));
    };

    return (
        <div className="row">
            <h3>Lista de libros favoritos de {user?.nombre}</h3>
            {listaFav.length > 0 ? (
                obtenerLibrosFavoritos().map(libro => (
                    <Libro
                        key={libro._id}
                        libro={libro}
                        usuario={user}
                        handleMostrarModal={handleMostrarModal}
                    />
                ))
            ) : (<div>La lista de favoritos está vacía</div>)}
            <h3>Lista de libros para ver más tarde de {user?.nombre}</h3>
            {listaMasTarde.length > 0 ? (
                obtenerLibrosMasTarde().map(libro => (
                    <Libro
                        key={libro._id}
                        libro={libro}
                        usuario={user}
                        handleMostrarModal={handleMostrarModal}
                    />
                ))
            ) : (<div>La lista de libros para leer más tarde está vacía</div>)}
        </div>
    );
};

export default MisLibros;