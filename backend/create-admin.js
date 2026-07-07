/**
 * Direct admin user creation (bypassing Prisma seed)
 * Usage: node create-admin.js
 */
const { prisma } = require('./src/config/database');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function createAdmin() {
  try {
    console.log('🔗 Connecting to database...');
    
    // Get or create SUPER_ADMIN role
    console.log('📋 Checking SUPER_ADMIN role...');
    let role = await prisma.role.findFirst({ where: { name: 'SUPER_ADMIN' } });
    
    if (!role) {
      console.log('Creating SUPER_ADMIN role...');
      role = await prisma.role.create({ data: { name: 'SUPER_ADMIN' } });
    }
    
    console.log(`✅ Role ID: ${role.id}`);
    
    // Check if admin exists
    const email = process.env.SUPER_ADMIN_EMAIL || 'c4pdmd@gmail.com';
    const password = process.env.SUPER_ADMIN_PASSWORD || 'C4PDMD@2026!';
    
    console.log(`\n🔍 Checking if admin exists: ${email}`);
    let user = await prisma.user.findFirst({ where: { email } });
    
    if (user) {
      console.log('✅ Admin user already exists');
      process.exit(0);
      return;
    }
    
    // Hash password
    console.log('🔐 Hashing password...');
    const hashed = await bcrypt.hash(password, 10);
    
    // Create admin user with minimal fields
    console.log('👤 Creating admin user...');
    user = await prisma.user.create({
      data: {
        firstName: 'C4PDMD',
        lastName: 'Admin',
        email,
        password: hashed,
        phoneNumber: '+1234567890',
        status: 'ACTIVE',
        roleId: role.id,
      },
      include: { role: true }
    });
    
    console.log('\n✅ Admin user created successfully!');
    console.log(`   ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.firstName} ${user.lastName}`);
    console.log(`   Role: ${user.role.name}`);
    console.log(`\n📝 Login credentials:`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

createAdmin();
