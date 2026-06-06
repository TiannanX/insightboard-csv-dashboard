import { useMemo } from 'react';

export function useDashboardData(data) {
  const kpis = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        totalRevenue: 0,
        totalCost: 0,
        grossProfit: 0,
        grossMargin: 0,
        totalUnits: 0,
        recordCount: 0,
      };
    }

    const totals = data.reduce(
      (acc, row) => ({
        revenue: acc.revenue + (row.revenue || 0),
        cost: acc.cost + (row.cost || 0),
        units: acc.units + (row.units || 0),
      }),
      { revenue: 0, cost: 0, units: 0 }
    );

    return {
      totalRevenue: totals.revenue,
      totalCost: totals.cost,
      grossProfit: totals.revenue - totals.cost,
      grossMargin: totals.revenue > 0 ? ((totals.revenue - totals.cost) / totals.revenue) * 100 : 0,
      totalUnits: totals.units,
      recordCount: data.length,
    };
  }, [data]);

  const revenueOverTime = useMemo(() => {
    if (!data || data.length === 0) return [];

    const byDate = {};
    data.forEach((row) => {
      const date = row.date;
      if (!byDate[date]) {
        byDate[date] = { date, revenue: 0, cost: 0, profit: 0 };
      }
      byDate[date].revenue += row.revenue || 0;
      byDate[date].cost += row.cost || 0;
      byDate[date].profit += (row.revenue || 0) - (row.cost || 0);
    });

    return Object.values(byDate).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [data]);

  const revenueByCategory = useMemo(() => {
    if (!data || data.length === 0) return [];

    const byCategory = {};
    data.forEach((row) => {
      const cat = row.category || 'Unknown';
      if (!byCategory[cat]) {
        byCategory[cat] = 0;
      }
      byCategory[cat] += row.revenue || 0;
    });

    return Object.entries(byCategory)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [data]);

  const profitByRegion = useMemo(() => {
    if (!data || data.length === 0) return [];

    const byRegion = {};
    data.forEach((row) => {
      const region = row.region || 'Unknown';
      if (!byRegion[region]) {
        byRegion[region] = { region, profit: 0, revenue: 0, cost: 0 };
      }
      byRegion[region].revenue += row.revenue || 0;
      byRegion[region].cost += row.cost || 0;
      byRegion[region].profit += (row.revenue || 0) - (row.cost || 0);
    });

    return Object.values(byRegion).sort((a, b) => b.profit - a.profit);
  }, [data]);

  const topProducts = useMemo(() => {
    if (!data || data.length === 0) return [];

    const byProduct = {};
    data.forEach((row) => {
      const product = row.product || 'Unknown';
      if (!byProduct[product]) {
        byProduct[product] = { product, revenue: 0, units: 0 };
      }
      byProduct[product].revenue += row.revenue || 0;
      byProduct[product].units += row.units || 0;
    });

    return Object.values(byProduct)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [data]);

  return {
    kpis,
    revenueOverTime,
    revenueByCategory,
    profitByRegion,
    topProducts,
  };
}