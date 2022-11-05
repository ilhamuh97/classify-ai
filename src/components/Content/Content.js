import React, { useEffect, useState } from 'react';
import MainCanvas2 from '../MainCanvas/MainCanvas2';
import GraphModel from '../GraphModel/GraphModel';
import { captures } from '../MainCanvas/sketch';
import Button from '../common/Button/Button';
import * as tf from '@tensorflow/tfjs';
//import SimpleCanvas from '../MainCanvas/SimpleCanvas';

const Content = () => {
    const [graphModel, setGraphModel] = useState(null);
    const [model, setModel] = useState(null);
    let trainingDataInputs = [];
    let trainingDataOutputs = [];
    console.log(captures.length);
    let predict;

    useEffect(() => {
        if (model) {
            model.summary();
        }
    }, [graphModel]);

    useEffect(() => {
        if (model) {
            model.summary();
        }
    }, [model]);

    function calculateFeaturesOnCurrentFrame(img) {
        return tf.tidy(function () {
            // Grab pixels from current VIDEO frame.
            let videoFrameAsTensor = tf.browser.fromPixels(img);
            // Resize video frame tensor to be 224 x 224 pixels which is needed by MobileNet for input.
            let resizedTensorFrame = tf.image.resizeBilinear(videoFrameAsTensor, [224, 224], true);

            let normalizedTensorFrame = resizedTensorFrame.div(255);
            return graphModel.predict(normalizedTensorFrame.expandDims()).squeeze();
        });
    }

    const trainClicked = () => {
        captures.map((c) => {
            let imageFeatures = calculateFeaturesOnCurrentFrame(c.image);
            console.log(imageFeatures);
            trainingDataInputs.push(imageFeatures);
            trainingDataOutputs.push(c.id);
        });
    };

    /**
     * Log training progress.
     **/
    function logProgress(epoch, logs) {
        console.log('Data for epoch ' + epoch, logs);
    }

    async function trainAndPredict() {
        predict = false;
        shuffleCombo(trainingDataInputs, trainingDataOutputs);
        let outputsAsTensor = tf.tensor1d(trainingDataOutputs, 'int32');
        let oneHotOutputs = tf.oneHot(outputsAsTensor, 2);
        let inputsAsTensor = tf.stack(trainingDataInputs);

        await model.fit(inputsAsTensor, oneHotOutputs, {
            shuffle: true,
            batchSize: 5,
            epochs: 20,
            callbacks: { onEpochEnd: logProgress }
        });

        outputsAsTensor.dispose();
        oneHotOutputs.dispose();
        inputsAsTensor.dispose();

        predict = true;
        predictLoop();
    }

    function swap(object, left, right) {
        const temp = object[left];
        object[left] = object[right];
        object[right] = temp;
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

    /**
     *  Make live predictions from webcam once trained.
     **/
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

    return (
        <div>
            <MainCanvas2 id={0} label="class1" />

            <GraphModel
                graphModel={graphModel}
                setGraphModel={setGraphModel}
                model={model}
                setModel={setModel}
            />
            <Button onClick={() => trainClicked()}>Save images</Button>
            <Button onClick={() => trainAndPredict()}>Train</Button>
        </div>
    );
};

export default Content;
