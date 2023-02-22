import React, { useState, useEffect, useContext } from 'react';
import * as tf from '@tensorflow/tfjs';
import Report from './Report/Report';
import SuccessAlert from './Alerts/SuccessAlert/SuccessAlert';
import FailedAlert from './Alerts/FailedAlert/FailedAlert';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import ProgressEpoch from './ProgressEpoch/ProgressEpoch';
import Canvas from './Canvas/Canvas';
import { Button, Space, Alert } from 'antd';
import { trainContext as headerContext } from '../../../assets/text/headerText/headerText';
import { ParamConfigContext } from '../../../contexts/ParamConfigContext';
import { DataAugmentationConfigContext } from '../../../contexts/DataAugmentationConfigContext';
import { ClassConfigContext } from '../../../contexts/ClassConfigContext';
import styles from './Train.module.scss';

const Train = ({ dataset, graphModel, setGraphModel, setModel, report, setReport }) => {
    const { paramConfig } = useContext(ParamConfigContext);
    const { dataAugmentationConfig } = useContext(DataAugmentationConfigContext);
    const { classConfig } = useContext(ClassConfigContext);
    const [isAugmenting, setIsAugmenting] = useState(false);
    const [state, setState] = useState('');
    const [augmentedDataset, setAugmentedDataset] = useState([]);
    const [isTraining, setIsTraining] = useState(false);
    const [isTrainingSucceed, setIsTrainingSucceed] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [logs, setLogs] = useState([]);
    const [baseModel, setBaseModel] = useState();
    const [progressMessage, setProgressMessage] = useState('');
    const [featureVectors, setFeatureVectors] = useState(null);
    const [keys, setKeys] = useState(null);
    const [infoMessage, setInfoMessage] = useState('');
    const [isTrainDisable, setIsTrainDisable] = useState(false);
    const [splittedDataset, setSplittedDataset] = useState([]);

    useEffect(() => {
        trainIsDisable();
    }, []);

    useEffect(() => {
        if (isTraining) {
            if (state === 'SET_GRAPH_MODEL') {
                initialGraphModel();
            } else if (state === 'SET_MODEL') {
                initialModel();
            } else if (state === 'SET_AUGMENTED_DATA') {
                setIsAugmenting(true);
            } else if (state === 'SET_DATA') {
                prepareData();
            } else if (state === 'TRAIN_AND_PREDICT') {
                trainAndPredict(keys, featureVectors);
            } else {
                resetStates();
            }
        }
    }, [isTraining, state]);

    useEffect(() => {
        if (!isTraining && isTrainingSucceed) {
            // store logs into the report history
            setReport({
                logs: logs,
                splittedDataset: splittedDataset,
                model: baseModel,
                graphModel: graphModel
            });
            setModel(baseModel);
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
        setBaseModel(currModel);
        const message = dataAugmentationConfig.isActive
            ? 'Preparing augmented images...'
            : 'Preparing feature vectors';
        setProgressMessage(message);
        if (dataAugmentationConfig.isActive === true) {
            setState('SET_AUGMENTED_DATA');
        } else {
            setState('SET_DATA');
        }
        console.log('Tensors in memory after model loaded: ' + tf.memory().numTensors);
    };

    const prepareData = () => {
        const combinedDataset = dataset.concat(augmentedDataset);
        shuffleCombo(combinedDataset);
        const { training, validation } = splitDataset(combinedDataset, 0.8);
        setSplittedDataset(structuredClone({ training: training, validation: validation }));
        console.log(validation.length);

        const trainingImageFeatures = [];
        const trainingKeys = [];
        const validationImageFeatures = [];
        const validationKeys = [];

        training.forEach((d) => {
            trainingImageFeatures.push(calculateFeaturesOnCurrentFrame(d.data));
            trainingKeys.push(d.key);
        });
        validation.forEach((d) => {
            validationImageFeatures.push(calculateFeaturesOnCurrentFrame(d.data));
            validationKeys.push(d.key);
        });
        setFeatureVectors({
            training: trainingImageFeatures,
            validation: validationImageFeatures
        });
        setKeys({ training: trainingKeys, validation: validationKeys });
        setProgressMessage('Training model...');
        setState('TRAIN_AND_PREDICT');
    };

    const trainClicked = () => {
        tf.disposeVariables();
        setIsTraining(true);
        setShowAlert(false);
        setKeys(null);
        setFeatureVectors(null);
        setGraphModel(null);
        setBaseModel(null);
        setState('SET_GRAPH_MODEL');
        setProgressMessage('Setting up graph model...');
        setAugmentedDataset([]);
    };

    const calculateFeaturesOnCurrentFrame = (img) => {
        return tf.tidy(function () {
            // Grab pixels from current VIDEO frame.
            let imageAsTensor = tf.browser.fromPixels(img);
            // Resize video frame tensor to be 224 x 224 pixels which is needed by MobileNet for input.
            let resizedTensorFrame = tf.image.resizeBilinear(imageAsTensor, [224, 224], true);

            let normalizedTensorFrame = resizedTensorFrame.div(255);
            return graphModel.predict(normalizedTensorFrame.expandDims()).squeeze();
        });
    };

    async function trainAndPredict(keys, featureVectors) {
        // Training
        let outputsAsTensorTraining = tf.tensor1d(keys.training, 'int32');
        let oneHotOutputsTraining = tf.oneHot(outputsAsTensorTraining, classConfig.length);
        let inputsAsTensorTraining = tf.stack(featureVectors.training);

        // Validation
        let outputsAsTensorValidation = tf.tensor1d(keys.validation, 'int32');
        let oneHotOutputsValidation = tf.oneHot(outputsAsTensorValidation, classConfig.length);
        let inputsAsTensorValidation = tf.stack(featureVectors.validation);

        // Train
        await baseModel.fit(inputsAsTensorTraining, oneHotOutputsTraining, {
            shuffle: true,
            validationData: [inputsAsTensorValidation, oneHotOutputsValidation],
            batchSize: paramConfig.batchSize,
            epochs: paramConfig.epochs,
            callbacks: { onEpochEnd: logProgress },
            initialEpoch: 0
        });

        outputsAsTensorTraining.dispose();
        oneHotOutputsTraining.dispose();
        inputsAsTensorTraining.dispose();

        setState('DONE');
    }

    const splitDataset = (input, ratio) => {
        const splitter = Math.ceil(input.length * ratio);
        const trainingDataset = input.slice(0, splitter);
        const validationDataset = input.slice(splitter);
        return {
            training: trainingDataset,
            validation: validationDataset
        };
    };

    /*
    const splitDataset = (input, output, ratio) => {
        const splitter = Math.ceil(input.length * ratio);
        const trainingInputDataset = input.slice(0, splitter);
        const validationInputDataset = input.slice(splitter);
        const trainingOutputDataset = output.slice(0, splitter);
        const validationOutputDataset = output.slice(splitter);
        return {
            training: {
                trainingInputDataset,
                trainingOutputDataset
            },
            validation: {
                validationInputDataset,
                validationOutputDataset
            }
        };
    };
    */

    const resetStates = () => {
        // setup finish training parameter
        setProgressMessage('');
        setShowAlert(true);
        setIsTrainingSucceed(true);
        setIsTraining(false);
        setState('');
        setIsAugmenting(false);
    };

    function shuffleCombo(array, array2 = []) {
        if (array2.length != 0) {
            if (array.length !== array2.length) {
                throw new Error(
                    `Array sizes must match to be shuffled together ` +
                        `First array length was ${array.length}` +
                        `Second array length was ${array2.length}`
                );
            }
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
            if (array2.length != 0) {
                swap(array2, counter, index);
            }
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
        //console.log(logs);
        setLogs((current) => [
            ...current,
            {
                epoch: epoch,
                lossAndAccuracy: logs
            }
        ]);
    };

    const trainIsDisable = () => {
        let disable = false;
        if (dataset.length === 0) {
            setInfoMessage('Please provide data for your dataset. It cannot be empty.');
            disable = true;
            setIsTrainDisable(disable);
        } else {
            if (classConfig.length < 2) {
                disable = true;
                setInfoMessage('Please add at least 2 classes.');
                setIsTrainDisable(disable);
            } else {
                classConfig.forEach((classItem) => {
                    const found = dataset.find((d) => d.key === classItem.key);
                    if (!found) {
                        disable = true;
                        setInfoMessage(
                            `Your class "${classItem.label}" requires dataset. Please add at least 1 image for each class`
                        );
                        setIsTrainDisable(disable);
                    }
                });
            }
            if (!disable) {
                const unique = [...new Set(dataset.map((d) => d.key))];
                if (unique < 2) {
                    disable = true;
                    setInfoMessage('Please add at least 2 classes without empty dataset');
                    setIsTrainDisable(disable);
                }
            }
        }
    };

    return (
        <div className={styles.train}>
            <Space size="small" direction="vertical" className={styles.layout}>
                <SectionHeader
                    title={headerContext.title}
                    subTitle={headerContext.subTitle}
                    stepStatus={headerContext.stepStatus}
                />
                {isTraining && dataAugmentationConfig.isActive && isAugmenting ? (
                    <Canvas
                        dataset={dataset}
                        augmentedDataset={augmentedDataset}
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
                    disabled={isTrainDisable || isTraining}
                    loading={isTraining}>
                    Start Training
                </Button>
                {isTrainDisable ? <Alert message={infoMessage} type="warning" showIcon /> : null}
                <span>{progressMessage}</span>
                {isTraining && logs.length > 0 ? (
                    <ProgressEpoch logs={logs} paramConfig={paramConfig} />
                ) : null}
                {isTraining && logs.length > 0 ? (
                    <Alert
                        message="Training is still in progress"
                        description={`Accuracy: ${logs[logs.length - 1].lossAndAccuracy.acc.toFixed(
                            3
                        )}, Loss: ${logs[logs.length - 1].lossAndAccuracy.loss.toFixed(3)}`}
                        type="info"
                        showIcon
                    />
                ) : null}
                {!isTraining && showAlert ? (
                    isTrainingSucceed ? (
                        logs.length === 0 ? (
                            <SuccessAlert report={report} />
                        ) : null
                    ) : (
                        <FailedAlert />
                    )
                ) : null}

                {(report || logs.length > 0) &&
                state !== 'SET_GRAPH_MODEL' &&
                state !== 'SET_MODEL' &&
                state !== 'SET_AUGMENTED_DATA' &&
                state !== 'SET_DATA' ? (
                    <Report
                        report={report}
                        logs={logs}
                        model={report?.model}
                        graphModel={report?.graphModel}
                        classConfig={classConfig}
                    />
                ) : null}
            </Space>
        </div>
    );
};

export default Train;
