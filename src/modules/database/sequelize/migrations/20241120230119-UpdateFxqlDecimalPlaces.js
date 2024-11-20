'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('fxqls', 'buy', {
      type: Sequelize.DECIMAL(15, 6).UNSIGNED,
      defaultValue: 0,
    });
    await queryInterface.changeColumn('fxqls', 'sell', {
      type: Sequelize.DECIMAL(15, 6).UNSIGNED,
      defaultValue: 0,
    });
    await queryInterface.changeColumn('fxqls', 'cap', {
      type: Sequelize.DECIMAL(15, 6).UNSIGNED,
      defaultValue: 0,
    });
  },

  async down(queryInterface) {
    await queryInterface.changeColumn('fxqls', 'buy', {
      type: Sequelize.DECIMAL(15, 2).UNSIGNED,
      defaultValue: 0,
    });
    await queryInterface.changeColumn('fxqls', 'sell', {
      type: Sequelize.DECIMAL(15, 2).UNSIGNED,
      defaultValue: 0,
    });
    await queryInterface.changeColumn('fxqls', 'cap', {
      type: Sequelize.DECIMAL(15, 2).UNSIGNED,
      defaultValue: 0,
    });
  },
};
