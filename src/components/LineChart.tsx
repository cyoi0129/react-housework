import { FC } from 'react';
import { Line } from 'react-chartjs-2';

export type Props = {
  chartData: number[];
}

const LineChart: FC <Props> = (Props) => {
  const { chartData } = Props;
  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Tasks done last week',
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