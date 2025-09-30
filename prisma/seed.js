const { PrismaClient } = require('@prisma/client');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Memulai proses seeding...');

  // Seed Users
  console.log('Membaca data users...');
  const usersRaw = await fs.readFile('./users.json', 'utf-8');
  const usersData = JSON.parse(usersRaw);
  for (const user of usersData) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.create({
      data: { ...user, password: hashedPassword },
    });
  }
  console.log(`✅ ${usersData.length} user berhasil dibuat.`);

  // 2. Seed Places (tanpa rating_average yang benar dulu)
  console.log('Membaca data places...');
  const placesRaw = await fs.readFile('./places_clean.json', 'utf-8');
  // Hapus rating_average dari data awal, kita akan hitung ulang
  const placesData = JSON.parse(placesRaw).map(
    ({ rating_average, ...rest }) => rest
  );
  await prisma.places.createMany({ data: placesData });
  console.log(`✅ ${placesData.length} places berhasil dibuat.`);

  // 3. Seed Place Ratings
  console.log('Membaca data place_ratings...');
  const ratingsRaw = await fs.readFile('./place_ratings.json', 'utf-8');
  const ratingsData = JSON.parse(ratingsRaw);
  await prisma.placeRating.createMany({ data: ratingsData });
  console.log(`✅ ${ratingsData.length} place ratings berhasil dibuat.`);

  // 4. Hitung dan Update Rata-rata Rating
  console.log(
    '📊 Menghitung dan meng-update rata-rata rating untuk setiap tempat...'
  );
  const averageRatings = await prisma.placeRating.groupBy({
    by: ['place_id'],
    _avg: {
      rating: true,
    },
  });

  for (const avg of averageRatings) {
    await prisma.places.update({
      where: { id: avg.place_id },
      data: {
        rating_average: avg._avg.rating
          ? parseFloat(avg._avg.rating.toFixed(2))
          : 0,
      },
    });
  }
  console.log(
    `✅ ${averageRatings.length} rata-rata rating berhasil di-update.`
  );

  // 5. Sinkronisasi Ulang Sequence ID untuk setiap tabel
  // Ini adalah langkah krusial untuk memperbaiki masalah autoincrement setelah seeding manual
  console.log('🔄 Sinkronisasi ulang ID sequences...');
  await prisma.$executeRawUnsafe(
    `SELECT setval('"User_id_seq"', (SELECT MAX(id) FROM "User"));`
  );
  await prisma.$executeRawUnsafe(
    `SELECT setval('"Places_id_seq"', (SELECT MAX(id) FROM "Places"));`
  );
  await prisma.$executeRawUnsafe(
    `SELECT setval('"PlaceRating_id_seq"', (SELECT MAX(id) FROM "PlaceRating"));`
  );
  console.log(
    '✅ ID sequences untuk User, Places, dan PlaceRating berhasil disinkronkan.'
  );

  console.log('🎉 Seeding selesai dengan data yang konsisten!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
