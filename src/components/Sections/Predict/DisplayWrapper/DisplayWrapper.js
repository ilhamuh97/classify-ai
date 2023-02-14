import React from 'react';
import DisplayImage from './DisplayImage/DisplayImage';
import { Typography, Button, Progress } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import styles from './DisplayWrapper.module.scss';

const DisplayWrapper = ({
    isCameraOn,
    setIsCameraOn,
    webcamRef,
    predictionClass,
    predictionPercent
}) => {
    const { Title } = Typography;
    return (
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
    );
};

export default DisplayWrapper;
