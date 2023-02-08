import React, { useState, useEffect, useRef } from 'react';
import DisplayImage from './DisplayImage/DisplayImage';
import { Typography, Button, Progress, Space } from 'antd';
import * as tf from '@tensorflow/tfjs';
import { CameraOutlined } from '@ant-design/icons';
import styles from './Predict.module.scss';
import SectionHeader from '../../common/SectionHeader/SectionHeader';

const Predict = ({ model, graphModel, classConfig }) => {
    const [isCameraOn, setIsCameraOn] = useState(false);
    const intervalRef = useRef(null);
    const webcamRef = useRef(null);
    const [predictionPercent, setPredictionPercent] = useState(0);
    const [predictionClass, setPredictClass] = useState('');
    const { Title } = Typography;

    useEffect(() => {
        return () => {
            setIsCameraOn(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        if (model) {
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

    function calculateFeaturesOnCurrentFrame(video) {
        return tf.tidy(function () {
            // Grab pixels from current VIDEO frame.
            let videoFrameAsTensor = tf.browser.fromPixels(video);
            // Resize video frame tensor to be 224 x 224 pixels which is needed by MobileNet for input.
            let resizedTensorFrame = tf.image.resizeBilinear(videoFrameAsTensor, [224, 224], true);

            let normalizedTensorFrame = resizedTensorFrame.div(255);

            return graphModel.predict(normalizedTensorFrame.expandDims()).squeeze();
        });
    }

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
                let imageFeatures = calculateFeaturesOnCurrentFrame(video);
                let prediction = model.predict(imageFeatures.expandDims()).squeeze();
                let highestIndex = prediction.argMax().arraySync();
                let predictionArray = prediction.arraySync();

                setPredictionPercent(Math.floor(predictionArray[highestIndex] * 100));
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
                        title="Start to Predict by Using Your Own Model"
                        subTitle="In this section you are able to test your trained model by providing an image through your webcam. Just click the button and your model will classify the image and show the result."
                    />
                </div>
                <div className={styles.displayWrapper}>
                    <Typography>
                        <Title className={styles.predictedClass} level={5}>
                            Camera
                        </Title>
                    </Typography>
                    <DisplayImage
                        isCameraOn={isCameraOn}
                        setIsCameraOn={setIsCameraOn}
                        webcamRef={webcamRef}
                    />
                    <Button onClick={() => setIsCameraOn(!isCameraOn)} icon={<CameraOutlined />}>
                        {isCameraOn ? 'Turn off' : 'Turn on'}
                    </Button>
                    {isCameraOn ? (
                        <div className={styles.predictWrapper}>
                            <Typography>
                                <Title className={styles.predictedClass} level={3}>
                                    {predictionClass || ''}
                                </Title>
                            </Typography>
                            <Progress
                                className={styles.predict}
                                percent={predictionPercent}
                                format={() => `${predictionPercent}%`}
                            />
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </Space>
        </div>
    );
};

export default Predict;
