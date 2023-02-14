import React from 'react';
import { Button, Card, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const ExportModelCard = ({ model, classConfig }) => {
    const classesTextBuilder = () => {
        let result = '';
        classConfig.forEach((c, i) => {
            if (i !== classConfig.length - 1) {
                result += `${c.label}\n`;
            } else {
                result += c.label;
            }
        });
        return result;
    };

    const exportModel = async () => {
        const classesText = classesTextBuilder();
        try {
            await model.save('downloads://my-model');

            const blob = new Blob([classesText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.download = 'classes.txt';
            link.href = url;
            link.click();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <Card title="Export your model">
                <Typography>
                    <Typography.Paragraph>
                        To save your trained model to your computer, click the button below. This
                        will create and export three files: model.json, model.weights.bin, and
                        classes.txt.
                    </Typography.Paragraph>
                </Typography>
                <Button
                    icon={<DownloadOutlined />}
                    onClick={() => exportModel()}
                    type="primary"
                    disabled={!model}>
                    Export
                </Button>
            </Card>
        </div>
    );
};

export default ExportModelCard;
