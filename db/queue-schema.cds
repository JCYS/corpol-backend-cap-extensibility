namespace queue;

using {
    managed,
    cuid
} from '@sap/cds/common';

@odata.draft.enabled
entity Queue : managed, cuid {

    EventType     : String(50); // Tipo de evento (ejemplo: "SAP_DOCUMENT")
    Status        : String(20); // Estado: "PENDIENTE", "EN_PROCESO", "PROCESADO", "ERROR"
    ProcessedAt   : Timestamp; // Fecha y hora en que se procesó el evento
    Priority      : Integer; // Prioridad para el orden de procesamiento
    RetryCount    : Integer default 0; // Número de reintentos en caso de fallo
    RetryMax      : Integer default 0; // Número máximo de reintentos
    Payload       : LargeString; // Contenido del evento (por ejemplo, JSON)
    PayloadHash   : String(100); // Hash del contenido del evento
    ErrorMessage  : LargeString; // Mensaje de error en caso de fallo en el procesamiento

    CorrelationId : String(50); // Identificador para correlacionar el evento con otros procesos
    ObjectId      : String(100); // Identificador del objeto relacionado con el evento


}
