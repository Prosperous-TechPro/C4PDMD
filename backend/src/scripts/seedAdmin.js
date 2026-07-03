/**
 * =====================================================
 * CREATE INITIAL ADMIN
 * =====================================================
 */

const bcrypt = require("bcrypt");
const { prisma } = require("../config/database");

async function seedAdmin() {
  try {

    let role = await prisma.role.findFirst({
      where: {
        name: "SUPER_ADMIN",
      },
    });

    if (!role) {
      role = await prisma.role.create({
        data: {
          name: "SUPER_ADMIN",
        },
      });
    }

    const hashedPassword =
      await bcrypt.hash("Admin@123", 10);

    const admin =
      await prisma.user.create({
        data: {
          firstName: "Selorm",
          lastName: "Mensah",
          email: "prolinstage@gmail.com",
          password: hashedPassword,
          roleId: role.id,
        },
      });

    console.log("Admin Created");
    console.log(admin);

  } catch (error) {
    console.error(error.message);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();