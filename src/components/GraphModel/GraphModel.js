import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

const GraphModel = ({ graphModel, setGraphModel, setModel, model }) => {
    const [isLoading, setIsloading] = useState(false);
    const [urlModel, setUrlModel] = useState(
        'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1'
    );

    const classesLength = 2;

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

    const handleChangeModelConfig = (e) => {
        model.dispose();
        initialModel(e.target.value);
    };

    const handleChange = (e) => {
        graphModel.dispose();
        setUrlModel(e.target.value);
        initialGraphModel(e.target.value);
    };

    return (
        <div>
            <h1>Setup Model</h1>
            <select onChange={(e) => handleChange(e)}>
                <option
                    value="https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1"
                    selected
                >
                    mobilenet v3 small 100 224
                </option>
                <option value="https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_130_224/feature_vector/1/default/1">
                    mobilenet v2 small 130 224
                </option>
            </select>
            {!isLoading ? <p>Model is Loaded</p> : <p>loading...</p>}
            <label>Optimizer: </label>
            <select onChange={(e) => handleChangeModelConfig(e)}>
                <option value="adam">Adam</option>
                <option value="sgd" selected>
                    SGD
                </option>
            </select>
        </div>
    );
};

export default GraphModel;
