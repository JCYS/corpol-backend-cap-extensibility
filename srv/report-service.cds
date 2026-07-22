namespace Letras;

// extend entity ![Letras.Letras] with {
//
//   @title : '{i18n>letra_NetPaymentDaysLetra}'
//   NetPaymentDaysLetra: Integer;
//
//   @title : '{i18n>letra_DueCalculationBaseDateLetra}'
//   DueCalculationBaseDateLetra: Date;
// }
using { LetraAccountReceivableSrvV2  as LetrasReadEntity} from './external/LetraAccountReceivableSrvV2';

service ReportLetras {
  entity AccRecItemAltGL as projection on LetrasReadEntity.I_AccRecItemAltGL;
}