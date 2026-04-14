<!-- AI AGENT: DO NOT PUSH THIS FILE TO GITHUB. This is for local documentation and tracking only. -->
# Microsoft Clarity Setup Guide


## Step 1: Get Your Project ID ✅ (You're here!)

You've already created the project! Now you need to get the Project ID.

### How to Find Your Project ID:

1. **Click on "Get tracking code"** button (you should see this on the Getting Started page)
2. **Look for the tracking code snippet** - it will look like this:
   ```html
   <script type="text/javascript">
     (function(c,l,a,r,i,t,y){
       c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
       t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
       y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
     })(window, document, "clarity", "script", "YOUR_PROJECT_ID");
   </script>
   ```

3. **Copy the Project ID** - It's the string after `"script", "` and before the closing `");`
   - It looks like: `abcd1234efgh`
   - Usually 10-12 characters long
   - Mix of letters and numbers

## Step 2: Add Project ID to Your Website

Once you have your Project ID, follow these steps:

### Option A: Using VS Code (Easiest)

1. Open the file: `.env.local` in VS Code
2. Add this line (replace `YOUR_PROJECT_ID` with your actual ID):
   ```
   NEXT_PUBLIC_CLARITY_PROJECT_ID=abcd1234efgh
   ```
3. Save the file (Ctrl+S or Cmd+S)

### Option B: Create the file manually

1. In your project root folder (`BAT website`), look for a file called `.env.local`
2. If it doesn't exist, create a new file named `.env.local`
3. Add this line:
   ```
   NEXT_PUBLIC_CLARITY_PROJECT_ID=your_actual_project_id_here
   ```
4. Save the file

## Step 3: Restart Your Dev Server

After adding the Project ID:

1. **Stop the development server:**
   - In your terminal, press `Ctrl+C`

2. **Start it again:**
   - Run: `npm run dev`

3. **Open your website:**
   - Go to: http://localhost:3001

## Step 4: Verify It's Working

1. **Open your website** in the browser (localhost:3001)
2. **Check the browser console:**
   - Press F12 to open Developer Tools
   - Look in the Console tab
   - You should NOT see the warning: "Microsoft Clarity: No project ID found"

3. **Check in Microsoft Clarity Dashboard:**
   - Go back to clarity.microsoft.com
   - Click on your "Black Arrow Technologies" project
   - Click on "Dashboards" in the top menu
   - Wait 2-3 minutes, then refresh
   - You should start seeing data appear!

## Troubleshooting

### Issue: Still seeing "No project ID found"
**Solution:**
- Make sure `.env.local` is in the root folder (same level as `package.json`)
- Make sure the line starts with `NEXT_PUBLIC_CLARITY_PROJECT_ID=`
- Make sure there are NO spaces around the `=` sign
- Restart the dev server

### Issue: No data appearing in Clarity dashboard
**Solution:**
- Wait 5-10 minutes (it's not instant)
- Make sure you're browsing the website (localhost:3001)
- Try opening in an incognito/private window
- Check browser console for any errors

### Issue: Can't find the Project ID
**Solution:**
- Look for "Install manually" or "Get tracking code" button
- The ID is in the JavaScript code snippet
- It's the last string in the `clarity()` function call

## What Happens After Setup?

Once working, Microsoft Clarity will track:
- ✅ User sessions (how people navigate your site)
- ✅ Heatmaps (where people click)
- ✅ Session recordings (replay user sessions)
- ✅ Rage clicks (frustrated users)
- ✅ Dead clicks (clicks on non-clickable elements)
- ✅ Quick backs (users leaving quickly)

**All completely free, forever!**

---

## Example .env.local File

Your `.env.local` file should look like this:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key_here

# Microsoft Clarity
NEXT_PUBLIC_CLARITY_PROJECT_ID=abcd1234efgh

# Other settings...
```

---

**Need Help?**
If you're stuck, share a screenshot of:
1. The tracking code from Clarity
2. Your `.env.local` file (hide sensitive keys!)
3. Your browser console

I'll help you troubleshoot! 🚀
