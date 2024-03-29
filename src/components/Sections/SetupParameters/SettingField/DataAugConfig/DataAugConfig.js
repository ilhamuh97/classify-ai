import React, { useState } from 'react';
import Sketch from 'react-p5';
import { Form, Switch, Typography, Space, Button, Divider, Slider, Select } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import styles from './DataAugConfig.module.scss';

const DataAugConfig = ({ dataAugmentationConfig, dataAugmentationFormHandler, dataset }) => {
    const [clickedSeed, setClickedSeed] = useState(parseInt(Math.random() * 100000));
    const marks = {
        0: '0.0',
        0.2: '0.2',
        0.4: '0.4',
        0.6: '0.6',
        0.8: '0.8',
        1.0: '1.0'
    };

    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(265, 265).parent(canvasParentRef);
        p5.pixelDensity(1);
        //this will make placement and rotation easier because the anchor point is moved to the center of the image
        p5.imageMode(p5.CENTER);
        //By default, rotations are specified in radians
    };

    const draw = (p5) => {
        p5.randomSeed(clickedSeed);
        p5.background(0);
        let randomImgIndex = 0;
        randomImgIndex = parseInt(p5.random(0, dataset.length - 1));
        // load image
        const img = p5.createImage(
            dataset[randomImgIndex].data.width,
            dataset[randomImgIndex].data.height
        );
        if (!dataAugmentationConfig.isActive) {
            img.loadPixels();
            const arr = dataset[randomImgIndex].data.data;
            for (let y = 0; y < img.height; y++) {
                for (let x = 0; x < img.width; x++) {
                    let index = (x + y * img.width) * 4;

                    img.pixels[index + 0] = arr[index];
                    img.pixels[index + 1] = arr[index + 1];
                    img.pixels[index + 2] = arr[index + 2];
                    img.pixels[index + 3] = arr[index + 3];
                }
            }
            p5.translate(img.width / 2, img.height / 2);
            img.updatePixels();
            p5.image(img, 0, 0);
        } else {
            img.loadPixels();
            const arr = dataset[randomImgIndex].data.data;
            for (let y = 0; y < img.height; y++) {
                for (let x = 0; x < img.width; x++) {
                    let index = (x + y * img.width) * 4;
                    const rand = p5.random(0, 1);
                    if (rand < dataAugmentationConfig.noise) {
                        img.pixels[index + 0] = 0;
                        img.pixels[index + 1] = 0;
                        img.pixels[index + 2] = 0;
                        img.pixels[index + 3] = 255;
                    } else {
                        img.pixels[index + 0] = arr[index];
                        img.pixels[index + 1] = arr[index + 1];
                        img.pixels[index + 2] = arr[index + 2];
                        img.pixels[index + 3] = arr[index + 3];
                    }
                }
            }
            img.updatePixels();
            // Data augmentation

            // image translation
            let translationXRand = 0;
            let translationYRand = 0;
            if (dataAugmentationConfig.translationX) {
                translationXRand = p5.random(
                    -dataAugmentationConfig.translationX,
                    dataAugmentationConfig.translationX
                );
            }

            if (dataAugmentationConfig.translationY) {
                translationYRand = p5.random(
                    -dataAugmentationConfig.translationY,
                    dataAugmentationConfig.translationY
                );
            }
            const xTranslation = img.width * translationXRand;
            const yTranslation = img.height * translationYRand;
            p5.translate(img.width / 2 + xTranslation, img.height / 2 + yTranslation);

            // image rotation
            if (dataAugmentationConfig.rotation) {
                const rotationRand = p5.random(
                    -dataAugmentationConfig.rotation,
                    dataAugmentationConfig.rotation
                );
                p5.rotate(p5.PI * rotationRand);
            }

            //flip scale
            let flipX = 1;
            if (dataAugmentationConfig.flipX && 0.5 > p5.random(0, 1)) {
                flipX = -1;
            }
            let flipY = 1;
            if (dataAugmentationConfig.flipY && 0.5 > p5.random(0, 1)) {
                flipY = -1;
            }

            //scale
            let scaleXRand = 0;
            let scaleYRand = 0;
            if (dataAugmentationConfig.scale) {
                scaleXRand = p5.random(dataAugmentationConfig.scale, -dataAugmentationConfig.scale);
                scaleYRand = p5.random(dataAugmentationConfig.scale, -dataAugmentationConfig.scale);
            }

            const scaleX = scaleXRand * flipX;
            const scaleY = scaleYRand * flipY;
            p5.scale(1 * flipX + scaleX, 1 * flipY + scaleY);
            p5.image(img, 0, 0);
        }
    };

    return (
        <Space direction="vertical" className={styles.dataAugConfig}>
            <Form
                labelCol={{
                    sm: { span: 8 }
                }}
                wrapperCol={{
                    sm: { span: 10 }
                }}
                layout="horizontal"
                initialValues={dataAugmentationConfig}
                onValuesChange={dataAugmentationFormHandler}>
                <Form.Item
                    name="isActive"
                    label="Data augmentation"
                    valuePropName="checked"
                    tooltip={{
                        color: '#000000',
                        title: 'By augmenting data, you can create a diverse range of images in your dataset, reducing the risk of overfitting the model. Please add at least one image in your dataset to enable this input.'
                    }}>
                    <Switch disabled={dataset.length === 0} />
                </Form.Item>
                {dataAugmentationConfig.isActive ? (
                    <>
                        <Form.Item name="copyNumb" label="Copy number">
                            <Select
                                placeholder="Please select the Optimizer"
                                options={[
                                    {
                                        value: 1,
                                        label: '1'
                                    },
                                    {
                                        value: 2,
                                        label: '2'
                                    },
                                    {
                                        value: 3,
                                        label: '3'
                                    },
                                    {
                                        value: 4,
                                        label: '4'
                                    },
                                    {
                                        value: 5,
                                        label: '5'
                                    },
                                    {
                                        value: 6,
                                        label: '6'
                                    },
                                    {
                                        value: 7,
                                        label: '7'
                                    },
                                    {
                                        value: 8,
                                        label: '8'
                                    },
                                    {
                                        value: 9,
                                        label: '9'
                                    },
                                    {
                                        value: 10,
                                        label: '10'
                                    }
                                ]}
                            />
                        </Form.Item>
                        <Form.Item name="noise" label="Noise">
                            <Slider min={0} max={1} step={0.01} marks={marks} />
                        </Form.Item>
                        <Form.Item name="translationX" label="Horizontal translation">
                            <Slider min={0} max={1} step={0.01} marks={marks} />
                        </Form.Item>
                        <Form.Item name="translationY" label="Vertical translation">
                            <Slider min={0} max={1} step={0.01} marks={marks} />
                        </Form.Item>
                        <Form.Item name="rotation" label="Rotation">
                            <Slider min={0} max={1} step={0.01} marks={marks} />
                        </Form.Item>
                        <Form.Item name="flipX" label="Horizontal flip" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                        <Form.Item name="flipY" label="Vertical flip" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                        <Form.Item name="scale" label="Scale">
                            <Slider min={0} max={1} step={0.01} marks={marks} />
                        </Form.Item>
                    </>
                ) : null}
            </Form>
            {dataAugmentationConfig.isActive ? <Divider /> : null}
            {dataAugmentationConfig.isActive ? (
                <Space align="center" direction="vertical" className={styles.displaySection}>
                    <Typography>
                        <Space align="center" direction="vertical">
                            <Typography.Title level={4}>Display Image</Typography.Title>
                            <Typography.Paragraph>
                                The display below shows an augmented image. To view another randomly
                                generated image from your dataset, click the &quot;Generate
                                Image&quot; button.
                            </Typography.Paragraph>
                        </Space>
                    </Typography>
                    <Sketch setup={setup} draw={draw} />
                    <Button
                        onClick={() => setClickedSeed(parseInt(Math.random() * 100000))}
                        icon={<ReloadOutlined />}>
                        Generate Image
                    </Button>
                </Space>
            ) : null}
        </Space>
    );
};

export default DataAugConfig;
