import React, { useState } from 'react';
import { Button, Card, Upload, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as tf from '@tensorflow/tfjs';

const ImportModelCard = ({ setImportedClassConfig, setImportedModel }) => {
    const [classes, setClasses] = useState(null);

    const beforeUpload = (file) => {
        if (file.type === 'text/plain') {
            const reader = new FileReader();

            reader.onload = (event) => {
                const contents = event.target.result;
                const lines = contents.split('\n');
                let tempClasses = [];
                lines.forEach((line, i) => {
                    const jsonData = {};
                    jsonData.key = i;
                    jsonData.label = line;
                    jsonData.cameraState = false;
                    tempClasses.push(jsonData);
                });
                setClasses(tempClasses);
            };
            reader.readAsText(file);
        }
    };

    const handleChange = async (file) => {
        const filteredFile = file.fileList.filter(
            (f) => f.type === 'application/macbinary' || f.type === 'application/json'
        );
        try {
            const model = await tf.loadLayersModel(
                tf.io.browserFiles([
                    filteredFile.find((f) => f.type === 'application/json').originFileObj,
                    filteredFile.find((f) => f.type === 'application/macbinary').originFileObj
                ])
            );
            model.summary();
            setImportedClassConfig(classes);
            setImportedModel(model);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Card title="Import your model">
                <Typography>
                    <Typography.Paragraph>
                        In order to import your model, you have to import 3 files, which are
                        model.weights.bin, model.json, and classes.txt
                    </Typography.Paragraph>
                </Typography>
                <Upload directory onChange={handleChange} beforeUpload={beforeUpload}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Card>
        </div>
    );
};

export default ImportModelCard;
