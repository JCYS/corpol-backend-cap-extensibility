using {wms as model} from '../db/wms-schema';


service WMSService {

    entity ItemAndBarcode    as projection on model.ItemAndBarcode;
    entity Vendor            as projection on model.Vendor;
    entity PurchaseOrder     as projection on model.PurchaseOrder;
    entity PurchaseOrderItem as projection on model.PurchaseOrderItem;
    entity ASNHdrCompras     as projection on model.ASNHdrCompras;
    entity ASNDtlCompras     as projection on model.ASNDtlCompras;

}