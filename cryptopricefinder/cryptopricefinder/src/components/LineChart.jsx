import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
const LineChart = ({ chat }) => {
  const [data, setData] = useState([["Date", "Prices"]]);
  useEffect(() => {
    let datacopy = [["Date", "Prices"]];
    if (chat.prices) {
      chat.prices.map((item, index) => {
        datacopy.push([
          `${new Date(item[0]).toLocaleDateString().slice(0, -5)}`,
          item[1],
        ]);
      });
      setData(datacopy);
    }
  }, [data]);
  return <Chart chartType="LineChart" data={data} height="100%" legendToggle />;
};

export default LineChart;
