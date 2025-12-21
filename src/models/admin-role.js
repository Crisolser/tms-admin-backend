import { DataTypes } from 'sequelize';
import sequelize from '#config/sequelize';

const AdminRole = sequelize.define('AdminRole', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, 
{
    tableName: 'admin_role',
    timestamps: false,
    underscored: true,
});

AdminRole.associate = (models) => {
    AdminRole.belongsTo(models.Admin, { foreignKey: 'admin_id', as: 'admin' });
    AdminRole.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
}

export default AdminRole;