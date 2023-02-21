export const dataAugmentationConfigValue = {
    isActive: false,
    noise: 0.0,
    translationX: 0.0,
    translationY: 0.0,
    rotation: 0.0,
    flipX: false,
    flipY: false,
    scale: 0.0
};

export const classConfigValue = [
    {
        key: 0,
        label: 'Class 1',
        cameraState: false
    },
    {
        key: 1,
        label: 'Class 2',
        cameraState: false
    }
];

export const paramConfigValue = {
    model: JSON.stringify({
        inputShape: 1024,
        URL: 'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1'
    }),
    optimizer: 'adam',
    learningRate: 0.001,
    epochs: 10,
    batchSize: 4
};
