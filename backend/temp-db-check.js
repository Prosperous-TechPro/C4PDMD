const { prisma } = require('./src/config/database');

(async () => {
  try {
    await prisma.$queryRawUnsafe('select 1');
    console.log('db ok');
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
