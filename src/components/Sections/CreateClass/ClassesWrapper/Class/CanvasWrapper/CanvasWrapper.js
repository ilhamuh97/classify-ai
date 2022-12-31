import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { MdOutlineCameraswitch } from 'react-icons/md';
import { Typography, Button, Alert } from 'antd';
import { CameraOutlined, CloseOutlined, PauseCircleOutlined } from '@ant-design/icons';
import styles from './CanvasWrapper.module.scss';

const CanvasWrapper = ({ turnOffCamera, webcamRef, recordButtonOnClick, isRecord, canvasRef }) => {
    const [showError, setShowError] = useState(false);
    const [videoConstraints, setVideoConstraints] = useState({
        video: true,
        width: 265,
        height: 265,
        facingMode: 'environment'
    });

    const flipCamera = () => {
        if (videoConstraints.facingMode === 'environment') {
            setVideoConstraints({ ...videoConstraints, facingMode: 'user' });
        } else {
            setVideoConstraints({ ...videoConstraints, facingMode: 'environment' });
        }
    };

    return (
        <div className={styles.canvasWrapper}>
            <div className={styles.camera}>
                <Button
                    className={styles.turnOffButton}
                    onClick={turnOffCamera}
                    size="small"
                    type="primary"
                    ghost
                    shape="circle"
                    icon={<CloseOutlined />}
                />
                <Typography>
                    <Typography.Title level={5}>Webcam</Typography.Title>
                </Typography>
                {!showError ? (
                    <div className={styles.displayImageField}>
                        <Webcam
                            audio={false}
                            height={265}
                            ref={webcamRef}
                            width={265}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            screenshotQuality={0.8}
                            onUserMediaError={() => setShowError(true)}
                        />
                        <canvas
                            ref={canvasRef}
                            style={{
                                display: 'none'
                            }}
                        />
                        <MdOutlineCameraswitch onClick={flipCamera} className={styles.flipButton} />
                    </div>
                ) : null}
                {!showError ? (
                    <Button
                        onClick={recordButtonOnClick}
                        type={`${isRecord ? 'danger' : 'primary'}`}
                        icon={isRecord ? <PauseCircleOutlined /> : <CameraOutlined />}>
                        {isRecord ? 'Stop the record' : 'Click to Record'}
                    </Button>
                ) : (
                    <Alert
                        message="Webcam permission denied. Please enable permission to your webcam"
                        type="error"
                        showIcon
                    />
                )}
            </div>
        </div>
    );
};

export default CanvasWrapper;