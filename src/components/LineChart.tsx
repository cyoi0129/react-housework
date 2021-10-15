import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  datasets: [
    {
      label: 'Tasks done last week',
      data: [12, 19, 3, 5, 2, 3, 6],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const LineChart = () => (
  <>
    <Line data={data} />
  </>
);

export default LineChart;