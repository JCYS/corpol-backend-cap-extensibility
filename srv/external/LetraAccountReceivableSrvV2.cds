/* checksum : f4d7bb39ab60ebb6ee60f4f627cdc9b8 */
@cds.external : true
@CodeList.CurrencyCodes : {
  Url: '../../../../default/iwbep/common/0001/$metadata',
  CollectionPath: 'Currencies'
}
@Common.ApplyMultiUnitBehaviorForSortingAndFiltering : true
@Capabilities.FilterFunctions : [
  'eq',
  'ne',
  'gt',
  'ge',
  'lt',
  'le',
  'and',
  'or',
  'contains',
  'startswith',
  'endswith',
  'any',
  'all'
]
@SAP__support.TechnicalInfoLinks : {
  Url: '../../../../default/iwbep/common/0001/$metadata',
  FunctionImport: 'GetTechnicalInfoLinks'
}
@Capabilities.SupportedFormats : [ 'application/json', 'application/pdf' ]
@PDF.Features : {
  DocumentDescriptionReference: '../../../../default/iwbep/common/0001/$metadata',
  DocumentDescriptionCollection: 'MyDocumentDescriptions',
  ArchiveFormat: true,
  Border: true,
  CoverPage: true,
  FitToPage: true,
  FontName: true,
  FontSize: true,
  HeaderFooter: true,
  IANATimezoneFormat: true,
  Margin: true,
  Padding: true,
  ResultSizeDefault: 20000,
  ResultSizeMaximum: 20000,
  Signature: true,
  TextDirectionLayout: true,
  Treeview: true,
  UploadToFileShare: true
}
@Capabilities.KeyAsSegmentSupported : true
@Capabilities.AsynchronousRequestsSupported : true
service LetraAccountReceivableSrvV2 {
  @cds.external : true
  type EntityControl {
    @Common.Label : 'Dyn. Method Control'
    @Common.Heading : 'Dynamic Method Control'
    @Common.QuickInfo : 'Dynamic Method Property'
    Deletable : Boolean not null;
    @Common.Label : 'Dyn. Method Control'
    @Common.Heading : 'Dynamic Method Control'
    @Common.QuickInfo : 'Dynamic Method Property'
    Updatable : Boolean not null;
  };

  @cds.external : true
  type SAP__Message {
    code : LargeString not null;
    message : LargeString not null;
    target : LargeString;
    additionalTargets : many LargeString not null;
    transition : Boolean not null;
    @odata.Type : 'Edm.Byte'
    numericSeverity : Integer not null;
    longtextUrl : LargeString;
  };

  @cds.external : true
  @cds.persistence.skip : true
  @Common.Label : 'Cuentas por cobrar'
  @Capabilities.SearchRestrictions.Searchable : false
  @Capabilities.InsertRestrictions.Insertable : false
  @Capabilities.DeleteRestrictions.Deletable : false
  @Capabilities.UpdateRestrictions.Updatable : false
  @Capabilities.UpdateRestrictions.QueryOptions.SelectSupported : true
  @Capabilities.FilterRestrictions.FilterExpressionRestrictions : [
    {
      Property: AmountInTransactionCurrency,
      AllowedExpressions: 'MultiValue'
    },
    {
      Property: AmountInCompanyCodeCurrency,
      AllowedExpressions: 'MultiValue'
    }
  ]
  entity I_AccountReceivable {
    @Common.IsUpperCase : true
    @Common.Label : 'Libro de origen'
    key SourceLedger : String(2) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Sociedad'
    key CompanyCode : String(4) not null;
    @Common.IsDigitSequence : true
    @Common.Label : 'Ejercicio'
    key FiscalYear : String(4) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Asiento contable'
    key AccountingDocument : String(10) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Pos.asiento contable'
    @Common.Heading : 'Pos.asiento contable de libro mayor'
    @Common.QuickInfo : 'Posición de asiento contable de libro mayor'
    key LedgerGLLineItem : String(6) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Ledger'
    @Common.Heading : 'Ld'
    @Common.QuickInfo : 'Ledger en contabilidad principal'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=FINS_LEDGER'
    key Ledger : String(2) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Tp.asiento contable'
    @Common.Heading : 'Tipo de asiento contable'
    @Common.QuickInfo : 'Tipo de asiento contable'
    AccountingDocumentType : String(2) not null;
    @Common.Label : 'Referencia asignac.'
    @Common.Heading : 'Referencia de asignación'
    @Common.QuickInfo : 'Referencia de asignación'
    AssignmentReference : String(18) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Código Debe/Haber'
    DebitCreditCode : String(1) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Clase de cuenta'
    @Common.Heading : 'Cl.cuenta'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=FARP_KOART'
    FinancialAccountType : String(1) not null;
    @Common.Label : 'Vencimiento neto'
    @Common.Heading : 'Venc.neto'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=FAEDT_FPOS'
    NetDueDate : Date;
    @Common.Label : 'Fecha compensación'
    @Common.Heading : 'Fe.compens.'
    @Common.QuickInfo : 'Fecha de compensación'
    ClearingDate : Date;
    @Common.IsUpperCase : true
    @Common.Label : 'Asiento compensación'
    @Common.Heading : 'Partida individual de compensación'
    @Common.QuickInfo : 'Partida individual de compensación'
    ClearingJournalEntry : String(10) not null;
    @Common.IsDigitSequence : true
    @Common.Label : 'Ejercicio asiento contable compensación'
    @Common.Heading : 'Ejercicio de la partida individual de compensación'
    @Common.QuickInfo : 'Ejercicio de la partida individual de compensación'
    ClearingJournalEntryFiscalYear : String(4) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Documento referencia'
    @Common.Heading : 'Doc.ref.'
    @Common.QuickInfo : 'Número de documento de referencia'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=AWREF'
    ReferenceDocument : String(10) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Clase doc.referencia'
    @Common.Heading : 'Clase de documento referencia'
    @Common.QuickInfo : 'Tipo de documento de referencia'
    ReferenceDocumentType : String(5) not null;
    @Common.Label : 'Fe.asiento contable'
    @Common.QuickInfo : 'Fecha de asiento contable'
    DocumentDate : Date;
    @Common.IsCurrency : true
    @Common.IsUpperCase : true
    @Common.Label : 'Moneda sociedad'
    @Common.Heading : 'Moneda de sociedad'
    @Common.QuickInfo : 'Moneda de sociedad'
    CompanyCodeCurrency : String(5) not null;
    @Common.IsCurrency : true
    @Common.IsUpperCase : true
    @Common.Label : 'Mon.transacción sal.'
    @Common.Heading : 'Moneda de transacción de saldo'
    @Common.QuickInfo : 'Saldo de moneda de operación'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=FIS_RTCUR'
    BalanceTransactionCurrency : String(5) not null;
    @Common.IsCurrency : true
    @Common.IsUpperCase : true
    @Common.Label : 'Moneda transacción'
    @Common.Heading : 'Moneda de transacción'
    @Common.QuickInfo : 'Moneda de transacción'
    TransactionCurrency : String(5) not null;
    @Measures.ISOCurrency : TransactionCurrency
    @Common.Label : 'Importe en moneda de transacción'
    AmountInTransactionCurrency : Decimal(precision: 23) not null;
    @Measures.ISOCurrency : CompanyCodeCurrency
    @Common.Label : 'Impte.moneda socied.'
    @Common.Heading : 'Importe en moneda de sociedad'
    @Common.QuickInfo : 'Importe en moneda de sociedad'
    AmountInCompanyCodeCurrency : Decimal(precision: 23) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Centro de coste'
    CostCenter : String(10) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Centro de beneficio'
    ProfitCenter : String(10) not null;
    @Common.Label : 'Está anulando'
    @Common.Heading : 'Anula'
    @Common.QuickInfo : 'Indicador: La posición anula otra posición'
    IsReversal : Boolean not null;
    @Common.Label : 'Está anulada'
    @Common.Heading : 'Anul.'
    @Common.QuickInfo : 'Indicador: Posición anulada'
    IsReversed : Boolean not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Status'
    @Common.QuickInfo : 'Tipo de dato para los campos de estado'
    StatusAccountReceivable : String(30) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Cuenta de mayor'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=FIS_RACCT'
    GLAccount : String(10) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Plan de cuentas'
    ChartOfAccounts : String(4) not null;
    @Common.Label : 'Texto de posición'
    @Common.Heading : 'Texto partida'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=FARP_SGTXT'
    DocumentItemText : String(50) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Cliente'
    @Common.QuickInfo : 'Número de cliente'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KUNNR'
    Customer : String(10) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Nombre del cliente'
    @Common.QuickInfo : 'Nombre completo de cliente'
    CustomerName : String(220) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Nº ident.fis.1'
    @Common.QuickInfo : 'Número de identificación fiscal 1'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=STCD1'
    CustomerTaxNumber1 : String(16) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'ID de referencia de documento'
    DocumentReferenceID : String(16) not null;
  };

  @cds.external : true
  @cds.persistence.skip : true
  @Common.Label : '###GENERATED Core Data Service Entity'
  @Common.Messages : SAP__Messages
  @Capabilities.SearchRestrictions.Searchable : false
  @Capabilities.FilterRestrictions.NonFilterableProperties : [ '__EntityControl' ]
  @Capabilities.SortRestrictions.NonSortableProperties : [ '__EntityControl' ]
  @Capabilities.InsertRestrictions.RequiredProperties : [
    'FiscalYear',
    'CompanyCode',
    'JournalEntry',
    'SourceLedger',
    'JournalEntryItem'
  ]
  @Capabilities.UpdateRestrictions.DeltaUpdateSupported : true
  @Capabilities.UpdateRestrictions.Updatable : ![__EntityControl/Updatable]
  @Capabilities.UpdateRestrictions.QueryOptions.SelectSupported : true
  @Capabilities.DeepUpdateSupport.ContentIDSupported : true
  @Capabilities.DeleteRestrictions.Deletable : ![__EntityControl/Deletable]
  entity I_AccountReceivableStatus {
    @Common.IsDigitSequence : true
    @Common.Label : 'Ejercicio'
    @Common.Heading : 'Ej.'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=GJAHR'
    key FiscalYear : String(4) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Sociedad'
    @Common.Heading : 'Soc.'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=BUKRS'
    key CompanyCode : String(4) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Nº documento'
    @Common.Heading : 'Nº doc.'
    @Common.QuickInfo : 'Número de un documento contable'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=BELNR_D'
    key JournalEntry : String(10) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Ledger'
    @Common.Heading : 'Ld'
    @Common.QuickInfo : 'Ledger en contabilidad principal'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=FINS_LEDGER'
    key SourceLedger : String(2) not null;
    @Common.IsDigitSequence : true
    key JournalEntryItem : String(6) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Status'
    @Common.QuickInfo : 'Tipo de dato para los campos de estado'
    StatusAccountReceivable : String(30) not null;
    @Core.Computed : true
    @UI.HiddenFilter : true
    @UI.Hidden : true
    __EntityControl : EntityControl;
    SAP__Messages : many SAP__Message not null;
  };

  @cds.external : true
  @cds.persistence.skip : true
  @Common.Label : 'Cuentas por cobrar - cuenta alternativa'
  @Capabilities.SearchRestrictions.Searchable : false
  @Capabilities.InsertRestrictions.Insertable : false
  @Capabilities.DeleteRestrictions.Deletable : false
  @Capabilities.UpdateRestrictions.Updatable : false
  @Capabilities.UpdateRestrictions.QueryOptions.SelectSupported : true
  @Capabilities.FilterRestrictions.FilterExpressionRestrictions : [
    {
      Property: AmountInTransactionCurrency,
      AllowedExpressions: 'MultiValue'
    },
    {
      Property: AmountInCompanyCodeCurrency,
      AllowedExpressions: 'MultiValue'
    }
  ]
  entity I_AccRecItemAltGL {
    @Common.IsUpperCase : true
    @Common.Label : 'Libro de origen'
    key SourceLedger : String(2) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Sociedad'
    key CompanyCode : String(4) not null;
    @Common.IsDigitSequence : true
    @Common.Label : 'Ejercicio'
    key FiscalYear : String(4) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Asiento contable'
    key AccountingDocument : String(10) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Pos.asiento contable'
    @Common.Heading : 'Pos.asiento contable de libro mayor'
    @Common.QuickInfo : 'Posición de asiento contable de libro mayor'
    key LedgerGLLineItem : String(6) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Ledger'
    @Common.Heading : 'Ld'
    @Common.QuickInfo : 'Ledger en contabilidad principal'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=FINS_LEDGER'
    key Ledger : String(2) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Tp.asiento contable'
    @Common.Heading : 'Tipo de asiento contable'
    @Common.QuickInfo : 'Tipo de asiento contable'
    AccountingDocumentType : String(2) not null;
    @Common.Label : 'Referencia asignac.'
    @Common.Heading : 'Referencia de asignación'
    @Common.QuickInfo : 'Referencia de asignación'
    AssignmentReference : String(18) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Código Debe/Haber'
    DebitCreditCode : String(1) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Clase de cuenta'
    @Common.Heading : 'Cl.cuenta'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=FARP_KOART'
    FinancialAccountType : String(1) not null;
    @Common.Label : 'Vencimiento neto'
    @Common.Heading : 'Venc.neto'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=FAEDT_FPOS'
    NetDueDate : Date;
    @Common.Label : 'Fecha compensación'
    @Common.Heading : 'Fe.compens.'
    @Common.QuickInfo : 'Fecha de compensación'
    ClearingDate : Date;
    @Common.IsUpperCase : true
    @Common.Label : 'Asiento compensación'
    @Common.Heading : 'Partida individual de compensación'
    @Common.QuickInfo : 'Partida individual de compensación'
    ClearingJournalEntry : String(10) not null;
    @Common.IsDigitSequence : true
    @Common.Label : 'Ejercicio asiento contable compensación'
    @Common.Heading : 'Ejercicio de la partida individual de compensación'
    @Common.QuickInfo : 'Ejercicio de la partida individual de compensación'
    ClearingJournalEntryFiscalYear : String(4) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Documento referencia'
    @Common.Heading : 'Doc.ref.'
    @Common.QuickInfo : 'Número de documento de referencia'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=AWREF'
    ReferenceDocument : String(10) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Clase doc.referencia'
    @Common.Heading : 'Clase de documento referencia'
    @Common.QuickInfo : 'Tipo de documento de referencia'
    ReferenceDocumentType : String(5) not null;
    @Common.Label : 'Fe.asiento contable'
    @Common.QuickInfo : 'Fecha de asiento contable'
    DocumentDate : Date;
    @Common.IsCurrency : true
    @Common.IsUpperCase : true
    @Common.Label : 'Moneda sociedad'
    @Common.Heading : 'Moneda de sociedad'
    @Common.QuickInfo : 'Moneda de sociedad'
    CompanyCodeCurrency : String(5) not null;
    @Common.IsCurrency : true
    @Common.IsUpperCase : true
    @Common.Label : 'Moneda transacción'
    @Common.Heading : 'Moneda de transacción'
    @Common.QuickInfo : 'Moneda de transacción'
    TransactionCurrency : String(5) not null;
    @Common.IsCurrency : true
    @Common.IsUpperCase : true
    @Common.Label : 'Mon.transacción sal.'
    @Common.Heading : 'Moneda de transacción de saldo'
    @Common.QuickInfo : 'Saldo de moneda de operación'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=FIS_RTCUR'
    BalanceTransactionCurrency : String(5) not null;
    @Measures.ISOCurrency : TransactionCurrency
    @Common.Label : 'Importe en moneda de transacción'
    AmountInTransactionCurrency : Decimal(precision: 23) not null;
    @Measures.ISOCurrency : CompanyCodeCurrency
    @Common.Label : 'Impte.moneda socied.'
    @Common.Heading : 'Importe en moneda de sociedad'
    @Common.QuickInfo : 'Importe en moneda de sociedad'
    AmountInCompanyCodeCurrency : Decimal(precision: 23) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Centro de coste'
    CostCenter : String(10) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Centro de beneficio'
    ProfitCenter : String(10) not null;
    @Common.Label : 'Está anulando'
    @Common.Heading : 'Anula'
    @Common.QuickInfo : 'Indicador: La posición anula otra posición'
    IsReversal : Boolean not null;
    @Common.Label : 'Está anulada'
    @Common.Heading : 'Anul.'
    @Common.QuickInfo : 'Indicador: Posición anulada'
    IsReversed : Boolean not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Status'
    @Common.QuickInfo : 'Tipo de dato para los campos de estado'
    StatusAccountReceivable : String(30) not null;
    @Common.Label : 'Cuenta de mayor'
    @Common.IsUpperCase : true
    @Common.Heading : 'Cuenta de mayor'
    @Common.QuickInfo : 'Cuenta de mayor'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=FIS_RACCT'
    GLAccount : String(10) not null;
    @Common.Label : 'Cuenta de mayor alternativa'
    @Common.Text : AlternativeGLAccountName
    @Common.Text.@UI.TextArrangement : #TextLast
    @Common.IsUpperCase : true
    @Common.QuickInfo : 'Número de cuenta de mayor alternativo en sociedad'
    AlternativeGLAccount : String(10) not null;
    @Common.Label : 'Descripción cuenta mayor alternativa'
    @Common.Heading : 'Nombre de cuenta de mayor'
    @Common.QuickInfo : 'Nombre de cuenta de mayor'
    AlternativeGLAccountName : String(20) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Plan de cuentas'
    ChartOfAccounts : String(4) not null;
    @Common.Label : 'Texto de posición'
    @Common.Heading : 'Texto partida'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=FARP_SGTXT'
    DocumentItemText : String(50) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'Cliente'
    @Common.QuickInfo : 'Número de cliente'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=KUNNR'
    Customer : String(10) not null;
    @Common.Label : 'Nombre cliente'
    @Common.IsUpperCase : true
    @Common.Heading : 'Nombre del cliente'
    @Common.QuickInfo : 'Nombre completo de cliente'
    CustomerName : String(220) not null;
    @Common.Label : 'RUC / Tax Number'
    @Common.IsUpperCase : true
    @Common.Heading : 'Nº ident.fis.1'
    @Common.QuickInfo : 'Número de identificación fiscal 1'
    @Common.DocumentationRef : 'urn:sap-com:documentation:key?=type=DE&id=STCD1'
    CustomerTaxNumber1 : String(16) not null;
    @Common.IsUpperCase : true
    @Common.Label : 'ID de referencia de documento'
    DocumentReferenceID : String(16) not null;
  };
};

