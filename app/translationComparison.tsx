import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type TranslationComparisonProps = {
  labels: string[];
  values: number[];
};

const TranslationComparison: React.FC<TranslationComparisonProps> = ({
  labels,
  values,
}) => {
  const [chartOptions, setChartOptions] = useState<any>(null);

  useEffect(() => {
    if (labels.length !== values.length) {
      console.error('Labels and values arrays must have the same length.');
      return;
    }

    setChartOptions({
      indexAxis: 'y' as const,
      scales: {
        x: {
          grid: {
            display: true,
            color: '#075985',
          },
          min: values === null ? -5 : Math.min(-5, ...values),
          max: values === null ? 5 : Math.max(5, ...values),
          ticks: {
            color: 'white', // Set x-axis font color to white
            font: {
              size: 14, // Set font size for x-axis tick labels
            },
          },
          borderColor: 'white',
        },
        y: {
          grid: {
            display: false,
            color: '#075985',
          },
          ticks: {
            align: 'center',
            color: 'white',
            font: {
              size: 14, // Set font size for x-axis tick labels
            },
          },
          borderColor: 'white',
          offset: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        chartArea: {
          backgroundColor: 'transparent',
        },
      },
    });
  }, [labels, values]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Comparison Metrics',
        data: values,
        backgroundColor: values.map(
          (_, index) => ['#6366f1', '#4f46e5', '#4338ca', '#3730a3'][index % 4]
        ),
        borderWidth: 1,
      },
    ],
  };

  if (!chartOptions) return null; // Render nothing until options are ready

  return (
    <div className="space-y-8">
      {/* Container for Bar Chart */}
      <div className="mt-6">
        <label className="block text-sm font-semibold mb-4">Translation Comparison</label>
        <div className="text-white p-4 shadow rounded-lg">
          <Bar data={data} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default TranslationComparison;
