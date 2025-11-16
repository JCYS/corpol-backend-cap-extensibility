const cds = require("@sap/cds");
const cron = require("node-cron");
const { _setLogPlanilla } = require("./utils/actions-service-planilla.js");
const { EventType } = require("./utils/enum-events.js");
const { _sumL, _formatResponse } = require("./utils/actions-service-letras.js");

module.exports = cds.service.impl(async function () {
  const db = await cds.connect.to("db"); // connect to database service
  const { EstadoLetras, Letras, EstadoPlanilla, Planilla, ViewPlanilla } =
    cds.entities("LetrasService"); // get reflected definitions

  const odataService = await cds.connect.to("LetraAccountReceivableSrv");
  const { I_AccountReceivable } = odataService.entities;

  const bupa = await cds.connect.to("API_BUSINESS_PARTNER");
  const { A_BusinessPartner, A_CustomerCompany } = bupa.entities;

  //FOR TESTING{
  this.on("_onGoingProcess", async (req) => {
    const resultMultiple = await db.run([
      SELECT.from(EstadoLetras),
      SELECT.from(EstadoPlanilla),
      SELECT.from(Letras).where({
        Planilla_ID: "11111111-1111-1111-1111-111111111111",
      }),
      SELECT.from(Planilla, "11111111-1111-1111-1111-111111111111"),
    ]);
    console.log(resultMultiple);
    let result = {};
    result.success = resultMultiple;
    if (req.data.category === 1) {
      result.category = "Category 1";
      result.field1 = "Random Field Value";
      result.field2 = [{ f1: "f1 Value1" }];
    } else {
      result.category = { Info: "Category2" };
      result.field1 = "Random Field Value";
      result.field2 = [
        { f1: "f1 Value1" },
        { f1: "f1 Value2", f2: "f2 Value2" },
      ];
    }
    return result;
  });
  this.on("MyAction", async (req) => {
    try {
      const oP = req.data.input;
      const oCalc = await _sumL(oP, db);
      console.log("==> Response ");
      console.log(oCalc);
      if (oCalc.finished == false) {
        console.log("False");
        throw new CustomError(
          `Planilla ${oCalc.Numero}`,
          `Descripcion: ${oCalc.message}`,
          "Tagert error",
          "Messagesssss",
          {
            status: 400,
            details: [
              {
                field: "someValue",
                message: "This field is mandatory.",
                code: "Error",
              },
            ],
          }
        );
      } else {
        console.log("true");
        const oPU = await db.run(SELECT.from(ViewPlanilla, oP.ID));
        return await _formatResponse(oPU);
      }
    } catch (err) {
      if (err instanceof CustomError) {
        console.log("====>");
        console.log(err.details);
        //return
        req.error({
          code: err.code,
          message: err.message,
          messages: err.messages,
          target: err.target,
          status: err.details.status,
          details: err.details.details,
        });
      } else {
        console.log(err);
        req.error({
          code: "ERR_UNKNOWN",
          message: "An unknown error occurred",
          status: 500,
        });
      }
    }
  });
  this.on("_onGoingProcessService", async (req) => {

    let errores = []

    try {

      const oP = req.data.input;

      //--- Obtenemos el listado de letras
      var letras = await db.run(SELECT.from(Letras).where({ Planilla_ID: oP.ID }));

      //--- Validamos que todos los campos requeridos estén completados
      if (!letras || letras.length <= 0) {

        throw new CustomError(
          `Planilla ${oP.Planilla}`,
          `Descripcion: Para poder iniciar el proceso es necesario que por lo menos tenga una letra.`,
          "Tagert error"
        );

      }

      letras.forEach(letra => {

        if (!letra.TipoLetra_Codigo || letra.TipoLetra_Codigo === '') {

          errores.push({
            code: "Error",
            message: `La letra ${letra.Code} no tiene completo el campo Tipo de Letra.`
          })

        }

        if (!letra.TotalMonedaDocumento) {

          errores.push({
            code: "Error",
            message: `La letra ${letra.Code} No tiene completo el campo Total Moneda Documento.`
          })

        }

      });

      if( errores && errores.length > 0 ) {

        throw new CustomError(
          `Planilla ${oP.Planilla}`,
          `Descripcion: Errores`,
          "Tagert error",
          "Messagesssss",
          {
            status: 400,
            details: errores
          }
        )

      }

      const oEP = await db.run(SELECT.from(EstadoPlanilla, "ST_002"));
      const oCalc = await _sumL(oP, db);
      console.log("==> Response ");
      console.log(oCalc);
      if (!oCalc.finished) {
        console.log("False");
        throw new CustomError(
          `Planilla ${oCalc.Numero}`,
          `Descripcion: ${oCalc.message}`,
          "Tagert error",
          "Messagesssss",
          {
            status: 400,
            details: [
              {
                field: "someValue",
                message: `Descripcion: ${oCalc.message}`,
                code: "Error",
              },
            ],
          }
        );
      }
      await db.run(
        UPDATE(Planilla, oP.ID).with({
          EstadoPlanilla_Codigo: oEP.Codigo,
        })
      );
      await _setLogPlanilla(EventType.UPDATE, "Planilla en proceso.", oP);

      const oPU = await db.run(SELECT.from(ViewPlanilla, oP.ID));

      return _formatResponse(oPU, "enviada a procesar satisfactoriamente.");
    } catch (err) {
      if (err instanceof CustomError) {
        console.log("====>");
        console.log(err.details);
        //return
        req.error({
          code: err.code,
          message: err.message,
          messages: err.messages,
          target: err.target,
          status: err.details.status,
          details: err.details.details,
        });
      } else {
        req.error({
          code: "ERR_UNKNOWN",
          message: "An unknown error occurred",
          status: 500,
        });
      }
    }
  });
  this.on("_onDeleteProcess", async (req) => {
    // const oP = req.data.input;
    // await db.run(
    //   UPDATE(Planilla, oP.ID).with({
    //     EstadoPlanilla_Codigo: "ST_001",
    //   })
    // );
    // return;
    try {
      //const aP = await db.run(SELECT.from(ViewPlanilla, oP.ID));
      const oEP = await db.run(SELECT.from(EstadoPlanilla, "ST_005"));
      if (
        !["ST_003", "ST_004", "ST_005"].includes(
          ViewPlanilla.EstadoPlanillaCode
        )
      ) {
        await db.run(
          UPDATE(Planilla, oP.ID).with({
            EstadoPlanilla_Codigo: oEP.Codigo,
          })
        );
        await _setLogPlanilla(
          EventType.DELETE,
          "Planilla en estado eliminado.",
          oP
        );
      }
      const oPU = await db.run(SELECT.from(ViewPlanilla, oP.ID));
      return _formatResponse(oPU, "en estado eliminado.");
    } catch (error) {
      return error;
    }
  });
  this.on("_onGoingDraftService", async (req) => {
    var oP = req.data.input;
    const oEP = await db.run(SELECT.from(EstadoPlanilla, "ST_001"));
    console.log(oEP);
    await db.run(
      UPDATE(Planilla, oP.ID).with({
        EstadoPlanilla_Codigo: oEP.Codigo,
      })
    );
    await _setLogPlanilla(EventType.UPDATE, "Planilla en borador.", oP);
    const aP = await db.run(SELECT.from(ViewPlanilla, oP.ID));
    return aP;
  });
});
class CustomError extends Error {
  constructor(code, message, target, messages, details = {}) {
    super(message);
    this.code = code;
    this.details = details;
    this.target = target;
    this.messages = messages;
  }
}

