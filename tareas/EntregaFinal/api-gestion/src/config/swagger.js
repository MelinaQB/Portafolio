const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Api gestion de proyectos',
            version: '1.0.0',
            description: 'API REST para la gestion de proyectos',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Servidor de desarrollo',
            },
        ],
        components: {
            schemas: {
                Usuario: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        nombre: { type: 'string', example: 'Melina Quiñajo' },
                        email: { type: 'string', example: 'melina@example.com' },
                        creadoEn: { type: 'string', format: 'date-time' }
                    },
                },
                crearUsuario: {
                    type: 'object',
                    required: ['nombre', 'email', 'password'],
                    properties: {
                        nombre: { type: 'string', example: 'Melina Quiñajo' },
                        email: { type: 'string', example: 'melina@example.com' },
                        password: { type: 'string', example: 'Seguro123!!' }
                    },
                },
                actualizarUsuario: {
                    type: 'object',
                    properties: {
                        nombre: { type: 'string' },
                        email: { type: 'string' },
                        password: { type: 'string' }
                    }
                },
                Proyecto: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        nombre: { type: 'string', example: 'Sistema Hanami' },
                        descripcion: { type: 'string', example: 'Gestión de arreglos florales' },
                        usuarioId: { type: 'integer', example: 1 },
                        creadoEn: { type: 'string', format: 'date-time' }
                    }
                },
                CrearProyecto: {
                    type: 'object',
                    required: ['nombre', 'usuarioId'],
                    properties: {
                        nombre: { type: 'string', example: 'Nuevo Proyecto' },
                        descripcion: { type: 'string', example: 'Descripción opcional' },
                        usuarioId: { type: 'integer', example: 1 }
                    }
                },
                ActualizarProyecto: {
                    type: 'object',
                    properties: {
                        nombre: { type: 'string' },
                        descripcion: { type: 'string' },
                        usuarioId: { type: 'integer' }
                    }
                },
                Tarea: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        titulo: { type: 'string', example: 'Diseñar base de datos' },
                        descripcion: { type: 'string', example: 'Crear tablas iniciales' },
                        estado: { type: 'string', enum: ['PENDIENTE', 'EN_PROGRESO', 'COMPLETADA'] },
                        proyectoId: { type: 'integer', example: 1 },
                        usuarioId: { type: 'integer', example: 1, nullable: true },
                        creadoEn: { type: 'string', format: 'date-time' }
                    }
                },
                CrearTarea: {
                    type: 'object',
                    required: ['titulo', 'proyectoId'],
                    properties: {
                        titulo: { type: 'string', example: 'Terminar CRUD' },
                        descripcion: { type: 'string' },
                        proyectoId: { type: 'integer', example: 1 },
                        usuarioId: { type: 'integer', example: 1 }
                    }
                },
                actualizaTarea: {
                    type: 'object',
                    properties: {
                        titulo: { type: 'string' },
                        descripcion: { type: 'string' },
                        estado: { type: 'string', enum: ['PENDIENTE', 'EN_PROGRESO', 'COMPLETADA'] },
                        usuarioId: { type: 'integer' },
                        proyectoId: { type: 'integer' }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };