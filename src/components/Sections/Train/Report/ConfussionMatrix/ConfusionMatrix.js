import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import Chart from 'react-apexcharts';
import { calculateFeaturesOnCurrentFrame } from '../../../../../helpers/helpers';

const ConfusionMatrix = ({ validationDataset, model, classConfig, graphModel }) => {
    const [confusionMatrix, setConfusionMatrix] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        predictLoop();
    }, []);

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

    const predictLoop = () => {
        const labels = [];
        const predictions = [];
        tf.tidy(function () {
            // Grab pixels from current VIDEO frame.
            validationDataset.forEach((validation) => {
                let imageFeatures = calculateFeaturesOnCurrentFrame(validation.data, graphModel);
                // Resize video frame tensor to be 224 x 224 pixels which is needed by MobileNet for input.
                let prediction = model.predict(imageFeatures.expandDims()).squeeze();
                let highestIndex = prediction.argMax().arraySync();
                predictions.push(highestIndex);
                labels.push(validation.key);
            });
        });
        setConfusionMatrix(
            tf.math.confusionMatrix(labels, predictions, classConfig.length).arraySync()
        );
    };

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
