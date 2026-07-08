const axios = require('axios');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({ where: { email: 'c4pdmd@gmail.com' }, include: { role: true } });
  if (!user) {
    throw new Error('Admin user not found');
  }

  const token = require('jsonwebtoken').sign({ id: user.id, email: user.email, role: user.role.name, status: user.status, isStaff: user.isStaff, isVerified: user.isVerified }, 'change_this_to_a_strong_secret_key*c4pdpf@ptp_2016', { expiresIn: '1h' });

  const payload = {
    name: 'Prosperous Mensah',
    position: 'Program Director',
    biography: 'Leads program delivery and community partnerships.',
    image: ''
  };

  const res = await axios.post('http://localhost:5000/api/team', payload, { headers: { Authorization: `Bearer ${token}` } });
  console.log(JSON.stringify(res.data, null, 2));
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err.response?.status, err.response?.data || err.message);
  process.exit(1);
});
