const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function ensureCategory(model, name) {
  const existing = await model.findFirst({ where: { name } });
  if (existing) return existing;
  return model.create({ data: { name } });
}

async function ensureBlogPost(title, data) {
  const existing = await prisma.blogPost.findFirst({ where: { title } });
  if (existing) {
    return prisma.blogPost.update({ where: { id: existing.id }, data });
  }
  return prisma.blogPost.create({ data });
}

async function ensureProject(title, data) {
  const existing = await prisma.project.findFirst({ where: { title } });
  if (existing) {
    return prisma.project.update({ where: { id: existing.id }, data });
  }
  return prisma.project.create({ data });
}

async function ensureGalleryItem(title, data) {
  const existing = await prisma.gallery.findFirst({ where: { title } });
  if (existing) {
    return prisma.gallery.update({ where: { id: existing.id }, data });
  }
  return prisma.gallery.create({ data });
}

async function ensureTestimonial(name, data) {
  const existing = await prisma.testimonial.findFirst({ where: { name } });
  if (existing) {
    return prisma.testimonial.update({ where: { id: existing.id }, data });
  }
  return prisma.testimonial.create({ data });
}

async function main() {
  /* ROLES */
  const roles = ["SUPER_ADMIN", "Admin", "Editor", "User"];

  for (const name of roles) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  /* PERMISSIONS */
  const permissions = [
    "manage_users",
    "manage_projects",
    "manage_content",
    "view_reports",
  ];

  for (const name of permissions) {
    await prisma.permission.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  /* Assign all permissions to Admin role */
  const adminRole = await prisma.role.findUnique({
    where: { name: "Admin" },
  });

  const allPermissions = await prisma.permission.findMany();

  for (const perm of allPermissions) {
    const exists = await prisma.rolePermission.findFirst({
      where: {
        roleId: adminRole.id,
        permissionId: perm.id,
      },
    });

    if (!exists) {
      await prisma.rolePermission.create({
        data: {
          roleId: adminRole.id,
          permissionId: perm.id,
        },
      });
    }
  }

  /* SERVICES */
  await prisma.service.createMany({
    data: [
      {
        title: "Research & Surveys",
        description:
          "Evidence-based research and survey services.",
        status: "ACTIVE",
      },
      {
        title: "Monitoring & Evaluation",
        description:
          "Programme monitoring and impact evaluation.",
        status: "ACTIVE",
      },
      {
        title: "Project Management",
        description:
          "Planning and implementation support.",
        status: "ACTIVE",
      },
    ],
    skipDuplicates: true,
  });

  /* TEAM */
  await prisma.teamMember.createMany({
    data: [
      {
        name: "Daniel Kofi Mensah",
        position: "Executive Director",
        biography: "Experienced development consultant.",
      },
      {
        name: "Patricia Amevor",
        position: "Research Officer",
        biography: "Research and data specialist.",
      },
    ],
    skipDuplicates: true,
  });

  /* BLOG CONTENT */
  const educationCategory = await ensureCategory(prisma.blogCategory, "Education");
  const healthCategory = await ensureCategory(prisma.blogCategory, "Health");
  const waterCategory = await ensureCategory(prisma.blogCategory, "Water & Sanitation");
  const livelihoodCategory = await ensureCategory(prisma.blogCategory, "Livelihood");
  const communityCategory = await ensureCategory(prisma.blogCategory, "Community Development");

  await ensureBlogPost("Bright Futures in Accra’s Public Schools", {
    title: "Bright Futures in Accra’s Public Schools",
    content:
      "Our recent learning support programme in Accra brought books, mentorship, and digital learning tools to students in underserved communities. Teachers report stronger attendance and eager participation in after-school clubs.",
    image:
      "https://source.unsplash.com/featured/800x500?ghana,education",
    status: "PUBLISHED",
    categoryId: educationCategory.id,
  });

  await ensureBlogPost("Community Clinics Reach More Mothers in Northern Ghana", {
    title: "Community Clinics Reach More Mothers in Northern Ghana",
    content:
      "Mobile health outreach teams connected mothers with prenatal care, nutrition talks, and family planning education in rural districts. These visits are improving trust in local clinics and strengthening early-childhood care.",
    image:
      "https://source.unsplash.com/featured/800x500?ghana,health",
    status: "PUBLISHED",
    categoryId: healthCategory.id,
  });

  await ensureBlogPost("Clean Water Project Brings Relief to Volta Communities", {
    title: "Clean Water Project Brings Relief to Volta Communities",
    content:
      "A new borehole and water point system now serves households that once walked long distances for water. The project has reduced illness and freed up valuable time for school and farming.",
    image:
      "https://source.unsplash.com/featured/800x500?ghana,water",
    status: "PUBLISHED",
    categoryId: waterCategory.id,
  });

  await ensureBlogPost("Women’s Cooperatives Grow Stronger in Kumasi", {
    title: "Women’s Cooperatives Grow Stronger in Kumasi",
    content:
      "Smallholder women are building stronger cooperatives around food processing and savings circles. With new market linkages and skills training, livelihoods are becoming more resilient and dignified.",
    image:
      "https://source.unsplash.com/featured/800x500?ghana,livelihood",
    status: "PUBLISHED",
    categoryId: livelihoodCategory.id,
  });

  await ensureBlogPost("Youth Volunteers Shape Safer Neighborhoods", {
    title: "Youth Volunteers Shape Safer Neighborhoods",
    content:
      "Young people from across Ghana are volunteering in sanitation drives, community mapping, and leadership activities that strengthen local ownership and improve public spaces.",
    image:
      "https://source.unsplash.com/featured/800x500?ghana,community",
    status: "PUBLISHED",
    categoryId: communityCategory.id,
  });

  /* PROJECTS */
  const educationProjectCategory = await ensureCategory(prisma.projectCategory, "Education");
  const healthProjectCategory = await ensureCategory(prisma.projectCategory, "Health");
  const waterProjectCategory = await ensureCategory(prisma.projectCategory, "Water & Sanitation");

  await ensureProject("School Readiness and Literacy Drive", {
    title: "School Readiness and Literacy Drive",
    description:
      "A community-based literacy programme that improves early learning outcomes for children in underserved districts.",
    image: "https://source.unsplash.com/featured/800x500?ghana,school",
    status: "ACTIVE",
    categoryId: educationProjectCategory.id,
  });

  await ensureProject("Mobile Health Outreach", {
    title: "Mobile Health Outreach",
    description:
      "Routine screenings, maternal care, and vaccination education delivered directly to remote communities.",
    image: "https://source.unsplash.com/featured/800x500?ghana,clinic",
    status: "ACTIVE",
    categoryId: healthProjectCategory.id,
  });

  await ensureProject("Rural Water Access Initiative", {
    title: "Rural Water Access Initiative",
    description:
      "Boreholes and handwashing stations are improving clean water access and hygiene practices in target communities.",
    image: "https://source.unsplash.com/featured/800x500?ghana,water",
    status: "ACTIVE",
    categoryId: waterProjectCategory.id,
  });

  /* GALLERY */
  const outreachCategory = await ensureCategory(prisma.galleryCategory, "Community Outreach");
  const trainingCategory = await ensureCategory(prisma.galleryCategory, "Training Programs");
  const waterCategoryGallery = await ensureCategory(prisma.galleryCategory, "Water Projects");

  await ensureGalleryItem("Community learning session in Tamale", {
    title: "Community learning session in Tamale",
    image: "https://source.unsplash.com/featured/800x600?ghana,learning",
    categoryId: outreachCategory.id,
  });

  await ensureGalleryItem("Health education day in Bolgatanga", {
    title: "Health education day in Bolgatanga",
    image: "https://source.unsplash.com/featured/800x600?ghana,health",
    categoryId: outreachCategory.id,
  });

  await ensureGalleryItem("Women training on livelihoods", {
    title: "Women training on livelihoods",
    image: "https://source.unsplash.com/featured/800x600?ghana,women",
    categoryId: trainingCategory.id,
  });

  await ensureGalleryItem("Clean water kiosk in a rural community", {
    title: "Clean water kiosk in a rural community",
    image: "https://source.unsplash.com/featured/800x600?ghana,water",
    categoryId: waterCategoryGallery.id,
  });

  await ensureGalleryItem("Volunteer sanitation drive", {
    title: "Volunteer sanitation drive",
    image: "https://source.unsplash.com/featured/800x600?ghana,volunteer",
    categoryId: outreachCategory.id,
  });

  /* TESTIMONIALS */
  await ensureTestimonial("Amina, Parent", {
    name: "Amina, Parent",
    image: "https://source.unsplash.com/featured/400x400?ghana,woman",
    message:
      "The learning support programme helped my children read confidently and feel proud to attend school every day.",
  });

  await ensureTestimonial("Kwame, Community Leader", {
    name: "Kwame, Community Leader",
    image: "https://source.unsplash.com/featured/400x400?ghana,man",
    message:
      "We now have clean water and a stronger sense of unity because the project listened to our needs and involved us from the start.",
  });

  /* DEFAULT ORGANIZATION SETTINGS */
  try {
    await prisma.setting.upsert({
      where: { id: 1 },
      update: {},
      create: {
        organizationName: "C4PDMD",
        shortName: "C4PDMD",
        email: "c4pdmd@gmail.com",
        phone: "+233242406733",
        address: "Ho, Volta Region, Ghana",
        evidenceBasedText:
          "Using data and research to drive sustainable change",
      },
    });
  } catch (settingsError) {
    console.log("⚠️  Settings already exist or schema issue, skipping...");
  }

  /* SUPER ADMIN USER (bootstrap) */
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || "c4pdmd@gmail.com";
  const existingSuper = await prisma.user.findUnique({ where: { email: superAdminEmail } });

  if (!existingSuper) {
    const hashed = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD || "C4PDMD@2026!", 10);
    const superRole = await prisma.role.findUnique({ where: { name: "SUPER_ADMIN" } });
    await prisma.user.create({
      data: {
        firstName: "C4PDMD",
        lastName: "Admin",
        email: superAdminEmail,
        password: hashed,
        phoneNumber: "+1234567890",
        roleId: superRole.id,
        status: "ACTIVE",
      },
    });
    console.log("✅ Super admin user created!");
  } else {
    console.log("✅ Super admin user already exists");
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });