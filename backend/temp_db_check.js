const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
(async () => {
  try {
    await prisma.$connect();
    const cols = await prisma.$queryRawUnsafe(`SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_name IN ('Partner','partner') ORDER BY table_name, ordinal_position;`);
    console.log('cols', JSON.stringify(cols, null, 2));
    const res = await prisma.$queryRawUnsafe(`SELECT id, name, description, logo, website, linkedin, facebook, twitter, whatsapp FROM "Partner" LIMIT 1;`);
    console.log('sample', JSON.stringify(res, null, 2));
  } catch (err) {
    console.error('ERROR', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
