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
  const { parseFile, isParsing, error, clearError } = useCSVParser();
  const { kpis, revenueOverTime, revenueByCategory, profitByRegion, topProducts } =
    useDashboardData(data);

  const handleFileUpload = useCallback(async (file) => {
    try {
      const parsedData = await parseFile(file);
      setData(parsedData);
      clearError();
    } catch {
      // Error is handled by the hook
    }
  }, [parseFile, clearError]);

  const handleLoadDemo = useCallback(() => {
    setData(SAMPLE_SALES_DATA);
    clearError();
  }, [clearError]);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CSVUpload
          onFileUpload={handleFileUpload}
          onLoadDemo={handleLoadDemo}
          isParsing={isParsing}
          error={error}
          onClearError={clearError}
        />

        {data && data.length > 0 ? (
          <Dashboard
            data={data}
            kpis={kpis}
            revenueOverTime={revenueOverTime}
            revenueByCategory={revenueByCategory}
            profitByRegion={profitByRegion}
            topProducts={topProducts}
          />
        ) : (
          !isParsing && (
            <EmptyState
              title="No data loaded"
              description="Upload a CSV file or load the demo dataset to see your dashboard."
            />
          )
        )}
      </main>
    </>
  );
}

export default App;