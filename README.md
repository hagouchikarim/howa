# QSR Performance AI - Enterprise Dashboard

![QSR Performance AI](/public/vite.svg)

QSR Performance AI is a next-generation enterprise analytics dashboard designed for Quick Service Restaurants (QSRs). Built with React and Vite, the application leverages simulated artificial intelligence processing to provide operational insights, demand forecasting, and real-time branch performance metrics.

## 🌟 Key Features

*   **Interactive AI Forecasting Engine**: Simulates actionable neural insights using a dynamic typewriter effect and pulsing visual core design.
*   **Live Enterprise Activity Feed**: A real-time scrolling log of simulated incoming branch orders and critical inventory/staffing alerts.
*   **Premium Split-Screen Login Portal**: An immersive authentication gateway featuring animated floating statistic cards and a modern dark theme.
*   **Comprehensive Data Visualization**: Fully integrated Chart.js graphics showing daily order trends, branch-vs-branch revenue logic, and KPI distributions.
*   **Glassmorphism UI**: Beautifully styled using pure Vanilla CSS focusing on dynamic gradients, translucency, and high-tech typography.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have Node.js and npm installed.
- [Node.js](https://nodejs.org/) (v16.0 or higher recommended)

### Installation

1. Clone the repository or extract the project folder.
2. Navigate into the project directory:
   ```bash
   cd SAAAAS
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the local Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173/`.
6. **Demo Access**: You can log into the portal using any username and password (e.g., `admin` / `password`).

## 🛠️ Technology Stack

*   **React 18** - Frontend UI library
*   **Vite** - Next Generation Frontend Tooling (Build tool)
*   **Chart.js / react-chartjs-2** - For high-quality, responsive charts
*   **Lucide-React** - Beautiful, consistent iconography
*   **Vanilla CSS3** - Custom styling featuring CSS animations and variables

## 📁 Project Structure

```text
src/
├── components/       # Reusable UI components (StatCards, Layout, Sidebar)
├── context/          # React Context providers (AppContext for Authentication)
├── data/             # Mock data utilities and scenario generators
├── pages/            # Main application views (Dashboard, Login, Analytics)
├── App.jsx           # Main routing component
├── index.css         # Global styles and CSS variables
└── main.jsx          # React entry point
```

## 🔐 Security Note

Currently, the application uses **simulated authentication** via React Context API to demonstrate protected routing constraints. The login logic allows any username/password combination to facilitate easy testing and demonstration of the dashboard interface. It is not currently connected to a secured backend database.

---
*Built for the future of Quick Service Restaurant Operations.*
