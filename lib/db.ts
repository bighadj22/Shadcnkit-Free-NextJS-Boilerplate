// lib/db.ts
import { drizzle } from 'drizzle-orm/d1';
import { DrizzleD1Database } from 'drizzle-orm/d1';
import * as schema from '@/db/schema';  

export function createDb(d1: D1Database): DrizzleD1Database<typeof schema> {
  return drizzle(d1, { schema });
}