import { useState, useCallback } from 'react';
import './styles/global.css';
import { Header } from './components/Header/Header';
import { HeroSection } from './components/HeroSection/HeroSection';
import { CSVUpload } from './components/CSVUpload/CSVUpload';
import { Dashboard } from './components/Dashboard/Dashboard';
import { EmptyState } from './components/EmptyState/EmptyState';
import { useCSVParser } from './hooks/useCSVParser';
import { useDashboardData } from './hooks/useDashboardData';
import { SAMPLE_SALES_DATA } from './utils/sampleData';

function App() {
  const [data, setData] = useState(null);
  const [dataSource, setDataSource] = useState(null);
  const [validationWarnings, setValidationWarnings] = useState([]);
  const { parseFile, isParsing, error, clearError } = useCSVParser();
  const dashboardData = data?.data || null;
  const { kpis, revenueOverTime, revenueByCategory, profitByRegion, topProducts } =
    useDashboardData(dashboardData);

  const handleFileUpload = useCallback(async (file) => {
    try {
      const parsedData = await parseFile(file);
      setData(parsedData);
      setDataSource(file.name);
      setValidationWarnings(parsedData.warnings);
      clearError();
    } catch {
      // Error is handled by the hook
      setData(null);
      setDataSource(null);
      setValidationWarnings([]);
    }
  }, [parseFile, clearError]);

  const handleLoadDemo = useCallback(() => {
    setData({ data: SAMPLE_SALES_DATA, warnings: [] });
    setDataSource('Demo sales dataset');
    setValidationWarnings([]);
    clearError();
  }, [clearError]);

  return (
    <>
      <Header />
      <main>
        <HeroSection onLoadDemo={handleLoadDemo} />
        <CSVUpload
          onFileUpload={handleFileUpload}
          onLoadDemo={handleLoadDemo}
          isParsing={isParsing}
          error={error}
          onClearError={clearError}
          warnings={validationWarnings}
        />

        {dashboardData && dashboardData.length > 0 ? (
          <Dashboard
            data={dashboardData}
            dataSource={dataSource}
            kpis={kpis}
            revenueOverTime={revenueOverTime}
            revenueByCategory={revenueByCategory}
            profitByRegion={profitByRegion}
            topProducts={topProducts}
          />
        ) : (
          !isParsing && (
            <EmptyState
              title="Dashboard preview appears here"
              description="Upload a valid CSV or load the demo dataset to generate KPIs, charts, insights, and a row preview."
            />
          )
        )}
      </main>
    </>
  );
}

export default App;
