import { useState, useMemo } from 'react';
import styles from './DataTable.module.css';

const COLUMNS = [
  { key: 'date', label: 'Date', numeric: false },
  { key: 'product', label: 'Product', numeric: false },
  { key: 'category', label: 'Category', numeric: false },
  { key: 'region', label: 'Region', numeric: false },
  { key: 'revenue', label: 'Revenue', numeric: true },
  { key: 'cost', label: 'Cost', numeric: true },
  { key: 'units', label: 'Units', numeric: true },
];

const MAX_DISPLAY_ROWS = 100;

export function DataTable({ data, style }) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('date');
  const [sortDir, setSortDir] = useState('desc');

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!search.trim()) return data;

    const searchLower = search.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(searchLower)
      )
    );
  }, [data, search]);

  const sortedData = useMemo(() => {
    if (!filteredData) return [];

    return [...filteredData].sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];

      if (sortKey === 'date') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }

      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortDir]);

  const displayData = sortedData.slice(0, MAX_DISPLAY_ROWS);

  const getSortLabel = (col) => {
    if (sortKey !== col.key) return `Sort by ${col.label}`;
    return `Sort by ${col.label} ${sortDir === 'asc' ? 'descending' : 'ascending'}`;
  };

  const formatCell = (value, key) => {
    if (value === null || value === undefined) return '—';

    if (key === 'revenue' || key === 'cost') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    }

    if (key === 'units') {
      return new Intl.NumberFormat('en-US').format(value);
    }

    if (key === 'date') {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }).format(date);
      }
    }

    return String(value);
  };

  return (
    <section className={styles.tableSection} style={style}>
      <div className={styles.header}>
        <h3 className={styles.title}>Data Explorer</h3>
        <div className={styles.controls}>
          <div className={styles.searchWrapper}>
            <label className={styles.searchLabel} htmlFor="data-table-search">
              Search data
            </label>
            <svg
              className={styles.searchIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              id="data-table-search"
              type="text"
              className={styles.searchInput}
              placeholder="Search data..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <span className={styles.tableInfo}>
            Previewing {displayData.length} of {filteredData.length} matching records
          </span>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  aria-sort={
                    sortKey === col.key
                      ? (sortDir === 'asc' ? 'ascending' : 'descending')
                      : 'none'
                  }
                  className={col.numeric ? styles.numeric : ''}
                >
                  <button
                    type="button"
                    className={`${styles.sortButton} ${col.numeric ? styles.sortButtonNumeric : ''}`}
                    onClick={() => handleSort(col.key)}
                    aria-label={getSortLabel(col)}
                  >
                    {col.label}
                    <svg
                      className={`${styles.sortIcon} ${
                        sortKey === col.key ? styles.sortIconActive : ''
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {sortKey === col.key && sortDir === 'asc' ? (
                        <polyline points="18 15 12 9 6 15" />
                      ) : (
                        <polyline points="6 9 12 15 18 9" />
                      )}
                    </svg>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} className={styles.emptyTable}>
                  No data matches your search
                </td>
              </tr>
            ) : (
              displayData.map((row, index) => (
                <tr key={index}>
                  {COLUMNS.map((col) => (
                    <td
                      key={col.key}
                      className={col.numeric ? styles.numeric : ''}
                    >
                      {col.key === 'date' ? (
                        <span className={styles.dateCell}>
                          {formatCell(row[col.key], col.key)}
                        </span>
                      ) : (
                        formatCell(row[col.key], col.key)
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
