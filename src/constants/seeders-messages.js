export const SEEDER_MESSAGES = {
   GENERAL: {
      STARTING: '🔄 Iniciando inserción de catálogos',
      STARTING_DUMMY_DATA: '🔄 Iniciando inserción de datos de prueba',
   },
   PERMISSIONS: {
      INSERTING: '--- 🚀 Insertando permisos',
      ALREADY_EXISTS: '--- ↩️ Permisos ya existen, no se insertaron nuevamente.',
      INSERTED: COUNT => `--- ✅ ${COUNT} permisos insertados correctamente.`,
      ERROR: error => `--- ❌ Error al insertar permisos: ${error}`,
   },
   VEHICLES: {
      INSERTING: '--- 🚀 Insertando vehículos',
      ALREADY_EXISTS: '--- ↩️ Vehículos ya existen, no se insertaron nuevamente.',
      INSERTED: COUNT => `--- ✅ ${COUNT} vehículos insertados correctamente.`,
      ERROR: error => `--- ❌ Error al insertar vehículos: ${error}`,
   },
   PACKAGE_STATUS: {
      INSERTING: '--- 🚀 Insertando estados de paquete',
      ALREADY_EXISTS: '--- ↩️ Estados de paquete ya existen, no se insertaron nuevamente.',
      INSERTED: COUNT => `--- ✅ ${COUNT} estados de paquete insertados correctamente.`,
      ERROR: error => `--- ❌ Error al insertar estados de paquete: ${error}`,
   },
   DOCUMENT_TYPES: {
      INSERTING: '--- 🚀 Insertando tipos de documento',
      ALREADY_EXISTS: '--- ↩️ Tipos de documento ya existen, no se insertaron nuevamente.',
      INSERTED: COUNT => `--- ✅ ${COUNT} tipos de documento insertados correctamente.`,
      ERROR: error => `--- ❌ Error al insertar tipos de documento: ${error}`,
   },
   ROLES: {
      INSERTING: '--- 🚀 Insertando roles',
      ALREADY_EXISTS: '--- ↩️ Roles ya existen, no se insertaron nuevamente.',
      INSERTED: COUNT => `--- ✅ ${COUNT} roles insertados correctamente.`,
      ERROR: error => `--- ❌ Error al insertar roles: ${error}`,
   },
   ADMINS: {
      INSERTING: '--- 🚀 Insertando administradores',
      ALREADY_EXISTS: '--- ↩️ Administradores ya existen, no se insertaron nuevamente.',
      INSERTED: COUNT => `--- ✅ ${COUNT} administradores insertados correctamente.`,
      ERROR: error => `--- ❌ Error al insertar administradores: ${error}`,
   },
   CLIENTS: {
      INSERTING: '--- 🚀 Insertando clientes',
      ALREADY_EXISTS: '--- ↩️ Clientes ya existen, no se insertaron nuevamente.',
      INSERTED: COUNT => `--- ✅ ${COUNT} clientes insertados correctamente.`,
      ERROR: error => `--- ❌ Error al insertar clientes: ${error}`,
   },
   WAREHOUSES: {
      INSERTING: '--- 🚀 Insertando almacenes',
      ALREADY_EXISTS: '--- ↩️ Almacenes ya existen, no se insertaron nuevamente.',
      INSERTED: COUNT => `--- ✅ ${COUNT} almacenes insertados correctamente.`,
      ERROR: error => `--- ❌ Error al insertar almacenes: ${error}`,
   },
   COURIERS: {
      INSERTING: '--- 🚀 Insertando mensajeros',
      ALREADY_EXISTS: '--- ↩️ Mensajeros ya existen, no se insertaron nuevamente.',
      INSERTED: COUNT => `--- ✅ ${COUNT} mensajeros insertados correctamente.`,
      ERROR: error => `--- ❌ Error al insertar mensajeros: ${error}`,
   },
   PACKAGES: {
      INSERTING: '--- 🚀 Insertando paquetes',
      ALREADY_EXISTS: '--- ↩️ Paquetes ya existen, no se insertaron nuevamente.',
      INSERTED: COUNT => `--- ✅ ${COUNT} paquetes insertados correctamente.`,
      ERROR: error => `--- ❌ Error al insertar paquetes: ${error}`,
   },
};
