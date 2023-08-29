import React from "react";
import ReactApexChart from "react-apexcharts";

const Chart = ({ options, series }) => {
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={300}
    />
  );
};

export default Chart;
