const cds = require('@sap/cds');
const cron = require('node-cron');

module.exports = cds.service.impl(async function () {

    const odataService = await cds.connect.to('LetraAccountReceivableSrv');

    const bupa = await cds.connect.to('API_BUSINESS_PARTNER')

    this.on("READ", "AccountReceivableBasic", async (req) => {
        return odataService.run(req.query);
    });

    this.on("READ", "Customer", async (req) => {
        return bupa.run(req.query);
    });

});
