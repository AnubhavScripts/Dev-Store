# 🎉 Shopify Promotional Banner App

 The app injects a **"Free Shipping on All Orders!"** banner at the top of any Shopify store page using a **Theme App Extension**.

## 🚀 Features

- **Theme App Extension Integration**: Injects a promotional banner using Shopify's native theme extension architecture
- **Banner Text**: 🎉 Free Shipping on All Orders! 🎉
- **Node.js + Remix Backend**: Created using the Shopify CLI's Node.js + Remix stack template
- **OAuth Authentication**: Uses Shopify's Admin OAuth flow to authenticate store installs
- **Deployment**: Hosted on (https://dev-store-kappa.vercel.app/), allowing public HTTPS access for installation and testing

## 🧰 Tech Stack

- **Shopify CLI v3.80.17**
- **Node.js 18.20+**
- **Remix Framework**
- **Shopify App Bridge**
- **Theme App Extension (Liquid + CSS)**
- **Vercel (Deployment)**
- **Prisma + PostgreSQL** (for session storage)

## 📷 Live Demo

- **Development Store URL**:- (https://dev-store-anubhav.myshopify.com/products/)

> 🔐 **Password**: isareno (required to view the dev store as it is in development mode)

## 🛠️ How It Works

1. Merchant installs the app from the provided install URL
2. App completes OAuth authentication using @shopify/shopify-app-remix
3. Upon successful install, a **Theme App Extension** injects the banner into the live theme
4. The banner appears at the top of every page (or product pages, based on setup)

## 📂 Project Structure

```
/app
├── routes
│   ├── auth.$.jsx              # Handles OAuth login
│   ├── auth.login/route.jsx    # Custom login logic
│   ├── app._index.tsx          # Main app page
│   └── webhooks.app.uninstalled.tsx
├── extensions/banner-extension/  # Theme App Extension files (Liquid, CSS)
└── shopify.server.js           # Shopify app setup and session handling

/shopify.banner-app
├── prisma/
├── public/
├── .env
└── remix.config.js
```

## 📋 Installation Instructions

### Prerequisites

Before you begin, you'll need the following:

1. **Node.js 18.20+**: [Download and install](https://nodejs.org/en/download/) it if you haven't already
2. **Shopify Partner Account**: [Create an account](https://partners.shopify.com/signup) if you don't have one
3. **Test Store**: Set up either a [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) or a [Shopify Plus sandbox store](https://help.shopify.com/en/partners/dashboard/managing-stores/plus-sandbox-store) for testing your app
4. **Shopify CLI v3.80.17**: Install the latest version

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/anubhavparashar/shopify-banner-app
cd shopify-banner-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` file** (use the example above)

4. **Set up the database**

```bash
npm run setup
```

5. **Start the app locally**

```bash
npm run dev
# or using Shopify CLI v3.80.17
shopify app dev
```

6. **Visit the install URL**

```
https://your-tunnel-url/auth?shop=dev-store-anubhav.myshopify.com
```

## 🔧 Available Scripts

Using npm:

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run deploy       # Deploy app configuration
npm run setup        # Initialize database
npm run generate     # Generate Prisma client
```

Using Shopify CLI v3.80.17:

```bash
shopify app dev      # Start development with tunnel
shopify app deploy   # Deploy app and extensions
shopify app generate # Generate app components
```

## 🚀 Deployment

### Build

```bash
npm run build
```

### Hosting on Vercel

This app is configured for Vercel deployment with the Vercel Remix preset:

```javascript
// vite.config.ts
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { vercelPreset } from '@vercel/remix/vite';

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/.*"],
      presets: [vercelPreset()],
    }),
    tsconfigPaths(),
  ],
});
```

### Environment Variables for Production

When deploying, make sure to set:
- `NODE_ENV=production`
- All required environment variables from the `.env` example

## 🔍 Troubleshooting

### Database tables don't exist

If you get this error:
```
The table `main.Session` does not exist in the current database.
```

Run the setup script:
```bash
npm run setup
```

### OAuth goes into a loop

If authentication goes into a loop after changing scopes, update your app configuration:

```bash
npm run deploy
# or
shopify app deploy
```

### Embedded app navigation issues

For embedded apps, always use:
1. `Link` from `@remix-run/react` or `@shopify/polaris` (not `<a>`)
2. `redirect` helper from `authenticate.admin` (not from `@remix-run/node`)
3. `useSubmit` or `<Form/>` from `@remix-run/react` (not lowercase `<form/>`)

## ✅ Status

- ✅ App installs and authenticates successfully on dev store
- ✅ Banner is visible on product and home pages via theme extension
- ✅ Deployed on Vercel
- ⚠️ Webhook setup pending (optional for this task)

## 📚 Resources

- [Remix Docs](https://remix.run/docs)
- [Shopify App Remix](https://shopify.dev/docs/api/shopify-app-remix)
- [Introduction to Shopify apps](https://shopify.dev/docs/apps/getting-started)
- [App authentication](https://shopify.dev/docs/apps/auth)
- [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)
- [Theme App Extensions](https://shopify.dev/docs/apps/app-extensions/list)

## 📄 License

This project is built for educational and demonstration purposes as part of a hiring assignment. Not intended for commercial distribution.
