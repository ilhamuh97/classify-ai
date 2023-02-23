export const dataAugmentationConfigValue = {
    isActive: false,
    copyNumb: 1,
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

export const predictConfigValue = {
    useImportedModel: true,
    inputDimension: 224,
    graphModelName: null
};

export const inputDimensionOptions = [
    { value: 96, label: '96' },
    { value: 160, label: '160' },
    { value: 192, label: '192' },
    { value: 224, label: '224' }
];

export const graphModelOptions = [
    {
        value: JSON.stringify({
            inputShape: 1024,
            URL: 'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_075_224/feature_vector/5/default/1'
        }),
        label: 'mobilenet small 075 224'
    },
    {
        value: JSON.stringify({
            inputShape: 1024,
            URL: 'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1'
        }),
        label: 'mobilenet small 100 224'
    },
    {
        value: JSON.stringify({
            inputShape: 1280,
            URL: 'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_large_075_224/feature_vector/5/default/1'
        }),
        label: 'mobilenet large 075 224'
    },
    {
        value: JSON.stringify({
            inputShape: 1280,
            URL: 'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_large_100_224/feature_vector/5/default/1'
        }),
        label: 'mobilenet large 100 224'
    },
    {
        value: JSON.stringify({
            inputShape: 2048,
            URL: 'https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/feature_vector/3/default/1'
        }),
        label: 'inception'
    },
    {
        value: JSON.stringify({
            inputShape: 2048,
            URL: 'https://tfhub.dev/google/tfjs-model/inaturalist/inception_v3/feature_vector/3/default/1'
        }),
        label: 'inception (from iNaturalist dataset)'
    }
];

export const optimizerOptions = [
    {
        value: 'adam',
        label: 'Adam'
    },
    {
        value: 'sgd',
        label: 'SGD'
    }
];
