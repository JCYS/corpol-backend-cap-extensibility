const cds = require("@sap/cds");
//const db = await cds.connect.to("db"); // connect to database service
const {
  EstadoLetras,
  Letras,
  EstadoPlanilla,
  Planilla,
  ViewPlanilla,
  PlanillaLog,
} = cds.entities("LetrasService");

const { JsonResponse, Message } = require("./actions-json-response");
(_formatResponse = async (oP, sMessage) => {
  console.log(oP);

  var oResponse = new JsonResponse([], [], true, true);
  oResponse.addMessage(
    new Message(
      "Success",
      "Ejecución finalizada",
      "Ejecución finalizada",
      `Planilla ${oP.Planilla} ${sMessage}`,
      "Information"
    )
  );
  oResponse.setResponse(oP);
  return oResponse;
}),
  (_sumL = async (oP, db) => {
    var oSum = {};
    var nTotal = Number(oP.ImporteTotal);
    var nSum = Number("0");
    var oLResponse = {};
    oLResponse.finished = false;
    var aL = await db.run(SELECT.from(Letras).where({ Planilla_ID: oP.ID }));

    for (const [index, element] of aL.entries()) {
      // toFixed devuelve un string, por lo que lo convertimos a número
      let value = parseFloat(Number(element.TotalMonedaDocumento).toFixed(2));
      nSum = parseFloat((nSum + value).toFixed(3));
      if (value <= 0) {
        oLResponse = element;
        break;
      }
    }

    if (oLResponse.hasOwnProperty("ID")) {
      oLResponse.message = `La letra ${oLResponse.Numero} tiene importe ${oLResponse.TotalMonedaDocumento}, ingresar un monto valido.`;
      return oLResponse;
    }

    debugger;

    if (nTotal < nSum) {
      let difference = nSum - nTotal;
      oLResponse.message = `La suma de los importes de las letras (${nSum}) supera el total del proceso (${nTotal}) por ${difference} ${oP.Moneda}. Por favor, ajuste los importes para que coincidan y poder iniciar el proceso.`;
    } else if (nTotal === nSum) {
      oLResponse.finished = true;
      oLResponse.message = `La suma de los importes de las letras coincide exactamente con el total del proceso: ${nTotal} ${oP.Moneda}.`;
    } else if (nTotal > nSum) {
      let difference = nTotal - nSum;
      oLResponse.message = `La suma de los importes de las letras (${nSum}) es inferior al total del proceso (${nTotal}) en ${difference} ${oP.Moneda}. Verifique y ajuste los importes para que sean iguales y así poder iniciar el proceso.`;
    }
    

    return oLResponse;
  });

func2 = async () => {};
module.exports = { _sumL, _formatResponse };
