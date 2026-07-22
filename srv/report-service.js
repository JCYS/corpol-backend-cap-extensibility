const cds = require('@sap/cds');
const cron = require('node-cron');

module.exports = cds.service.impl(async function () {

    const odataService = await cds.connect.to('LetraAccountReceivableSrv');
    const odataService2 = await cds.connect.to('LetraAccountReceivableSrvV2');

    this.on("READ", "AccRecItemAltGL", async (req) => {
        return odataService2.run(req.query);
    });

});
