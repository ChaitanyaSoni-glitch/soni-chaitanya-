# Chaitanya Soni - Resume & Portfolio Website

Welcome! This repository contains the complete personal portfolio website and ATS-compliant 1-page printable resume for **Chaitanya Kalpeshkumar Soni** (B.Tech IT undergraduate at Ganpat University).

---

## 📁 Project Structure

```
e:\resume\
├── index.html       # Modern responsive personal portfolio website
├── style.css        # Clean CSS stylesheet with Dark/Light theme support
├── script.js        # Interactive scripts (Theme switcher, mobile menu, form handler)
├── resume.html      # 1-Page ATS-friendly printable resume
├── resume.md        # Plain-text Markdown version of the resume (for job portals)
└── README.md        # Documentation and deployment instructions
```

---

## 🚀 How to Run Locally

### Option 1: Direct File Opening (No Installation Required)
Simply double-click:
- [`index.html`](file:///e:/resume/index.html) to view the **Portfolio Website**.
- [`resume.html`](file:///e:/resume/resume.html) to view the **1-Page ATS Resume**.

### Option 2: Using a Local HTTP Server (Recommended)
You can use Python or Node.js to spin up a local server:

**Using Python:**
```bash
cd e:\resume
python -m http.server 3000
```
Then open `http://localhost:3000` in your web browser.

**Using VS Code Live Server:**
Right-click on `index.html` inside VS Code and click **"Open with Live Server"**.

---

## 🖨️ How to Export the 1-Page Resume as PDF

1. Open [`resume.html`](file:///e:/resume/resume.html) in Google Chrome, Microsoft Edge, or Brave.
2. Click the top button **"🖨️ Print / Save as PDF"** or press `Ctrl + P` (Windows) / `Cmd + P` (Mac).
3. In the print dialog settings:
   - **Destination:** Save as PDF
   - **Pages:** All (or 1)
   - **Layout:** Portrait
   - **Paper Size:** A4
   - **Margins:** Default (or Minimum)
   - **Headers and footers:** **Uncheck** (to keep the page clean without URLs or dates)
   - **Background graphics:** Checked
4. Click **Save** to generate `Chaitanya_Soni_Resume.pdf`.

---

## 🌐 How to Deploy for Free

### Option 1: GitHub Pages (Recommended)
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of portfolio and ATS resume"
   ```
2. Create a new repository on your GitHub: `https://github.com/ChaitanyaSoni-glitch/portfolio` (or username.github.io).
3. Push your repository:
   ```bash
   git remote add origin https://github.com/ChaitanyaSoni-glitch/portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, go to **Settings > Pages > Branch**, select `main` (root) and click **Save**.
5. Your live portfolio will be published at `https://chaitanyasoni-glitch.github.io/portfolio/`!

### Option 2: Vercel or Netlify
1. Go to [vercel.com](https://vercel.com) or [netlify.com](https://netlify.com).
2. Connect your GitHub repository or drag-and-drop the `e:\resume` folder.
3. Your site will be deployed instantly with an SSL certificate and custom domain support.

---

## 📝 Updating Pending Details Later
- **Certifications (AWS / Google):** When your certificates are ready, update both `resume.html` and the `#certifications` section in `index.html`.
- **Class 10 Percentage / Project Scopes:** Easily tweak the numbers directly in `resume.html` and `index.html`.
