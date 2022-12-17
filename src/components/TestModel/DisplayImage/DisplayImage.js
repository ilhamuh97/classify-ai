import React from 'react';
import Webcam from 'react-webcam';
import styles from './DisplayImage.module.scss';

const DisplayImage = ({ isCameraOn, webcamRef }) => {
    const constraints = {
        video: true,
        width: 640,
        height: 480
    };

    return (
        <div className={styles.displayImage}>
            {isCameraOn ? (
                <Webcam ref={webcamRef} audio={false} videoConstraints={constraints} />
            ) : null}
        </div>
    );
};

export default DisplayImage;
