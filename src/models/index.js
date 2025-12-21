import Admin from './admin.js';
import AdminRole from './admin-role.js';
import Role from './role.js';
import RolePermission from './role-permission.js';
import Permission from './permission.js';

const models = {
    Admin,
    AdminRole,
    Role,
    RolePermission,
    Permission,
};

Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

export default {
    ...models,
};