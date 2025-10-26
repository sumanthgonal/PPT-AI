# Deployment Checklist

Use this checklist to deploy your AI Chat PPT Generator to production.

## Pre-Deployment Checklist

### 1. Code Preparation
- [ ] All code committed to Git
- [ ] `.env.local` not committed (should be in `.gitignore`)
- [ ] Build passes locally: `npm run build`
- [ ] No console errors in development
- [ ] All features tested and working

### 2. GitHub Setup
- [ ] Create new GitHub repository
- [ ] Initialize Git: `git init`
- [ ] Add remote: `git remote add origin <your-repo-url>`
- [ ] Commit all files: `git add . && git commit -m "Initial commit"`
- [ ] Push to GitHub: `git push -u origin main`
- [ ] Repository set to public
- [ ] README.md visible on GitHub

### 3. API Key Ready
- [ ] Gemini API key obtained from https://makersuite.google.com/app/apikey
- [ ] API key tested locally
- [ ] API key quota checked
- [ ] API key copied for deployment

## Vercel Deployment (Recommended)

### Step-by-Step

1. **Account Setup**
   - [ ] Sign up at https://vercel.com (use GitHub login)
   - [ ] Grant Vercel access to GitHub repositories

2. **Import Project**
   - [ ] Click "Add New..." → "Project"
   - [ ] Select your GitHub repository
   - [ ] Vercel auto-detects Next.js settings
   - [ ] Click "Import"

3. **Configure Environment Variables**
   - [ ] Go to "Environment Variables" section
   - [ ] Add variable name: `GEMINI_API_KEY`
   - [ ] Paste your API key as value
   - [ ] Select all environments (Production, Preview, Development)
   - [ ] Click "Add"

4. **Deploy**
   - [ ] Click "Deploy"
   - [ ] Wait for build to complete (1-2 minutes)
   - [ ] Deployment successful ✅

5. **Test Deployment**
   - [ ] Open deployment URL
   - [ ] Test creating a presentation
   - [ ] Test editing a presentation
   - [ ] Test downloading PPTX
   - [ ] Test chat history
   - [ ] Check on mobile device

6. **Custom Domain (Optional)**
   - [ ] Go to Project Settings → Domains
   - [ ] Add custom domain
   - [ ] Configure DNS settings
   - [ ] Wait for DNS propagation
   - [ ] Verify SSL certificate

## Post-Deployment

### Verification
- [ ] Application loads without errors
- [ ] Chat interface displays correctly
- [ ] Can send messages
- [ ] AI generates presentations
- [ ] Preview shows slides
- [ ] Download works
- [ ] Chat history persists
- [ ] Mobile responsive
- [ ] Dark mode works

### Documentation
- [ ] Update README.md with deployment URL
- [ ] Add deployment URL to repository description
- [ ] Create demo video/screenshots (optional)
- [ ] Share on social media (optional)

### Monitoring
- [ ] Enable Vercel Analytics
- [ ] Monitor error logs
- [ ] Check API usage
- [ ] Set up alerts for errors

## Submission Checklist

For assignment submission, ensure you have:

1. **Detailed README** ✅
   - [ ] Project description
   - [ ] Setup instructions
   - [ ] Usage guide
   - [ ] Tech stack
   - [ ] Assumptions documented

2. **Deployed Link** ✅
   - [ ] Application deployed and accessible
   - [ ] URL added to README
   - [ ] URL tested in incognito mode

3. **GitHub Repository** ✅
   - [ ] Repository is public
   - [ ] All code committed
   - [ ] README visible
   - [ ] Clean commit history

## Quick Reference

### Deploy to Vercel
```bash
# If not using UI, use Vercel CLI
npm i -g vercel
vercel
# Follow prompts, add GEMINI_API_KEY when asked
```

### Update Deployment
```bash
git add .
git commit -m "Your update message"
git push
# Vercel auto-deploys on push
```

### Rollback Deployment
1. Go to Vercel Dashboard
2. Click "Deployments"
3. Find previous working deployment
4. Click "Promote to Production"

## Troubleshooting

### Build Fails
- [ ] Check build logs in Vercel
- [ ] Verify Node.js version (18.x+)
- [ ] Ensure all dependencies in package.json
- [ ] Check for TypeScript errors

### API Not Working
- [ ] Verify `GEMINI_API_KEY` is set in Vercel
- [ ] Check API key is valid
- [ ] Review API usage limits
- [ ] Check browser console for errors

### Download Not Working
- [ ] Check browser console for errors
- [ ] Test in different browser
- [ ] Verify PPTX generation in logs

## Success Criteria

Your deployment is successful when:
- ✅ Application loads at deployment URL
- ✅ Can create a presentation from scratch
- ✅ Can edit existing presentation
- ✅ Can download PPTX file
- ✅ Chat history persists after refresh
- ✅ Works on mobile devices
- ✅ No console errors

## Final Steps

- [ ] Test deployment URL one final time
- [ ] Add deployment URL to assignment submission
- [ ] Submit GitHub repository URL
- [ ] Celebrate! 🎉

---

**Estimated Time**: 15-20 minutes for full deployment

**Support**: If issues occur, check DEPLOYMENT.md for detailed troubleshooting
