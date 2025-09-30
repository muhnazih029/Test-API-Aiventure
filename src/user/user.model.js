const prisma = require('../db');

const findUserByEmail = async (email) => {
  return prisma.user.findUnique({ where: { email } });
};

const findUserById = async (id) => {
  return prisma.user.findUnique({ where: { id } });
};

const createUser = async (data) => {
  return prisma.user.create({ data });
};

const updateUserData = async (id, updates) => {
  return prisma.user.update({ where: { id }, data: updates });
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  updateUserData,
};
