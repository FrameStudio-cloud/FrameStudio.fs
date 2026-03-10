/**
 * SUPABASE CONFIGURATION
 * 
 * To connect your FrameStudio portfolio to Supabase:
 * 
 * 1. Sign up for a free Supabase account at https://supabase.com
 * 
 * 2. Create a new project in your Supabase dashboard
 * 
 * 3. Get your project URL and anon key from:
 *    Project Settings > API > Project URL and Project API keys
 * 
 * 4. Replace the placeholders below with your actual values
 * 
 * 5. Uncomment the code below to enable Supabase
 */

// import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase credentials
// const supabaseUrl = 'YOUR_SUPABASE_URL'
// const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * DATABASE SCHEMA
 * 
 * Create this table in your Supabase SQL Editor:
 * 
 * CREATE TABLE websites (
 *   id BIGSERIAL PRIMARY KEY,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
 *   title TEXT NOT NULL,
 *   category TEXT NOT NULL,
 *   description TEXT NOT NULL,
 *   full_description TEXT NOT NULL,
 *   features JSONB NOT NULL DEFAULT '[]',
 *   results JSONB NOT NULL DEFAULT '[]',
 *   price TEXT NOT NULL,
 *   thumbnail TEXT NOT NULL,
 *   screenshots JSONB NOT NULL DEFAULT '[]',
 *   year TEXT NOT NULL,
 *   services JSONB NOT NULL DEFAULT '[]',
 *   built_by TEXT NOT NULL,
 *   client_testimonial TEXT,
 *   published BOOLEAN DEFAULT true,
 *   sort_order INTEGER DEFAULT 0,
 *   updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
 * );
 * 
 * -- Create indexes for better performance
 * CREATE INDEX idx_websites_published ON websites(published);
 * CREATE INDEX idx_websites_sort_order ON websites(sort_order);
 * 
 * -- Enable Row Level Security (RLS)
 * ALTER TABLE websites ENABLE ROW LEVEL SECURITY;
 * 
 * -- Policy to allow anyone to read published websites
 * CREATE POLICY "Allow public read published" ON websites
 *   FOR SELECT TO anon
 *   USING (published = true);
 * 
 * -- Policy to allow authenticated users to manage websites
 * CREATE POLICY "Allow authenticated all" ON websites
 *   FOR ALL TO authenticated
 *   USING (true)
 *   WITH CHECK (true);
 * 
 * -- Contact submissions table
 * CREATE TABLE contact_submissions (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
 *   name TEXT NOT NULL,
 *   email TEXT NOT NULL,
 *   project_type TEXT NOT NULL,
 *   message TEXT NOT NULL,
 *   status TEXT DEFAULT 'new',
 *   updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
 * );
 * 
 * -- Indexes for contact submissions
 * CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
 * CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
 * 
 * -- Enable RLS for contact submissions
 * ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
 * 
 * -- Allow anyone to submit the contact form
 * CREATE POLICY "Allow public insert" ON contact_submissions
 *   FOR INSERT TO anon
 *   WITH CHECK (true);
 * 
 * -- Only authenticated users can view submissions
 * CREATE POLICY "Allow authenticated read" ON contact_submissions
 *   FOR SELECT TO authenticated
 *   USING (true);
 */

// Placeholder export to avoid import errors


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)