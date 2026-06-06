# InsightBoard CSV Dashboard

Turn your CSV data into a beautiful dashboard in seconds. No uploads, no servers, no login — just drag, drop, and explore.

## Features

- **CSV Upload** — Drag-and-drop or browse to upload any CSV file
- **Smart KPI Cards** — Total revenue, costs, profit, margin, units, and record count
- **Interactive Charts** — Revenue over time, category breakdown, regional profit, top products
- **Rule-Based Insights** — Local analysis generating actionable insights without AI APIs
- **Data Explorer** — Searchable, sortable data table with formatted values
- **Export Summary** — Download dashboard summary as a Markdown file
- **100% Local** — All data processing happens in your browser. Nothing is uploaded.
- **Responsive** — Works on desktop, tablet, and mobile

## Live Demo

Live demo URL: `TODO: add deployed Vercel URL`

## GitHub Repository

Repository URL: `https://github.com/TiannanX/insightboard-csv-dashboard`

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
git clone https://github.com/yourusername/insightboard-csv-dashboard.git
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

### Option 1: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

### Option 2: GitHub Integration

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite — no configuration needed
6. Click "Deploy"

### Option 3: Drag & Drop

1. Run `npm run build`
2. Go to [vercel.com/drop](https://vercel.com/drop)
3. Drag the `dist` folder to the page

## Suggested Screenshots

After deploying, consider adding these screenshots to your README:

1. **Hero/Upload Section** — Show the clean upload interface
2. **Dashboard View** — KPI cards, charts, and insights
3. **Data Table** — Search and sort in action
4. **Mobile View** — Responsive design on phone

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

Contributions are welcome! Feel free to submit issues and pull requests.

## License

MIT — free to use for personal or commercial projects.

---

Built with care for developers and small businesses who need quick data visualization without the enterprise complexity.
