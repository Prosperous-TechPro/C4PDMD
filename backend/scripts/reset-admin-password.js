const bcrypt = require('bcrypt');
const { prisma } = require('../src/config/database');

(async () => {
  try {
    const hashed = await bcrypt.hash('ChangeMe123!', 10);
    await prisma.user.updateMany({
      where: { email: 'admin@c4pdmd.org' },
      data: { password: hashed },
    });

    console.log('password-updated');
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
