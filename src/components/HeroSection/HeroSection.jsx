import styles from './HeroSection.module.css';

export function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContent}`}>
        <h1 className={styles.heroTitle}>
          Turn your CSV data into a{' '}
          <span className={styles.heroTitleAccent}>beautiful dashboard</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Upload any CSV file and get instant KPI cards, interactive charts,
          and actionable insights. 100% local — your data never leaves your browser.
        </p>
        <div className={styles.heroFeatures}>
          <div className={styles.heroFeature}>
            <svg
              className={styles.heroFeatureIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Upload CSV
          </div>
          <div className={styles.heroFeature}>
            <svg
              className={styles.heroFeatureIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            See KPIs
          </div>
          <div className={styles.heroFeature}>
            <svg
              className={styles.heroFeatureIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Explore Charts
          </div>
          <div className={styles.heroFeature}>
            <svg
              className={styles.heroFeatureIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            100% Local
          </div>
        </div>
      </div>
    </section>
  );
}