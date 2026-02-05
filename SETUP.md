# 🚀 SETUP CHECKLIST - BLACK ARROW TECHNOLOGIES

Follow these steps to complete your Phase 1 setup.

---

## ✅ STEP 1: VERIFY LOCAL ENVIRONMENT

The development server should already be running. Check by visiting:
- http://localhost:3000 (Homepage)
- http://localhost:3000/admin/login (Admin login)

If not running:
```bash
npm run dev
```

---

## ⚡ STEP 2: SET UP SUPABASE DATABASE

### A. Run Database Migration

1. Open Supabase Dashboard:
   https://osmvhuyiryxposllkicd.supabase.co

2. Click **SQL Editor** in left sidebar

3. Click **New query**

4. Open this file in your code editor:
   ```
   supabase/migrations/001_initial_schema.sql
   ```

5. Copy ALL contents (Ctrl+A, Ctrl+C)

6. Paste into Supabase SQL Editor

7. Click **Run** (or press F5)

8. You should see:
   ```
   Success. No rows returned
   ```

### B. Verify Tables Created

Run this query in SQL Editor:
```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

**Expected result:** 5 tables
- admin_users
- leads
- posts
- regions
- stats

### C. Verify Seed Data

Check regions:
```sql
SELECT * FROM regions;
```
**Expected:** 3 rows (UK, UAE, IND)

Check stats:
```sql
SELECT * FROM stats;
```
**Expected:** 3 rows (147, 98%, 3)

---

## 🔐 STEP 3: CREATE YOUR ADMIN ACCOUNT

### A. Create User in Supabase Auth

1. In Supabase Dashboard, go to **Authentication** → **Users**

2. Click **Add user** → **Create new user**

3. Fill in:
   - **Email**: `admin@blackarrowtechnologies.com`
   - **Password**: (create a strong password - save it!)
   - **Auto Confirm User**: ✅ CHECK THIS BOX

4. Click **Create user**

5. Find your new user in the list and **COPY THE USER ID** (UUID format)
   - It looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

### B. Add User to admin_users Table

1. Go back to **SQL Editor**

2. Run this query (replace `<PASTE_YOUR_USER_ID_HERE>` with the UUID you copied):

```sql
INSERT INTO admin_users (id, email, full_name, role)
VALUES (
  '<PASTE_YOUR_USER_ID_HERE>',
  'admin@blackarrowtechnologies.com',
  'Admin User',
  'admin'
);
```

3. Verify it worked:
```sql
SELECT * FROM admin_users;
```

**Expected:** 1 row with your email

---

## 🎯 STEP 4: TEST ADMIN LOGIN

1. Go to: http://localhost:3000/admin/login

2. Login with:
   - Email: `admin@blackarrowtechnologies.com`
   - Password: (the one you created in Step 3A)

3. You should be redirected to: http://localhost:3000/admin/dashboard

4. You should see:
   - "Recent Leads: 0" (no leads yet)
   - Empty leads table
   - "Welcome back, Admin User"

---

## 🌍 STEP 5: TEST REGION SWITCHING

1. Go to homepage: http://localhost:3000

2. Look for the **Globe icon** in the header (top right)

3. Click it and select different regions:
   - United Kingdom
   - United Arab Emirates
   - India

4. Scroll to the **Footer** and verify:
   - Phone number changes
   - Address changes
   - Currency symbol changes

---

## 📊 STEP 6: VERIFY HOMEPAGE DATA

1. Homepage should display:
   - **Hero section** with main headline
   - **Stats bar** showing:
     - 147 Projects Delivered
     - 98% Client Retention
     - 3 Active Markets
   - **Services Bento Grid** (4 cards)
   - **Case Study Highlight**
   - **Final CTA**

2. If stats don't appear, check Supabase connection in browser console (F12)

---

## ✅ SUCCESS CHECKLIST

- [ ] Dev server running on http://localhost:3000
- [ ] 5 tables created in Supabase (regions, leads, admin_users, posts, stats)
- [ ] 3 regions seeded (UK, UAE, IND)
- [ ] 3 stats seeded (147, 98%, 3)
- [ ] Admin user created and verified
- [ ] Admin login works (http://localhost:3000/admin/login)
- [ ] Admin dashboard displays correctly
- [ ] Homepage shows stats from Supabase
- [ ] Region switcher works (header globe icon)
- [ ] Footer shows regional contact info

---

## 🚨 TROUBLESHOOTING

### "No stats showing on homepage"
- Check browser console for errors
- Verify stats table has 3 rows in Supabase
- Check `.env.local` has correct Supabase credentials

### "Cannot login to admin"
- Verify user exists in Authentication → Users
- Verify user ID exists in `admin_users` table
- Check password is correct
- Clear browser cache

### "RLS Policy Error" or "500 Internal Server Error on admin_users"
This is caused by recursive RLS policies on the `admin_users` table. Fix:

1. Run this SQL in Supabase SQL Editor:
```sql
-- Drop problematic policies
DROP POLICY IF EXISTS "Admins can view all admin users" ON admin_users;
DROP POLICY IF EXISTS "Admins can read all admin records" ON admin_users;

-- Create simple non-recursive policy
CREATE POLICY "Users can read own admin record"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);
```

2. Ensure RLS is enabled:
```sql
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
```

**Note:** The migration file has been updated with the correct policies.

### "Region switcher not working"
- Check browser console for errors
- Verify `regions` table has 3 rows

---

## 🎉 PHASE 1 COMPLETE!

Once all checkboxes above are ticked, Phase 1 is COMPLETE.

**Next:** Get approval for Phase 2 (Contact page, Service pages, Case studies, Blog)

---

## 📞 NEED HELP?

Check the main README.md for:
- Architecture documentation
- Data model details
- Brand guidelines
- Development commands
