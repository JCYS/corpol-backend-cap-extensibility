module.exports = cds.service.impl(function () {

  /**
   * Hooks del servicio CAP
   */
  this.on("CREATE", "GlobalSetting", async (req) => {

    console.log("ON CREATE GlobalSetting");

    return newSetting;

  });

  this.before("UPDATE", "GlobalSetting", async (req) => {

    console.log("BEFORE UPDATE GlobalSetting");

    return oNewData; // Continuar con la actualización

  });
});
