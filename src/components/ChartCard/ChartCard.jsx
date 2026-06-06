import styles from './ChartCard.module.css';

export function ChartCard({ title, subtitle, children, style }) {
  return (
    <div className={styles.card} style={style}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>
      <div className={styles.chartWrapper}>{children}</div>
    </div>
  );
}