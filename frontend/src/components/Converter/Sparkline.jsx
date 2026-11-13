function Sparkline({ data, width = 210, height = 66, up = true }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = pad + (1 - (v - min) / range) * (height - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <polyline
        fill="none"
        stroke={up ? '#4FD37A' : '#FF7A7A'}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
    </svg>
  );
}
export default Sparkline;