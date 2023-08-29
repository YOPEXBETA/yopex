const splineAreaChartOptions = {
  series: [
    {
      type: "area",
      data: [],
    },
  ],
  chart: {
    height: 350,
    type: "area",
    stacked: true,
    animations: {
      enabled: true, // Add animations
      easing: "easeinout", // Use a smooth easing function
      speed: 1000, // Set animation speed
    },
    background: "transparent",
    toolbar: {
      show: false,
    },
  },
  colors: ["#48BB78"], // Use a vibrant color
  xaxis: {
    labels: {
      style: {
        colors: "#555",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#555",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    borderColor: "#9F7AEA",
    borderColor: false,
  },
  markers: {
    size: 4, // Increase marker size
    colors: ["#FF5722"], // Use the same vibrant color for markers
  },
};

export default splineAreaChartOptions;
