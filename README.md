
# FinVue.Pro | High-Fidelity Frontend Financial Dashboard

FinVue.Pro is a professional-grade, reactive financial dashboard designed to provide real-time liquidity insights through high-density data visualization.

Built entirely on the frontend using React, Tailwind CSS, and Recharts, this application simulates an enterprise-level financial environment. It showcases advanced client-side architecture by handling complex state management, simulated role-based access, and data persistence directly within the browser, focusing on clarity, security, and operational efficiency.

🔗 **[Live Demo: FinVue.Pro](https://finvue-pro.netlify.app/)**

---

## 🚀 Key Features

### 1. Advanced Client-Side Analytics

* **Dynamic Intelligence Engine:** Utilizes React `useMemo` hooks to perform real-time recalculations of net balance, categorical spending, and transaction volume without compromising browser performance.
* **Multi-Dimensional Visualization:** * **Area Trend Analysis:** Smooth monotone area charts with SVG linear gradients for tracking balance volatility.
* **Donut Breakdown:** Instant categorical spending allocation with interactive tooltips.
* **Stacked Volume Comparison:** Vertical bar charts to compare inflow vs. outflow velocity.



### 2. Simulated Enterprise Architecture

* **Client-Side Role-Based Access Control (RBAC):** Features a simulated administrative layer. Admin users have full simulated CRUD (Create, Read, Update, Delete) permissions, while Viewer users are restricted to a read-only audit trail.
* **Browser-Based Persistence:** Utilizes the browser's native `LocalStorage` API for cross-session data retention, ensuring the simulated database persists between reloads.
* **Optimistic UI:** Instant local state updates ensure a lag-free, highly responsive experience during data entry without needing to wait for server responses.

### 3. High-Utility UI/UX

* **Live Querying:** Real-time search filtering across the transaction ledger powered by React state.
* **Privacy Masking:** A global "Sensitive Data" toggle that applies high-radius CSS blurs to financial figures—ideal for public environment usage.
* **Adaptive Theming:** A comprehensive Dark Mode system utilizing a custom semantic color palette to reduce eye strain during long-term data analysis.

---

## 🛠️ Technical Stack

* **Framework:** React 18 (Bootstrapped with Vite)
* **Styling:** Tailwind CSS (Modern depth-based UI / Neumorphism-lite)
* **State Management:** React Hooks (`useState`, `useEffect`, `useMemo`)
* **Visualizations:** Recharts (D3-based)
* **Icons:** Lucide-React
* **Data Persistence:** LocalStorage API

---

## ⚙️ Local Development Setup

Because this is a 100% frontend application, getting it running locally is incredibly fast and requires no backend or database configuration.

**1. Clone the Repository**

```bash
git clone <your-repository-url>
cd finance-dashboard

```

**2. Install Dependencies**

```bash
npm install

```

**3. Run the Development Server**

```bash
npm run dev

```

*The application will compile via Vite and be available on your local network (typically `http://localhost:5173`).*
