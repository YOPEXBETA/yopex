import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";

// chart options
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
  },
  // other options...
};

const UsersHistoryChart = () => {
  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:8000/users/stats", {
        withCredentials: true,
      });
      return data;
    },
  });

  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const [series, setSeries] = useState([
    {
      data: [],
    },
  ]);

  const [options, setOptions] = useState(splineAreaChartOptions);

  useEffect(() => {
    // Update chart data with userStats data
    setSeries([
      {
        data: data?.map((data) => data.total),
      },
    ]);

    // Update chart options
    setOptions((prevState) => ({
      ...prevState,
      colors: [primary],
      xaxis: {
        title: {
          text: "Years",
        },
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
            ],
          },
        },
      },
      tooltip: {
        theme: "light",
      },
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      markers: {
        size: 0,
        style: "hollow",
      },
      yaxis: {
        title: {
          text: "Users",
        },
        min: 0,
      },
      legend: {
        show: true,
        labels: {
          colors: [primary],
          useSeriesColors: true,
        },
      },

      labels: data?.map((data) => `${data._id.month}/${data._id.year}`),
    }));
  }, [primary, info, secondary, data]);

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={420}
      />
    </div>
  );
};

export default UsersHistoryChart;
