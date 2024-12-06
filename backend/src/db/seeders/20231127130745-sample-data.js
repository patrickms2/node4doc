const db = require('../models');
const Users = db.users;

const Documents = db.documents;

const Folders = db.folders;

const DocumentsData = [
  {
    title: 'Quarterly Report Q1',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    type: 'report',

    status: 'draft',
  },

  {
    title: 'Invoice 2023-001',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    type: 'report',

    status: 'draft',
  },

  {
    title: 'Project Memo',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    type: 'report',

    status: 'archived',
  },
];

const FoldersData = [
  {
    name: 'Personal Documents',

    type: 'personal',

    color: 'blue',

    favorite: true,

    status: 'inactive',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Shared Reports',

    type: 'shared',

    color: 'green',

    favorite: true,

    status: 'active',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Archived Invoices',

    type: 'personal',

    color: 'red',

    favorite: true,

    status: 'active',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

// Similar logic for "relation_many"

async function associateDocumentWithOwner() {
  const relatedOwner0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Document0 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Document0?.setOwner) {
    await Document0.setOwner(relatedOwner0);
  }

  const relatedOwner1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Document1 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Document1?.setOwner) {
    await Document1.setOwner(relatedOwner1);
  }

  const relatedOwner2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Document2 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Document2?.setOwner) {
    await Document2.setOwner(relatedOwner2);
  }
}

async function associateDocumentWithCurrent_owner() {
  const relatedCurrent_owner0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Document0 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Document0?.setCurrent_owner) {
    await Document0.setCurrent_owner(relatedCurrent_owner0);
  }

  const relatedCurrent_owner1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Document1 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Document1?.setCurrent_owner) {
    await Document1.setCurrent_owner(relatedCurrent_owner1);
  }

  const relatedCurrent_owner2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Document2 = await Documents.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Document2?.setCurrent_owner) {
    await Document2.setCurrent_owner(relatedCurrent_owner2);
  }
}

// Similar logic for "relation_many"

async function associateFolderWithOwner() {
  const relatedOwner0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Folder0 = await Folders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Folder0?.setOwner) {
    await Folder0.setOwner(relatedOwner0);
  }

  const relatedOwner1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Folder1 = await Folders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Folder1?.setOwner) {
    await Folder1.setOwner(relatedOwner1);
  }

  const relatedOwner2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Folder2 = await Folders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Folder2?.setOwner) {
    await Folder2.setOwner(relatedOwner2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Documents.bulkCreate(DocumentsData);

    await Folders.bulkCreate(FoldersData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateDocumentWithOwner(),

      await associateDocumentWithCurrent_owner(),

      // Similar logic for "relation_many"

      await associateFolderWithOwner(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('documents', null, {});

    await queryInterface.bulkDelete('folders', null, {});
  },
};
