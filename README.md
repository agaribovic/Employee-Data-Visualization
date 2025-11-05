# Employee Data Visualization

A desktop application built with **Electron**, **React**, **TypeScript**, and **Tailwind CSS** for visualizing employee time tracking data. The app fetches randomized time tracking entries from an API and displays them using interactive **Pie Charts**. Averages for start/end time, work duration, and break duration are also displayed in cards above the charts.

---

## Demo / Screenshot

<div style="display: flex; gap: 50px">
  <img src="./dist-vite/assets/in-motion.jpg" alt="Employee Data Visualization App" height="400" />
  <img src="./dist-vite/assets/in-motion-responsive.jpg" alt="Employee Data Visualization App - Responsive" height="400" />
</div>

---

## Technologies Used

- **Electron** – Cross-platform desktop app framework
- **React** – UI library
- **TypeScript** – Type-safe JavaScript
- **Tailwind CSS** – Utility-first styling
- **Chart.js / react-chartjs-2** – Pie charts visualization
- **Jest / React Testing Library** – Unit testing

---

## Features

- Interactive Pie Charts showing **Project Allocation** and **Workplace Allocation**
- Average cards for start time, end time, work duration, and break duration
- Responsive layout for small and large screens
- Dark theme with color-coded charts
- Desktop notifications when new data is loaded
- Fully typed TypeScript codebase

---

## Folder Structure

```bash
.
├─ /dist-electron       
│   ├─ index.js
│   └─ preload.ts
├─ /dist-vite           
│   ├─ /assets
│   └─ index.html
├─ /electron            
│   ├─ index.ts
│   ├─ preload.ts
│   └─ tsconfig.json
├─ /src                 
│   ├─ /api
│   │   ├─ api.ts
│   │   ├─ base.ts
│   │   ├─ common.ts
│   │   ├─ configuration.ts
│   │   └─ index.ts
│   ├─ /components
│   │   ├─ Card.tsx
│   │   ├─ Chart.tsx
│   │   └─ Dashboard.tsx
│   ├─ /hooks
│   │   └─ useTimeChanges.ts
│   └─ /utils
│       └─ timeChangesUtils.ts
├─ /tests               
│   ├─ /components
│   │   ├─ Card.test.tsx
│   │   ├─ Chart.test.tsx
│   │   └─ Dashboard.test.tsx
│   ├─ /hooks
│   │   └─ useTimeChanges.test.ts
│   └─ /utils
│       └─ timeChangesUtils.test.ts
├─ App.tsx
├─ main.tsx
├─ index.css
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ forge.config.js
├─ README.md
├─ .eslintrc.json
├─ .prettierrc
├─ .gitignore
├─ LICENSE.md
└─ package-lock.json
└─ package.json
└─ postcss.config.js
└─ README.md
└─ tailwind.config.js 
└─ tsconfig.json
└─ vite.config.ts
└─ yarn.lock
```

## Environment Modes:

- Development: npm run dev
- Production: npm run build && npm run start:prod

---

## Quick Start

### Clone & Install

```bash
git clone <your-repo-link>
cd employee-data-visualization
npm install
```

### Run in Development

```bash
npm run dev
```

- Electron loads the React app from http://localhost:3000
- Auto-refresh on file changes
- DevTools are open (optional)

### Run Tests
```bash
npm run test
```

- Uses Jest and React Testing Library

### Build Production App

```bash
npm run build
```

### Run Production

```bash
npm run start:prod
```

- Electron loads compiled frontend from /dist-vite/index.html
- DevTools are disabled

### Create Windows Executable (.exe)

```bash
npm run make
```

- The .exe is located in /out/make/squirrel.windows/x64/
- Portable, no installer required

