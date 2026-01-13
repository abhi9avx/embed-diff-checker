# Deployment Guide for Embed-Diff-Checker

This guide will help you deploy the `embed-diff-checker` application.
Because this is a full-stack app (React Frontend + Node.js Backend), it requires two separate deployments.

---

## 🚀 Part 1: Deploying the Server (Backend)

The Node.js backend **cannot** run on GitHub Pages. You must host it on a cloud provider.
We recommend **Render.com** (Free Tier available).

### Steps for Render.com

1. **Sign Up/Login** at [render.com](https://render.com).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository: `abhi9avx/embed-diff-checker`.
4. **Configure the Service**:
   - **Name**: `embed-diff-server` (or similar)
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. **Environment Variables**:
   - You **DO NOT** need `OPENAI_API_KEY` here if the client sends it.
   - *Optional*: Add `OPENAI_API_KEY` if you want to enforce server-side keys later.
6. Click **Create Web Service**.
7. **Wait for Deploy**: once live, copy the URL (e.g., `https://embed-diff-server.onrender.com`). **You will need this for the Client.**

---

## 🌐 Part 2: Deploying the Client (Frontend)

You can deploy the frontend to **GitHub Pages**.

### Steps for GitHub Pages

1. **Push Changes**: Validate your latest code is on GitHub.
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages"
   git push
   ```

2. **Deploy Command**:
   Run this command from your local terminal (in the `client` folder):
   ```bash
   cd client
   npm run deploy
   ```
   *This command builds your app and pushes it to a special `gh-pages` branch on GitHub.*

3. **Configure GitHub Repo**:
   - Go to your repository **Settings** -> **Pages**.
   - Ensure **Source** is set to `Deploy from a branch`.
   - Ensure **Branch** is `gh-pages` / `/ (root)`.
   - Save.

4. **Environment Configuration**:
   - GitHub Pages is static, so it can't read server-side env vars.
   - We configured the app to look for `VITE_API_URL`.
   - **Important**: For GitHub Pages, you might need to hardcode the production server URL or create a `.env.production` file if you build locally.
   
   **Re-build with Production URL**:
   To ensure the static build knows your Render server URL, create a `.env.production` file in `client/` locally before running `npm run deploy`:

   **client/.env.production**
   ```env
   VITE_API_URL=https://embed-diff-server.onrender.com
   ```
   *(Replace with your actual Render URL)*

   Then run:
   ```bash
   npm run deploy
   ```

---

## ✅ Verification

1. Open your GitHub Pages URL (e.g., `https://abhi9avx.github.io/embed-diff-checker/`).
2. Enter your OpenAI API Key.
3. Compare two texts.
4. If it fails, check the browser console (F12) to see if it's trying to hit `localhost` or your Render URL.
