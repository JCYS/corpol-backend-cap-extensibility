const cds = require('@sap/cds')

module.exports = class TrazabilidadService extends cds.ApplicationService { init() {

  const { EventType, System, Status, RequestType, MethodType, EventView } = cds.entities('TrazabilidadService')

  this.before (['CREATE', 'UPDATE'], EventType, async (req) => {
    console.log('Before CREATE/UPDATE EventType', req.data)
  })
  this.after ('READ', EventType, async (eventType, req) => {
    console.log('After READ EventType', eventType)
  })
  this.before (['CREATE', 'UPDATE'], System, async (req) => {
    console.log('Before CREATE/UPDATE System', req.data)
  })
  this.after ('READ', System, async (system, req) => {
    console.log('After READ System', system)
  })
  this.before (['CREATE', 'UPDATE'], Status, async (req) => {
    console.log('Before CREATE/UPDATE Status', req.data)
  })
  this.after ('READ', Status, async (status, req) => {
    console.log('After READ Status', status)
  })
  this.before (['CREATE', 'UPDATE'], RequestType, async (req) => {
    console.log('Before CREATE/UPDATE RequestType', req.data)
  })
  this.after ('READ', RequestType, async (requestType, req) => {
    console.log('After READ RequestType', requestType)
  })
  this.before (['CREATE', 'UPDATE'], MethodType, async (req) => {
    console.log('Before CREATE/UPDATE MethodType', req.data)
  })
  this.after ('READ', MethodType, async (methodType, req) => {
    console.log('After READ MethodType', methodType)
  })
  this.before (['CREATE', 'UPDATE'], EventView, async (req) => {
    console.log('Before CREATE/UPDATE EventView', req.data)
  })
  this.after ('READ', EventView, async (eventView, req) => {
    console.log('After READ EventView', eventView)
  })


  return super.init()
}}
