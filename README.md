# Autonest - Expert Used Car Inspection

![Autonest Banner](./hero.png)

Autonest is a premium, high-conversion landing page for a professional used car inspection service. Designed to provide peace of mind to used car buyers, it features a modern dark-themed aesthetic, interactive booking systems, and comprehensive service details.

## 🚗 About the Project

Buying a used car can be a risky investment. Autonest bridges the gap between buyers and sellers by providing expert mechanical inspections, ensuring transparency and preventing expensive mistakes.

## ✨ Key Features

- **Premium UI/UX**: Modern dark mode design with glassmorphism effects and smooth scroll animations.
- **150-Point Inspection**: Detailed breakdown of inspection areas including Engine, Tyres, Brakes, and Electricals.
- **Dynamic Booking Form**: 
    - Real-time Brand/Model/Year selection.
    - Integrated with **Web3Forms** for instant lead delivery.
    - WhatsApp redirect for immediate consultation.
- **Interactive Pricing Tiers**: Transparent pricing for Basic, Standard, and Premium inspection packages.
- **Sample Report Preview**: A visual representation of what customers receive after an inspection.
- **Mobile Responsive**: Fully optimized for all device sizes.
- **WhatsApp Integration**: Floating action button and CTA links for direct communication.

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (via CDN)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Typography**: Google Fonts (Inter)
- **Form Handling**: [Web3Forms](https://web3forms.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd autonest
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Configuration

To make the booking form functional, replace `YOUR_ACCESS_KEY_HERE` in `index.html` (line 599) with your unique [Web3Forms Access Key](https://web3forms.com/).

## 📁 Project Structure

```text
autonest/
├── public/          # Static assets
├── src/             # Source files (if applicable for Vite)
├── index.html       # Main entry point
├── style.css        # Custom CSS utilities
├── script.js        # Core logic & UI interactions
├── hero.png         # Main banner image
├── package.json     # Project dependencies & scripts
└── vercel.json      # Deployment configuration
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Developed with ❤️ by the Autonest Team.
