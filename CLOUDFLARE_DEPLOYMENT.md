# Cloudflare Pages Deployment Guide

## Quick Setup (Recommended)

### 1. Cloudflare Pages
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
2. Click "Create a project" → "Connect to Git"
3. Select your `personal-website` repository
4. Configure:
   - Project name: `jopterhorst-portfolio`
   - Production branch: `main`
   - Build settings: None (static site)
   - Build output directory: `/`
5. Click "Save and Deploy"

### 2. Custom Domain
1. In Pages project → Custom domains → Add custom domain
2. Enter your domain: `jopterhorst.nl`
3. Follow DNS setup instructions

## Alternative: Cloudflare Workers

### Prerequisites
```bash
npm install -g wrangler
wrangler login
```

### Deploy Worker
```bash
npm install
wrangler publish
```

### Custom Domain for Worker
1. Cloudflare Dashboard → Workers & Pages → Your worker
2. Settings → Triggers → Add Custom Domain
3. Enter: `jopterhorst.nl`

## Benefits Comparison

### Cloudflare Pages ✅ (Recommended)
- ✅ Automatic GitHub integration
- ✅ Built-in CI/CD
- ✅ Better performance for static sites
- ✅ Free SSL certificates
- ✅ Global CDN
- ✅ Preview deployments

### Cloudflare Workers
- ✅ More control and customization
- ✅ Server-side logic capabilities
- ✅ API integration possibilities
- ❌ More complex setup
- ❌ Manual deployment process

## Recommendation
Use **Cloudflare Pages** for your portfolio - it's specifically designed for static sites like yours and offers seamless GitHub integration with automatic deployments.
