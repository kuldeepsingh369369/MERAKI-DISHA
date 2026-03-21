# 🌱 Mirai Society Website

This is the official static website for **Mirai Society**, an NGO dedicated to supporting education for children in rural communities.

The website is built using **pure HTML, CSS, and JavaScript** and is hosted on **GitHub Pages**.

---

## 🚀 Live Website

👉 https://miraisociety.org

---

## 📁 Project Structure

```
mirai-society/
├── index.html        # Main website structure
├── style.css         # Styling and layout
├── content.js        # All editable content (IMPORTANT)
├── app.js            # Rendering logic
└── images/           # All images used in the site
```

---

## ✨ How It Works

This website is designed to be **easy to update without coding knowledge**.

👉 All content is controlled from a single file:

```
content.js
```

You can update:

* Hero text
* About section
* Mission
* Programs
* Gallery images
* Video links
* Contact details

---

## 📝 How to Update Content

### 1. Update Text

Edit `content.js`:

```javascript
about: {
  title: "About Mirai Society",
  description: "Updated description here..."
}
```

---

### 2. Add New Program

```javascript
programs: [
  {
    title: "New Program",
    description: "Details about the program"
  }
]
```

---

### 3. Add Gallery Images

1. Upload images to `/images/`
2. Add paths in `content.js`:

```javascript
gallery: [
  "images/gallery-1.jpg",
  "images/gallery-2.jpg",
  "images/new-image.jpg"
]
```

---

### 4. Add Video

```javascript
videos: [
  {
    title: "Field Visit",
    description: "Short description",
    url: "https://www.youtube.com/watch?v=VIDEO_ID"
  }
]
```

---

### 5. Update Contact Info

```javascript
contact: {
  email: "hello@miraisociety.org",
  instagram: "https://instagram.com/yourpage",
  youtube: "https://youtube.com/@yourchannel"
}
```

---

## 📸 Image Guidelines

* Use simple names:

  ```
  good:  gallery-1.jpg
  bad:   My Photo 1.jpg
  ```
* Keep images optimized (recommended < 500KB)
* Use `.jpg` or `.webp` for better performance

---

## 🌍 Deployment (GitHub Pages)

1. Push code to GitHub repository
2. Go to:

   ```
   Settings → Pages
   ```
3. Select branch:

   ```
   main / root
   ```
4. Add custom domain:

   ```
   miraisociety.org
   ```

---

## 🔄 Updating the Website

Whenever you make changes:

```bash
git add .
git commit -m "Update content"
git push
```

GitHub Pages will automatically update the website.

---

## 💡 Future Improvements

* Add donation integration
* Add volunteer form
* Add CMS (Netlify CMS / Sanity)
* Add blog or impact stories
* Add multilingual support

---

## ❤️ About Mirai Society

Mirai Society is committed to improving access to education for children in rural areas through community-driven initiatives, learning support, and outreach programs.

---

## 🤝 Contributing

If you want to contribute or collaborate, feel free to reach out:

📧 [hello@miraisociety.org](mailto:hello@miraisociety.org)

---

## 📜 License

This project is open for educational and nonprofit use.

---

**Built with ❤️ for impact.**
