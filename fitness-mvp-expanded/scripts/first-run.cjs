const { execSync } = require('node:child_process');
const fs = require('node:fs');
const flag = '.first-run-done';
if (!fs.existsSync(flag)) {
  console.log('> First run: applying migrations & seeding...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
  execSync('npm run seed', { stdio: 'inherit' });
  fs.writeFileSync(flag, 'ok');
  console.log('> DB ready. Starting dev server...');
}
