namespace global.finance;

// extend entity ![Letras.Letras] with {
//
//   @title : '{i18n>letra_NetPaymentDaysLetra}'
//   NetPaymentDaysLetra: Integer;
//
//   @title : '{i18n>letra_DueCalculationBaseDateLetra}'
//   DueCalculationBaseDateLetra: Date;
// }

entity RegionCatalog {
  key country     : String(2);
  regionCode  : String(3);
  language    : String(1);
  regionName  : String(100);
}
