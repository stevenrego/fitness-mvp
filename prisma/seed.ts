import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("test123", 10);

  const user = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'test123',
      coachProfile: {
        create: {
          bio: 'This is a test coach',
          certifications: 'Certified in testing',
        },
      },
      dieticianProfile: {
        create: {
          bio: 'Dietician bio',
          expertise: 'Keto, Vegan',
        },
      },
      posts: {
        create: [
          {
            text: 'Welcome to the fitness app!',
            type: 'INTRO',
          },
        ],
      },
      pointTxns: {
        create: {
          type: 'EARN',
          points: 100,
          reason: 'Initial reward',
        },
      },
    },
    include: {
      coachProfile: true,
      dieticianProfile: true,
    },
  });

  const workoutPlan = await prisma.workoutPlan.create({
    data: {
      title: 'Beginner Plan',
      description: 'A 4-week beginner plan',
      coach: { connect: { id: user.coachProfile!.id } },
    },
  });

  const mealPlan = await prisma.mealPlan.create({
    data: {
      title: 'High Protein Plan',
      coach: { connect: { id: user.dieticianProfile!.id } },
    },
  });

  const reward = await prisma.reward.create({
    data: {
      title: 'Free Protein Shake',
      cost: 50,
      type: 'FREE_ITEM',
    },
  });

  await prisma.shopOrder.create({
    data: {
      user: { connect: { id: user.id } },
      reward: { connect: { id: reward.id } },
      status: 'PENDING',
    },
  });

  console.log('✅ Seeded test data successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
