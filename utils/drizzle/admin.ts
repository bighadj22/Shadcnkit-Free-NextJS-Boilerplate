// File: src/utils/drizzle/admin.ts


import { createDb } from "@/db";  
import { eq, sql, and, isNotNull, desc } from 'drizzle-orm';
import {users } from "@/db/schema";
import { getRequestContext } from '@cloudflare/next-on-pages';


 
// Function to get database instance
const getDb = () => {
  const DB = getRequestContext().env.DB; 
  return createDb(DB);
};


// New function to get the user's role
export const getUserRole = async (userId: string): Promise<string | null> => {
  const db = getDb();
  
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: { role: true }
  });

  return user?.role ?? null;
};

