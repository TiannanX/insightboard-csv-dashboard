import styles from './KPICard.module.css';

export function KPICard({ label, value, format = 'number', icon, style }) {
  const formatValue = (val, fmt) => {
    if (val === null || val === undefined) return '—';

    switch (fmt) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val);
      case 'percent':
        return `${val.toFixed(1)}%`;
      case 'number':
      default:
        return new Intl.NumberFormat('en-US').format(val);
    }
  };

  const getValueClass = (val, fmt) => {
    if (fmt === 'percent' || fmt === 'currency') {
      if (val > 0) return styles.valuePositive;
      if (val < 0) return styles.valueNegative;
    }
    return styles.valueNeutral;
  };

  return (
    <div className={styles.card} style={style}>
      <div className={styles.label}>{label}</div>
      <div className={`${styles.value} ${getValueClass(value, format)}`}>
        {formatValue(value, format)}
        {icon && <span className={styles.icon}>{icon}</span>}
      </div>
    </div>
  );
}