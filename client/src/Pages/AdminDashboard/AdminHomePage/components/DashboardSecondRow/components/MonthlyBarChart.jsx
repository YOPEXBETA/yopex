import { useTheme } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const BAR_CHART_OPTIONS = {
  chart: {
    type: "bar",
    height: 365,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "45%",
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: MONTHS,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
  },
  grid: {
    show: false,
  },
};

const MonthlyBarChart = () => {
  const { data } = useQuery({
    queryKey: ["challenges"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://yopex-api.tabaani.co/challenge/challenges",
      );
      return data;
    },
  });

  const theme = useTheme();

  const primary = theme.palette?.text?.primary || "#000";
  const secondary = theme.palette?.text?.secondary || "#000";
  const info = theme.palette?.info?.light || "#000";

  const monthlyEarnings = new Array(12).fill(0);

  data?.forEach((challenge) => {
    if (challenge.winner) {
      const deadlineDate = new Date(challenge.deadline);
      if (deadlineDate.getFullYear() === new Date().getFullYear()) {
        const monthIndex = deadlineDate.getMonth();
        monthlyEarnings[monthIndex] += parseFloat(
          (challenge.price * 0.1).toFixed(2)
        );
      }
    }
  });

  const series = [
    {
      name: "Monthly Earnings",
      data: monthlyEarnings,
    },
  ];

  const [options, setOptions] = useState(BAR_CHART_OPTIONS);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [info],
      xaxis: {
        labels: {
          style: {
            colors: Array(12).fill(secondary),
          },
        },
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          style: {
            colors: [secondary],
          },
        },
        min: 0,
        max: Math.max(...monthlyEarnings) * 1.5,
      },
      tooltip: {
        theme: "light",
      },
      title: {
        text: "Monthly Earnings",
        style: {
          fontSize: "20px",
          color: primary,
          fontWeight: "bold",
        },
      },
      chart: {
        background: theme.palette.background.paper,
        foreColor: primary,
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          colors: [secondary],
        },
      },
    }));
  }, [
    primary,
    info,
    secondary,
    theme.palette.background.paper,
    theme.palette.text.primary,
    theme.palette.text.secondary,
    monthlyEarnings,
  ]);

  return {
    /*<ReactApexChart options={options} series={series} type="bar" height={365} />*/
  };
};

export default MonthlyBarChart;
