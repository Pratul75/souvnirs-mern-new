const RadialProgress = ({ value }) => {
  const radius = 16; // Adjust this value based on your design
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <svg className="radial-progress" width="64" height="64">
      <circle
        className="radial-progress-circle"
        cx="32"
        cy="32"
        r={radius}
        strokeWidth="4"
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset: offset }}
      />
    </svg>
  );
};

export default RadialProgress;
