const { issueOtp } = require('./src/services/authOtpService');
const { prisma } = require('./src/config/database');

(async () => {
  try {
    const user = await prisma.user.create({
      data: {
        firstName: 'Debug',
        lastName: 'Otp',
        email: 'debugotp@example.com',
        password: 'x',
        phoneNumber: '+233555000000',
        status: 'PENDING',
        roleId: 1,
      },
      include: { role: true }
    });

    console.log('user created', user.id);
    const result = await issueOtp({ user, purpose: 'REGISTRATION' });
    console.log('issueOtp result', result);
  } catch (error) {
    console.error('issueOtp error', error);
  } finally {
    await prisma.$disconnect();
  }
})();
