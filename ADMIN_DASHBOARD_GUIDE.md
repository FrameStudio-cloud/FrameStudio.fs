# FrameStudio Admin Dashboard - Quick Start Guide

## What You Have Now

Your FrameStudio portfolio website now includes:

### 🏠 Public Portfolio Website (/)
- Beautiful Awwwards-inspired design
- Showcases your portfolio projects
- Contact form with email and Instagram
- Fully responsive and animated
- Builder credits on each project

### 🔐 Admin Dashboard (/admin)
- Secure login system
- Add new projects with a comprehensive form
- Edit existing projects
- Delete projects
- Visual management with thumbnails
- Real-time updates to the live site

### 📊 Database-Powered Content
- All projects stored in Supabase
- Contact form submissions saved to database
- No code changes needed to update content
- Works with or without Supabase (falls back to demo data)

## Routes

- **`/`** - Public portfolio homepage
- **`/admin`** - Admin login page
- **`/admin/dashboard`** - Admin dashboard (requires login)
- **`#contact`** - Contact section on homepage

## How to Get Started

### Option 1: Use Demo Mode (No Setup Required)
The site works immediately with demo projects. Perfect for testing!

### Option 2: Connect Supabase (Full Features)

**5-Minute Setup:**

1. **Install Supabase**
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Create Account**
   - Go to [supabase.com](https://supabase.com)
   - Create free account
   - Create new project

3. **Configure**
   - Open `/src/lib/supabase.ts`
   - Uncomment the code
   - Add your Supabase URL and key
   - Save file

4. **Run SQL**
   - Copy SQL from `/src/lib/supabase.ts` comments
   - Run in Supabase SQL Editor
   - Creates `websites` and `contact_submissions` tables

5. **Create Admin Account**
   - In Supabase: Authentication → Users
   - Click "Add User"
   - Create your login credentials

6. **Login**
   - Go to `/admin`
   - Login with your credentials
   - Start adding projects!

## Admin Dashboard Features

### Add a Project
Complete form with fields for:
- Title & Category
- Pricing & Year
- Descriptions (short & detailed)
- Features (unlimited)
- Results/Metrics (unlimited)
- Services Tags (unlimited)
- Screenshots (unlimited)
- Thumbnail Image
- Builder Credit
- Client Testimonial

### Manage Projects
- **Edit**: Click edit button on any project
- **Delete**: Click trash icon (with confirmation)
- **View**: Click "View Site" to see live portfolio

### Form Features
- Dynamic arrays for features, results, services, screenshots
- Add/remove items easily
- All fields clearly labeled
- Required field validation
- Real-time preview of thumbnails

## Project Data Structure

Each project includes:

```typescript
{
  title: string              // "Analytics Dashboard Pro"
  category: string           // "SaaS Platform"
  description: string        // Short pitch (shown on card)
  fullDescription: string    // Detailed explanation
  features: string[]         // Key features list
  results: string[]          // Proven metrics
  price: string              // "$12,500"
  thumbnail: string          // Main image URL
  screenshots: string[]      // Gallery images
  year: string               // "2024"
  services: string[]         // ["UI/UX", "Development"]
  builtBy: string           // "FrameStudio Team"
  clientTestimonial: string // Optional quote
}
```

## Contact Form

- Email: `hello@framestudio.com`
- Instagram: `@framestudio`
- Contact form with project type selector
- Submissions saved to Supabase (when configured)
- Ready for email notification integration

## Customization

### Update Company Info
Edit these in the code:
- Company name: "FrameStudio"
- Email: Search for `hello@framestudio.com`
- Instagram: Search for `@framestudio`
- Year founded: "2020"

### Update Branding
- Logo/Icon: Edit the black square in headers
- Colors: Currently black/white, easy to customize
- Fonts: Inter & Space Grotesk (loaded from Google Fonts)

## Image Management

### Using Image URLs
- Use Unsplash for free high-quality images
- Or upload to Supabase Storage
- Or use any public image URL

### Recommended Image Sizes
- **Thumbnail**: 1080x810px (4:3 ratio)
- **Screenshots**: 1920x1080px (16:9 ratio)

## Security Features

✅ Row Level Security (RLS) enabled
✅ Authenticated access for admin
✅ Public can only read published projects
✅ Form validation on submission
✅ Password-protected admin area

## Tips for Success

### Writing Great Project Descriptions
1. **Short Description**: One compelling sentence that hooks visitors
2. **Full Description**: 2-3 paragraphs explaining the project value
3. **Features**: Be specific and technical
4. **Results**: Use real numbers and percentages when possible

### Adding Images
1. Use high-quality screenshots
2. Show different views/pages
3. Include mobile views if relevant
4. Make sure URLs are accessible

### Organizing Projects
- Projects display in the order they're added
- Edit `sort_order` in database to reorder
- Use meaningful categories
- Keep pricing format consistent

## What's Next?

### Immediate
- [ ] Set up Supabase (optional but recommended)
- [ ] Add your real projects
- [ ] Update contact email and social media
- [ ] Customize company info

### Soon
- [ ] Add more projects as you complete them
- [ ] Collect testimonials from clients
- [ ] Set up email notifications for contact form
- [ ] Consider adding analytics

### Advanced
- [ ] Connect custom domain
- [ ] Set up Supabase Storage for images
- [ ] Add email automation
- [ ] Create project categories filter

## Need Help?

Check these files:
- **`/README_SUPABASE.md`** - Complete Supabase setup guide
- **`/src/lib/supabase.ts`** - Database schema and configuration
- **`/src/app/pages/AdminDashboard.tsx`** - Admin dashboard code

---

**You're all set!** 🎉

Visit `/admin` to start managing your portfolio!
