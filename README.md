# 🏨 Aura Hospitality Investments

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Powered by Gemini](https://img.shields.io/badge/AI-Gemini%202.5-blueviolet)](https://ai.google.dev/)
[![Built with React](https://img.shields.io/badge/Frontend-React%2019-61dafb)](https://react.dev/)

**Aura Hospitality Investments** is a premium, high-converting hotel investment platform designed for institutional and high-net-worth investors. By bridging the gap between luxury real estate and cutting-edge artificial intelligence, Aura provides a seamless, data-driven experience for discovering and analyzing world-class hospitality assets.

The platform features real-time market sentiment analysis, interactive performance metrics, and an AI-powered investment advisor that provides instant insights into global hospitality trends.

---

## ✨ Key Features

- **🤖 Aura AI Advisor:** A sophisticated conversational agent powered by Gemini 2.5 Flash that provides market insights, ROI projections, and investment strategy assistance.
- **📊 Real-time Market Intelligence:** Dynamic "Live Intelligence" cards that utilize AI to scan and summarize emerging global luxury hospitality trends.
- **💎 Premium Portfolio Gallery:** A high-end interactive showcase of curated assets featuring fluid motion effects, parallax imagery, and detailed investment KPIs.
- **📈 Data Visualization:** Interactive performance charts comparing Aura's portfolio growth against global market benchmarks using Recharts.
- **🎨 Cinematic UX:** A meticulously crafted dark-mode interface with staggered animations, smooth-scroll navigation, and premium hover interactions powered by Framer Motion.
- **📱 Fully Responsive:** Optimized for a flawless experience across high-resolution desktops, tablets, and mobile devices.

---

## 🛠 Tech Stack

### Frontend
- **Framework:** React 19 (Functional Components, Hooks)
- **Styling:** Tailwind CSS (Custom Brand Theme)
- **Animations:** Framer Motion (Orchestration, AnimatePresence, Scroll-linked animations)
- **Icons:** Lucide React
- **Charts:** Recharts

### AI / Intelligence
- **LLM:** Google Gemini 2.5 Flash
- **SDK:** `@google/genai`
- **Capabilities:** JSON-mode trend extraction, context-aware conversational advisory.

### Environment & Tooling
- **Build Tool:** Modern ES Modules (Import Maps)
- **API Management:** Direct Google GenAI integration with secure environment variable injection.

---

## 🏗 Architecture

The application follows a clean, component-based architecture designed for scalability and performance:

```text
src/
├── components/       # Reusable UI components (Hero, Stats, Portfolio, etc.)
├── services/         # API logic and AI integration (Gemini service)
├── constants/        # Static data and configuration values
├── types/            # TypeScript interfaces and enums
└── App.tsx           # Application entry point and layout
```

### AI Workflow
1. **Advisor:** User input is processed via `generateAIResponse` in `geminiService.ts`, applying a strict system instruction to maintain professional investment-grade persona.
2. **Trends:** On component mount, the `MarketInsights` component calls Gemini to perform a structured data extraction (JSON) of current market drivers.

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (Latest LTS recommended)
- A Google AI Studio API Key ([Get one here](https://aistudio.google.com/))

### Local Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/aura-investments.git
   cd aura-investments
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   API_KEY=your_gemini_api_key_here
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

---

## 📈 Roadmap

- [ ] **Multi-Currency Support:** Real-time conversion of asset values based on user location.
- [ ] **Virtual Property Tours:** Integration with Veo for AI-generated 3D walkthroughs of potential investments.
- [ ] **Investor Dashboard:** Secure login for authenticated users to view real-time property performance.
- [ ] **PDF Prospectus Generation:** One-click generation of investment summaries using Gemini's text-to-document capabilities.

---

## 🤝 Contributing

Contributions are welcome! To maintain the project's premium quality, please follow these steps:

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'feat: add some amazing feature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📞 Contact

**Project Lead:** Aura Engineering  
**Email:** info@aura-investments.com  
**Website:** [aura-investments.com](https://aura-investments.com)
