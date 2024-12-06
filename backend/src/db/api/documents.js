const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class DocumentsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const documents = await db.documents.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        type: data.type || null,
        status: data.status || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await documents.setOwner(data.owner || null, {
      transaction,
    });

    await documents.setCurrent_owner(data.current_owner || null, {
      transaction,
    });

    return documents;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const documentsData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      type: item.type || null,
      status: item.status || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const documents = await db.documents.bulkCreate(documentsData, {
      transaction,
    });

    // For each item created, replace relation files

    return documents;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const documents = await db.documents.findByPk(id, {}, { transaction });

    await documents.update(
      {
        title: data.title || null,
        type: data.type || null,
        status: data.status || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await documents.setOwner(data.owner || null, {
      transaction,
    });

    await documents.setCurrent_owner(data.current_owner || null, {
      transaction,
    });

    return documents;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const documents = await db.documents.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of documents) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of documents) {
        await record.destroy({ transaction });
      }
    });

    return documents;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const documents = await db.documents.findByPk(id, options);

    await documents.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await documents.destroy({
      transaction,
    });

    return documents;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const documents = await db.documents.findOne({ where }, { transaction });

    if (!documents) {
      return documents;
    }

    const output = documents.get({ plain: true });

    output.owner = await documents.getOwner({
      transaction,
    });

    output.current_owner = await documents.getCurrent_owner({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'owner',
      },

      {
        model: db.users,
        as: 'current_owner',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.title) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('documents', 'title', filter.title),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.type) {
        where = {
          ...where,
          type: filter.type,
        };
      }

      if (filter.status) {
        where = {
          ...where,
          status: filter.status,
        };
      }

      if (filter.owner) {
        const listItems = filter.owner.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          ownerId: { [Op.or]: listItems },
        };
      }

      if (filter.current_owner) {
        const listItems = filter.current_owner.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          current_ownerId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.documents.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.documents.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('documents', 'title', query),
        ],
      };
    }

    const records = await db.documents.findAll({
      attributes: ['id', 'title'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['title', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }
};
