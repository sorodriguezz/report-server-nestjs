import * as Utils from '../../helpers/chart-utils';

interface DonutEntry {
  label: string;
  value: number;
}

interface DonutOptions {
  position?: 'left' | 'right' | 'top' | 'bottom';
  entries: DonutEntry[];
}

export const getDonutChart = async (options: DonutOptions): Promise<string> => {
  const { position = 'top' } = options;
  const data = {
    labels: options.entries.map((e) => e.label),
    datasets: [
      {
        label: 'Dataset 1',
        data: options.entries.map((e) => e.value),
        backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data,
    options: {
      responsive: true,
      // title: {
      //   text: 'Grafico',
      //   display: true
      // },
      legend: {
        position,
      },
      plugins: {
        datalabels: {
          color: 'white',
          font: {
            weight: 'bold',
            size: 14,
          },
        },
      },
    },
  };

  return Utils.chartJsToImage(config);
};
