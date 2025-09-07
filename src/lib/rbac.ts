export function can(user: { roles?: string[] }, perm: 'ADMIN'|'COACH'|'USER') {
  const r = user?.roles ?? ['USER'];
  return r.includes(perm);
}
