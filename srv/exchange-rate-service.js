const cds = require('@sap/cds');
const cron = require('node-cron');

module.exports = cds.service.impl(async function () {

    const exchangeRateAPI = await cds.connect.to('ExchangeRateService');
    const { ExchangeRate } = this.entities;


    const jobTipoCambio = cron.schedule('0 * * * *', async () => { //--- Ejecución al inicio de cada hora

    //const jobTipoCambio = cron.schedule('* * * * *', async () => { //--- Ejecución a cada minuto

        console.log('[JOB] [FI] [Exchange Rate] - Sincronizando tipo de cambio');

        try {

            // Obtener la fecha actual en formato ISO (sin hora)
            const today = new Date().toISOString().split('T')[0];

            // Consultar la API para obtener los tipos de cambio del día actual
            const externalRates = await exchangeRateAPI.run(
                SELECT.from('YY1_ExchangeRate')
                    .where({ ExchangeRateEffectiveDate: today }) // Filtrar por la fecha actual
            );

            if (!externalRates || externalRates.length === 0) {

                console.log('[JOB] [FI] [Exchange Rate] - No se encontraron tipos de cambio para el día actual.');
                return;
            
            }

            console.log(`[JOB] [FI] [Exchange Rate] - Se encontraron ${externalRates.length} registros para el día ${today}.`);

            // Eliminar datos del día actual en ExchangeRate
            await cds.run(DELETE.from(ExchangeRate).where({ ExchangeRateEffectiveDate: today }));
            console.log('[JOB] [FI] [Exchange Rate] - Registros existentes del día actual eliminados.');

            // Insertar los nuevos datos
            await cds.run(INSERT.into(ExchangeRate).entries(externalRates));
            console.log('[JOB] [FI] [Exchange Rate] - Datos actualizados correctamente en ExchangeRate.');

        } catch (error) {
            console.error('[JOB] [FI] [Exchange Rate] - Error al ejecutar el job:', error);
        }
    });

    jobTipoCambio.start();

});
