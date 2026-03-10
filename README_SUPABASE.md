# Supabase Integration Guide for FrameStudio

This guide will help you connect your FrameStudio portfolio website to Supabase for managing contact form submissions and your portfolio content through an admin dashboard.

## Quick Start

### 1. Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### 2. Set Up Your Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the project to finish setting up (this takes ~2 minutes)

### 3. Get Your Credentials

1. In your Supabase dashboard, go to **Project Settings** → **API**
2. Copy your:
   - Project URL (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - `anon` public key (looks like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 4. Configure Supabase Client

Open `/src/lib/supabase.ts` and:
1. Uncomment the import statement
2. Replace `YOUR_SUPABASE_URL` with your Project URL
3. Replace `YOUR_SUPABASE_ANON_KEY` with your anon key
4. Uncomment the export statement

### 5. Create Database Tables

In your Supabase dashboard, go to **SQL Editor** and run this SQL:

```sql
-- Portfolio websites table
CREATE TABLE websites (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '[]',
  results JSONB NOT NULL DEFAULT '[]',
  price TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  screenshots JSONB NOT NULL DEFAULT '[]',
  year TEXT NOT NULL,
  services JSONB NOT NULL DEFAULT '[]',
  built_by TEXT NOT NULL,
  client_testimonial TEXT,
  published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better performance
CREATE INDEX idx_websites_published ON websites(published);
CREATE INDEX idx_websites_sort_order ON websites(sort_order);

-- Enable Row Level Security (RLS)
ALTER TABLE websites ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to read published websites
CREATE POLICY "Allow public read published" ON websites
  FOR SELECT TO anon
  USING (published = true);

-- Policy to allow authenticated users to manage websites
CREATE POLICY "Allow authenticated all" ON websites
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Contact form submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Indexes for contact submissions
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);

-- Enable RLS for contact submissions
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit the contact form
CREATE POLICY "Allow public insert" ON contact_submissions
  FOR INSERT TO anon
  WITH CHECK (true);

-- Only authenticated users can view submissions
CREATE POLICY "Allow authenticated read" ON contact_submissions
  FOR SELECT TO authenticated
  USING (true);
```

### 6. Create Your Admin Account

1. In your Supabase dashboard, go to **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Enter your email and password
4. Click **Create User**

**Important:** Save these credentials - you'll use them to log in to the admin dashboard!

### 7. Access the Admin Dashboard

1. Navigate to `/admin` in your browser
2. Login with the credentials you created in step 6
3. Start adding your portfolio projects!

## Features

### ✅ Admin Dashboard
- **Add New Projects**: Complete form with all fields
- **Edit Projects**: Update any project details
- **Delete Projects**: Remove projects from your portfolio
- **Visual Management**: See thumbnails and previews of all projects
- **Real-time Updates**: Changes appear immediately on the live site

### ✅ Contact Form Submissions
- Stores all contact form submissions in Supabase
- View and manage submissions in Supabase dashboard
- Email notifications (can be set up via Supabase Edge Functions)

### ✅ Portfolio Management
- All portfolio items stored in Supabase
- No need to edit code to add/remove projects
- Dynamic content loaded from database
- Fallback to demo content if Supabase not configured

## Admin Dashboard Guide

### Adding a New Project

1. Log in to `/admin`
2. Click **Add New Project**
3. Fill in all required fields:
   - **Project Title**: The name of the website/project
   - **Category**: E.g., "SaaS Platform", "E-commerce", etc.
   - **Price**: How much the project costs (e.g., "$12,500")
   - **Year**: When the project was completed
   - **Short Description**: One-line pitch (shown on cards)
   - **Full Description**: Detailed explanation (shown in detail view)
   - **Thumbnail URL**: Main image for the project card
   - **Services**: Tags for what you provided (e.g., "UI/UX Design")
   - **Features**: Bullet points of key features
   - **Results**: Proven metrics and outcomes
   - **Screenshots**: Additional images to showcase
   - **Built By**: Your team/division name
   - **Client Testimonial**: Optional quote from the client

4. Click **Add Project**

### Editing a Project

1. Find the project in your dashboard
2. Click the **Edit** button
3. Make your changes
4. Click **Update Project**

### Deleting a Project

1. Find the project in your dashboard
2. Click the red **trash icon**
3. Confirm deletion

## Viewing Submissions

1. Go to your Supabase dashboard
2. Navigate to **Table Editor**
3. Select the `contact_submissions` table
4. View all form submissions with timestamps

## Security Best Practices

1. **Never commit your Supabase keys to version control**
   - Add `.env.local` to `.gitignore`
   - Use environment variables for sensitive data

2. **Use Row Level Security (RLS)**
   - Already configured in the SQL above
   - Prevents unauthorized access to your data

3. **Validate form inputs**
   - The form already has basic validation
   - Consider adding server-side validation via Edge Functions

4. **Strong admin password**
   - Use a unique, strong password for your admin account
   - Enable 2FA in Supabase for extra security

## Troubleshooting

### "Supabase not configured" error
- Make sure you've uncommented the code in `/src/lib/supabase.ts`
- Check that your URL and key are correct
- Verify you saved the file

### Can't log in to admin
- Make sure you created a user in Supabase Authentication
- Check that your email/password are correct
- Verify the user was created successfully in Supabase dashboard

### Projects not showing up
- Check that projects have `published = true`
- Verify the table name is `websites` (plural)
- Check browser console for errors

### Contact form not submitting
- Verify the `contact_submissions` table exists
- Check RLS policies are set up correctly
- See browser console for error details

## Optional: Email Notifications

To receive email notifications when someone submits the contact form:

1. Set up a Supabase Edge Function
2. Use the Resend or SendGrid integration
3. Trigger the function on new `contact_submissions` inserts

See Supabase documentation for detailed steps: [https://supabase.com/docs/guides/functions](https://supabase.com/docs/guides/functions)

## Need Help?

- Supabase Documentation: [https://supabase.com/docs](https://supabase.com/docs)
- Supabase Discord: [https://discord.supabase.com](https://discord.supabase.com)

---

**Ready to go live?** Once Supabase is configured:
1. Your portfolio automatically loads from the database
2. Contact forms store submissions
3. Admin dashboard lets you manage everything
4. No code changes needed to update content!