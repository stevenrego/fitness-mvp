import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
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
            content: 'Welcome to the fitness app!',
            title: 'First Post',
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
  });

  const workoutPlan = await prisma.workoutPlan.create({
    data: {
      title: 'Beginner Plan',
      description: 'A 4-week beginner plan',
      coach: { connect: { id: user.coachProfileId } },
    },
  });

  const mealPlan = await prisma.mealPlan.create({
    data: {
      title: 'High Protein Plan',
      coach: { connect: { id: user.dieticianProfileId } },
    },
  });

  const reward = await prisma.reward.create({
    data: {
      title: 'Free Protein Shake',
      cost: 50,
    },
  });

  await prisma.shopOrder.create({
    data: {
      userId: user.id,
      rewardId: reward.id,
    },
  });

  console.log('Seeded test data.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
