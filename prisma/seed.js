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

  // =================================================================
  // --- SESI KEDUA: UPDATE DAN SINKRONISASI ---
  // =================================================================

  console.log('📊 Menghitung rata-rata rating...');
  const averageRatings = await prisma.placeRating.groupBy({
    by: ['place_id'],
    _avg: {
      rating: true,
    },
  });

  console.log('Mengumpulkan perintah update...');
  const updatePromises = averageRatings.map((avg) =>
    prisma.places.update({
      where: { id: avg.place_id },
      data: {
        rating_average: avg._avg.rating
          ? parseFloat(avg._avg.rating.toFixed(2))
          : 0,
      },
    })
  );

  // =================================================================
  // --- KONTROL BATCHING DI SINI ---
  // =================================================================
  const batchSize = 500;
  // --- UBAH ANGKA INI UNTUK MEMULAI DARI BATCH TERTENTU ---
  const startBatch = 1; // Mulai dari batch ke-5
  // -----------------------------------------------------------

  const startIndex = (startBatch - 1) * batchSize;

  console.log(
    `Membagi ${updatePromises.length} update ke dalam batch berukuran ${batchSize}...`
  );
  console.log(`Memulai dari batch #${startBatch}`);

  for (let i = startIndex; i < updatePromises.length; i += batchSize) {
    const batch = updatePromises.slice(i, i + batchSize);
    const currentBatchNumber = i / batchSize + 1;
    console.log(
      `Menjalankan batch ${currentBatchNumber} dari ${Math.ceil(
        updatePromises.length / batchSize
      )}...`
    );
    await prisma.$transaction(batch);
  }

  console.log(`✅ Rata-rata rating berhasil di-update.`);

  console.log('🔄 Sinkronisasi ulang ID sequences...');
  // await prisma.$executeRawUnsafe(
  //   `SELECT setval('"User_id_seq"', (SELECT MAX(id) FROM "User"));`
  // );
  await prisma.$executeRawUnsafe(
    `SELECT setval('"Places_id_seq"', (SELECT MAX(id) FROM "Places"));`
  );
  await prisma.$executeRawUnsafe(
    `SELECT setval('"PlaceRating_id_seq"', (SELECT MAX(id) FROM "PlaceRating"));`
  );
  console.log('✅ ID sequences berhasil disinkronkan.');

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
