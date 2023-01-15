import React from 'react';
import Sketch from 'react-p5';
import { Form, Switch, InputNumber, Typography, Space } from 'antd';

const DataAugConfig = ({
    dataAugmentationConfig,
    setDataAugmentationConfig,
    dataAugmentationFormHandler,
    dataset
}) => {
    console.log(dataAugmentationConfig, setDataAugmentationConfig);
    console.log(dataset[0].data);
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
        p5.background(0);
        // load image
        let img = p5.createImage(dataset[0].data.width, dataset[0].data.height);
        if (!dataAugmentationConfig.isActive) {
            img.loadPixels();
            const arr = dataset[0].data.data;
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
            const arr = dataset[0].data.data;
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
            const translationXRand = p5.random(
                -dataAugmentationConfig.translationX,
                dataAugmentationConfig.translationX
            );
            const translationYRand = p5.random(
                -dataAugmentationConfig.translationY,
                dataAugmentationConfig.translationY
            );
            const xTranslation = img.width * translationXRand;
            const yTranslation = img.height * translationYRand;
            p5.translate(img.width / 2 + xTranslation, img.height / 2 + yTranslation);

            // image rotation
            const rotationRand = p5.random(
                -dataAugmentationConfig.rotateLeft,
                dataAugmentationConfig.rotateRight
            );
            p5.rotate(p5.PI * rotationRand);

            //flip and scale
            let flipX = 1;
            if (dataAugmentationConfig.flipX && 0.5 > p5.random(0, 1)) {
                flipX = -1;
            }
            let flipY = 1;
            if (dataAugmentationConfig.flipY && 0.5 > p5.random(0, 1)) {
                flipY = -1;
            }
            const scaleXRand = p5.random(
                dataAugmentationConfig.scaleX,
                dataAugmentationConfig.scaleX
            );
            const scaleYRand = p5.random(
                dataAugmentationConfig.scaleY,
                dataAugmentationConfig.scaleY
            );
            const scaleX = scaleXRand * flipX * 0;
            const scaleY = scaleYRand * flipY * 0;
            p5.scale(1 * flipX + scaleX, 1 * flipY + scaleY);
            p5.image(img, 0, 0);
        }
    };

    return (
        <Space direction="vertical">
            <Form
                initialValues={dataAugmentationConfig}
                labelCol={{
                    sm: { span: 7 }
                }}
                wrapperCol={{
                    sm: { span: 10 }
                }}
                onValuesChange={dataAugmentationFormHandler}>
                <Form.Item name="isActive" label="Data augmentation" valuePropName="checked">
                    <Switch />
                </Form.Item>
                {dataAugmentationConfig.isActive ? (
                    <>
                        <Form.Item name="noise" label="Noise">
                            <InputNumber min={-1} max={1} step="0.01" />
                        </Form.Item>
                        <Form.Item name="translationX" label="Horizontal translation">
                            <InputNumber min={-1} max={1} step="0.01" />
                        </Form.Item>
                        <Form.Item name="translationY" label="Vertical translation">
                            <InputNumber min={-1} max={1} step="0.01" />
                        </Form.Item>
                        <Form.Item name="rotateLeft" label="Left rotation">
                            <InputNumber min={-1} max={1} step="0.01" />
                        </Form.Item>
                        <Form.Item name="rotateRight" label="Right rotation">
                            <InputNumber min={-1} max={1} step="0.01" />
                        </Form.Item>
                        <Form.Item name="flipX" label="Horizontal flip" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                        <Form.Item name="flipY" label="Vertical flip" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                        <Form.Item name="scale" label="Scale">
                            <InputNumber min={-1} max={1} step="0.01" />
                        </Form.Item>
                    </>
                ) : null}
            </Form>
            <Typography>
                <Typography.Title level={4}>Display Image</Typography.Title>
            </Typography>
            <Sketch setup={setup} draw={draw} />
        </Space>
    );
};

export default DataAugConfig;
