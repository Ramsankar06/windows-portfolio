import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Basic .env parser for ESM
function loadEnv() {
    const envPath = path.resolve(__dirname, '.env');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8');
        envConfig.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split('=');
            const value = valueParts.join('=');
            if (key && value) {
                process.env[key.trim()] = value.trim();
            }
        });
    }
}

loadEnv();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables! Check your .env file.');
    console.log('Current ENV keys:', Object.keys(process.env).filter(k => k.startsWith('VITE_')));
    process.exit(1);
}

console.log('Testing connection to:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
    const tables = ['projects', 'skills', 'certificates', 'workshops', 'about'];

    for (const table of tables) {
        console.log(`\nChecking table: ${table}...`);
        try {
            const { data, error, count } = await supabase
                .from(table)
                .select('*', { count: 'exact' });

            if (error) {
                console.error(`Error fetching from ${table}:`, error.message);
            } else {
                console.log(`Successfully fetched from ${table}. Count: ${count}`);
                if (data && data.length > 0) {
                    console.log(`Sample data from ${table}:`, data[0]);
                } else {
                    console.log(`Table ${table} is empty.`);
                }
            }
        } catch (err) {
            console.error(`Unexpected error for ${table}:`, err.message);
        }
    }
}

testConnection().catch(err => console.error('Test failed:', err));
