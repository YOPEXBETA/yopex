import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ReactApexChart from "react-apexcharts";

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
      labels: data?.map((data) => `${data._id.month}/${data._id.year}`),
    }));
  }, [data]);

  return (
    <div className="bg-white p-4 rounded-lg">
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
