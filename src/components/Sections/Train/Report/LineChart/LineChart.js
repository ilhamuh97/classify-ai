import React from 'react';
import Chart from 'react-apexcharts';

const LineChart = ({ title, trainData, validationData }) => {
    const lineChartOption = (title, yAxis) => {
        return {
            colors: ['rgb(53, 162, 235)', 'rgb(255, 99, 132)'],
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            yaxis: yAxis,
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: title,
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                }
            }
        };
    };

    const lineChartData = (label1, label2, data1, data2) => {
        return [
            {
                name: label1,
                data: data1
            },
            {
                name: label2,
                data: data2
            }
        ];
    };
    return (
        <Chart
            options={lineChartOption(title, {
                min: 0
            })}
            series={lineChartData('Training', 'Validation', trainData, validationData)}
            height={350}
        />
    );
};

export default LineChart;
