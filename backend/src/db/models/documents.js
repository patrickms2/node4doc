const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const documents = sequelize.define(
    'documents',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
      },

      type: {
        type: DataTypes.ENUM,

        values: ['report', 'invoice', 'memo'],
      },

      status: {
        type: DataTypes.ENUM,

        values: ['draft', 'final', 'archived'],
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  documents.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.documents.belongsTo(db.users, {
      as: 'owner',
      foreignKey: {
        name: 'ownerId',
      },
      constraints: false,
    });

    db.documents.belongsTo(db.users, {
      as: 'current_owner',
      foreignKey: {
        name: 'current_ownerId',
      },
      constraints: false,
    });

    db.documents.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.documents.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return documents;
};
