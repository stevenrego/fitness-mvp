DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="change-me"_

Stop = "Stop"
fitness-mvp-expanded = "fitness-mvp-expanded"
D:\fitness-mvp-expanded = "D:\fitness-mvp-expanded"

# Create base folder
New-Item -ItemType Directory -Force -Path D:\fitness-mvp-expanded | Out-Null
Set-Location D:\fitness-mvp-expanded

# Init Node project
npm init -y | Out-Null
npm install next@14 react@18 react-dom@18 @prisma/client prisma next-auth bcryptjs @tanstack/react-query zod clsx tailwindcss postcss autoprefixer

# Init Tailwind
npx tailwindcss init -p

# Create folders
New-Item -ItemType Directory -Force -Path "app","prisma","src\lib","postman" | Out-Null

# Create basic Next.js config
@"
const nextConfig = {};
export default nextConfig;
