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
    function addDaysSafe(dateStr, days) {
        const [year, month, day] = dateStr.split('-').map(Number);

        const date = new Date(year, month - 1, day);
        date.setDate(date.getDate() + Number(days));

        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');

        return `${yyyy}-${mm}-${dd}`;
    }
    // this.after("UPDATE", "Letras", async (data, req) => {
    //     const id = req.params?.[0]?.ID || req.data?.ID || data?.ID;
    //
    //     console.log("AFTER ID:", id);
    //     console.log("AFTER DATA:", data);
    //         const letra = await SELECT.one
    //             .from(Letras)
    //             .where({ ID: id })
    //             .columns([
    //                 "ID",
    //                 "DueCalculationBaseDateLetra",
    //                 "NetPaymentDaysLetra"
    //             ]);
    //     console.log("Letras AFTER Disponible"+JSON.stringify(letra))
    //     const fechaVencimiento = addDaysSafe(
    //         letra.DueCalculationBaseDateLetra,
    //         letra.NetPaymentDaysLetra
    //     );
    //     //
    //     console.log("AFTER Letras Fecha Vencimiento Calculo "+fechaVencimiento)
    //         await UPDATE(Letras)
    //             .set({ FechaVencimiento: fechaVencimiento })
    //             .where({ ID: letra.ID });
    //     // console.log("Letras AFTER SAVE FECHA AUMENTADA"+JSON.stringify(letraUpdate))
    // });
    this.before("UPDATE", "Letras", async (req) => {
        const id = req.params?.[0]?.ID || req.data?.ID;
        if (!id) return;

        const changedBaseDate = Object.prototype.hasOwnProperty.call(
            req.data,
            "DueCalculationBaseDateLetra"
        );

        const changedDays = Object.prototype.hasOwnProperty.call(
            req.data,
            "NetPaymentDaysLetra"
        );

        if (!changedBaseDate && !changedDays) return;

        const current = await SELECT.one
            .from(Letras)
            .where({ ID: id })
            .columns([
                "DueCalculationBaseDateLetra",
                "NetPaymentDaysLetra"
            ]);

        const baseDate =
            req.data.DueCalculationBaseDateLetra ??
            current?.DueCalculationBaseDateLetra;

        const days =
            req.data.NetPaymentDaysLetra ??
            current?.NetPaymentDaysLetra;

        const fechaVencimiento = addDaysSafe(baseDate, days);

        if (fechaVencimiento) {
            req.data.FechaVencimiento = fechaVencimiento;
        }
    });

});
