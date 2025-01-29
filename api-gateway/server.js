require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const SERVICES = {
    auth: process.env.AUTH_SERVICE_URL || 'http://localhost:5000',
    notifications: process.env.NOTIFICATIONS_SERVICE_URL || 'http://localhost:5002',
    reports: process.env.REPORTS_SERVICE_URL || 'http://localhost:5001',
};

const proxyRequest = async (req, res, serviceUrl) => {
    try {
        const url = `${serviceUrl}${req.originalUrl}`;
        console.log(`Redirigiendo petición a: ${url}`);

        const response = await axios({ method: req.method, url, data: req.body });
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error en el proxy:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
};

app.use('/auth', (req, res) => proxyRequest(req, res, SERVICES.auth));
app.use('/notifications', (req, res) => proxyRequest(req, res, SERVICES.notifications));
app.use('/reports', (req, res) => proxyRequest(req, res, SERVICES.reports));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API Gateway corriendo en http://localhost:${PORT}`);
});
