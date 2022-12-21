import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Typography, Divider, Button, Upload, Space, Alert, Row, Col } from 'antd';
import {
    CameraOutlined,
    CloseOutlined,
    UploadOutlined,
    PauseCircleOutlined
} from '@ant-design/icons';
import styles from './Class.module.scss';

const Class = ({ config, dataset, setDataset, classConfig, setClassConfig }) => {
    const { Title, Paragraph } = Typography;
    const [editableTitle, setEditableTitle] = useState(config.label);
    const [isRecord, setIsRecord] = useState(false);
    const [showError, setShowError] = useState(false);
    const intervalRef = useRef(null);
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const filteredDataset = dataset.filter((ds) => ds.key == config.key);
    const capture = (imgData) => {
        const imageSrc = webcamRef.current.getScreenshot();
        setDataset((current) => [
            ...current,
            {
                key: config.key,
                img: imageSrc,
                data: imgData
            }
        ]);
    };

    const videoConstraints = {
        video: true,
        width: 265,
        height: 265,
        facingMode: 'user'
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        const newState = classConfig.map((c) => {
            if (c.key === config.key) {
                return { ...config, label: editableTitle };
            }
            return c;
        });
        setClassConfig(newState);
    }, [editableTitle]);

    const recordButtonOnClick = () => {
        const newRecordStatus = !isRecord;
        setIsRecord(newRecordStatus);
        if (
            newRecordStatus === true &&
            typeof webcamRef.current !== 'undefined' &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            const video = webcamRef.current.video;

            const ctx = canvasRef.current.getContext('2d');
            ctx.drawImage(video, 0, 0, 265, 265);
            const imageData = ctx.getImageData(0, 0, 265, 265);

            const id = setInterval(() => {
                capture(imageData);
            }, 100);
            intervalRef.current = id;
        } else {
            clearInterval(intervalRef.current);
        }
    };

    const turnOffCamera = () => {
        const newState = classConfig.map((c) => {
            if (c.key === config.key) return { ...c, cameraState: false };
            return c;
        });
        setClassConfig(newState);
    };

    const turnOnCamera = () => {
        const newState = classConfig.map((c) => {
            if (c.key === config.key) return { ...c, cameraState: true };
            if (c.key !== config.key) return { ...c, cameraState: false };
            return c;
        });
        setClassConfig(newState);
    };

    return (
        <div className={styles.class}>
            <Typography>
                <Title
                    className={styles.className}
                    editable={{
                        tooltip: 'click to edit text',
                        onChange: setEditableTitle
                    }}
                    level={3}>
                    {editableTitle}
                </Title>
            </Typography>
            <Divider />
            <Typography>
                <Title level={4}>Add your samples here</Title>
            </Typography>
            {config.cameraState ? (
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
                            <Title level={5}>Webcam</Title>
                        </Typography>
                        {!showError ? (
                            <>
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
                            </>
                        ) : null}

                        {!showError ? (
                            <Button
                                onClick={() => recordButtonOnClick()}
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
            ) : (
                <Space>
                    <Button onClick={turnOnCamera} type="primary">
                        Turn On Camera
                    </Button>
                    <Upload directory disabled>
                        <Button icon={<UploadOutlined />} disabled>
                            Upload Directory
                        </Button>
                    </Upload>
                </Space>
            )}
            <Divider />
            <div className={styles.samplesSection}>
                <Typography>
                    <Title level={4}>
                        Your samples {filteredDataset.length ? `(${filteredDataset.length})` : ''}
                    </Title>
                </Typography>
                {dataset.length !== 0 ? (
                    <Row gutter={[4, 8]} className={styles.samples}>
                        {filteredDataset.map((fds, i) => {
                            return (
                                <Col key={i} className="gutter-row" span={6}>
                                    <img src={fds.img} width={65} height={55} />
                                </Col>
                            );
                        })}
                    </Row>
                ) : (
                    <Typography>
                        <Paragraph>No samples</Paragraph>
                    </Typography>
                )}
            </div>
        </div>
    );
};

export default Class;
