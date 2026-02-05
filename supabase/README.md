# Supabase Database Setup

## Initial Setup

1. Go to your Supabase project dashboard: https://osmvhuyiryxposllkicd.supabase.co

2. Navigate to **SQL Editor** in the left sidebar

3. Click **New query**

4. Copy the entire contents of `migrations/001_initial_schema.sql`

5. Paste into the SQL Editor and click **Run**

6. Verify all tables were created:
   - regions (with 3 rows: UK, UAE, IND)
   - admin_users
   - leads
   - posts
   - stats (with 3 rows)

## Create First Admin User

1. Go to **Authentication** → **Users** in Supabase dashboard

2. Click **Add user** → **Create new user**

3. Enter:
   - Email: `admin@blackarrowtechnologies.com`
   - Password: (create a strong password)
   - Auto Confirm User: ✅ (checked)

4. Click **Create user**

5. Copy the User UID from the users table

6. Go back to **SQL Editor** and run:

```sql
INSERT INTO admin_users (id, email, full_name, role)
VALUES (
  '<PASTE_USER_UID_HERE>',
  'admin@blackarrowtechnologies.com',
  'Admin User',
  'admin'
);
```

## Verify Setup

Run these queries to confirm everything is working:

```sql
-- Check regions
SELECT * FROM regions;

-- Check stats
SELECT * FROM stats;

-- Check admin user
SELECT * FROM admin_users;

-- Test RLS: This should work (public can view regions)
SET ROLE anon;
SELECT * FROM regions;
RESET ROLE;
```

## Storage Buckets (Phase 2)

Create these buckets later when needed:
- `case-study-images` (public)
- `blog-images` (public)

## Next Steps

After database setup, test the website locally:
```bash
npm run dev
```

Visit http://localhost:3000 to see the homepage.
