import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categorySeeds = [
    { name: 'Tóm tắt truyện', slug: 'tom-tat-truyen', description: 'Tóm tắt các truyện tu tiên, tiên hiệp từ đầu đến cuối', sortOrder: 1 },
    { name: 'Nhân vật', slug: 'nhan-vat', description: 'Hồ sơ nhân vật trong truyện tu tiên', sortOrder: 2 },
    { name: 'Top nhân vật mạnh nhất', slug: 'top-nhan-vat-manh-nhat', description: 'Xếp hạng nhân vật mạnh nhất trong từng bộ truyện', sortOrder: 3 },
    { name: 'Hệ thống cảnh giới', slug: 'he-thong-canh-gioi', description: 'Các cảnh giới tu luyện trong truyện', sortOrder: 4 },
    { name: 'Giải thích cốt truyện', slug: 'giai-thich-cot-truyen', description: 'Giải thích cốt truyện, ending và các arc', sortOrder: 5 },
  ];
  for (const category of categorySeeds) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      create: category,
      update: category,
    });
  }

  const catIds = await prisma.category.findMany({ select: { id: true, slug: true } });
  const catMap = Object.fromEntries(catIds.map((c) => [c.slug, c.id]));

  const novelTienNghich = await prisma.novel.upsert({
    where: { slug: 'tien-nghich' },
    create: { title: 'Tiên Nghịch', slug: 'tien-nghich', description: 'Truyện tiên hiệp nổi tiếng của Nhĩ Căn.', authorName: 'Nhĩ Căn' },
    update: {},
  });
  const novelDauPha = await prisma.novel.upsert({
    where: { slug: 'dau-pha-thuong-khung' },
    create: { title: 'Đấu Phá Thương Khung', slug: 'dau-pha-thuong-khung', description: 'Tiêu Viêm từ phế vật vươn lên đỉnh cao.', authorName: 'Thiên Tàm Thổ Đậu' },
    update: {},
  });
  const novelPhamNhan = await prisma.novel.upsert({
    where: { slug: 'pham-nhan-tu-tien' },
    create: { title: 'Phàm Nhân Tu Tiên', slug: 'pham-nhan-tu-tien', description: 'Hàn Lập tu tiên từ phàm nhân.', authorName: 'Vong Ngữ' },
    update: {},
  });
  await prisma.novel.upsert({
    where: { slug: 'van-co-than-de' },
    create: { title: 'Vạn Cổ Thần Đế', slug: 'van-co-than-de', description: 'Truyện huyền huyễn đại thế.' },
    update: {},
  });

  const characterSeeds = [
    { novelId: novelTienNghich.id, name: 'Vương Lâm', slug: 'vuong-lam', description: 'Nhân vật chính, nghịch tu.', powerRank: 1 },
    { novelId: novelTienNghich.id, name: 'Lý Mộ Uyển', slug: 'ly-mo-uyen', description: 'Nữ chính.', powerRank: 2 },
    { novelId: novelDauPha.id, name: 'Tiêu Viêm', slug: 'tieu-viem', description: 'Nhân vật chính.', powerRank: 1 },
    { novelId: novelDauPha.id, name: 'Vân Vận', slug: 'van-van', description: 'Sư phụ.', powerRank: 2 },
    { novelId: novelPhamNhan.id, name: 'Hàn Lập', slug: 'han-lap', description: 'Nhân vật chính kiên định.', powerRank: 1 },
    { novelId: novelPhamNhan.id, name: 'Nam Cung Uyển', slug: 'nam-cung-uyen', description: 'Đạo lữ của Hàn Lập.', powerRank: 2 },
  ];
  for (const character of characterSeeds) {
    await prisma.character.upsert({
      where: {
        novelId_slug: {
          novelId: character.novelId,
          slug: character.slug,
        },
      },
      create: character,
      update: character,
    });
  }

  const articleSeeds = [
    {
      title: 'Tóm tắt truyện Tiên Nghịch từ đầu đến cuối',
      slug: 'tien-nghich',
      content: '<p>Tiên Nghịch là bộ truyện tiên hiệp nổi tiếng của tác giả Nhĩ Căn. Câu chuyện xoay quanh Vương Lâm.</p><h2>Mở đầu</h2><p>Vương Lâm trưởng thành qua vô số kiếp nạn.</p>',
      excerpt: 'Tóm tắt toàn bộ cốt truyện Tiên Nghịch từ chương đầu đến kết thúc.',
      categoryId: catMap['tom-tat-truyen'],
      novelId: novelTienNghich.id,
      metaTitle: 'Tóm tắt truyện Tiên Nghịch từ đầu đến cuối',
      metaDescription: 'Tóm tắt cốt truyện Tiên Nghịch từ chương đầu đến kết thúc.',
      published: true,
    },
    {
      title: 'Top 10 nhân vật mạnh nhất trong Đấu Phá Thương Khung',
      slug: 'top-10-dau-pha-thuong-khung',
      content: '<p>Dưới đây là top nhân vật mạnh nhất trong Đấu Phá Thương Khung theo từng giai đoạn.</p>',
      excerpt: 'Xếp hạng top 10 nhân vật mạnh nhất trong Đấu Phá Thương Khung.',
      categoryId: catMap['top-nhan-vat-manh-nhat'],
      novelId: novelDauPha.id,
      metaTitle: 'Top 10 nhân vật mạnh nhất trong Đấu Phá Thương Khung',
      metaDescription: 'Bảng xếp hạng sức mạnh của các nhân vật trong Đấu Phá Thương Khung.',
      published: true,
    },
    {
      title: 'Các cảnh giới tu luyện trong Phàm Nhân Tu Tiên',
      slug: 'canh-gioi-pham-nhan-tu-tien',
      content: '<p>Phàm Nhân Tu Tiên có hệ thống cảnh giới rõ ràng từ Luyện Khí đến Đại Thừa.</p>',
      excerpt: 'Giới thiệu hệ thống cảnh giới tu luyện trong Phàm Nhân Tu Tiên.',
      categoryId: catMap['he-thong-canh-gioi'],
      novelId: novelPhamNhan.id,
      metaTitle: 'Các cảnh giới tu luyện trong Phàm Nhân Tu Tiên',
      metaDescription: 'Luyện Khí, Trúc Cơ, Kết Đan và các cảnh giới cao hơn trong Phàm Nhân Tu Tiên.',
      published: true,
    },
    {
      title: 'Giải thích ending Tiên Nghịch',
      slug: 'giai-thich-ending-tien-nghich',
      content: '<p>Phân tích ending Tiên Nghịch và ý nghĩa hành trình nghịch thiên của Vương Lâm.</p>',
      excerpt: 'Giải thích ending Tiên Nghịch và các chi tiết quan trọng.',
      categoryId: catMap['giai-thich-cot-truyen'],
      novelId: novelTienNghich.id,
      metaTitle: 'Giải thích ending Tiên Nghịch',
      metaDescription: 'Phân tích ending Tiên Nghịch cùng các chi tiết then chốt.',
      published: true,
    },
    {
      title: 'Hồ sơ nhân vật Vương Lâm',
      slug: 'ho-so-vuong-lam',
      content: '<p>Tổng hợp thông tin về Vương Lâm: tính cách, pháp bảo và bước ngoặt sức mạnh.</p>',
      excerpt: 'Hồ sơ đầy đủ về nhân vật Vương Lâm.',
      categoryId: catMap['nhan-vat'],
      novelId: novelTienNghich.id,
      metaTitle: 'Hồ sơ nhân vật Vương Lâm',
      metaDescription: 'Thông tin đầy đủ về Vương Lâm trong Tiên Nghịch.',
      published: true,
    },
    {
      title: 'Hồ sơ nhân vật Tiêu Viêm',
      slug: 'ho-so-tieu-viem',
      content: '<p>Tổng hợp thông tin về Tiêu Viêm và con đường từ Đấu Giả đến Đấu Đế.</p>',
      excerpt: 'Hồ sơ nhân vật chính Tiêu Viêm trong Đấu Phá Thương Khung.',
      categoryId: catMap['nhan-vat'],
      novelId: novelDauPha.id,
      metaTitle: 'Hồ sơ nhân vật Tiêu Viêm',
      metaDescription: 'Chi tiết về Tiêu Viêm và quá trình trưởng thành sức mạnh.',
      published: true,
    },
    {
      title: 'Top nhân vật mạnh nhất trong Tiên Nghịch',
      slug: 'top-nhan-vat-manh-tien-nghich',
      content: '<p>Xếp hạng các cường giả trong Tiên Nghịch dựa trên thực lực và chiến tích.</p>',
      excerpt: 'Bảng xếp hạng nhân vật mạnh nhất trong Tiên Nghịch.',
      categoryId: catMap['top-nhan-vat-manh-nhat'],
      novelId: novelTienNghich.id,
      metaTitle: 'Top nhân vật mạnh nhất trong Tiên Nghịch',
      metaDescription: 'Danh sách các nhân vật mạnh nhất trong Tiên Nghịch.',
      published: true,
    },
    {
      title: 'Hệ thống cảnh giới trong Đấu Phá Thương Khung',
      slug: 'he-thong-canh-gioi-dau-pha',
      content: '<p>Giải thích chi tiết các mốc cảnh giới từ Đấu Giả đến Đấu Đế.</p>',
      excerpt: 'Toàn bộ các cấp bậc tu luyện trong Đấu Phá Thương Khung.',
      categoryId: catMap['he-thong-canh-gioi'],
      novelId: novelDauPha.id,
      metaTitle: 'Hệ thống cảnh giới trong Đấu Phá Thương Khung',
      metaDescription: 'Chi tiết các cảnh giới trong Đấu Phá Thương Khung.',
      published: true,
    },
    {
      title: 'Giải thích arc Linh Giới trong Phàm Nhân Tu Tiên',
      slug: 'arc-linh-gioi-pham-nhan-tu-tien',
      content: '<p>Arc Linh Giới là bước chuyển lớn của Hàn Lập trong hành trình tu tiên.</p>',
      excerpt: 'Phân tích arc Linh Giới trong Phàm Nhân Tu Tiên.',
      categoryId: catMap['giai-thich-cot-truyen'],
      novelId: novelPhamNhan.id,
      metaTitle: 'Giải thích arc Linh Giới trong Phàm Nhân Tu Tiên',
      metaDescription: 'Phân tích cốt truyện arc Linh Giới của Phàm Nhân Tu Tiên.',
      published: true,
    },
    {
      title: 'Tóm tắt truyện Phàm Nhân Tu Tiên',
      slug: 'tom-tat-pham-nhan-tu-tien',
      content: '<p>Tổng quan cốt truyện Phàm Nhân Tu Tiên từ phàm nhân đến cường giả.</p>',
      excerpt: 'Tóm tắt cốt truyện Phàm Nhân Tu Tiên ngắn gọn, dễ hiểu.',
      categoryId: catMap['tom-tat-truyen'],
      novelId: novelPhamNhan.id,
      metaTitle: 'Tóm tắt truyện Phàm Nhân Tu Tiên',
      metaDescription: 'Tóm tắt các mốc cốt truyện chính trong Phàm Nhân Tu Tiên.',
      published: true,
    },
  ];
  for (const article of articleSeeds) {
    await prisma.article.upsert({
      where: {
        slug_categoryId: {
          slug: article.slug,
          categoryId: article.categoryId,
        },
      },
      create: article,
      update: article,
    });
  }

  const adCount = await prisma.adSlot.count();
  if (adCount === 0) {
    await prisma.adSlot.createMany({
      data: [
        { name: 'Top Banner', position: 'top_banner' },
        { name: 'Inside Article - After First Paragraph', position: 'article_after_first_paragraph' },
        { name: 'Middle of Article', position: 'article_middle' },
        { name: 'Sidebar', position: 'sidebar' },
        { name: 'Footer', position: 'footer' },
      ],
    });
  }

  console.log('Seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(() => prisma.$disconnect());
