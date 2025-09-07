# Fitness MVP (Expanded, KWD)

## Quick start
1) Copy .env.example to .env.local and set:
   - DATABASE_URL (Postgres)
   - NEXTAUTH_SECRET (random string)
   - NEXTAUTH_URL (http://localhost:3000)
   - STRIPE_* and MYFATOORAH_* when ready
2) Install & run:
   npm i
   npm run dev
   # first run auto-migrates + seeds

## Seeded logins
- Admin: admin@demo.com / admin123
- Coach: coach@demo.com / coach123
- User:  user@demo.com  / user123
