import styles from './HeroSection.module.css';

const FEATURES = [
  'Local-first CSV parsing',
  'KPI and chart generation',
  'Rule-based insights',
  'Exportable summary',
];

export function HeroSection({ onLoadDemo }) {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContent}`}>
        <p className={styles.heroEyebrow}>Open-source CSV dashboard starter</p>
        <h1 className={styles.heroTitle}>
          Upload a CSV. Get KPIs, charts, insights, and a clean summary.
        </h1>
        <p className={styles.heroSubtitle}>
          InsightBoard turns sales-style CSV files into a polished business dashboard in the
          browser. No backend, no login, no data upload.
        </p>
        <div className={styles.heroActions}>
          <a className={styles.primaryAction} href="#upload-csv">
            Upload CSV
          </a>
          <button className={styles.secondaryAction} type="button" onClick={onLoadDemo}>
            View demo dataset
          </button>
        </div>
        <div className={styles.heroFeatures}>
          {FEATURES.map((feature) => (
            <div className={styles.heroFeature} key={feature}>
              <svg
                className={styles.heroFeatureIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {feature}
            </div>
          ))}
        </div>
        <p className={styles.privacyNote}>All parsing and analysis runs locally in your browser.</p>
      </div>
    </section>
  );
}