// this.on("_onGoingProcess", async (req) => {
//   //await cds.post(EstadoLetras).entries({ Codigo: 'STL_006', Descripcion: 'Estado Prueba' })
//   //await cds.run( INSERT.into(EstadoLetras,{ Codigo: 'STL_009', Descripcion: 'Estado Prueba' }) )
//   //const response = await cds.update(EstadoLetras,"STL_005").with({Descripcion:'Refinanciado Prueba'})
//   //const responses = await cds.read(EstadoLetras)
//   //await db.delete(EstadoLetras,'STL_009')

//   const resultMultiple = await db.run([
//     SELECT.from(EstadoLetras),
//     SELECT.from(EstadoPlanilla),
//     SELECT.from(Letras).where({
//       Planilla_ID: "11111111-1111-1111-1111-111111111111",
//     }),
//     SELECT.from(Planilla, "11111111-1111-1111-1111-111111111111"),
//   ]);
//   console.log(resultMultiple);

//   // console.log(responses)

//   //const results2 = await db.run( SELECT.from(Letras,"11111111-1111-1111-1111-111111111111") )
//   // const results2 = await db.run( SELECT.from(Letras).where({Planilla_ID:'11111111-1111-1111-1111-111111111111'}) )
//   //     console.log(results2)
//   //console.log(results2)

