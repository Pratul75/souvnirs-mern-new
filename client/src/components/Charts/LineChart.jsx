import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "bottom",
      font: {
        size: 14,
        weight: "bold",
      },
    },
    title: {
      display: false,
      text: "Sales Report", // Change the chart title
      font: {
        size: 20,
        weight: "bold",
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // Hide the vertical grid lines
      },
      ticks: {
        display: false,
        font: {
          size: 12,
        },
        color: "black", // Customize the X-axis label color
      },
    },
    y: {
      display: false, // Hide the Y-axis scale
    },
  },
  layout: {
    padding: 1, // Add some padding to the chart area
  },
};
const labels = ["January", "February", "March", "April", "May", "June", "July"];

const datasetData = [500, 700, 750, 900, 700, 800, 650];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Dataset 2",
      data: datasetData,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      borderWidth: 0,
    },
  ],
};
