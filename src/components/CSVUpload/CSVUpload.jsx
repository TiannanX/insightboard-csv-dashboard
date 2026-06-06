import { useState, useRef } from 'react';
import styles from './CSVUpload.module.css';
import { REQUIRED_COLUMNS } from '../../utils/sampleData';

export function CSVUpload({ onFileUpload, onLoadDemo, isParsing, error, warnings = [] }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
    e.target.value = '';
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <section className={styles.uploadSection} id="upload-csv" aria-labelledby="upload-title">
      <div className={`container`}>
        <div className={styles.uploadCard}>
          <div className={styles.uploadHeader}>
            <p className={styles.uploadKicker}>Start with your data</p>
            <h2 className={styles.uploadTitle} id="upload-title">Upload a CSV or preview the demo</h2>
            <p className={styles.uploadDescription}>
              Use the sales schema below to generate KPIs, charts, local insights, and an exportable summary.
            </p>
          </div>
          <div
            className={`${styles.dropzone} ${isDragActive ? styles.dropzoneActive : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label="Upload CSV file"
          >
            <svg
              className={styles.dropzoneIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M12 18v-6" />
              <path d="M9 15l3-3 3 3" />
            </svg>
            <p className={styles.dropzoneTitle}>Drop your CSV file here</p>
            <p className={styles.dropzoneText}>
              or <span className={styles.dropzoneLink}>browse</span> to choose a file
            </p>
            <p className={styles.schemaHint}>
              Required: {REQUIRED_COLUMNS.join(', ')}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className={styles.fileInput}
            />
          </div>

          {isParsing && (
            <div className={styles.parsing} aria-live="polite">
              <div className={styles.spinner} />
              <p>Parsing your data...</p>
            </div>
          )}

          {error && (
            <div className={styles.error} role="alert">
              <svg
                className={styles.errorIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {warnings.length > 0 && (
            <div className={styles.warning} role="status" aria-live="polite">
              <strong>Validation note:</strong>
              <ul>
                {warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.divider}>or</div>

          <button className={styles.demoButton} onClick={onLoadDemo} disabled={isParsing}>
            <svg
              className={styles.demoIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Load demo dataset
          </button>
        </div>
      </div>
    </section>
  );
}
