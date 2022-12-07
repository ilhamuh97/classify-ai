import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Typography } from 'antd';
import { Select } from 'antd';
import styles from './SettingField.module.scss';

const SetupParameters = ({
    graphModel,
    setGraphModel,
    setModel,
    model,
    classesLength,
    paramConfig,
    setParamConfig
}) => {
    const { Title } = Typography;
    const [isLoading, setIsloading] = useState(false);
    const [optimizer, setOptimizer] = useState(paramConfig.optimizer);
    const [urlModel, setUrlModel] = useState(paramConfig.modelURL);

    useEffect(() => {
        setParamConfig({
            modelURL: urlModel,
            optimizer: optimizer
        });
    }, [urlModel, optimizer]);

    useEffect(() => {
        tf.disposeVariables();
        !graphModel ? initialGraphModel() : null;
        !model ? initialModel() : null;
    }, []);

    const initialGraphModel = (value) => {
        const loadMobileNetFeatureModel = async () => {
            setIsloading(true);
            const URL = value || urlModel;
            const mobilenet = await tf.loadGraphModel(URL, { fromTFHub: true });
            // Warm up the model by passing zeros through it once.
            return mobilenet;
        };

        loadMobileNetFeatureModel()
            .then((result) => {
                setGraphModel(result);
                console.log('Tensors in memory after graph loaded: ' + tf.memory().numTensors);
                setIsloading(false);
            })
            .catch((e) => {
                console.log(e);
                setIsloading(false);
            });
    };

    const initialModel = (value = null) => {
        tf.disposeVariables();
        const modelConfig = {
            optimizer: value || 'adam',
            loss: classesLength === 2 ? 'binaryCrossentropy' : 'categoricalCrossentropy',
            metrics: ['accuracy']
        };
        const currModel = tf.sequential();
        currModel.add(tf.layers.dense({ inputShape: [1024], units: 128, activation: 'relu' }));
        currModel.add(tf.layers.dense({ units: 2, activation: 'softmax' }));
        currModel.summary();
        currModel.compile(modelConfig);
        setModel(currModel);
        console.log('Tensors in memory after model loaded: ' + tf.memory().numTensors);
    };

    const handleChangeModelConfig = (value) => {
        model.dispose();
        setOptimizer(value);
        initialModel(value);
    };

    const handleChange = (value) => {
        graphModel.dispose();
        setUrlModel(value);
        initialGraphModel(value);
    };

    return (
        <div className={styles.settingField}>
            <Title level={2}>Setup Model</Title>
            <div className={styles.formField}>
                <div className={styles.inputWrapper}>
                    <label>Model:</label>
                    <Select
                        className={styles.input}
                        placeholder="Please select the Model"
                        onChange={handleChange}
                        loading={isLoading}
                        defaultValue={paramConfig.modelURL}
                        options={[
                            {
                                value: 'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1',
                                label: 'mobilenet v3 small 100 224'
                            },
                            {
                                value: 'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_130_224/feature_vector/1/default/1',
                                label: 'mobilenet v2 small 130 224'
                            }
                        ]}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label>Optimizer:</label>
                    <Select
                        className={styles.input}
                        onChange={handleChangeModelConfig}
                        placeholder="Please select the Optimizer"
                        defaultValue={paramConfig.optimizer}
                        options={[
                            {
                                value: 'adam',
                                label: 'Adam'
                            },
                            {
                                value: 'sgd',
                                label: 'SGD'
                            }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default SetupParameters;
