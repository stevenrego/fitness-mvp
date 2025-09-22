#!/bin/bash

echo "⚡ Running dynamic Vercel build. Environment: $VERCEL_ENV"

if [ "$VERCEL_ENV" = "production" ]; then
  echo "🚀 Production build: pushing Prisma schema + seeding DB"
  npm run build:prod
else
  echo "🛠 Preview build: skipping DB push + seed"
  npm run build:preview
fi
