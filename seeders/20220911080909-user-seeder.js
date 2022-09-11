'use strict';
const bcrypt = require("bcrypt");

module.exports = {
  async up (queryInterface, Sequelize) {
    const password_hashed = await bcrypt.hash("pass123", 10);
    await queryInterface.bulkInsert('Users', [
      {
        fullName: "Admin 2022",
        email: "admin@gmail.com",
        password: password_hashed,
        videosWatched: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