//   let result = {};
//   result.success = resultMultiple;
//   if (req.data.category === 1) {
//     result.category = "Category 1";
//     result.field1 = "Random Field Value";
//     result.field2 = [{ f1: "f1 Value1" }];
//   } else {
//     result.category = { Info: "Category2" };
//     result.field1 = "Random Field Value";
//     result.field2 = [
//       { f1: "f1 Value1" },
//       { f1: "f1 Value2", f2: "f2 Value2" },
//     ];
//   }
//   return result;
// });
// this.on("MyAction", async (req) => {
//   console.log(req.data);
//   //await db.run( INSERT.into(EstadoLetras,{ Codigo: 'STL_009', Descripcion: 'Estado Prueba' }) )
//   await db.run(
//     UPDATE(EstadoLetras, "STL_005").with({ Descripcion: "Refinanciado" })
//   );
//   const results2 = await db.run(SELECT.from(EstadoLetras));
//   console.log(results2);
//   req.data["AdditionalField"] = results2;
//   return req.data;
// });
// this.on("_onGoingProcessService", async (req) => {
//   // console.log(req.data.input);
//    var oP = req.data.input;
//   // var nTotal = Number(oP.ImporteTotal);
//   // var nSum = Number("0");
//   // var aL = await db.run(SELECT.from(Letras).where({ Planilla_ID: oP.ID }));
//   // const results2 = await db.run(SELECT.from(EstadoLetras));
//   // var bFlag = false;
//   // for (const [index, element] of aL.entries()) {
//   //   console.log({ index, element });
//   //   nSum += Number(element.TotalMonedaDocumento);
//   //   if(Number(element.TotalMonedaDocumento) <= 0){
//   //     bFlag = true;
//   //   }

//   // }
//   // if (bFlag) {
//   //     req.error ({
//   //         code: 'Some-Custom-Code',
//   //         message: 'Some Custom Error Message',
//   //         target: 'some_field',
//   //         status: 400,
//   //         arg:results2
//   //       })
//   //   }
//   // console.log(nTotal);
//   // console.log(nSum);

//   // if (nTotal > nSum) {
//   //     return req.error(400, "La suma de las letras no son iguales");
//   // } else {
//   //     return req.error(400, "La suma de las letras no debe sobrepasar al total.");
//   // }

//   const oEP = await db.run(SELECT.from(EstadoPlanilla, "ST_002"));
//   console.log(oEP);
//   await db.run(
//     UPDATE(Planilla, oP.ID).with({
//       EstadoPlanilla_Codigo: oEP.Codigo,
//     })
//   );
//   const aP = await db.run(SELECT.from(ViewPlanilla,oP.ID));

//   // try {
//   //   // Simulate an error condition

//   //   throw new CustomError(
//   //     "ERR_MISSING_VALUE",
//   //     "The required value is missing",
//   //     {
//   //       status: 400,
//   //       details: { field: "someValue", message: "This field is mandatory." },
//   //       mesagges: { field: "someValue", message: "This field is mandatory." },
//   //     }
//   //   );

//   //   // Normal processing
//   //   return { success: true };
//   // } catch (err) {
//   //   if (err instanceof CustomError) {
//   //     req.error({
//   //       code: err.code,
//   //       message: err.message,
//   //       target: err.details.details.field,
//   //       status: err.details.status,
//   //       details: [
//   //         {
//   //           code: "Some-Custom-Code",
//   //           message: "Some Custom Error Message",
//   //           target: "some_field",
//   //           status: 418,
//   //         },
//   //       ],
//   //     });
//   //   } else {
//   //     req.error({
//   //       code: "ERR_UNKNOWN",
//   //       message: "An unknown error occurred",
//   //       status: 500,
//   //     });
//   //   }
//   // }

//   // const errorObject = {
//   //   code: "ERR_MISSING_VALUE", // Custom error code
//   //   message: 'The "value" field is required.', // User-friendly error message
//   //   target: "value", // Target field causing the error
//   //   status: 400, // HTTP status code
//   //   details: [
//   //     {
//   //       code: "Some-Custom-Code",
//   //       message: "Some Custom Error Message",
//   //       target: "some_field",
//   //       status: 418,
//   //       details:[{
//   //         code: "Some-Custom-Code",
//   //         message: "Some Custom Error Message",
//   //         target: "another_field",
//   //         status: 418,
//   //       }],
//   //     },
//   //     {
//   //       code: "Some-Custom-Code",
//   //       message: "Some Custom Error Message",
//   //       target: "another_field",
//   //       status: 418,
//   //     },
//   //   ],
//   // };

//   // Send the custom error using req.error()
//   //req.error(errorObject);
//   //return req.data;
//   return aP;

