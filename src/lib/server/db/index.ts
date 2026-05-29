// import { drizzle } from 'drizzle-orm/postgres-js';
import { drizzle } from "drizzle-orm/neon-http";
// import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import { neon } from '@neondatabase/serverless';


if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');


const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });