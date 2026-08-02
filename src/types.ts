export interface ClassConfigItem {
    key: number;
    label: string;
    cameraState: boolean;
}

export interface DatasetItem {
    key: number;
    img: string;
    data: ImageData;
}

export interface AugmentedDatasetItem {
    key: number;
    url: string;
    data: ImageData;
}

export interface CroppedImage {
    src: string;
    imgData: ImageData;
}

export interface ParamConfig {
    model: string;
    optimizer: string;
    learningRate: number;
    epochs: number;
    batchSize: number;
}

export interface DataAugmentationConfig {
    isActive: boolean;
    copyNumb: number;
    noise: number;
    translationX: number;
    translationY: number;
    rotation: number;
    flipX: boolean;
    flipY: boolean;
    scale: number;
}

export interface SelectOption<T> {
    value: T;
    label: string;
}

export interface LossAndAccuracy {
    acc: number;
    loss: number;
    val_acc: number;
    val_loss: number;
}

export interface LogEntry {
    epoch: number;
    lossAndAccuracy: LossAndAccuracy;
}

export interface TrainingReport {
    logs: LogEntry[];
    classConfig: ClassConfigItem[];
    confusionMatrix: number[][];
}

export interface SplitDataset<T> {
    training: T[];
    validation: T[];
}

export type TrainState =
    | ''
    | 'SET_GRAPH_MODEL'
    | 'SET_MODEL'
    | 'SET_AUGMENTED_DATA'
    | 'SET_DATA'
    | 'TRAIN_AND_PREDICT'
    | 'DONE';