//   //await db.run( INSERT.into(EstadoLetras,{ Codigo: 'STL_009', Descripcion: 'Estado Prueba' }) )
//   //await db.run( UPDATE(EstadoLetras,'STL_005').with({Descripcion:'Refinanciado'}) )
//   // req.data["AdditionalField"] = results2;
//   //const response = await cds.update(Planilla,"STL_005").with({Descripcion:'Refinanciado Prueba'})
// });
// this.on("_onGoingDraftService", async (req) => {
//   // console.log(req.data.input);
//    var oP = req.data.input;
//   // var nTotal = Number(oP.ImporteTotal);
//   // var nSum = Number("0");
//   // var aL = await db.run(SELECT.from(Letras).where({ Planilla_ID: oP.ID }));
//   // const results2 = await db.run(SELECT.from(EstadoLetras));
//   // var bFlag = false;
//   // for (const [index, element] of aL.entries()) {
//   //   console.log({ index, element });
//   //   nSum += Number(element.TotalMonedaDocumento);
//   //   if(Number(element.TotalMonedaDocumento) <= 0){
//   //     bFlag = true;
//   //   }

//   // }
//   // if (bFlag) {
//   //     req.error ({
//   //         code: 'Some-Custom-Code',
//   //         message: 'Some Custom Error Message',
//   //         target: 'some_field',
//   //         status: 400,
//   //         arg:results2
//   //       })
//   //   }
//   // console.log(nTotal);
//   // console.log(nSum);

//   // if (nTotal > nSum) {
//   //     return req.error(400, "La suma de las letras no son iguales");
//   // } else {
//   //     return req.error(400, "La suma de las letras no debe sobrepasar al total.");
//   // }

//   const oEP = await db.run(SELECT.from(EstadoPlanilla, "ST_001"));
//   console.log(oEP);
//   await db.run(
//     UPDATE(Planilla, oP.ID).with({
//       EstadoPlanilla_Codigo: oEP.Codigo,
//     })
//   );
//   const aP = await db.run(SELECT.from(ViewPlanilla,oP.ID));

//   // try {
//   //   // Simulate an error condition

//   //   throw new CustomError(
//   //     "ERR_MISSING_VALUE",
//   //     "The required value is missing",
//   //     {
//   //       status: 400,
//   //       details: { field: "someValue", message: "This field is mandatory." },
//   //       mesagges: { field: "someValue", message: "This field is mandatory." },
//   //     }
//   //   );

//   //   // Normal processing
//   //   return { success: true };
//   // } catch (err) {
//   //   if (err instanceof CustomError) {
//   //     req.error({
//   //       code: err.code,
//   //       message: err.message,
//   //       target: err.details.details.field,
//   //       status: err.details.status,
//   //       details: [
//   //         {
//   //           code: "Some-Custom-Code",
//   //           message: "Some Custom Error Message",
//   //           target: "some_field",
//   //           status: 418,
//   //         },
//   //       ],
//   //     });
//   //   } else {
//   //     req.error({
//   //       code: "ERR_UNKNOWN",
//   //       message: "An unknown error occurred",
//   //       status: 500,
//   //     });
//   //   }
//   // }

//   // const errorObject = {
//   //   code: "ERR_MISSING_VALUE", // Custom error code
//   //   message: 'The "value" field is required.', // User-friendly error message
//   //   target: "value", // Target field causing the error
//   //   status: 400, // HTTP status code
//   //   details: [
//   //     {
//   //       code: "Some-Custom-Code",
//   //       message: "Some Custom Error Message",
//   //       target: "some_field",
//   //       status: 418,
//   //       details:[{
//   //         code: "Some-Custom-Code",
//   //         message: "Some Custom Error Message",
//   //         target: "another_field",
//   //         status: 418,
//   //       }],
//   //     },
//   //     {
//   //       code: "Some-Custom-Code",
//   //       message: "Some Custom Error Message",
//   //       target: "another_field",
//   //       status: 418,
//   //     },
//   //   ],
//   // };

//   // Send the custom error using req.error()
//   //req.error(errorObject);
//   //return req.data;
//   return aP;

//   //await db.run( INSERT.into(EstadoLetras,{ Codigo: 'STL_009', Descripcion: 'Estado Prueba' }) )
//   //await db.run( UPDATE(EstadoLetras,'STL_005').with({Descripcion:'Refinanciado'}) )
//   // req.data["AdditionalField"] = results2;
//   //const response = await cds.update(Planilla,"STL_005").with({Descripcion:'Refinanciado Prueba'})
// });
