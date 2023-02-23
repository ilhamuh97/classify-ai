import React, { useState, useEffect, useRef, useContext } from 'react';
import DisplayWrapper from './DisplayWrapper/DisplayWrapper';
import * as tf from '@tensorflow/tfjs';
import styles from './Predict.module.scss';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import TabsForModel from './TabsForModel/TabsForModel';
import { Divider, Space } from 'antd';
import { predictContext as headerContext } from '../../../assets/text/headerText/headerText';
import { ClassConfigContext } from '../../../contexts/ClassConfigContext';
import { ParamConfigContext } from '../../../contexts/ParamConfigContext';
import { calculateFeaturesOnCurrentFrame } from '../../../helpers/helpers';

const Predict = ({ model, graphModel, setGraphModel }) => {
    const { paramConfig } = useContext(ParamConfigContext);
    const { classConfig } = useContext(ClassConfigContext);
    const intervalRef = useRef(null);
    const webcamRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [predictionPercent, setPredictionPercent] = useState(0);
    const [predictionClass, setPredictClass] = useState('');
    const [importedModel, setImportedModel] = useState(null);
    const [importedClassConfig, setImportedClassConfig] = useState(null);

    useEffect(() => {
        if (importedModel && !graphModel) {
            initialGraphModel();
        }
    }, [importedModel]);

    useEffect(() => {
        return () => {
            setIsCameraOn(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        if (model || importedModel) {
            if (isCameraOn) {
                const id = setInterval(() => {
                    predictLoop();
                }, 100);
                intervalRef.current = id;
            } else {
                clearInterval(intervalRef.current);
            }
        }
    }, [isCameraOn]);

    const initialGraphModel = () => {
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
                console.log('Tensors in memory after graph loaded: ' + tf.memory().numTensors);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    /**
     *  Make live predictions from webcam once trained.
     **/
    const predictLoop = () => {
        // Get Video Properties
        if (isCameraOn) {
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            tf.tidy(function () {
                let imageFeatures = calculateFeaturesOnCurrentFrame(video, graphModel);
                let prediction;
                if (importedModel) {
                    prediction = importedModel.predict(imageFeatures.expandDims()).squeeze();
                } else {
                    prediction = model.predict(imageFeatures.expandDims()).squeeze();
                }
                let highestIndex = prediction.argMax().arraySync();
                let predictionArray = prediction.arraySync();

                setPredictionPercent(Math.floor(predictionArray[highestIndex] * 100));
                if (importedClassConfig) {
                    setPredictClass(importedClassConfig[highestIndex].label);
                } else {
                    setPredictClass(classConfig[highestIndex].label);
                }
                setPredictClass(classConfig[highestIndex].label);
                /*
                    const innerText =
                        'Prediction: ' +
                        classConfig[highestIndex].label +
                        ' with ' +
                        Math.floor(predictionArray[highestIndex] * 100) +
                        '% confidence';

                    console.log(innerText);
                */
            });
        }
    };

    return (
        <div className={styles.testModel}>
            <Space size="small" direction="vertical" className={styles.layout}>
                <div className={styles.sectionHeader}>
                    <SectionHeader
                        title={headerContext.title}
                        subTitle={headerContext.subTitle}
                        stepStatus={headerContext.stepStatus}
                    />
                </div>
            </Space>
            <DisplayWrapper
                isCameraOn={isCameraOn}
                setIsCameraOn={setIsCameraOn}
                webcamRef={webcamRef}
                predictionClass={predictionClass}
                predictionPercent={predictionPercent}
            />
            <Divider />
            <TabsForModel
                model={model}
                classConfig={classConfig}
                setImportedClassConfig={setImportedClassConfig}
                setImportedModel={setImportedModel}
            />
        </div>
    );
};

export default Predict;
