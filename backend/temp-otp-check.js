const bcrypt = require('bcrypt');
const { prisma } = require('./src/config/database');

(async () => {
  try {
    const user = await prisma.user.findFirst({ where: { email: 'flowtest@example.com' } });
    if (!user) {
      console.log('no user');
      process.exit(0);
    }

    const code = '123456';
    const codeHash = await bcrypt.hash(code, 12);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const record = await prisma.authOtp.create({
      data: {
        userId: user.id,
        purpose: 'REGISTRATION',
        phoneNumber: user.phoneNumber || '+233000000000',
        codeHash,
        expiresAt,
      },
    });

    console.log('otp ok', record.id);
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
