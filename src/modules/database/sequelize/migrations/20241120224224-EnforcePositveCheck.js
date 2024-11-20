'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
    await queryInterface.sequelize.query(`
      ALTER TABLE fxqls DROP CONSTRAINT check_buy_positive;
      ALTER TABLE fxqls DROP CONSTRAINT check_sell_positive;
      ALTER TABLE fxqls DROP CONSTRAINT check_cap_positive;
    `);
  },
};
