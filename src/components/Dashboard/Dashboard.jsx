import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import styles from './Dashboard.module.css';
import { KPICard } from '../KPICard/KPICard';
import { ChartCard } from '../ChartCard/ChartCard';
import { InsightsPanel } from '../InsightsPanel/InsightsPanel';
import { DataTable } from '../DataTable/DataTable';
import { generateInsights, generateSummary } from '../../utils/insights';
import { formatCurrency } from '../../utils/formatters';

const CHART_COLORS = ['#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4'];

export function Dashboard({ data, dataSource, kpis, revenueOverTime, revenueByCategory, profitByRegion, topProducts }) {
  const insights = useMemo(() => generateInsights(data), [data]);

  const handleExport = () => {
    const summary = generateSummary(data, kpis);
    const blob = new Blob([summary], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-summary-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className={styles.dashboard}>
      <div className="container">
        <div className={styles.dashboardHeader}>
          <div>
            <h2 className={styles.dashboardTitle}>Dashboard</h2>
            {dataSource && (
              <p className={styles.dataSource}>
                Showing: <span>{dataSource}</span>
              </p>
            )}
          </div>
          <button className={styles.exportButton} onClick={handleExport}>
            <svg
              className={styles.exportIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export Summary
          </button>
        </div>

        <div className={styles.kpiGrid}>
          <KPICard
            label="Total Revenue"
            value={kpis.totalRevenue}
            format="currency"
            style={{ animationDelay: '0ms' }}
          />
          <KPICard
            label="Total Cost"
            value={kpis.totalCost}
            format="currency"
            style={{ animationDelay: '50ms' }}
          />
          <KPICard
            label="Gross Profit"
            value={kpis.grossProfit}
            format="currency"
            style={{ animationDelay: '100ms' }}
          />
          <KPICard
            label="Gross Margin"
            value={kpis.grossMargin}
            format="percent"
            style={{ animationDelay: '150ms' }}
          />
          <KPICard
            label="Total Units"
            value={kpis.totalUnits}
            format="number"
            style={{ animationDelay: '200ms' }}
          />
          <KPICard
            label="Records"
            value={kpis.recordCount}
            format="number"
            style={{ animationDelay: '250ms' }}
          />
        </div>

        <div className={styles.chartsGrid}>
          <ChartCard
            title="Revenue Over Time"
            subtitle="Daily revenue trend"
            style={{ animationDelay: '300ms' }}
          >
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueOverTime}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(val) => {
                    const date = new Date(val);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis
                  tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), 'Revenue']}
                  labelFormatter={(label) => `Date: ${label}`}
                  contentStyle={{
                    background: '#fff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563EB"
                  strokeWidth={2}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Revenue by Category"
            subtitle="Top categories by total revenue"
            style={{ animationDelay: '350ms' }}
          >
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenueByCategory} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  type="number"
                  tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                  width={80}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), 'Revenue']}
                  contentStyle={{
                    background: '#fff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {revenueByCategory.map((_, index) => (
                    <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Profit by Region"
            subtitle="Regional profit breakdown"
            style={{ animationDelay: '400ms' }}
          >
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={profitByRegion}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="region"
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis
                  tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), 'Profit']}
                  contentStyle={{
                    background: '#fff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="profit" radius={[4, 4, 0, 0]}>
                  {profitByRegion.map((_, index) => (
                    <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Top Products"
            subtitle="By revenue"
            style={{ animationDelay: '450ms' }}
          >
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={topProducts}
                  dataKey="revenue"
                  nameKey="product"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                >
                  {topProducts.map((_, index) => (
                    <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [formatCurrency(value), 'Revenue']}
                  contentStyle={{
                    background: '#fff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  formatter={(value) => (
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <InsightsPanel insights={insights} style={{ animationDelay: '500ms' }} />

        <DataTable data={data} style={{ marginTop: 'var(--space-6)', animationDelay: '550ms' }} />
      </div>
    </section>
  );
}
