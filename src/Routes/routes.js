const express = require('express');
const router = express.Router();
const dataService = require('../Services/dataService'); // Importa el módulo de servicio de datos

router.get('/', (req, res) => res.send('Hello World!'));

router.get('/infoTramosAndClientes', dataService.getInfoTramosAndClientes);
router.get('/infoTop', dataService.getInfoTop);

module.exports = router;
