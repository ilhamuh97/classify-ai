import React from 'react';
import Chart from 'react-apexcharts';

const ConfusionMatrix = () => {
    const data = [
        {
            name: 'Class 5',
            data: [5, 11, 21, 12, 5]
        },
        {
            name: 'Class 4',
            data: [13, 32, 0, 24, 5]
        },
        {
            name: 'Class 3',
            data: [11, 12, 32, 41, 15]
        },
        {
            name: 'Class 2',
            data: [2, 3, 34, 1, 1]
        },
        {
            name: 'Class 1',
            data: [2, 23, 13, 24, 1]
        }
    ];

    const option = {
        chart: {
            type: 'heatmap'
        },
        dataLabels: {
            enabled: true,
            style: {
                colors: ['#000']
            }
        },
        stroke: {
            curve: 'straight'
        },
        yaxis: {
            min: 0
        },
        xaxis: {
            type: 'category',
            categories: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
            position: 'top'
        },
        colors: ['#008FFB'],
        title: {
            text: 'Confusion Matrix (mocked)'
        }
    };

    return <Chart options={option} series={data} type="heatmap" height={350} />;
};

export default ConfusionMatrix;
