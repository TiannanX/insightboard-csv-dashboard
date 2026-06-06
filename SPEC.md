# InsightBoard CSV Dashboard — Specification

## 1. Concept & Vision

A polished, local-first dashboard starter that transforms any CSV file into an insightful data dashboard in seconds. No uploads, no servers, no logins — just drag, drop, and explore. Positioned as a premium open-source starter for developers and small businesses who need quick data visualization without the enterprise complexity.

**Personality**: Clean analyst's workspace — warm neutrals, clear data hierarchy, confident typography. Not cold enterprise SaaS, not playful consumer app. Professional but approachable.

## 2. Design Language

### Aesthetic Direction
Inspired by premium analytics tools like Linear and Raycast — clean, spacious, confident. Warm neutrals create a workspace feel rather than a sterile dashboard.

### Color Palette
- **Background**: `#FAFAFA` (warm off-white)
- **Surface**: `#FFFFFF` (cards/modals)
- **Surface Hover**: `#F5F5F5`
- **Primary**: `#2563EB` (confident blue)
- **Primary Dark**: `#1D4ED8`
- **Accent**: `#10B981` (fresh green for positive metrics)
- **Text Primary**: `#111827` (near-black)
- **Text Secondary**: `#6B7280` (muted gray)
- **Text Muted**: `#9CA3AF` (light gray)
- **Border**: `#E5E7EB` (soft divider)
- **Error**: `#EF4444` (clear red)
- **Warning**: `#F59E0B` (amber)
- **Chart Colors**: `#2563EB`, `#10B981`, `#F59E0B`, `#8B5CF6`, `#EC4899`, `#06B6D4`

### Typography
- **Headings**: `'Inter', system-ui, sans-serif` — clean, modern, highly legible
- **Body**: `'Inter', system-ui, sans-serif` — unified font family
- **Monospace**: `'JetBrains Mono', monospace` — for numbers in tables/KPIs

### Spatial System
- Base unit: 4px
- Card padding: 20px
- Section gap: 24px
- Grid gap: 20px
- Border radius: 8px (cards), 6px (inputs), 12px (modals)

### Motion Philosophy
- Subtle, purposeful transitions (150-250ms ease)
- No decorative animation — data is serious
- Charts animate on initial render (300ms)
- Cards fade-in staggered on data load

## 3. Layout & Structure

### Page Structure
1. **Header** — Logo, tagline, GitHub link
2. **Hero Section** — Clear value proposition + CSV upload zone
3. **Dashboard Section** (hidden until data loaded)
   - KPI Cards row (6 cards)
   - Charts grid (2x2 on desktop)
   - Insights panel
   - Data table with search

### Responsive Strategy
- Desktop (>1024px): Full dashboard grid
- Tablet (768-1024px): 2-column KPI, stacked charts
- Mobile (<768px): Single column, horizontal scroll for table

## 4. Features & Interactions

### CSV Upload
- Drag-and-drop zone with dashed border
- Click-to-browse fallback
- Accept only `.csv` files
- Parse with Papa Parse library
- Validate: check for headers, check for numeric data in expected columns
- Error states: invalid file type, empty file, parse errors, missing required columns
- Success: transition to dashboard view

### Demo Data
- Built-in sales dataset (50 records)
- Fields: date, product, category, region, revenue, cost, units
- "Load demo dataset" button in upload zone
- Auto-loads demo if no CSV uploaded on return visit (localStorage flag)

### KPI Cards (6 cards)
1. Total Revenue — sum of revenue, formatted as $X,XXX
2. Total Cost — sum of cost, formatted as $X,XXX
3. Gross Profit — revenue - cost, green if positive, formatted
4. Gross Margin — (profit / revenue) * 100, shown as percentage
5. Total Units — sum of units
6. Records — count of data rows

Each card shows: label, large formatted value, subtle trend indicator (optional)

### Charts (4 charts using Recharts)
1. **Revenue Over Time** — Area chart, X=date, Y=revenue, grouped by category or total
2. **Revenue by Category** — Bar chart, horizontal bars
3. **Profit by Region** — Bar chart, vertical bars
4. **Top Products** — Pie chart or bar chart showing top 5 products

### Data Table
- Shows first 100 rows (with "showing X of Y" indicator)
- Columns: Date, Product, Category, Region, Revenue, Cost, Units
- Search input filters across all text columns
- Click column header to sort (asc/desc toggle)
- Numbers right-aligned, formatted with commas

### Rule-Based Insights
Generate 4-6 simple insights without AI:
- "Top category by revenue: [Category] ($X,XXX)"
- "Highest revenue day: [Date] ($X,XXX)"
- "Most profitable region: [Region] (X% margin)"
- "Best-selling product: [Product] (X units)"
- "Average order value: $X.XX"

### Export
- "Export Summary" button
- Generates markdown file with:
  - Dashboard title and date
  - KPI values
  - Key insights
  - Top 5 products
- Downloads as `dashboard-summary-[date].md`

### Empty States
- No data: Upload illustration, clear CTA to upload or demo
- Error state: Calm error message, retry option

## 5. Component Inventory

### Header
- Logo (text-based: "InsightBoard")
- GitHub star link (subtle)

### HeroSection
- Headline + subheadline
- CSV upload dropzone

### CSVUpload
- States: idle, dragging, parsing, error, success
- Error messages: "Please upload a CSV file", "Could not parse file", etc.

### KPICard
- States: loading (skeleton), loaded, error
- Variants: currency, percentage, number, count

### ChartCard
- Title, optional subtitle
- Chart content (Recharts)
- Loading state

### DataTable
- Header row with sort indicators
- Search input
- Pagination info
- Empty state

### InsightsPanel
- List of insight items
- Each with icon, label, value

### EmptyState
- Illustration (SVG)
- Headline
- Description
- CTA button

## 6. Technical Approach

### Stack
- React 18 + Vite
- CSS Modules
- Recharts for charts
- Papa Parse for CSV parsing
- localStorage for demo-data flag only

### File Structure
```
src/
  components/
    Header/
    HeroSection/
    CSVUpload/
    Dashboard/
    KPICard/
    ChartCard/
    DataTable/
    InsightsPanel/
    EmptyState/
  hooks/
    useCSVParser.js
    useDashboardData.js
  utils/
    formatters.js
    insights.js
    sampleData.js
  styles/
    variables.css
    global.css
  App.jsx
  main.jsx
public/
  sample-sales-data.csv
```

### Data Flow
1. User uploads CSV or clicks demo
2. Papa Parse processes data (client-side only)
3. Data stored in React state
4. Dashboard components derive KPIs, charts, insights from raw data
5. No data leaves the browser

### CSV Expected Format
```csv
date,product,category,region,revenue,cost,units
2024-01-01,Widget A,Electronics,North,1200,480,24
```
- First row must be headers
- `date` column expected (ISO format or MM/DD/YYYY)
- `revenue` and `cost` must be numeric
- `units` must be numeric