import * as tf from '@tensorflow/tfjs';
import { SplitDataset } from '../types';

export const shuffleCombo = <T, U>(array: T[], array2: U[] = []) => {
    if (array2.length != 0) {
        if (array.length !== array2.length) {
            throw new Error(
                `Array sizes must match to be shuffled together ` +
                    `First array length was ${array.length}` +
                    `Second array length was ${array2.length}`
            );
        }
    }

    const swap = <V>(object: V[], left: number, right: number) => {
        const temp = object[left];
        object[left] = object[right];
        object[right] = temp;
    };

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
};

export const splitDataset = <T>(input: T[], ratio: number): SplitDataset<T> => {
    const splitter = Math.ceil(input.length * ratio);
    const trainingDataset = input.slice(0, splitter);
    const validationDataset = input.slice(splitter);
    return {
        training: trainingDataset,
        validation: validationDataset
    };
};

export const calculateFeaturesOnCurrentFrame = (
    img: ImageData | HTMLVideoElement,
    graphModel: tf.GraphModel
): tf.Tensor => {
    return tf.tidy(function () {
        // Grab pixels from current VIDEO frame.
        const imageAsTensor = tf.browser.fromPixels(img);
        // Resize video frame tensor to be 224 x 224 pixels which is needed by MobileNet for input.
        const resizedTensorFrame = tf.image.resizeBilinear(imageAsTensor, [224, 224], true);

        const normalizedTensorFrame = resizedTensorFrame.div(255);
        const prediction = graphModel.predict(normalizedTensorFrame.expandDims()) as tf.Tensor;
        return prediction.squeeze();
    });
};
