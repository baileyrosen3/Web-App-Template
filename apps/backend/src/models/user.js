const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

class User {
  static async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  static async create(userData) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    return await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
  }

  static async findById(id) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  static async comparePassword(hashedPassword, candidatePassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}

module.exports = User;
