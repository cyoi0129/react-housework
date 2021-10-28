// Basic Library
import { VFC } from 'react';
import { Line } from 'react-chartjs-2';
import { subDays } from 'date-fns';
import format from "date-fns/format";
import { convertDate, langSet } from "../config";

export type Props = {
  chartData: number[];
}

const LineChart: VFC <Props> = (Props) => {
  const { chartData } = Props;
  const today = new Date();
  let weekLabel: string[] = [];
  [...Array(7)].map((_, i) => {
    const prev: number = 7 - i;
    const targetDate = format(convertDate(subDays(today, prev)).dateOrigin, 'eee');
    weekLabel.push(String(targetDate));
    }
  )
  const data = {
    labels: weekLabel,
    datasets: [
      {
        label: langSet.common.chart.line,
        data: chartData,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
  return (
    <Line data={data} />
  )
}

export default LineChart;