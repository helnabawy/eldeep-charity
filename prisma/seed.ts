import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || 'admin123',
    10
  );

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@aldeebcharity.org' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@aldeebcharity.org',
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  });

  console.log('Created admin user:', admin.email);

  // Create sample projects
  const projects = await Promise.all([
    prisma.project.upsert({
      where: { id: 'project-1' },
      update: {},
      create: {
        id: 'project-1',
        titleAr: 'كفالة الأيتام',
        titleEn: 'Orphan Sponsorship',
        descriptionAr: 'برنامج كفالة الأيتام يوفر الدعم المادي والمعنوي للأيتام وأسرهم',
        descriptionEn: 'The orphan sponsorship program provides financial and moral support to orphans and their families',
        category: 'sponsorship',
        status: 'ACTIVE',
        goalAmount: 100000,
        raisedAmount: 45000,
      },
    }),
    prisma.project.upsert({
      where: { id: 'project-2' },
      update: {},
      create: {
        id: 'project-2',
        titleAr: 'إفطار صائم',
        titleEn: 'Ramadan Iftar',
        descriptionAr: 'تقديم وجبات إفطار للصائمين في المسجد خلال شهر رمضان المبارك',
        descriptionEn: 'Providing iftar meals for fasting people at the mosque during Ramadan',
        category: 'food',
        status: 'ACTIVE',
        goalAmount: 50000,
        raisedAmount: 30000,
      },
    }),
    prisma.project.upsert({
      where: { id: 'project-3' },
      update: {},
      create: {
        id: 'project-3',
        titleAr: 'كسوة العيد',
        titleEn: 'Eid Clothing',
        descriptionAr: 'توزيع ملابس العيد على الأسر المحتاجة والأطفال',
        descriptionEn: 'Distributing Eid clothes to needy families and children',
        category: 'clothing',
        status: 'ACTIVE',
        goalAmount: 30000,
        raisedAmount: 15000,
      },
    }),
  ]);

  console.log('Created projects:', projects.length);

  // Create site settings
  const settings = [
    { key: 'site_name_ar', value: 'مؤسسة آل الديب الخيرية' },
    { key: 'site_name_en', value: 'Al Deeb Charity Foundation' },
    { key: 'site_description_ar', value: 'مؤسسة خيرية تسعى لخدمة المجتمع ودعم المحتاجين' },
    { key: 'site_description_en', value: 'A charitable foundation serving the community and supporting those in need' },
    { key: 'vodafone_cash', value: '01012345678' },
    { key: 'instapay_link', value: 'https://ipn.eg/alddeeb' },
    { key: 'address_ar', value: 'شارع المستشفي ، المقدام، الدقهلية ' },
    { key: 'address_en', value: 'Mosque Street, Matareya, Cairo, Egypt' },
    { key: 'phone', value: '+201012345678' },
    { key: 'email', value: 'info@aldeebcharity.org' },
    { key: 'facebook', value: 'https://facebook.com/aldeebcharity' },
    { key: 'whatsapp', value: '+201012345678' },
    { key: 'map_lat', value: '30.1319' },
    { key: 'map_lng', value: '31.3247' },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log('Created site settings:', settings.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
