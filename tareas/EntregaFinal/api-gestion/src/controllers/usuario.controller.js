const prisma = require('../config/prisma');

const getUsuarios = async (req, res, next) =>{
    try {
        const usuario = await prisma.usuario.findMany({
            select: {id: true, nombre: true, email: true, creadoEn: true, activo:true},
            where: { activo: true }
        });
        res.json(usuario);
    } catch (error) {
        next(error);
    }
}

const getUsuarioById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuario = await prisma.usuario.findFirst({
            where: { id: parseInt(id) },
            where: { activo: true },
            select: { id: true, nombre: true, email: true, creadoEn: true, activo:true},
        });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        next(error);
    }
};

const createUsuario = async (req, res, next)=>{
    try {
        const { nombre, email, password } = req.body;
        const existingUsuario = await prisma.usuario.findUnique({
            where: { email },
        });

        if (existingUsuario) {
            return res.status(400).json({ message: 'El email ya está en uso' });
        }
        const newUsuario = await prisma.usuario.create({
            data: { nombre, email, password },
            select: { id: true, nombre: true, email: true, creadoEn: true },
        });
        res.status(201).json(newUsuario);
    } catch (error) {
        next(error)
    }
}

const updateUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, email, password } = req.body;
        const data = {};

        if (nombre !== undefined) data.nombre = nombre;
        if (email !== undefined) data.email = email;
        if (password !== undefined) data.password = password;

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ message: 'No se enviaron campos para actualizar' });
        }

        const usuarioExistente = await prisma.usuario.findFirst({
            where: { 
                id: parseInt(id),
                activo: true 
            }
        });

        if (!usuarioExistente) {
            return res.status(404).json({ message: 'Usuario no encontrado o se encuentra inactivo' });
        }

        const updatedUsuario = await prisma.usuario.update({
            where: { id: parseInt(id) },
            data,
            select: { id: true, nombre: true, email: true, creadoEn: true }, 
        });

        res.json(updatedUsuario);

    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
        }
        next(error);
    }
};
const deleteUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuarioInactivado = await prisma.usuario.update({
            where: { id: Number(id) },
            data: { activo: false }, 
        });

        res.status(204).send(); 

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        next(error);
    }
}

module.exports = {getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario}