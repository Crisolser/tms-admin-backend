import Admin from './admin.js';
import AdminRole from './admin-role.js';
import Role from './role.js';
import RolePermission from './role-permission.js';
import Permission from './permission.js';
import Client from './client.js';
import ClientWarehouse from './client_warehouse.js';
import ClientApiToken from './client_api_token.js';
import Courier from './courier.js';
import Vehicle from './vehicle.js';
import CourierDocument from './courier_document.js';
import DocumentType from './document-type.js';

const models = {
    Admin,
    AdminRole,
    Role,
    RolePermission,
    Permission,
    Client,
    ClientWarehouse,
    ClientApiToken,
    Courier,
    Vehicle,
    CourierDocument,
    DocumentType,
};

Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

export default {
    ...models,
};