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
        facingMode: 'user'
    });

    const flipCamera = () => {
        if (videoConstraints.facingMode === 'user') {
            setVideoConstraints({ ...videoConstraints, facingMode: 'environment' });
        } else {
            setVideoConstraints({ ...videoConstraints, facingMode: 'user' });
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
