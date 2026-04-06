FinVue.Pro | High-Fidelity Financial Intelligence Workstation
FinVue.Pro is a professional-grade, reactive financial dashboard designed to provide real-time liquidity insights through high-density data visualization and intuitive role-based management.

Built with React, Tailwind CSS, and Recharts, it simulates an enterprise-level financial environment focusing on clarity, security, and operational efficiency.
Link : https://finvue-pro.netlify.app/
🚀 Key Features
1. Advanced Real-Time Analytics
Dynamic Intelligence Engine: Utilizes React useMemo hooks to perform real-time recalculations of net balance, categorical spending, and transaction volume without compromising performance.

Multi-Dimensional Visualization: * Area Trend Analysis: Smooth monotone area charts with SVG linear gradients for tracking balance volatility.

Donut Breakdown: Instant categorical spending allocation with interactive tooltips.

Stacked Volume Comparison: Vertical bar charts to compare inflow vs. outflow velocity.

2. Enterprise-Grade UX & Security
Role-Based Access Control (RBAC): Simulated administrative layer. Admin users have full CRUD (Create, Read, Update, Delete) permissions, while Viewer users are restricted to a read-only audit trail.

Privacy Masking: A global "Sensitive Data" toggle that applies high-radius CSS blurs to financial figures—ideal for public environment usage.

Adaptive Theming: A comprehensive Dark Mode system utilizing a custom semantic color palette to reduce eye strain during long-term data analysis.

3. High-Utility Ledger
Live Querying: Real-time search filtering across the transaction database.

Audit Trail: Detailed ledger entries with automated semantic color-coding (Emerald for credits, Rose for debits).

Optimistic UI: Instant local state updates to ensure a lag-free experience during data entry.

🛠️ Technical Stack
Framework: React 18 (Vite)

Styling: Tailwind CSS (Modern depth-based UI / Neumorphism-lite)

State Management: React Hooks (useState, useEffect, useMemo)

Visualizations: Recharts (D3-based)

Icons: Lucide-React

Persistence: LocalStorage API for cross-session data retention.

⚙️ Installation & Setup
Clone the Repository:

Bash
git clone <your-repository-url>
cd finance-dashboard
Install Dependencies:

Bash
npm install
Run Development Server:

Bash
npm run dev
