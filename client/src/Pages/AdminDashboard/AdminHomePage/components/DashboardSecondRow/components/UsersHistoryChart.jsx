import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Chart from "../../../../../../Components/Charts/Chart";
import splineAreaChartOptions from "../../../../../../variables/splineAreaChartOptions";
const UsersHistoryChart = () => {
  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://yopex-api.tabaani.co/users/stats",
        {
          withCredentials: true,
        }
      );
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
    <div className="bg-white p-4 rounded-lg">
      <div className="bg-white h-full ">
        <div className="p-4">
          <h6 className="text-lg font-semibold">User Analytics</h6>
        </div>
        <div className="p-4"></div>
        <Chart options={options} series={series} />
      </div>
    </div>
  );
};

export default UsersHistoryChart;
