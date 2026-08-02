import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import DisplayWrapper from './DisplayWrapper/DisplayWrapper';
import * as tf from '@tensorflow/tfjs';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import TabsForModel from './TabsForModel/TabsForModel';
import { Separator } from '@/components/ui/separator';
import { predictContext as headerContext } from '../../../assets/text/headerText/headerText';
import { ClassConfigContext } from '@/contexts/ClassConfigContext.ts';
import { ParamConfigContext } from '@/contexts/ParamConfigContext.ts';
import { calculateFeaturesOnCurrentFrame } from '@/helpers/helpers.ts';
import { ClassConfigItem } from '@/types.ts';

interface PredictProps {
    model: tf.LayersModel | null;
    graphModel: tf.GraphModel | null;
    setGraphModel: Dispatch<SetStateAction<tf.GraphModel | null>>;
}

const Predict = ({ model, graphModel, setGraphModel }: PredictProps) => {
    const { paramConfig } = useContext(ParamConfigContext);
    const { classConfig } = useContext(ClassConfigContext);
    const intervalRef = useRef<number | undefined>(undefined);
    const webcamRef = useRef<Webcam>(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [predictionPercent, setPredictionPercent] = useState(0);
    const [predictionClass, setPredictClass] = useState('');
    const [importedModel, setImportedModel] = useState<tf.LayersModel | null>(null);
    const [importedClassConfig, setImportedClassConfig] = useState<ClassConfigItem[] | null>(null);

    useEffect(() => {
        if (importedModel && !graphModel) {
            initialGraphModel();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                intervalRef.current = window.setInterval(() => {
                    predictLoop();
                }, 100);
            } else {
                clearInterval(intervalRef.current);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCameraOn]);

    const initialGraphModel = () => {
        const loadMobileNetFeatureModel = async () => {
            const model = paramConfig.model;
            const URL = JSON.parse(model).URL;

            // Warm up the model by passing zeros through it once.
            return await tf.loadGraphModel(URL, { fromTFHub: true });
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
            const video = webcamRef.current?.video;
            if (!video) return;
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            // Set video width
            video.width = videoWidth;
            video.height = videoHeight;

            tf.tidy(function () {
                const imageFeatures = calculateFeaturesOnCurrentFrame(video, graphModel!);
                let prediction: tf.Tensor;
                if (importedModel) {
                    prediction = importedModel.predict(imageFeatures.expandDims()) as tf.Tensor;
                } else {
                    prediction = model!.predict(imageFeatures.expandDims()) as tf.Tensor;
                }
                prediction = prediction.squeeze();
                const highestIndex = prediction.argMax().arraySync() as number;
                const predictionArray = prediction.arraySync() as number[];

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
        <div className="grid gap-8">
            <SectionHeader
                title={headerContext.title}
                subTitle={headerContext.subTitle}
                stepStatus={headerContext.stepStatus}
            />
            <DisplayWrapper
                isCameraOn={isCameraOn}
                setIsCameraOn={setIsCameraOn}
                webcamRef={webcamRef}
                predictionClass={predictionClass}
                predictionPercent={predictionPercent}
            />
            <Separator />
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
