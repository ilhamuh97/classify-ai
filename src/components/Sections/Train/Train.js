import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import Report from './Report/Report';
import SuccessAlert from './Alerts/SuccessAlert/SuccessAlert';
import FailedAlert from './Alerts/FailedAlert/FailedAlert';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import ProgressEpoch from './ProgressEpoch/ProgressEpoch';
import { Button, Space } from 'antd';
import styles from './Train.module.scss';
import Canvas from './Canvas/Canvas';

const Train = ({
    dataset,
    dataAugmentationConfig,
    paramConfig,
    classConfig,
    graphModel,
    setGraphModel,
    model,
    setModel
}) => {
    const [isAugmenting, setIsAugmenting] = useState(false);
    const [state, setState] = useState('');
    const [augmentedDataset, setAugmentedDataset] = useState([]);
    const [isTraining, setIsTraining] = useState(false);
    const [isTrainingSucceed, setIsTrainingSucceed] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [logs, setLogs] = useState([]);
    const [models, setModels] = useState([]);
    const [reports, setReports] = useState([]);
    const [progressMessage, setProgressMessage] = useState('');
    const [featureVectors, setFeactureVectors] = useState(null);
    const [keys, setKeys] = useState(null);

    useEffect(() => {
        if (isTraining) {
            if (state === 'SET_GRAPH_MODEL') {
                initialGraphModel();
            } else if (state === 'SET_MODEL') {
                initialModel();
            } else if (state === 'SET_AUGMENTED_DATA' && dataAugmentationConfig.isActive === true) {
                setIsAugmenting(true);
            } else if (state === 'SET_DATA') {
                prepareData();
            } else if (state === 'TRAIN_AND_PREDICT') {
                trainAndPredict(keys, featureVectors, model);
            } else {
                resetStates();
            }
        }
    }, [isTraining, state]);

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
            const model = paramConfig.model;
            const URL = JSON.parse(model).URL;
            const mobilenet = await tf.loadGraphModel(URL, { fromTFHub: true });
            // Warm up the model by passing zeros through it once.
            return mobilenet;
        };

        loadMobileNetFeatureModel()
            .then((result) => {
                setGraphModel(result);
                setProgressMessage('Preparing model...');
                setState('SET_MODEL');
                console.log('Tensors in memory after graph loaded: ' + tf.memory().numTensors);
            })
            .catch((e) => {
                setIsTraining(false);
                setShowAlert(true);
                setIsTrainingSucceed(false);
                console.log(e);
            });
    };

    const getOptimizer = (optimizerName, learningRate) => {
        switch (optimizerName) {
            case 'sgd':
                return tf.train.sgd(learningRate);
            case 'adam':
                return tf.train.adam(learningRate);
            default:
                return tf.train.adam(learningRate);
        }
    };

    const initialModel = () => {
        const learningRate = paramConfig.learningRate;
        const optimizer = getOptimizer(paramConfig.optimizer, learningRate);
        const modelConfig = {
            optimizer: optimizer,
            loss: classConfig.length === 2 ? 'binaryCrossentropy' : 'categoricalCrossentropy',
            metrics: ['accuracy']
        };
        const model = paramConfig.model;
        const inputShape = JSON.parse(model).inputShape;
        const currModel = tf.sequential();
        currModel.add(
            tf.layers.dense({ inputShape: [inputShape], units: 128, activation: 'relu' })
        );
        currModel.add(tf.layers.dense({ units: classConfig.length, activation: 'softmax' }));
        currModel.summary();
        currModel.compile(modelConfig);
        setModel(currModel);
        const message = dataAugmentationConfig.isActive
            ? 'Preparing augmented images...'
            : 'Preparing feature vectors';
        setProgressMessage(message);
        setState('SET_AUGMENTED_DATA');
        console.log('Tensors in memory after model loaded: ' + tf.memory().numTensors);
    };

    const prepareData = () => {
        const imageFeatures = [];
        const keys = [];
        if (dataAugmentationConfig.isActive) {
            augmentedDataset.forEach((d) => {
                imageFeatures.push(calculateFeaturesOnCurrentFrame(d.data));
                keys.push(d.key);
            });
        }
        dataset.forEach((d) => {
            imageFeatures.push(calculateFeaturesOnCurrentFrame(d.data));
            keys.push(d.key);
        });
        setFeactureVectors(imageFeatures);
        setKeys(keys);
        setProgressMessage('Training model...');
        setState('TRAIN_AND_PREDICT');
    };

    const trainClicked = () => {
        tf.disposeVariables();
        setIsTraining(true);
        setShowAlert(false);
        setKeys(null);
        setFeactureVectors(null);
        setGraphModel(null);
        setModel(null);
        setState('SET_GRAPH_MODEL');
        setProgressMessage('Setting up graph model...');
        setAugmentedDataset([]);
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

        setModels((current) => [...current, currModel]);
        setState('DONE');
    }

    const resetStates = () => {
        // setup finish training parameter
        setProgressMessage('Training is completed');
        setShowAlert(true);
        setIsTrainingSucceed(true);
        setIsTraining(false);
        setState('');
    };

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
                    title="Train and Evaluate"
                    subTitle="In this section, you can start training your model using the dataset and configuration you have set up. You can also view the training progress, evaluation metrics such as accuracy and loss, and other results in an easy-to-understand format."
                />
                {isTraining && dataAugmentationConfig.isActive && isAugmenting ? (
                    <Canvas
                        dataset={dataset}
                        dataAugmentationConfig={dataAugmentationConfig}
                        setAugmentedDataset={setAugmentedDataset}
                        setProgressMessage={setProgressMessage}
                        setState={setState}
                        style={{
                            display: 'none'
                        }}
                    />
                ) : null}
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
