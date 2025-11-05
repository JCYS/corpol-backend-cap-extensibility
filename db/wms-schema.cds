namespace wms;

using {managed} from '@sap/cds/common';

entity ItemAndBarcode : managed {

    key Product                      : String(50);
        PartA                        : String(30);
        DescriptionItem              : String(255);
        Barcode                      : String(40);
        UnitCost                     : String(10);
        UnitLenght                   : Decimal(13, 3);
        UnitWidth                    : Decimal(13, 3);
        UnitHeight                   : Decimal(13, 3);
        UnitWeight                   : Decimal(13, 3);
        UnitVolume                   : Decimal(13, 3);
        SeasonCode                   : String(30);
        BrandCode                    : String(30);
        CustAttr1                    : String(30);
        RetailPrice                  : String(10);
        NetCost                      : String(10);
        CurrencyCode                 : String(10);
        BarcodePack                  : String(40);
        StdPackQty                   : Decimal(5, 0);
        StdPackLength                : Decimal(13, 3);
        StdPackWidth                 : Decimal(13, 3);
        StdPackHeight                : Decimal(13, 3);
        StdPackWeight                : Decimal(13, 3);
        StdPackVolume                : Decimal(13, 3);
        BarcodeCase                  : String(40);
        StdCaseQty                   : Decimal(5, 0);
        MaxCaseQty                   : Decimal(5, 0);
        StdCaseLength                : Decimal(13, 3);
        StdCaseWidth                 : Decimal(13, 3);
        StdCaseHeight                : Decimal(13, 3);
        StdCaseWeight                : Decimal(13, 3);
        StdCaseVolume                : Decimal(13, 3);
        Dimension1                   : String(20);
        Dimension2                   : String(20);
        Dimension3                   : String(20);
        Hierarchy1Code               : String(20);
        Hierarchy1Description        : String(50);
        Hierarchy2Code               : String(20);
        Hierarchy3Code               : String(20);
        Hierarchy3Description        : String(50);
        Hierarchy4Code               : String(20);
        GroupCode                    : String(20);
        GroupDescription             : String(50);
        ExternalStyle                : String(50);
        VasGroupCode                 : String(30);
        ShortDescr                   : String(30);
        PutawayType                  : String(15);
        StackabilityCode             : String(10);
        ProductLife                  : String(4);
        PercentAcceptableProductLife : String(3);
        LpnsPerTier                  : String(5);
        TiersPerPallet               : String(5);
        VelocityCode                 : String(5);
        ReqBatchNbrFlg               : String(5);
        HarmonizedTariffCode         : String(255);
        HarmonizedTariffDescription  : String(150);
        Description3                 : String(255);
        HostAwareItemFlg             : String(5);
        UnNumber                     : String(10);
        UnClass                      : String(20);
        UnDescription                : String(150);
        HazardStatement              : String(100);
        ShippingTemperatureInstr     : String(50);

}

entity Vendor : managed {

    key BusinessPartnerIdSAP : String(50);
        VendorCode           : String(20);
        VendorName           : String(250);
        CustField1           : String(25);

}

entity PurchaseOrder : managed {

    key PurchaseOrder        : String(50);
        BusinessPartnerIdSAP : String(50);
        PoNbr                : String(30);
        FacilityCode         : String(20);
        VendorCode           : String(20);
        OrdDate              : Date;
        RefNbr               : String(50);
        PoType               : String(50);
        DeliveryDate         : Date;
        ShipDate             : Date;
        CancelDate           : Date;
        CustField1           : String(50);
        CustField3           : String(50);
        CustField4           : String(50);
        CustField5           : String(50);
        CustName             : String(50);
        CustAddr1            : String(70);

}

entity PurchaseOrderItem : managed {

    key PurchaseOrderIdSap : String(50);
    key SeqNbr             : String(9);
        ProductIdSAP       : String(50);
        ItemPartA          : String(30);
        OrdQty             : Decimal(13, 3);
        CustField1         : String(50);
        CustField2         : String(50);
        to_PurchaseOrder   : Association to PurchaseOrder;

}

entity ASNHdrCompras : managed {

    key PurchaseOrderIdSap   : String(50);
        BusinessPartnerIdSAP : String(50);
        ShipmentNbr          : String(30);
        FacilityCode         : String(20);
        TrailerNbr           : String(30);
        ShipmentType         : String(20);
        VendorInfo           : String(30);
        ShippedDate          : String(14);
        CustField3           : String(50);

}

entity ASNDtlCompras : managed {

    key PurchaseOrderIdSap : String(50);
    key SeqNbr             : String(9);
        ProductIdSAP       : String(50);
        ItemPartA          : String(30);
        ShippedQty         : Decimal(13, 3);
        PoNbr              : String(30);
        PoSeqNbr           : String(9);
        LpnLockCode        : String(15);
        to_ASNCompras      : Association to ASNHdrCompras;

}
