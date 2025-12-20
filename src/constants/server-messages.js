export const LOG_MESSAGES = {
  SERVER_STARTED: port => `✅ Servidor iniciado en el puerto ${port}`,
  SERVER_LOCAL_MODE: '⚠️ Modo local habilitado',
  SERVER_START_ERROR: error => `❌ Error al iniciar el servidor: ${error}`,
  SCALAR_DOCS: url => `✅ Documentación scalar disponible en: ${url}/api-reference`,
  NOT_INSERT_DUMMY_DATA: '⚠️ Datos dummy detectados, no se insertaron nuevamente.',
  DUMMY_DATA_INSERTED: '✅ Datos dummy insertados correctamente.',
  DB_CONNECTED: '✅ Conexión a la base de datos establecida exitosamente.',
  DB_CONNECTION_ERROR: error => `❌ Error al conectar a la base de datos: ${error}`,
  DB_SYNC_SUCCESS: '✅ Base de datos sincronizada exitosamente.',
  DB_SYNC_ERROR: error => `❌ Error al sincronizar la base de datos: ${error}`,
  ROUTE_NOT_FOUND: (method, url) => `Ruta no encontrada: ${method} ${url}`
};