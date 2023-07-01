import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Chart from "apexcharts/dist/apexcharts.min.js"; // Import Chart from the correct path

const BarChart = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && options) {
      const chart = new Chart(chartRef.current, {
        chart: {
          type: "bar",
          height: options.chartHeight || 350,
          toolbar: {
            show: false,
          },
        },
        series: data.series,
        xaxis: {
          categories: data.categories,
        },
        ...options,
      });

      return () => {
        chart.destroy();
      };
    }
  }, [data, options]);

  return <div ref={chartRef} />;
};

BarChart.propTypes = {
  data: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    series: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  options: PropTypes.object,
};

export default BarChart;
