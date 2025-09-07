import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/src/lib/db';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export const authConfig: NextAuthConfig = {
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: { email: { label: 'Email' }, password: { label: 'Password', type: 'password' } },
      async authorize(creds) {
        const parsed = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse(creds);
        if (!parsed.success) return null;
        const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
        if (!user) return null;
        const ok = await bcrypt.compare(parsed.data.password, user.password);
        if (!ok) return null;
        return { id: user.id, email: user.email, name: user.name, roles: user.roles } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) { if (user) { token.id = (user as any).id; token.roles = (user as any).roles; } return token; },
    async session({ session, token }) { if (token?.id) (session as any).user.id = token.id as string; (session as any).user.roles = (token as any).roles ?? ['USER']; return session; },
  },
  pages: { signIn: '/login' },
};
export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
