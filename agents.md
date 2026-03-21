# Mirai Society Website Notes

Lightweight reference for future work in this repository.

## Project Type

- Static website
- Plain HTML, CSS, and vanilla JavaScript
- No framework, bundler, or package manager
- Main files:
  - `index.html`
  - `team.html`
  - `donate.html`
  - `updates.html`
  - `media.html`
  - `privacy.html`
  - `content.js`
  - `app.js`
  - `style.css`

## Architecture

- `content.js` is the primary editable content source.
- The site reads from a global `siteContent` object.
- `app.js` renders homepage sections, archives, team data, media, support blocks, and shared contact/footer content.
- `style.css` is the single stylesheet for all pages.
- There is no build step. Source files are the deployable site.

## Current Site Structure

- `index.html`: homepage with hero, proof, support, latest updates, media previews, and footer CTA
- `team.html`: full team directory
- `donate.html`: support/donation page with practical support messaging
- `updates.html`: full updates archive, grouped year-wise
- `media.html`: combined gallery and video archive
- `privacy.html`: privacy policy page

## Brand And Content Direction

- Brand tone: energetic and trust-driven
- Positioning: youth-led, ground-level, education-focused NGO
- Geography: rooted in Uttarakhand today, with long-term ambition across India
- Support framing: not cash-first; books, stationery, materials, volunteering, partnerships, CSR support, and financial support are all valid
- Voice: practical, credible, community-rooted, not overly corporate and not overly sentimental

## Important UX Decisions

- Team lives on `team.html`, not as a full homepage section
- Updates live on `updates.html`; homepage shows latest 3 only
- Media lives on `media.html`; homepage shows preview content only
- Privacy policy lives on `privacy.html`
- Donation/support lives on `donate.html`
- Homepage should stay focused on mission, proof, support entry points, latest updates, and media previews
- Contact section was removed from the homepage; contact details live in the top bar and footer
- Navigation uses one `Media` link instead of separate `Gallery` and `Videos` links
- Donation page should stay actionable and trust-building, but not become a long report

## Homepage Notes

- Hero is content-driven from `content.js`
- `impactStory` now includes:
  - `title`
  - `quote`
  - `description`
  - `attribution`
  - `date`
  - `location`
  - `highlights`
- `currentNeeds` powers the homepage needs strip
- The homepage updates section is preview-only
- The homepage gallery/videos are preview-only with `View all media`

## Donation Page Notes

- Donation page messaging is support-first, not direct-money-first
- It should emphasize:
  - books
  - stationery
  - teaching materials
  - practical educational support
  - volunteer/professional support
  - partnerships / CSR support
- A real-child image is used as a separate banner below the hero:
  - `images/donation.jpg`
- Keep the hero separate from the banner image
- Until merchant setup is live, avoid placeholder-sounding payment copy

## Archive Patterns

- Updates:
  - homepage uses `#updatesGrid`
  - archive page uses `#updatesArchive`
  - `app.js` renders latest 3 on homepage and full year-wise archive on `updates.html`
- Media:
  - homepage uses `#galleryGrid` and `#videosGrid`
  - archive page uses `#mediaGalleryGrid` and `#mediaVideosGrid`
  - `app.js` renders first 4 items on homepage and full media lists on `media.html`

## Content Model

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

## Images

- Images live in `images/`
- Prefer clean filenames with hyphens, not spaces
- Team/member images are referenced directly from `content.js`
- Gallery items support:
  - `image`
  - `alt`
  - `caption`
- Updates support:
  - `title`
  - `date`
  - `location`
  - `description`
  - `image`
  - `alt`

## Contact Model

- Contact data is in `content.js`
- Current supported fields:
  - `email`
  - `mobile`
  - `mobileSecondary`
  - `whatsapp`
  - social links such as `instagram`, `facebook`, `youtube`, `linkedin`
- Contact details render into:
  - top bar
  - footer

## Editing Guidance

- Prefer editing `content.js` for text/content changes before touching HTML
- Keep homepage additions compact; avoid repeating the same message in multiple sections
- Reuse existing patterns in `app.js` before adding hardcoded HTML content
- Prefer shared render logic for preview/archive behavior
- Keep donation page focused on reducing friction and increasing trust
- Use respectful, consent-safe images when showing real children

## Verification

- After JavaScript edits, run:
  - `node --check app.js`

## Likely Next Improvements

- Add live UPI / QR / bank details to `donate.html` when merchant setup is ready
- Add NGO registration / compliance trust details if available
- Keep updates dated and specific over time
- Add more real impact stories with concrete dates and locations
- Keep privacy policy updated if forms, payment providers, or data collection increase
