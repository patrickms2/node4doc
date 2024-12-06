const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const folders = sequelize.define(
    'folders',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      type: {
        type: DataTypes.ENUM,

        values: ['personal', 'shared'],
      },

      color: {
        type: DataTypes.TEXT,
      },

      favorite: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      status: {
        type: DataTypes.ENUM,

        values: ['active', 'inactive'],
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

  folders.associate = (db) => {
    db.folders.belongsToMany(db.documents, {
      as: 'documents',
      foreignKey: {
        name: 'folders_documentsId',
      },
      constraints: false,
      through: 'foldersDocumentsDocuments',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.folders.belongsTo(db.users, {
      as: 'owner',
      foreignKey: {
        name: 'ownerId',
      },
      constraints: false,
    });

    db.folders.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.folders.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return folders;
};
