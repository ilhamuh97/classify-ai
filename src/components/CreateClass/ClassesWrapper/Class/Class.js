import React, { useEffect, useState } from 'react';
import Sketch from 'react-p5';
import {
    CameraOutlined,
    CloseOutlined,
    UploadOutlined,
    PauseCircleOutlined
} from '@ant-design/icons';
import { Typography, Divider, Button, Upload, Space, Alert } from 'antd';
import styles from './Class.module.scss';

const Class = ({ config, dataset, setDataset, classConfig, setClassConfig }) => {
    const { Title, Paragraph } = Typography;
    // Content Related States
    const [showError, setShowError] = useState(false);
    const [editableTitle, setEditableTitle] = useState(config.label);
    const [capture, setCapture] = useState(null);
    const [stream, setStream] = useState(null);
    const [isRecord, setIsRecord] = useState(null);
    const filteredDataset = dataset.filter((ds) => ds.key == config.key);
    // Data Related States
    //const [imageSamples, setImageSamples] = useState(dataset);
    // Todo: Data states

    useEffect(() => {
        const newState = classConfig.map((c) => {
            if (c.key === config.key) {
                return { ...config, label: editableTitle };
            }
            return c;
        });
        setClassConfig(newState);
    }, [editableTitle]);

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(265, 265).parent(canvasParentRef);
        let fr = 10; //starting FPS
        p5.frameRate(fr);
        const c = p5.createCapture(p5.VIDEO, (mediaStream) => {
            setShowError(false);
            if (mediaStream) {
                setStream(mediaStream);
            }
        });
        c.hide();
        c.size(500, 400);
        setCapture(c);
    };

    const draw = (p5) => {
        if (config.cameraState) {
            if (!showError) {
                //move image by the width of image to the left
                p5.translate(p5.width, 0);
                //then scale it by -1 in the x-axis
                //to flip the image
                p5.scale(-1, 1);
                p5.image(
                    capture,
                    0,
                    0,
                    p5.width,
                    ((5 / 4) * (p5.height * capture.height)) / capture.width
                );
                if (isRecord) {
                    const getCanvas = p5.get();
                    setDataset((current) => [
                        ...current,
                        {
                            key: config.key,
                            img: getCanvas.canvas.toDataURL()
                        }
                    ]);
                }
            } else {
                p5.background(0);
            }
        }
    };

    const turnOffCamera = () => {
        const newState = classConfig.map((c) => {
            if (c.key === config.key) return { ...c, cameraState: false };
            return c;
        });
        setClassConfig(newState);

        setShowError(false);
        setIsRecord(false);
        if (stream) {
            stopStreamTracks();
            setStream(null);
        }
    };

    const stopStreamTracks = () => {
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
            track.stop();
        });
    };

    const turnOnCamera = () => {
        const newState = classConfig.map((c) => {
            if (c.key === config.key) return { ...c, cameraState: true };
            if (c.key !== config.key) return { ...c, cameraState: false };
            return c;
        });
        setClassConfig(newState);

        if (!stream) {
            setShowError(true);
        }
    };

    const recordButtonOnClick = () => {
        setIsRecord(!isRecord);
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
                        <Sketch className={styles.canvas} setup={setup} draw={draw} />

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
                    <Space wrap className={styles.samples}>
                        {filteredDataset.map((fds, i) => {
                            return <img key={i} src={fds.img} width={60} height={50} />;
                        })}
                    </Space>
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
