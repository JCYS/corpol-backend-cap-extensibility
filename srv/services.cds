using { global.finance as model } from '../db/extensions/extend-ext';
// using { cds.outbox as meess } from '../node_modules/@sap/cds/srv/outbox';


service RegionService {

  @readonly
  entity RegionCatalog as projection on model.RegionCatalog;
//   @readonly
//   entity messagesSAP as projection on meess.Messages;


}
//
//   entity regionCatalogo {
//     key country     : String(2);
//     regionCode  : String(3);
//     language    : String(1);
//     regionName  : String(100);
//   }