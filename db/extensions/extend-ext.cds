namespace global.finance;

extend entity ![Letras.Letras] with {

  @title : '{i18n>letra_NetPaymentDaysLetra}'
  NetPaymentDaysLetra: Integer;

  @title : '{i18n>letra_DueCalculationBaseDateLetra}'
  DueCalculationBaseDateLetra: Date;
}