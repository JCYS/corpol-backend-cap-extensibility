const cds = require('@sap/cds');
const cron = require('node-cron');

module.exports = cds.service.impl(async function () {

    const odataService = await cds.connect.to('LetraAccountReceivableSrv');
    const bupa = await cds.connect.to('API_BUSINESS_PARTNER');

    this.on("READ", "AccountReceivableBasic", async (req) => {
        return odataService.run(req.query);
    });

    this.on("READ", "Customer", async (req) => {
        return bupa.run(req.query);
    });

    const { Planilla, Letras } = cds.entities("Letras");

    async function recalcularPorPlanilla(planillaId, req) {
        if (!planillaId) return;

        const planilla = await SELECT.one
            .from(Planilla)
            .where({ ID: planillaId })
            .columns(["ImporteTotal"]);

        if (!planilla) {
            // si quieres que sea error:
            // return req?.error(404, "Planilla no encontrada");
            return;
        }

        const countResult = await SELECT.from(Letras)
            .where({ Planilla_ID: planillaId })
            .columns("count(*) as total");

        const nroLetras = Number(countResult[0]?.total || 0);

        // si no quedan letras, no prorrateamos
        if (nroLetras <= 0) return;

        const importePorLetra =
            Math.round((planilla.ImporteTotal / nroLetras) * 100) / 100;

        await UPDATE(Letras)
            .set({ TotalMonedaDocumento: importePorLetra })
            .where({ Planilla_ID: planillaId });
    }

    this.after("CREATE", "Letras", async (data, req) => {
        const planillaId = data?.Planilla_ID; // <-- aquí está la diferencia
        if (!planillaId) return req.error(400, "La Letra debe estar asociada a una Planilla");
        await recalcularPorPlanilla(planillaId, req);
    });


    this.before("DELETE", "Letras", async (req) => {
        const id = req.data?.ID;
        if (!id) return;

        const row = await SELECT.one.from(Letras).columns(["Planilla_ID"]).where({ ID: id });
        req._planillaIdToRecalc = row?.Planilla_ID;
    });

    this.after("DELETE", "Letras", async (data, req) => {
        await recalcularPorPlanilla(req._planillaIdToRecalc, req);
    });

});
