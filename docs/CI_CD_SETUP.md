# CI/CD Setup Guide

## Overview
This project uses GitHub Actions for automated testing, building, and deployment.

## Workflows

### 1. Main CI/CD Pipeline (`ci-cd.yml`)
Runs on every push to `main` or `develop` branches.

**Steps:**
1. **Code Quality** - ESLint & Prettier checks
2. **Build & Test** - TypeScript check, tests, and build
3. **Deploy** - Automatic deployment to production (main branch only)

### 2. Pull Request Checks (`pr-checks.yml`)
Runs on every pull request.

**Steps:**
1. Type checking
2. Linting
3. Testing
4. Build verification
5. Adds comment to PR with results

---

## Setup Instructions

### 1. GitHub Secrets Configuration

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**

Add the following secrets:

#### Required for Build:
```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_EMAILJS_SERVICE_ID=service_73h6oiu
VITE_EMAILJS_TEMPLATE_ID=template_oo2n5hl
VITE_EMAILJS_PUBLIC_KEY=juTZrv0sd6IvuZGWf
```

#### Required for Vercel Deployment (if using Vercel):
```
VERCEL_TOKEN=<your_vercel_token>
VERCEL_ORG_ID=<your_org_id>
VERCEL_PROJECT_ID=<your_project_id>
```

### 2. Get Vercel Credentials

**Vercel Token:**
1. Go to https://vercel.com/account/tokens
2. Create new token
3. Copy and add as `VERCEL_TOKEN` secret

**Org ID & Project ID:**
```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Get IDs (they'll be in .vercel/project.json)
cat .vercel/project.json
```

---

## Branch Protection Rules (Recommended)

### For `main` branch:
1. Go to **Settings** → **Branches** → **Add rule**
2. Branch name pattern: `main`
3. Enable:
   - ✅ Require pull request before merging
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - Select: `Code Quality & Linting`, `Build & Test`

### For `develop` branch:
Same as main, but without deployment

---

## Workflow Triggers

### Automatic:
- **Push to main** → Full pipeline + Deploy
- **Push to develop** → Tests only
- **Pull Request** → PR checks + comment

### Manual:
Can be triggered from Actions tab in GitHub

---

## What Gets Checked

### Code Quality ✨
- ESLint for code issues
- Prettier for formatting
- TypeScript for type safety

### Testing 🧪
- Unit tests with Vitest
- Component tests
- Coverage reporting

### Build 🏗️
- TypeScript compilation
- Vite production build
- Asset optimization

---

## Deployment 🚀

### Automatic Deployment:
- Pushes to `main` → Production
- Uses Vercel for hosting
- Environment variables from GitHub Secrets

### Manual Deployment:
```bash
npm run build
# Upload dist/ folder to your hosting
```

---

## Monitoring Pipeline

### View Status:
- GitHub repo → **Actions** tab
- See all workflow runs
- Click on run for detailed logs

### Badges (Add to README):
```markdown
![CI/CD](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/CI%2FCD%20Pipeline/badge.svg)
```

---

## Troubleshooting

### Build Fails:
- Check environment variables are set
- Verify all tests pass locally
- Check TypeScript errors

### Deployment Fails:
- Verify Vercel credentials
- Check Vercel project settings
- Ensure all secrets are set

### Tests Fail:
- Run `npm test` locally
- Fix failing tests
- Push again

---

## Best Practices

✅ **Always create PRs** - Never push directly to main
✅ **Wait for checks** - Let CI run before merging
✅ **Fix issues locally** - Don't rely on CI to find bugs
✅ **Keep secrets secure** - Never commit credentials
✅ **Review failed runs** - Learn from CI failures

---

## Next Steps

1. ✅ Push this setup to GitHub
2. ✅ Add GitHub secrets
3. ✅ Set up branch protection
4. ✅ Create your first PR to test!

Happy deploying! 🎉
