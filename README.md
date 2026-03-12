# Thisal Kandepola — Portfolio

A dark, techy personal portfolio website built with pure HTML, CSS, and JavaScript.

## 🚀 How to Host on GitHub Pages (Free!)

### Step 1 — Create a GitHub Account
Go to [github.com](https://github.com) and sign up (if you don't have an account).

### Step 2 — Create a New Repository
1. Click the **+** button (top right) → **New repository**
2. Name it exactly: `thisalkandepola.github.io`  
   *(Replace with your GitHub username if different)*
3. Set it to **Public**
4. Click **Create repository**

### Step 3 — Upload Your Files
**Option A — Upload via browser (easiest):**
1. Open your new repo
2. Click **Add file** → **Upload files**
3. Drag and drop ALL files keeping the folder structure:
   ```
   index.html
   css/
     style.css
     animations.css
   js/
     main.js
   README.md
   ```
4. Click **Commit changes**

**Option B — Use Git (recommended):**
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/ThisalDinuwara/thisalkandepola.github.io.git
git push -u origin main
```

### Step 4 — Enable GitHub Pages
1. Go to your repo → **Settings** tab
2. Scroll to **Pages** section (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Branch: **main** / folder: **/ (root)**
5. Click **Save**

### Step 5 — Your Site is Live! 🎉
Wait 1–2 minutes, then visit:
```
https://thisalkandepola.github.io
```

---

## 📁 File Structure

```
portfolio/
├── index.html          ← Main page
├── css/
│   ├── style.css       ← All styles
│   └── animations.css  ← Scroll & motion effects
├── js/
│   └── main.js         ← Interactivity & effects
└── README.md           ← This file
```

## ✨ Features

- Animated loading screen
- Interactive particle canvas (hero section)
- Custom cursor with trail effect
- Typewriter text effect
- Scroll progress bar
- Reveal-on-scroll animations
- Animated skill bars
- Animated stat counters
- Mobile responsive with hamburger menu
- Contact form (UI only — connect Formspree for real emails)
- Dark techy aesthetic with cyan/purple accents

## 📧 Enable Real Contact Form (Optional)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and get your form endpoint
3. In `index.html`, update the form tag:
   ```html
   <form class="contact-form" action="https://formspree.io/f/YOUR_ID" method="POST">
   ```
4. Remove the `onsubmit="handleForm(event)"` attribute

## 🛠️ Customization

- **Add your photo**: Replace the `TK` hex div in `index.html` with:
  ```html
  <img src="assets/photo.jpg" alt="Thisal" style="width:120px;height:120px;clip-path:polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);object-fit:cover;" />
  ```
- **Add real projects**: Edit the projects section in `index.html`
- **Change colors**: Edit CSS variables at the top of `css/style.css`
