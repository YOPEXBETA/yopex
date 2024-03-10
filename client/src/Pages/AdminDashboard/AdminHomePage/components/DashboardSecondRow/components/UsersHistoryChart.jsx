import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Chart from "../../../../../../Components/Charts/Chart";
import splineAreaChartOptions from "../../../../../../variables/splineAreaChartOptions";
import Card from "../../../../../../Components/Cards";
const UsersHistoryChart = ({ extra }) => {
  const url = process.env.REACT_APP_API_ENDPOINT;

  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/users/stats`, {});
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
    if (data) {
      setSeries([
        {
          data: data.map((data) => data.total),
        },
      ]);

      setOptions((prevState) => ({
        ...prevState,
        labels: data.map((data) => `${data._id.month}/${data._id.year}`),
      }));
    }
  }, [data]);

  return (
    <Card extra={`p-4 shadow-xl bg-white border-none ${extra}`}>
      <div className="p-4">
        <h6 className="text-lg font-semibold">User Analytics</h6>
      </div>
      <div className="p-4"></div>
      <Chart options={options} series={series} />
    </Card>
  );
};

export default UsersHistoryChart;
