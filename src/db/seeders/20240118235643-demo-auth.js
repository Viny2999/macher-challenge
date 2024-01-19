'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('auth', [
      {
        username: 'test',
        password: '$2b$10$562WD2w.4e2MRxksoFx9tO718BWnlh3APHcUub11WK0onts9YM5ZW',
      },
      {
        username: 'admin',
        password: '$2b$10$vUdIFUQmZu0Q.Stw4Dosl.7px/Uu14CsAjuWF.Ae/0UQJsY4HWmZG',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('auth', null, {});
  },
};
