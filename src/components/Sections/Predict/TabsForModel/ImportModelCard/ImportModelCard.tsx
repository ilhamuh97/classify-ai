import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Card, Upload, Typography } from 'antd';
import type { RcFile, UploadChangeParam } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import * as tf from '@tensorflow/tfjs';
import { ClassConfigItem } from '../../../../../types';

interface ImportModelCardProps {
    setImportedClassConfig: Dispatch<SetStateAction<ClassConfigItem[] | null>>;
    setImportedModel: Dispatch<SetStateAction<tf.LayersModel | null>>;
}

const ImportModelCard = ({ setImportedClassConfig, setImportedModel }: ImportModelCardProps) => {
    const [classes, setClasses] = useState<ClassConfigItem[] | null>(null);

    const beforeUpload = (file: RcFile) => {
        if (file.type === 'text/plain') {
            const reader = new FileReader();

            reader.onload = (event) => {
                const contents = event.target?.result as string;
                const lines = contents.split('\n');
                const tempClasses: ClassConfigItem[] = [];
                lines.forEach((line, i) => {
                    tempClasses.push({
                        key: i,
                        label: line,
                        cameraState: false
                    });
                });
                setClasses(tempClasses);
            };
            reader.readAsText(file);
        }
    };

    const handleChange = async (file: UploadChangeParam) => {
        const filteredFile = file.fileList.filter(
            (f) => f.type === 'application/macbinary' || f.type === 'application/json'
        );
        try {
            const jsonFile = filteredFile.find((f) => f.type === 'application/json')
                ?.originFileObj as File;
            const weightsFile = filteredFile.find((f) => f.type === 'application/macbinary')
                ?.originFileObj as File;
            const model = await tf.loadLayersModel(tf.io.browserFiles([jsonFile, weightsFile]));
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
