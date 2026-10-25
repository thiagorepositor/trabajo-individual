const express = require('express');
const cors = require('cors'); // 1. Importar el paquete cors
const app = express();
const PORT = 5000;

// 2. Habilitar CORS para permitir peticiones desde tu frontend (ej. React con Vite en el puerto 5173)
// Cámbialo por esto para permitir cualquier origen sin restricciones
app.use(cors());

// Middleware para analizar JSON
app.use(express.json());

// Middleware propio para mostrar las peticiones en consola
app.use((req, res, next) => {
    console.log(req.method + ' ' + req.path);
    next();
});

// Ruta de inicio
app.get('/inicio', (req, res) => {
    res.status(200).json({
        mensaje: 'Hola, bienvenido a paginathiago'
    });
});

// Ruta de información
app.get('/informacion', (req, res) => {
    res.status(200).json({
        mensaje: 'aqui podras comprar cualquier objeto musical'
    });
});

// Ruta POST para solicitudes
app.post('/solicitudes', (req, res) => {
    const { nombre, apellido, correo } = req.body || {};

    // Validar que los datos esten completos y sean strings válidos
    if (
        typeof nombre !== 'string' || nombre.trim() === '' ||
        typeof apellido !== 'string' || apellido.trim() === '' ||
        typeof correo !== 'string' || correo.trim() === ''
    ) {
        return res.status(400).json({
            mensaje: 'Debes enviar nombre, apellido y correo'
        });
    }

    // Validar el formato del correo
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correo.trim())) {
        return res.status(400).json({
            mensaje: 'El correo no tiene un formato valido'
        });
    }

    // Respuesta cuando la solicitud es valida (201 Created)
    res.status(201).json({
        dato_enviado: nombre,
        dato_apellido: apellido,
        dato_correo: correo,
        mensaje: 'La solicitud fue recibida correctamente'
    });
});

// Respuesta para rutas que no existen (404 Not Found)
app.use((req, res) => {
    res.status(404).json({
        mensaje: 'La ruta solicitada no existe'
    });
});

// Manejo de errores del servidor (500 Internal Server Error)
app.use((err, req, res, next) => {
    console.error(err);

    if (res.headersSent) {
        return next(err);
    }

    res.status(500).json({
        mensaje: 'Error interno del servidor'
    });
});

// Iniciar servidor en el puerto 5000
app.listen(PORT, () => {
    console.log('Servidor ejecutandose correctamente en el puerto ' + PORT);
});