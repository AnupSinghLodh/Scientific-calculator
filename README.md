# 🌌 Modern Scientific Calculator

A sleek, glassmorphic Scientific Calculator built with a **Node.js/Express backend** and a **Vanilla HTML/CSS/JS frontend**. It features a highly dynamic aesthetic with floating neon background shapes, interactive animations, and a powerful server-side computation engine.

## ✨ Features

- **Modern Glassmorphic UI**: Beautiful dark theme, translucent containers, glowing gradients, and floating background animations.
- **Interactive Operator Grid**: Operator selection is handled through a seamless collapsing grid of buttons rather than boring dropdowns.
- **Basic Operations**: Addition, Subtraction, Multiplication, Division, Modulo, and Exponents.
- **Scientific Operations**: Square Roots, Logarithms (Base 10 & Natural), Absolute Values, Factorials, and Exponentials (`e^x`).
- **Trigonometry**: Sine, Cosine, Tangent (with full support for both **Degrees** and **Radians**).
- **Inverse & Hyperbolic Trig**: `sin⁻¹`, `cos⁻¹`, `tan⁻¹`, `sinh`, `cosh`, `tanh`.
- **Constants**: Built-in support for `π` (Pi) and `e` (Euler's number).
- **Robust Error Handling**: Server-side validation cleanly handles domain errors (e.g., division by zero, invalid square roots, or `asin`/`acos` inputs out of bounds).

## 🚀 Tech Stack

- **Frontend**: HTML5, Vanilla CSS (Custom Keyframe Animations, Flexbox, Grid), Vanilla JavaScript, Axios (for API requests).
- **Backend**: Node.js, Express.js, Cors.

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   ```
2. **Navigate to the project directory**:
   ```bash
   cd src/Express
   ```
3. **Install dependencies** (Make sure you have a `package.json` initialized):
   ```bash
   npm install express cors
   ```
4. **Start the Express server**:
   ```bash
   node index.js
   ```
5. **Open the frontend**:
   Simply open `index.html` in your favorite modern web browser.

## 🔌 API Endpoint Reference

The backend exposes a single `POST` endpoint that handles the mathematical logic.

**Endpoint**: `POST http://localhost:3000/Calculator`

**Request Body**:
```json
{
  "operator": "sin",
  "a": 90,
  "b": "", 
  "angleMode": "deg" 
}
```

**Success Response (200)**:
```json
{
  "timestamp": "2026-05-04T12:00:00.000Z",
  "mes": "Sine of 90 (deg)",
  "ans": 1
}
```

**Error Response (400)**:
```json
{
  "timestamp": "2026-05-04T12:00:00.000Z",
  "mes": "Input for asin must be between -1 and 1"
}
```

## 🎨 Design Highlights

- **Typography**: Styled entirely using Google's modern `Outfit` font.
- **Animations**: Includes custom `@keyframes` for smooth slide-up container entrances, interactive hover states, text-shimmering gradients, and multi-directional floating background neon orbs.
