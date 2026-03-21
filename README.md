# Mirai Society Website

Official static website for **Mirai Society**, a youth-led NGO working on children’s education through direct support with students, families, schools, and communities.

The site is built with plain **HTML, CSS, and vanilla JavaScript** and is designed to stay easy to update without a build system.

## Live Website

- `https://www.miraisociety.org`

## Project Structure

```text
MERAKI-DISHA-main/
├── index.html      # Homepage
├── team.html       # Full team page
├── donate.html     # Donation / support page
├── updates.html    # Year-wise updates archive
├── media.html      # Gallery + videos archive
├── privacy.html    # Privacy policy
├── content.js      # Main editable content source
├── app.js          # Shared render logic
├── style.css       # Shared styles
├── images/         # Site images
└── CNAME           # GitHub Pages custom domain
```

## How The Site Works

- `content.js` contains the main editable content in a global `siteContent` object.
- `app.js` reads that content and renders:
  - homepage sections
  - team page content
  - updates archive
  - media archive
  - shared contact/footer content
- `style.css` is the only stylesheet used across the site.

There is no framework, no package manager, and no build step.

## Main Pages

- `index.html`
  - homepage
  - shows latest 3 updates
  - shows media previews only
- `team.html`
  - full team and volunteer listing
- `donate.html`
  - support-focused donation page
  - includes practical support messaging, current needs, FAQ, and donation methods placeholder
- `updates.html`
  - full updates archive
  - grouped year-wise
- `media.html`
  - full gallery and video archive
- `privacy.html`
  - privacy policy page

## What To Update Most Often

The main file for weekly updates is:

```text
content.js
```

Most commonly updated sections:

- `updates`
- `gallery`
- `videos`
- `stats`
- `currentNeeds`

## Content Model Overview

Key content areas inside `content.js`:

- `hero`
- `stats`
- `about`
- `mission`
- `difference`
- `proof`
- `team`
- `programs`
- `barriers`
- `futureReadiness`
- `impactStory`
- `currentNeeds`
- `support`
- `updates`
- `gallery`
- `videos`
- `contact`

## Updating Content

### Update Hero Text

```js
hero: {
  title: "Updated title here",
  subtitle: "Updated subtitle here",
  image: "images/hero.jpeg"
}
```

### Update Current Needs

```js
currentNeeds: {
  title: "What is most useful right now",
  description: "Short explanation here",
  items: [
    "Children's books and reading material",
    "Notebooks, pens, pencils, and stationery"
  ]
}
```

### Add A New Update

```js
updates: [
  {
    title: "School Support Drive",
    date: "April 2026",
    location: "Uttarakhand",
    description: "Short update summary here.",
    image: "images/update-4.jpg",
    alt: "Children receiving educational support"
  }
]
```

Notes:

- homepage shows latest 3 updates automatically
- `updates.html` shows the full archive automatically
- updates are grouped year-wise based on the `date`

### Add Gallery Images

Use object entries, not plain strings:

```js
gallery: [
  {
    image: "images/gallery-5.jpg",
    alt: "Children in a learning activity",
    caption: "Short caption here"
  }
]
```

Notes:

- homepage shows preview media only
- `media.html` shows the full gallery automatically

### Add Videos

```js
videos: [
  {
    title: "Field Visit",
    description: "Short description",
    url: "https://www.youtube.com/watch?v=VIDEO_ID"
  }
]
```

Notes:

- homepage shows preview videos only
- `media.html` shows the full video list automatically

### Update Team Members

Edit the `team.members` array in `content.js`:

```js
{
  name: "Example Name",
  role: "Example Role",
  bio: "Short bio here.",
  image: "images/example.jpg",
  category: "Management"
}
```

### Update Contact Details

```js
contact: {
  email: "miraisocietyuttarakhand@gmail.com",
  mobile: "+91-9761191140",
  mobileSecondary: "+91-9760115189",
  whatsapp: "https://wa.me/919761191140",
  instagram: "https://www.instagram.com/miraisociety_",
  facebook: "https://www.facebook.com/share/18QomgV2py/"
}
```

These render automatically into the top bar and footer.

## Local Preview

Run a simple static server from the project root:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Verification

After JavaScript edits, run:

```bash
node --check app.js
```

## Image Guidelines

- Keep filenames clean and predictable
- Prefer lowercase and hyphens:

```text
good: team-kuldeep.jpg
bad: My Photo 1.jpg
```

- Prefer optimized image sizes for faster loading
- Use meaningful `alt` text for gallery and update images
- Use respectful, consent-safe photos when showing real children

## Deployment

This site is set up for GitHub Pages.

Typical flow:

```bash
git add .
git commit -m "Update website content"
git push
```

## Recommended Next Improvements

- Add live UPI / QR / bank details when merchant setup is ready
- Add NGO registration / compliance trust information if available
- Keep updates dated and specific
- Add more real impact stories over time
- Keep the privacy policy updated if data collection or payment flows increase

## Contact

- Email: `miraisocietyuttarakhand@gmail.com`

## License

Intended for Mirai Society website use and related nonprofit work.
