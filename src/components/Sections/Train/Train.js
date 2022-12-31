import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import Report from './Report/Report';
import SuccessAlert from './Alerts/SuccessAlert/SuccessAlert';
import FailedAlert from './Alerts/FailedAlert/FailedAlert';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import ProgressEpoch from './ProgressEpoch/ProgressEpoch';
import { Button, Space } from 'antd';
import styles from './Train.module.scss';

const Train = ({
    dataset,
    paramConfig,
    classConfig,
    graphModel,
    setGraphModel,
    model,
    setModel
}) => {
    const [isTraining, setIsTraining] = useState(false);
    const [isTrainingSucceed, setIsTrainingSucceed] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [logs, setLogs] = useState([]);
    const [models, setModels] = useState([]);
    const [reports, setReports] = useState([]);
    const [progressMessage, setProgressMessage] = useState('');
    const [graphModelIsReady, setGraphModelIsReady] = useState(false);
    const [modelIsReady, setModelIsReady] = useState(false);
    const [dataIsReady, setDataIsReady] = useState(false);
    const [featureVectors, setFeactureVectors] = useState(null);
    const [keys, setKeys] = useState(null);

    useEffect(() => {
        tf.disposeVariables();
    }, []);

    useEffect(() => {
        if (isTraining) {
            if (!graphModelIsReady) {
                initialGraphModel();
            } else if (!modelIsReady) {
                initialModel();
            } else if (!dataIsReady) {
                prepareData();
            } else {
                trainAndPredict(keys, featureVectors, model);
            }
        }
    }, [isTraining, graphModelIsReady, modelIsReady, dataIsReady]);

    useEffect(() => {
        if (!isTraining && isTrainingSucceed) {
            // store logs into the report history
            setReports((current) => [...current, { modelIdx: models.length, logs: logs }]);
            // clean up current logs
            setLogs([]);
        }
    }, [isTrainingSucceed, isTraining]);

    const initialGraphModel = () => {
        setProgressMessage('Preparing graph model...');
        const loadMobileNetFeatureModel = async () => {
            const URL = paramConfig.model;
            const mobilenet = await tf.loadGraphModel(URL, { fromTFHub: true });
            // Warm up the model by passing zeros through it once.
            return mobilenet;
        };

        loadMobileNetFeatureModel()
            .then((result) => {
                setGraphModel(result);
                setProgressMessage('Preparing model...');
                setGraphModelIsReady(true);
                console.log('Tensors in memory after graph loaded: ' + tf.memory().numTensors);
            })
            .catch((e) => {
                setIsTraining(false);
                showAlert(true);
                setIsTrainingSucceed(false);
                console.log(e);
            });
    };

    const initialModel = () => {
        const modelConfig = {
            optimizer: paramConfig.optimizer || 'adam',
            loss: classConfig.length === 2 ? 'binaryCrossentropy' : 'categoricalCrossentropy',
            metrics: ['accuracy']
        };
        const currModel = tf.sequential();
        currModel.add(tf.layers.dense({ inputShape: [1024], units: 128, activation: 'relu' }));
        currModel.add(tf.layers.dense({ units: classConfig.length, activation: 'softmax' }));
        currModel.summary();
        currModel.compile(modelConfig);
        setModel(currModel);
        setProgressMessage('Preparing feature vectors...');
        setModelIsReady(true);
        console.log('Tensors in memory after model loaded: ' + tf.memory().numTensors);
    };

    const prepareData = () => {
        const imageFeatures = [];
        const key = dataset.map((d) => {
            imageFeatures.push(calculateFeaturesOnCurrentFrame(d.data));
            return d.key;
        });
        setFeactureVectors(imageFeatures);
        setKeys(key);
        setProgressMessage('Training model...');
        setDataIsReady(true);
    };

    const trainClicked = () => {
        tf.disposeVariables();
        setIsTraining(true);
        showAlert(false);
        setKeys(null);
        setFeactureVectors(null);
        setGraphModel(null);
        setModel(null);
        setProgressMessage('Setting up graph model...');
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

    async function trainAndPredict(trainingDataOutputs, trainingDataInputs, currModel) {
        shuffleCombo(trainingDataInputs, trainingDataOutputs);
        let outputsAsTensor = tf.tensor1d(trainingDataOutputs, 'int32');
        let oneHotOutputs = tf.oneHot(outputsAsTensor, classConfig.length);
        let inputsAsTensor = tf.stack(trainingDataInputs);
        await currModel.fit(inputsAsTensor, oneHotOutputs, {
            shuffle: true,
            batchSize: paramConfig.batchSize,
            epochs: paramConfig.epochs,
            callbacks: { onEpochEnd: logProgress }
        });

        outputsAsTensor.dispose();
        oneHotOutputs.dispose();
        inputsAsTensor.dispose();

        // setup finish training parameter
        setModels((current) => [...current, currModel]);
        setProgressMessage('Training is completed');
        setShowAlert(true);
        setIsTrainingSucceed(true);
        setIsTraining(false);
        setGraphModelIsReady(false);
        setModelIsReady(false);
        setDataIsReady(false);
    }

    function shuffleCombo(array, array2) {
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
        setLogs((current) => [
            ...current,
            {
                epoch: epoch,
                lossAndAccuracy: logs
            }
        ]);
    };

    return (
        <div className={styles.train}>
            <Space size="small" direction="vertical" className={styles.layout}>
                <SectionHeader
                    title="Train Your Model"
                    subTitle="In this section you can start to train your model. During training the
                        model, the report of training will be recorded and visualized."
                />

                <Button
                    onClick={() => trainClicked()}
                    disabled={dataset.length === 0 || isTraining}
                    loading={isTraining}>
                    Start Training
                </Button>
                <span>{progressMessage}</span>
                {isTraining && logs.length > 0 && logs ? (
                    <ProgressEpoch logs={logs} paramConfig={paramConfig} />
                ) : null}
                {!isTraining && showAlert ? (
                    isTrainingSucceed ? (
                        logs.length === 0 ? (
                            <SuccessAlert reports={reports} />
                        ) : null
                    ) : (
                        <FailedAlert />
                    )
                ) : null}

                {!isTraining && showAlert && isTrainingSucceed && logs.length === 0 ? (
                    <Report reports={reports} />
                ) : null}
            </Space>
        </div>
    );
};

export default Train;
