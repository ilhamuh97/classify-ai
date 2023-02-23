import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const ConfusionMatrix = ({ classConfig, confusionMatrix }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (confusionMatrix.length > 0) {
            const data = confusionMatrix
                .slice(0)
                .reverse()
                .map((confusionMatrixData, i) => {
                    const newConfusionMatrixData = confusionMatrixData.map((val) => {
                        const total = confusionMatrixData.reduce(
                            (accumulator, currValue) => accumulator + currValue,
                            0
                        );
                        return parseFloat((val / total).toFixed(3));
                    });

                    return {
                        name: classConfig[confusionMatrixData.length - 1 - i].label,
                        data: newConfusionMatrixData
                    };
                });
            setData(data);
        }
    }, [confusionMatrix]);

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
            min: 0,
            title: {
                text: 'Actual classification'
            }
        },
        xaxis: {
            type: 'category',
            categories: classConfig.slice(0).map((c) => c.label),
            position: 'top',
            title: {
                text: 'Predicted classification'
            }
        },
        colors: ['#008FFB'],
        title: {
            text: 'Confusion Matrix'
        }
    };

    return <Chart options={option} series={data} type="heatmap" height={350} />;
};

export default ConfusionMatrix;
