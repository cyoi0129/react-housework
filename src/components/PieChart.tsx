import { Pie } from 'react-chartjs-2';
const data = {
  // x 軸のラベル
  labels: ['Dad', 'Mom'],
  datasets: [
    {
      label: 'Last week summary',
      // データの値
      data: [108, 45],
      // グラフの背景色
      backgroundColor: [
        'rgb(66, 165, 245, 0.6)',
        'rgb(255, 112, 67, 0.6)',
      ],
      // グラフの枠線の色
      borderColor: [
        'rgb(66, 165, 245)',
        'rgb(255, 112, 67)',
      ],
      // グラフの枠線の太さ
      borderWidth: 1,
    },
  ],
};

// レンダリング
const PieChart = () => {
  return <Pie data={data} />;
}
export default PieChart;