import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Button, Typography, Alert, Progress, Space } from 'antd';
import styles from './Train.module.scss';

const Train = ({ dataset, model, graphModel, paramConfig }) => {
    const { Title, Paragraph } = Typography;
    const [predict, setPredict] = useState(false);
    const [isTraining, setIsTraining] = useState(false);
    const [isTrainingSucceed, setIsTrainingSucceed] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [epochs, setEpochs] = useState(0);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        if (predict) {
            //predictLoop();
            console.log(predict);
        }
    }, [predict]);

    const trainClicked = () => {
        setIsTraining(true);
        const imageFeatures = [];
        const key = dataset.map((d) => {
            imageFeatures.push(calculateFeaturesOnCurrentFrame(d.data));
            return d.key;
        });
        trainAndPredict(key, imageFeatures);
    };

    const calculateFeaturesOnCurrentFrame = (img) => {
        return tf.tidy(function () {
            // Grab pixels from current VIDEO frame.
            let videoFrameAsTensor = tf.browser.fromPixels(img);
            // Resize video frame tensor to be 224 x 224 pixels which is needed by MobileNet for input.
            let resizedTensorFrame = tf.image.resizeBilinear(videoFrameAsTensor, [224, 224], true);

            let normalizedTensorFrame = resizedTensorFrame.div(255);
            return graphModel.predict(normalizedTensorFrame.expandDims()).squeeze();
        });
    };

    async function trainAndPredict(trainingDataOutputs, trainingDataInputs) {
        setPredict(false);
        shuffleCombo(trainingDataInputs, trainingDataOutputs);
        let outputsAsTensor = tf.tensor1d(trainingDataOutputs, 'int32');
        let oneHotOutputs = tf.oneHot(outputsAsTensor, 2);
        let inputsAsTensor = tf.stack(trainingDataInputs);
        console.log(paramConfig);
        await model.fit(inputsAsTensor, oneHotOutputs, {
            shuffle: true,
            batchSize: paramConfig.batchSize,
            epochs: paramConfig.epochs,
            callbacks: { onEpochEnd: logProgress }
        });

        outputsAsTensor.dispose();
        oneHotOutputs.dispose();
        inputsAsTensor.dispose();

        // setup finish training parameter
        setPredict(true);
        setShowAlert(true);
        setIsTrainingSucceed(true);
        setIsTraining(false);
    }

    function shuffleCombo(
        // tslint:disable-next-line:no-any
        array,
        // tslint:disable-next-line:no-any
        array2
    ) {
        if (array.length !== array2.length) {
            throw new Error(
                `Array sizes must match to be shuffled together ` +
                    `First array length was ${array.length}` +
                    `Second array length was ${array2.length}`
            );
        }
        let counter = array.length;
        let index = 0;
        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            index = (Math.random() * counter) | 0;
            // Decrease counter by 1
            counter--;
            // And swap the last element of each array with it
            swap(array, counter, index);
            swap(array2, counter, index);
        }
    }

    function swap(object, left, right) {
        const temp = object[left];
        object[left] = object[right];
        object[right] = temp;
    }

    /**
     * Log training progress.
     **/
    const logProgress = (epoch, logs) => {
        setEpochs(epoch);
        setLogs((current) => [...current, logs]);
    };

    /**
     *  Make live predictions from webcam once trained.
     **/
    /*
    function predictLoop() {
        if (predict) {
            tf.tidy(function () {
                let imageFeatures = calculateFeaturesOnCurrentFrame();
                let prediction = model.predict(imageFeatures.expandDims()).squeeze();
                let highestIndex = prediction.argMax().arraySync();
                let predictionArray = prediction.arraySync();
                console.log(
                    'Prediction: ' +
                        highestIndex +
                        ' with ' +
                        Math.floor(predictionArray[highestIndex] * 100) +
                        '% confidence'
                );
            });
        }
    }
    */
    return (
        <div className={styles.train}>
            <Space size="small" direction="vertical" className={styles.layout}>
                <Typography>
                    <Title level={2}>Train Your Model</Title>
                    <Paragraph>
                        In this section you can start to train your model. During training the
                        model, the report of training will be recorded and visualized.
                    </Paragraph>
                </Typography>

                <Button
                    onClick={() => trainClicked()}
                    disabled={dataset.length === 0 || isTraining}
                    loading={isTraining}>
                    Start Training
                </Button>

                {isTraining ? (
                    <div className={styles.progressWrapper}>
                        <Progress
                            className={styles.progress}
                            percent={((epochs + 1) / paramConfig.epochs) * 100}
                            format={() => `${epochs + 1}/${paramConfig.epochs} Epoch`}
                        />
                    </div>
                ) : null}

                {showAlert ? (
                    isTrainingSucceed ? (
                        <Alert
                            message="Training succeed!"
                            description={`Loss: ${logs[logs.length - 1].loss}, Accuracy: ${
                                logs[logs.length - 1].acc
                            }`}
                            type="success"
                            showIcon
                            closable
                        />
                    ) : (
                        <Alert
                            message="Error Text"
                            showIcon
                            description="Training Failed"
                            type="error"
                        />
                    )
                ) : (
                    ''
                )}
            </Space>
        </div>
    );
};

export default Train;
