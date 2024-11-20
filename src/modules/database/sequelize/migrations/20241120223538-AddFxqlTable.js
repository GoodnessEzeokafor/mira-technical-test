'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fxqls', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: true,
      },

      sourceCurrency: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      destinationCurrency: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      buy: {
        type: Sequelize.DECIMAL(15, 2).UNSIGNED,
        defaultValue: 0,
      },
      sell: {
        type: Sequelize.DECIMAL(15, 2),
        defaultValue: 0,
      },
      cap: {
        type: Sequelize.DECIMAL(15, 2).UNSIGNED,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.sequelize.query(`
      ALTER TABLE fxqls ADD CONSTRAINT check_buy_positive CHECK (buy >= 0);
      ALTER TABLE fxqls ADD CONSTRAINT check_sell_positive CHECK (sell >= 0);
      ALTER TABLE fxqls ADD CONSTRAINT check_cap_positive CHECK (cap >= 0);
    `);
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('fxqls');
  },
};
