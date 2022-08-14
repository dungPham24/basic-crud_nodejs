module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "Dung",
        lastName: "Phạm",
        email: "dungpham@gmail.com",
        password: "123456",
        address: "Hà Nội",
        gender: 0,
        roleId: "ROLE_ADMIN",
        phonenumber: "ADMIN",
        positionId: "ADMIN",
        image: "../../assets/images/avatar.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
