import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const TemperatureChart = ({ weatherData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const chartContext = chartRef.current.getContext('2d');

    if (chartInstance.current) {
      chartInstance.current.destroy(); 
    }

    chartInstance.current = new Chart(chartContext, {
      type: 'line', 
      data: {
        labels: weatherData.map(item => item.name), 
        datasets: [
          {
            label: 'Минимальная температура',
            data: weatherData.map(item => item.temperature_min),
            borderColor: '#120a8f',
            backgroundColor: '#120a8f',
            fill: false,
            borderWidth: 2,
            pointRadius: 3,
          },
          {
            label: 'Максимальная температура',
            data: weatherData.map(item => item.temperature_max),
            borderColor: '#b0c8de',
            backgroundColor: '#b0c8de',
            fill: false,
            borderWidth: 2,
            pointRadius: 3,
          },
          {
            label: 'Средняя месячная температура',
            data: weatherData.map(item => item.temperature_avg),
            borderColor: '#2e84d1',
            backgroundColor: '#2e84d1',
            fill: false,
            borderWidth: 2,
            pointRadius: 3,
          }
        ]
      },
      options: {
        indexAxis: 'x', 
        legend: {
          labels: {
              fontColor: '#DCDCDC' 
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#DCDCDC' 
            },
            beginAtZero: true,
            title: {
              display: true,
              text: ''
            }
          },
          y: {
            ticks: {
              color: '#DCDCDC'
            }
          }
        },
        plugins: {
          
          legend: {
            position: 'top',
            labels: {
              color: '#DCDCDC' 
          }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const value = context.raw;
                const roundedValue = parseFloat(value).toFixed(1);
                return `${label}: ${roundedValue}°C`;
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [weatherData]); 

  return <canvas height={100} ref={chartRef} />;
};

export default TemperatureChart;
