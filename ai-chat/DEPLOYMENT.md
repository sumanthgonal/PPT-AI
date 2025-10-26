# Deployment Guide

This guide provides step-by-step instructions for deploying the AI Chat PPT Generator to various platforms.

## Vercel (Recommended)

Vercel is the recommended deployment platform for Next.js applications.

### Prerequisites
- A GitHub account
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your Gemini API key

### Steps

1. **Push your code to GitHub**

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Add remote repository
git remote add origin <your-github-repo-url>

# Push to GitHub
git push -u origin main
```

2. **Import to Vercel**

- Go to [vercel.com](https://vercel.com) and sign in
- Click "Add New..." → "Project"
- Import your GitHub repository
- Vercel will automatically detect Next.js

3. **Configure Environment Variables**

- In the project settings, go to "Environment Variables"
- Add the following:
  - Name: `GEMINI_API_KEY`
  - Value: Your Gemini API key
  - Environment: Production, Preview, Development

4. **Deploy**

- Click "Deploy"
- Wait for the deployment to complete
- Your app will be live at `https://your-project.vercel.app`

### Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow the DNS configuration instructions

## Netlify

### Steps

1. **Build Configuration**

Create a `netlify.toml` file in your root directory:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

2. **Deploy to Netlify**

- Go to [netlify.com](https://netlify.com)
- Click "Add new site" → "Import an existing project"
- Connect to GitHub and select your repository
- Configure build settings:
  - Build command: `npm run build`
  - Publish directory: `.next`

3. **Add Environment Variables**

- Go to Site settings → Environment variables
- Add `GEMINI_API_KEY` with your API key

4. **Deploy**

- Click "Deploy site"

## Railway

### Steps

1. **Install Railway CLI** (optional)

```bash
npm install -g @railway/cli
```

2. **Deploy via GitHub**

- Go to [railway.app](https://railway.app)
- Click "New Project" → "Deploy from GitHub repo"
- Select your repository

3. **Add Environment Variables**

- Click on your service
- Go to "Variables" tab
- Add `GEMINI_API_KEY`

4. **Deploy**

- Railway will automatically deploy your app
- Your app will be available at the provided URL

## Docker Deployment

### Create Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and Run

```bash
# Build the image
docker build -t ai-chat-ppt .

# Run the container
docker run -p 3000:3000 -e GEMINI_API_KEY=your_api_key ai-chat-ppt
```

## AWS Amplify

### Steps

1. **Connect Repository**

- Go to AWS Amplify Console
- Click "New app" → "Host web app"
- Connect to GitHub and select your repository

2. **Configure Build Settings**

Amplify will auto-detect Next.js settings. Verify:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

3. **Add Environment Variables**

- Go to App settings → Environment variables
- Add `GEMINI_API_KEY`

4. **Deploy**

- Save and deploy

## Environment Variables

For all deployment platforms, ensure you set:

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes |

## Post-Deployment Checklist

- [ ] Verify the app loads correctly
- [ ] Test creating a new presentation
- [ ] Test editing an existing presentation
- [ ] Test downloading PPTX files
- [ ] Test chat history persistence
- [ ] Verify environment variables are set
- [ ] Check browser console for errors
- [ ] Test on mobile devices
- [ ] Set up custom domain (optional)
- [ ] Configure SSL/HTTPS (usually automatic)

## Monitoring

### Vercel Analytics

- Enable Web Analytics in Vercel dashboard
- Monitor performance metrics
- Track user interactions

### Error Tracking

Consider adding error tracking services:
- Sentry
- LogRocket
- Datadog

## Troubleshooting

### Build Fails

- Check Node.js version (18.x or higher)
- Verify all dependencies are installed
- Check for TypeScript errors

### API Errors in Production

- Verify `GEMINI_API_KEY` is set correctly
- Check API key permissions
- Review API rate limits

### Performance Issues

- Enable Next.js Image Optimization
- Implement caching strategies
- Use CDN for static assets

## Updating Your Deployment

1. Push changes to GitHub
2. Most platforms will auto-deploy
3. For manual deployments, trigger a new build

## Rollback

If you need to rollback to a previous version:

### Vercel
- Go to Deployments
- Select previous deployment
- Click "Promote to Production"

### Netlify
- Go to Deploys
- Select previous deploy
- Click "Publish deploy"

## Support

For deployment issues:
- Check platform documentation
- Review platform status pages
- Contact platform support
