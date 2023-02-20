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
            const modelName = 'my-model';
            await model.save('downloads://' + modelName);

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
                        <div>
                            To save your trained model to your computer, click the button below.
                            This will create and export three files:
                        </div>
                        <ul>
                            <li>model.json</li>
                            <li>model.weights.bin</li>
                            <li>classes.txt</li>
                        </ul>
                    </Typography.Paragraph>
                </Typography>
                <Button
                    icon={<DownloadOutlined />}
                    onClick={() => exportModel()}
                    type="primary"
                    shape="round"
                    disabled={!model}>
                    Export
                </Button>
            </Card>
        </div>
    );
};

export default ExportModelCard;
