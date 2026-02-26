# Push to GitHub

Your Cowork plugin is ready. To upload it to GitHub:

## 1. Create a new repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `cowork-viral-mortgage-hooks`
3. Description: `Claude Cowork plugin: mine mortgage/real estate short-form content patterns`
4. Choose **Public**
5. **Do not** initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

## 2. Push from your computer

From the plugin folder, run:

```bash
cd "/Users/arnavjha/Desktop/claude skills/cowork-viral-mortgage-hooks"
git remote add origin https://github.com/YOUR_USERNAME/cowork-viral-mortgage-hooks.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## 3. Install in Claude Cowork

1. Open **Claude Cowork** (desktop app)
2. Go to **Settings** → **Plugins**
3. Click **Add plugin** / **Upload plugin**
4. Either:
   - **Download ZIP** from your new repo (Code → Download ZIP), unzip, and select the folder
   - Or if Cowork supports GitHub URLs: paste `https://github.com/YOUR_USERNAME/cowork-viral-mortgage-hooks`
5. Enable the plugin

Then say: *"Mine mortgage hooks from my seed creators"* or *"Create a content strategy for mortgage Instagram/TikTok"*.
