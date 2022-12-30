import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { MdOutlineCameraswitch } from 'react-icons/md';
import { Alert } from 'antd';
import styles from './DisplayImage.module.scss';

const DisplayImage = ({ isCameraOn, webcamRef }) => {
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
        <div className={styles.displayImage}>
            {isCameraOn ? (
                !showError ? (
                    <>
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            videoConstraints={videoConstraints}
                            onUserMedia={() => setShowError(false)}
                            onUserMediaError={() => setShowError(true)}
                        />
                        <MdOutlineCameraswitch
                            onClick={() => flipCamera()}
                            className={styles.flipButton}
                        />
                    </>
                ) : (
                    <Alert
                        message="Webcam permission denied. Please enable permission to your webcam"
                        type="error"
                        showIcon
                    />
                )
            ) : null}
        </div>
    );
};

export default DisplayImage;
