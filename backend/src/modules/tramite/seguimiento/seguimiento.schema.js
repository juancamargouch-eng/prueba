// seguimiento.schema.js
// Intencionalmente vacío: seguimiento no expone endpoints de escritura propios.
// Sus datos se validan en tramite.schema.js (crearTramiteSchema, cambiarEstadoSchema),
// porque los seguimientos se generan internamente desde tramite.service.js, nunca
// se crean directamente vía API.