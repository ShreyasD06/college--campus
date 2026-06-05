import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Remove old records first (in correct order to handle FK constraints)
  try {
    await prisma.review.deleteMany({});
  } catch (e) {
    // Table might not exist yet
  }
  try {
    await prisma.favorite.deleteMany({});
  } catch (e) {
    // Table might not exist yet
  }
  try {
    await prisma.college.deleteMany({});
  } catch (e) {
    // Handle constraint issues
  }

  await prisma.college.createMany({
    data: [
      {
        name: "RV College of Engineering",
        location: "Bangalore",
        fees: 250000,
        rating: 4.8,
        placements: "18 LPA",
        overview: "Top engineering college in Karnataka",
        image: "https://picsum.photos/600/400?random=1"
      },
      {
        name: "BMS College of Engineering",
        location: "Bangalore",
        fees: 220000,
        rating: 4.6,
        placements: "14 LPA",
        overview: "Premier engineering institution",
        image: "https://picsum.photos/600/400?random=2"
        },
      {
        name: "MS Ramaiah Institute of Technology",
        location: "Bangalore",
        fees: 230000,
        rating: 4.5,
        placements: "12 LPA",
        overview: "Leading private engineering college",
        image: "https://picsum.photos/600/400?random=3"
      },
      {
        name: "PES University",
        location: "Bangalore",
        fees: 300000,
        rating: 4.7,
        placements: "15 LPA",
        overview: "Known for strong placements and academics",
        image: "https://picsum.photos/600/400?random=4"
      },
      {
        name: "NIT Surathkal",
        location: "Mangalore",
        fees: 125000,
        rating: 4.9,
        placements: "20 LPA",
        overview: "One of India's top NITs",
        image: "https://picsum.photos/600/400?random=5"
      },
      {
        name: "IIIT Bangalore",
        location: "Bangalore",
        fees: 350000,
        rating: 4.8,
        placements: "25 LPA",
        overview: "Leading institute for IT and research",
        image: "https://picsum.photos/600/400?random=6"
     },
    ],
  });

  console.log("Seeded successfully!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });