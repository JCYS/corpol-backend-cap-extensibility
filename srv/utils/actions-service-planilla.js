const cds = require("@sap/cds");
//const db = await cds.connect.to("db"); // connect to database service
//const { EstadoLetras, Letras, EstadoPlanilla, Planilla, ViewPlanilla, PlanillaLog } = cds.entities("LetrasService");

_setLogPlanilla = async (sEvento, sDetalle, oObject) => {
  const db = await cds.connect.to("db"); // connect to database service
  const {
    EstadoLetras,
    Letras,
    EstadoPlanilla,
    Planilla,
    ViewPlanilla,
    PlanillaLog,
  } = cds.entities("LetrasService");
  console.log(sEvento, sDetalle, oObject.ID);
  const tmp = await db.run(
    INSERT.into(PlanillaLog, {
      Evento: sEvento,
      Detalle: sDetalle,
      Planilla_ID: oObject.ID,
    })
  );
  console.log(tmp);
};

func2 = async () => {};
module.exports = { _setLogPlanilla, func2 };
