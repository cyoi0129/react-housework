// Basic Library
import { VFC } from 'react';
import { Pie } from 'react-chartjs-2';
import { langSet } from "../config";

export type Props = {
  dad: number;
  mom: number;
}

// レンダリング
const PieChart: VFC <Props> = (Props) => {
  const { dad, mom } = Props;
  const data = {
    // x 軸のラベル

    labels: [langSet.common.dad, langSet.common.mom],
    datasets: [
      {
        label: langSet.common.chart.pie,
        // データの値
        data: [dad, mom],
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
  return <Pie data={data} />;
}
export default PieChart;