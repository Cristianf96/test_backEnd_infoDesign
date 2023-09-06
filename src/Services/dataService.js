const path = require('path');
const fs = require('fs').promises;
const moment = require('moment');

const jsonFilePath = path.join(__dirname, '../../src', 'utils', 'dataFakeJson.json');

const filtrarPorFecha = (item, fechaInicial, fechaFinal) => {
    const fechaItem = moment(item.Fecha).format("YYYY-MM-DD");
    const fechaInicio = moment(fechaInicial).format("YYYY-MM-DD");
    const fechaFin = moment(fechaFinal).format("YYYY-MM-DD");
    return fechaItem >= fechaInicio && fechaItem <= fechaFin;
}

const getInfoTramosAndClientes = async (req, res) => {
    try {
        const data = await fs.readFile(jsonFilePath, 'utf8');
        const jsonData = JSON.parse(data);

        const dateInicial = req.query.dateInicial;
        const dateFinal = req.query.dateFinal;

        const datosFiltradosConsumo = jsonData.CONSUMO_POR_TRAMO.filter(item => filtrarPorFecha(item, dateInicial, dateFinal));
        const datosFiltradosCostos = jsonData.COSTOS_POR_TRAMO.filter(item => filtrarPorFecha(item, dateInicial, dateFinal));
        const datosFiltradosPerdidas = jsonData.PERDIDAS_POR_TRAMO.filter(item => filtrarPorFecha(item, dateInicial, dateFinal));

        res.json({
            datosFiltradosConsumo,
            datosFiltradosCostos,
            datosFiltradosPerdidas
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
};

const getInfoTop = async (req, res) => {
    try {
        const data = await fs.readFile(jsonFilePath, 'utf8');
        const jsonData = JSON.parse(data);

        const dateInicial = req.query.dateInicial;
        const dateFinal = req.query.dateFinal;

        const datosFiltradosPerdidas = jsonData.PERDIDAS_POR_TRAMO.filter(item => filtrarPorFecha(item, dateInicial, dateFinal));

        res.json({
            datosFiltradosPerdidas
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
};

module.exports = {
    getInfoTramosAndClientes,
    getInfoTop
};
