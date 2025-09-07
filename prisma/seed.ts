import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  // Users
  const adminPass = await bcrypt.hash('admin123', 10);
  const coachPass = await bcrypt.hash('coach123', 10);
  const userPass  = await bcrypt.hash('user123', 10);

  const [admin, coachUser, regular] = await Promise.all([
    prisma.user.upsert({ where:{ email:'admin@demo.com' }, update:{}, create:{ email:'admin@demo.com', password:adminPass, name:'Admin', roles:[Role.ADMIN] } }),
    prisma.user.upsert({ where:{ email:'coach@demo.com' }, update:{}, create:{ email:'coach@demo.com', password:coachPass, name:'Coach', roles:[Role.COACH] } }),
    prisma.user.upsert({ where:{ email:'user@demo.com'  }, update:{}, create:{ email:'user@demo.com',  password:userPass,  name:'User',  roles:[Role.USER] } }),
  ]);

  // Coach profile
  await prisma.coachProfile.upsert({
    where: { userId: coachUser.id },
    update: {},
    create: { userId: coachUser.id, certifications: 'CPT', specialties: 'Strength, Fat loss', bio: 'Demo coach' }
  });

  // Exercises
  const [squat, bench, deadlift, pushup] = await prisma.([
    prisma.exercise.upsert({ where:{ id:'s1' }, update:{}, create:{ id:'s1', name:'Back Squat', bodyPart:'Legs' } }),
    prisma.exercise.upsert({ where:{ id:'s2' }, update:{}, create:{ id:'s2', name:'Bench Press', bodyPart:'Chest' } }),
    prisma.exercise.upsert({ where:{ id:'s3' }, update:{}, create:{ id:'s3', name:'Deadlift', bodyPart:'Back' } }),
    prisma.exercise.upsert({ where:{ id:'s4' }, update:{}, create:{ id:'s4', name:'Push-up', bodyPart:'Chest' } }),
  ]);

  // Program
  const program = await prisma.program.create({
    data: {
      coachId: (await prisma.coachProfile.findFirstOrThrow({ where:{ userId: coachUser.id } })).id,
      name: 'Starter Strength',
      goal: 'Build foundation',
      phases: {
        create: [{
          name: 'Phase 1', order: 1, days: {
            create: [
              { order: 1, items: { create: [
                { exerciseId: squat.id, sets: 3, reps: 5 },
                { exerciseId: bench.id, sets: 3, reps: 5 }
              ]}},
              { order: 2, items: { create: [
                { exerciseId: deadlift.id, sets: 3, reps: 5 },
                { exerciseId: pushup.id, sets: 3, reps: 12 }
              ]}}
            ]
          }
        }]
      }
    }
  });

  // Enrollment
  await prisma.enrollment.create({ data: { userId: regular.id, programId: program.id } });

  // Habits & Nutrition samples
  const h1 = await prisma.habit.create({ data: { userId: regular.id, name:'10k steps', frequency:'daily' } });
  await prisma.habitLog.create({ data:{ habitId: h1.id, done: true } });
  await prisma.nutritionEntry.create({ data:{ userId: regular.id, meal:'breakfast', calories: 450, protein: 30, carbs: 50, fat: 15 } });

  // Community
  const post = await prisma.post.create({ data: { authorId: regular.id, text: 'Day 1 – feeling great!' } });
  await prisma.comment.create({ data: { postId: post.id, authorId: coachUser.id, body:'Keep it up!' } });

  // Challenges
  const challenge = await prisma.challenge.create({
    data: { name:'7-Day Activity', rulesJson:'{"proof":"photo"}', startsAt: new Date(), endsAt: new Date(Date.now()+7*86400000), rewardPts: 50 }
  });
  const cp = await prisma.challengeParticipant.create({ data: { challengeId: challenge.id, userId: regular.id } });
  await prisma.challengeProof.create({ data: { participantId: cp.id, url:'https://example.com/proof.jpg', status:'approved' } });

  // Gamification
  await prisma.reward.createMany({ data: [{ name:'5% Shop Coupon', pointsCost: 100 }, { name:'T-shirt', pointsCost: 500 }], skipDuplicates:true });
  await prisma.pointTransaction.createMany({ data: [
    { userId: regular.id, delta: +50, reason:'Challenge completion' },
    { userId: regular.id, delta: +10, reason:'Workout logged' }
  ]});

  // Shop & sample orders
  const [prod1, prod2] = await prisma.([
    prisma.product.create({ data: { name:'Protein Powder', price: 12.00, currency:'KWD', stock: 100 } }),
    prisma.product.create({ data: { name:'Resistance Bands', price: 6.50, currency:'KWD', stock: 200 } })
  ]);
  const order = await prisma.order.create({
    data: {
      userId: regular.id, total: 18.50, currency:'KWD', status:'paid',
      items: { create: [ { productId: prod1.id, qty:1, price: 12.00 }, { productId: prod2.id, qty:1, price: 6.50 } ] }
    }
  });

  // Subscriptions (KWD) + sample payment records implied
  await prisma.subscription.upsert({
    where: { userId: regular.id },
    update: { provider:'myfatoorah', plan:'Monthly', status:'active', currency:'kwd', amount: 300, currentPeriodEnd: new Date(Date.now()+30*86400000) },
    create: { userId: regular.id, provider:'myfatoorah', plan:'Monthly', status:'active', currency:'kwd', amount: 300, currentPeriodEnd: new Date(Date.now()+30*86400000) }
  });

  // Sample workout session to populate dashboard
  await prisma.workoutSession.create({
    data: {
      userId: regular.id,
      notes: 'Intro day',
      sets: { create: [
        { exerciseId: squat.id, setNumber:1, reps:5, weight: 60 },
        { exerciseId: bench.id, setNumber:1, reps:5, weight: 40 }
      ]}
    }
  });
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.(); });
