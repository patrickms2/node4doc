const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class FoldersDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const folders = await db.folders.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        type: data.type || null,
        color: data.color || null,
        favorite: data.favorite || false,

        status: data.status || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await folders.setOwner(data.owner || null, {
      transaction,
    });

    await folders.setDocuments(data.documents || [], {
      transaction,
    });

    return folders;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const foldersData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      type: item.type || null,
      color: item.color || null,
      favorite: item.favorite || false,

      status: item.status || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const folders = await db.folders.bulkCreate(foldersData, { transaction });

    // For each item created, replace relation files

    return folders;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const folders = await db.folders.findByPk(id, {}, { transaction });

    await folders.update(
      {
        name: data.name || null,
        type: data.type || null,
        color: data.color || null,
        favorite: data.favorite || false,

        status: data.status || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await folders.setOwner(data.owner || null, {
      transaction,
    });

    await folders.setDocuments(data.documents || [], {
      transaction,
    });

    return folders;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const folders = await db.folders.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of folders) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of folders) {
        await record.destroy({ transaction });
      }
    });

    return folders;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const folders = await db.folders.findByPk(id, options);

    await folders.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await folders.destroy({
      transaction,
    });

    return folders;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const folders = await db.folders.findOne({ where }, { transaction });

    if (!folders) {
      return folders;
    }

    const output = folders.get({ plain: true });

    output.documents = await folders.getDocuments({
      transaction,
    });

    output.owner = await folders.getOwner({
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
        model: db.documents,
        as: 'documents',
        through: filter.documents
          ? {
              where: {
                [Op.or]: filter.documents.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.documents ? true : null,
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('folders', 'name', filter.name),
        };
      }

      if (filter.color) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('folders', 'color', filter.color),
        };
      }

      if (filter.calendarStart && filter.calendarEnd) {
        where = {
          ...where,
          [Op.or]: [
            {
              created_at: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
            {
              updated_at: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
          ],
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

      if (filter.favorite) {
        where = {
          ...where,
          favorite: filter.favorite,
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
          count: await db.folders.count({
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
      : await db.folders.findAndCountAll({
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
          Utils.ilike('folders', 'name', query),
        ],
      };
    }

    const records = await db.folders.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
