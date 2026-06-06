# InsightBoard CSV Dashboard

InsightBoard is a local-first React starter that turns a sales-style CSV file into KPI cards, charts, rule-based insights, a searchable data table, and an exportable Markdown summary.

No backend. No database. No login. No paid APIs. Your data stays in the browser.

## Project Overview

This project is built as a polished open-source starter and freelance portfolio demo for small business, finance, student, and operations dashboards. It shows how to parse local CSV files safely, validate rows, derive metrics, visualize trends, and export a useful report without sending data to a server.

## Live Demo

Live demo URL: `https://insightboard-csv-dashboard.vercel.app`

## GitHub Repository

Repository URL: `https://github.com/TiannanX/insightboard-csv-dashboard`

## Features

- **CSV Upload** — Drag-and-drop or browse to upload any CSV file
- **Smart KPI Cards** — Total revenue, costs, profit, margin, units, and record count
- **Interactive Charts** — Revenue over time, category breakdown, regional profit, top products
- **Rule-Based Insights** — Local analysis generating actionable insights without AI APIs
- **Data Explorer** — Searchable, sortable data table with formatted values
- **Export Summary** — Download dashboard summary as a Markdown file
- **100% Local** — All data processing happens in your browser. Nothing is uploaded.
- **Responsive** — Works on desktop, tablet, and mobile
- **Validation Warnings** — Invalid rows are skipped with clear user-facing notes

## Tech Stack

- **React 19** + **Vite** — Fast development and optimized builds
- **Recharts** — Beautiful, responsive charts
- **Papa Parse** — Robust CSV parsing
- **CSS Modules** — Scoped, maintainable styles

## Privacy First

Your data stays on your device. This dashboard:

- Does NOT upload files to any server
- Does NOT use external APIs (no OpenAI, no analytics)
- Does NOT store data in the cloud
- Does NOT require login

All CSV processing happens locally in your browser using JavaScript.

## CSV Schema

Your CSV must include these required columns:

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| `date` | Date string | Yes | ISO dates like `2024-01-01` are recommended. Browser-parseable date strings are accepted. |
| `product` | Text | Yes | Empty values are invalid. |
| `category` | Text | Yes | Empty values are invalid. |
| `region` | Text | Yes | Empty values are invalid. |
| `revenue` | Number | Yes | Currency symbols and commas are accepted, for example `$1,200`. Invalid numbers are skipped. |
| `cost` | Number | Yes | Currency symbols and commas are accepted. Invalid numbers are skipped. |
| `units` | Number | Yes | Must be numeric. |

Valid sample row:

```csv
date,product,category,region,revenue,cost,units
2024-01-01,Widget A,Electronics,North,1200,480,24
```

Invalid examples:

- Missing required column: no `cost` header.
- Invalid date: `not-a-date,Widget A,Electronics,North,1200,480,24`.
- Invalid number: `2024-01-01,Widget A,Electronics,North,N/A,480,24`.
- Empty required text value: `2024-01-01,,Electronics,North,1200,480,24`.

Rows with invalid dates, invalid numbers, or empty required text fields are skipped and reported in the app. Files with no valid rows are rejected with a clear error.

A sample CSV file is included at `public/sample-sales-data.csv`.

## Troubleshooting

- **Empty file**: Make sure the CSV includes a header row and at least one data row.
- **Missing columns**: Confirm the headers include `date`, `product`, `category`, `region`, `revenue`, `cost`, and `units`.
- **Invalid numbers**: Use plain numbers or currency-style values such as `1200`, `1,200`, or `$1,200`.
- **Invalid dates**: Prefer ISO format like `2024-01-01`.
- **Skipped rows**: The app keeps valid rows and shows a validation note for skipped invalid rows.

## Setup

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/TiannanX/insightboard-csv-dashboard.git
cd insightboard-csv-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deploying to Vercel

Vercel can deploy this as a standard Vite app. No environment variables are required.

### Option 1: GitHub Integration

1. Push this project to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import the repository
5. Keep the auto-detected Vite settings
6. Deploy

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

### Option 3: Drag & Drop

1. Run `npm run build`
2. Go to [vercel.com/drop](https://vercel.com/drop)
3. Drag the `dist` folder to the page

Build note: Recharts can make the production JavaScript chunk larger than Vite's default warning threshold. The current build is valid; optional chart code-splitting can be handled in a future V1.3 pass.

## Suggested Screenshots

For the README, portfolio page, or LinkedIn post, capture:

1. **Hero and Upload** — Show the value proposition plus CSV/dropzone area.
2. **Dashboard Overview** — KPI cards and first chart row with demo data loaded.
3. **Insights and Export** — Rule-based insights plus Markdown export button.
4. **Data Explorer** — Search and sort in action.
5. **Mobile View** — Responsive stacked dashboard.

Suggested 30-second recording flow:

1. Open the live demo.
2. Click "View demo dataset".
3. Point out KPIs, charts, local insights, and row preview.
4. Search or sort the table.
5. Export the Markdown summary.

## Future Roadmap

Potential enhancements for this starter:

- [ ] **Column Mapping** — Auto-detect and map CSV columns
- [ ] **Multiple Charts** — Add more chart types (line, scatter, donut)
- [ ] **Date Filtering** — Filter data by date range
- [ ] **Export Data** — Export processed data as CSV
- [ ] **Dark Mode** — Toggle between light/dark themes
- [ ] **Saved Views** — Save and load filter configurations
- [ ] **Optional AI Extension** — A future opt-in extension could add AI-assisted insights, but the default app should remain local-first with no paid APIs or secrets.
- [ ] **More Sample Data** — Finance, marketing, operations datasets
- [ ] **PWA Support** — Install as desktop app
- [ ] **Multi-file** — Compare multiple CSV files

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the short contribution guide.

## Portfolio Notes

See [PORTFOLIO.md](./PORTFOLIO.md) for a concise case-study version of this project.

## License

MIT — free to use for personal or commercial projects.

---

Built with care for developers and small businesses who need quick data visualization without the enterprise complexity.
