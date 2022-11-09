import React, { useState } from 'react';
import Sketch from 'react-p5';
import { CameraOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { Typography, Divider, Button, Upload } from 'antd';
import styles from './Class.module.scss';

const Class = () => {
    const { Title, Paragraph } = Typography;

    // Content Related States
    const [on, setOn] = useState(false);
    const [editableTitle, setEditableTitle] = useState('Class 1');
    const [capture, setCapture] = useState(null);
    const [stream, setStream] = useState(null);

    // Data Related States
    // Todo: Data states

    const setup = (p5, canvasParentRef) => {
        const canvas = p5.createCanvas(265, 265).parent(canvasParentRef);
        const c = p5.createCapture(p5.VIDEO, (mediaStream) => {
            setStream(mediaStream);
            console.log('Camera Turned On!', mediaStream);
        });
        c.hide();
        c.size(500, 400);
        setCapture(c);
        canvas.mousePressed((event) => {
            console.log('Clicked on the canvas. Event:', event);
        });
    };

    const draw = (p5) => {
        p5.background(255);
        if (on) {
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
        }
    };

    const turnOffCamera = () => {
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
            track.stop();
        });
        console.log(tracks);
        setOn(false);
    };

    const turnOnCamera = () => {
        setOn(true);
    };

    return (
        <div className={styles.class}>
            <Typography>
                <Title
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
            {on ? (
                <div className={styles.canvasWrapper}>
                    <div className={styles.camera}>
                        <Button
                            className={styles.turnOffButton}
                            onClick={turnOffCamera}
                            size="small"
                            type="primary"
                            ghost
                            icon={<CloseOutlined />}
                        />
                        <Typography>
                            <Title level={5}>Webcam</Title>
                        </Typography>
                        <Sketch className={styles.canvas} setup={setup} draw={draw} />
                        <Button type="primary" icon={<CameraOutlined />} size={'large'}>
                            Hold to Record
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                    <Button onClick={turnOnCamera} type="primary" size={'large'}>
                        Turn On Camera
                    </Button>
                    <Divider type="vertical" />
                    <Upload directory disabled>
                        <Button size={'large'} icon={<UploadOutlined />} disabled>
                            Upload Directory
                        </Button>
                    </Upload>
                </>
            )}
            <Divider />
            <div className={styles.samples}>
                <Typography>
                    <Title level={4}>Your samples</Title>
                </Typography>
                <Typography>
                    <Paragraph>No samples</Paragraph>
                </Typography>
            </div>
        </div>
    );
};

export default Class;
