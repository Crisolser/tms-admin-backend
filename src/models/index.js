import Admin from './admin.js';
import AdminRole from './admin-role.js';
import Role from './role.js';
import RolePermission from './role-permission.js';
import Permission from './permission.js';
import Client from './client.js';
import ClientWarehouse from './client-warehouse.js';
import ClientApiToken from './client-api-token.js';
import ClientWebhook from './client-webhook.js';
import Courier from './courier.js';
import Vehicle from './vehicle.js';
import CourierDocument from './courier-document.js';
import DocumentType from './document-type.js';
import Package from './package.js';
import PackageStatus from './package-status.js';
import PackageStatusHistory from './package-status-history.js';
import Item from './item.js';

const models = {
    Admin,
    AdminRole,
    Role,
    RolePermission,
    Permission,
    Client,
    ClientWarehouse,
    ClientApiToken,
    ClientWebhook,
    Courier,
    Vehicle,
    CourierDocument,
    DocumentType,
    Package,
    PackageStatus,
    PackageStatusHistory,
    Item,
};

Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

export default {
    ...models,
};