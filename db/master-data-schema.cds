namespace master.data;

using {managed} from '@sap/cds/common';

entity GlobalConfig{
    key GlobalSettingId             : Int32;
        terminal                    : String(100);
}

entity GlobalSetting : managed {
    key GlobalSettingId             : Int32;
        GlobalSettingModule         : String(100) not null;
        GlobalSettingType           : String(100) not null;
        GlobalSettingName           : String(100) not null;
        GlobalSettingClassification : String(20);
        GlobalSettingCode           : String(20);
        GlobalSettingValue          : String(500);
        GlobalSettingValue2         : String(100);
        GlobalSettingValue3         : String(100);
        GlobalSettingValue4         : String(100);
        GlobalSettingValue5         : String(100);
        GlobalSettingDescription    : String(200);
        GlobalSettingPatternId      : Integer;
        GlobalSettingStatus         : String(20);
        GlobalSettingIsEditable     : Boolean;
        GlobalSettingIsDeletable    : Boolean;
        GlobalSettingIsBlocked      : Boolean;
        terminal                    : String(100);
}

entity Region {
    key Country    : String(10);
    key Region     : String(10);
    key Language   : String(10);
        RegionName : String(30);
}

entity Company {
    key companyCode              : String(4); // Company Code (máx. 4 caracteres)
        companyCodeName          : String(25); // Nombre del código de la compañía
        cityName                 : String(25); // Nombre de la ciudad
        country                  : String(3); // Código de país (máx. 3 caracteres, ISO)
        currency                 : String(5); // Moneda (máx. 5 caracteres)
        language                 : String(2); // Idioma (máx. 2 caracteres)
        company                  : String(6); // Nombre de la compañía (máx. 6 caracteres)
        creditControlArea        : String(4); // Área de control de crédito (máx. 4 caracteres)
        extendedWhldgTaxIsActive : Boolean; // Impuesto de retención extendido (booleano)
        companyLogo              : String(5000); // Logo de la compañía
        companyIdentification    : String(20); // Identificación de la compañía (máx. 100 caracteres)
        companyPrincipalAddress  : String(300);
}

entity Currency {
    key CurrencyCode   : String(3); // Código de moneda (máx. 3 caracteres)
        CurrencyName   : String(25); // Nombre de la moneda (máx. 25 caracteres)
        CurrencySymbol : String(5); // Símbolo de la moneda (máx. 5 caracteres)
}

entity MasterDataStatus {
    key statusId          : Integer; // Clave primaria de la entidad
        statusDescription : String(50); // Descripción del estado (longitud 50, no nulo)
}
