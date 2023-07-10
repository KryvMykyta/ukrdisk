import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import dotenv from 'dotenv'
dotenv.config()

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const poolConnection = new Pool({
    host: PGHOST,
    port: 5432,
    user: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    ssl: true
})

export const db = drizzle(poolConnection);