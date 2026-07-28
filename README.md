# 🌌 FENTEZ - Personal Link Tree Site

A sleek, modern, and highly interactive personal link tree mini-site. Built with beautiful glassmorphism design, smooth 3D hover effects, and a dynamic particle background. 

## ✨ Features

- **🌓 Auto Light/Dark Mode**: Seamlessly adapts to your system preferences. Includes a manual toggle button that remembers your choice.
- **🪟 Glassmorphism UI**: Beautiful, frosted-glass card effect using modern CSS backdrop filters.
- **🧊 3D Tilt Effect**: Interactive profile card that smoothly tracks your mouse movement.
- **✨ Dynamic Particle Background**: A lightweight, high-DPI (Retina-ready) canvas-based animated background that adapts its color to the current theme.
- **🏷️ Title Animation**: Dynamic browser tab title that catches attention.
- **🟢 Pulsing Status**: Animated "Online" status indicator for a lively feel.
- **⚡ Zero Dependencies**: Pure Vanilla HTML, CSS, and JavaScript. No bulky frameworks or libraries!

## 🛠️ Tech Stack

- **HTML5**: Semantic and clean structure.
- **CSS3**: CSS Variables for themes, Flexbox, Keyframe Animations, and Media Queries.
- **JavaScript (ES6+)**: Canvas API for particles, DOM manipulation, `localStorage` for saving theme preferences, and High-DPI screen support.
- **FontAwesome**: Scalable vector icons.
- **Google Fonts**: Modern typography (Outfit).

## 📂 Project Structure

```text
.
├── index.html       # Main HTML entry point
├── style.css        # Main stylesheet (themes, glassmorphism, layouts)
├── script.js        # Logic (particles, 3D tilt, theme switcher)
├── image/           # Directory for avatars and favicons
└── README.md        # Project documentation
```

## 💻 Local Development

1. Clone this repository or download the source code.
2. Open `index.html` in your favorite web browser.
3. No build tools or servers are required—it works right out of the box!

## 🎨 Customization

- **Colors & Themes**: Easily change the themes by modifying the CSS variables (`--primary`, `--bg-dark`, etc.) under `:root[data-theme="dark"]` and `:root[data-theme="light"]` in `style.css`.
- **Links**: Update the `href` attributes in the `.links-grid` inside `index.html`.
- **Avatar**: Replace `image/avatar.jpg` with your own image.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
