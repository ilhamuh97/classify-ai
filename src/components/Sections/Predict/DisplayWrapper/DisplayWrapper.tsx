import { Dispatch, RefObject, SetStateAction } from 'react';
import Webcam from 'react-webcam';
import DisplayImage from './DisplayImage/DisplayImage';
import { Typography, Button, Progress } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import styles from './DisplayWrapper.module.scss';

interface DisplayWrapperProps {
    isCameraOn: boolean;
    setIsCameraOn: Dispatch<SetStateAction<boolean>>;
    webcamRef: RefObject<Webcam | null>;
    predictionClass: string;
    predictionPercent: number;
}

const DisplayWrapper = ({
    isCameraOn,
    setIsCameraOn,
    webcamRef,
    predictionClass,
    predictionPercent
}: DisplayWrapperProps) => {
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
