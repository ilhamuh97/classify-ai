import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import Chart from 'react-apexcharts';

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
                .map((confusionMatrixData, i) => ({
                    name: classConfig[confusionMatrixData.length - 1 - i].label,
                    data: confusionMatrixData
                }));
            setData(data);
        }
    }, [confusionMatrix]);

    function calculateFeaturesOnCurrentFrame(img) {
        return tf.tidy(function () {
            // Grab pixels from current VIDEO frame.
            let imageFrameAsTensor = tf.browser.fromPixels(img);
            // Resize video frame tensor to be 224 x 224 pixels which is needed by MobileNet for input.
            let resizedTensorFrame = tf.image.resizeBilinear(imageFrameAsTensor, [224, 224], true);

            let normalizedTensorFrame = resizedTensorFrame.div(255);

            return graphModel.predict(normalizedTensorFrame.expandDims()).squeeze();
        });
    }

    const predictLoop = () => {
        const labels = [];
        const predictions = [];
        tf.tidy(function () {
            // Grab pixels from current VIDEO frame.
            validationDataset.forEach((validation) => {
                let imageFeatures = calculateFeaturesOnCurrentFrame(validation.data);
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
            min: 0
        },
        xaxis: {
            type: 'category',
            categories: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
            position: 'top'
        },
        colors: ['#008FFB'],
        title: {
            text: 'Confusion Matrix'
        }
    };

    return <Chart options={option} series={data} type="heatmap" height={350} />;
};

export default ConfusionMatrix;
