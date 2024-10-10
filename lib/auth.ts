// lib/auth.ts

import { getLogtoContext } from '@logto/next/server-actions';
import { logtoConfig } from '@/app/logto';  // Make sure this path is correct

export async function getCurrentUser() {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

  if (!isAuthenticated || !claims) {
    return null;
  }

  const userId = claims.sub;

  if (!userId) { 
    return null;
  }

  return {
    id: userId,
    email: claims.email,
    name: claims.name,
    claims: claims  // include all claims if you need them elsewhere
  };
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthenticated');
  }
  return user;
}