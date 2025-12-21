import { DataTypes } from 'sequelize';
import sequelize from '#config/sequelize';
import { sign } from 'jsonwebtoken';

const ClientWebhook = sequelize.define('ClientWebhook', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    signature: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
},
{
    tableName: 'client_webhook',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

ClientWebhook.associate = (models) => {
    ClientWebhook.belongsTo(models.Client, {
        foreignKey: 'client_id',
        as: 'client',
    });
}

export default ClientWebhook;