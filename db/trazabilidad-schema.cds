namespace trazabilidad;

using {cuid} from '@sap/cds/common';

entity EventDetail : cuid {
    Url             : String(5000);
    StartDateTime   : Timestamp;
    EndDateTime     : Timestamp;
    RequestContent  : LargeString;
    ResponseContent : LargeString;
    ErrorMessage    : LargeString;
    AttemptNumber   : Integer;
    to_Event        : Association to Event;
    to_OriginSystem : Association to System;
    to_TargetSystem : Association to System;
    to_Status       : Association to Status;
    to_Action       : Association to EventType;
    to_Method       : Association to MethodType;
    to_RequestType  : Association to RequestType;

}


entity Event : cuid {

    EventInitDateTime   : Timestamp;
    EventFinishDateTime : Timestamp;
    to_EventType        : Association to EventType;
    to_EventDetail      : Composition of many EventDetail
                              on to_EventDetail.to_Event = $self;
    to_Status           : Association to Status;
}

entity EventType {
    key Code            : String(50);
        Name            : String(50);
        Description     : String(200);
        Enable          : Boolean;
        to_OriginSystem : Association to System;
        to_TargetSystem : Association to System;
}

entity Status {
    key Code        : String(20);
        Name        : String(50);
        Color       : Integer;
        Description : String(200);
}

entity System {
    key Code : String(20);
        Name : String(50);
}

entity RequestType {
    key Code : String(10);
        Name : String(50);
}

entity MethodType {
    key Code : String(10);
        Name : String(50);
}

//----------------------------------------------------------
//----------------------------------------------------------
//---------- Views / Projections
//----------------------------------------------------------
//----------------------------------------------------------
view EventView as
    select from Event {
        key Event.ID,
            Event.EventInitDateTime,
            Event.EventFinishDateTime,
            //--- Event Type
            to_EventType,
            //--- Status
            to_Status,
            //--- Event Detail
            to_EventDetail
    }
