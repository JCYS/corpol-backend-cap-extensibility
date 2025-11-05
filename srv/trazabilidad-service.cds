using {trazabilidad as model} from '../db/trazabilidad-schema';


service TrazabilidadService {


    entity EventType as projection on model.EventType;
    entity Status as projection on model.Status;
    entity System as projection on model.System;
    entity RequestType as projection on model.RequestType;
    entity MethodType as projection on model.MethodType;
    entity EventView as projection on model.EventView;


}
