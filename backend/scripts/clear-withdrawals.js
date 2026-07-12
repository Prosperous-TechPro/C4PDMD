const { prisma } = require('../src/config/database');

(async () => {
  try {
    await prisma.$connect();
    console.log('Connected to DB. Deleting all FundMovement records...');
    const result = await prisma.fundMovement.deleteMany({});
    console.log(`Deleted ${result.count} fund movement(s).`);
    await prisma.$disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error clearing fund movements:', err);
    try { await prisma.$disconnect(); } catch(e){}
    process.exit(1);
  }
})();