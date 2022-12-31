import { Alert } from 'antd';
import React from 'react';

const SuccessAlert = ({ reports }) => {
    return (
        <Alert
            message="Training succeed!"
            description={`Loss: ${
                reports[reports.length - 1].logs[reports[reports.length - 1].logs.length - 1]
                    .lossAndAccuracy.loss
            }, Accuracy: ${
                reports[reports.length - 1].logs[reports[reports.length - 1].logs.length - 1]
                    .lossAndAccuracy.acc
            }`}
            type="success"
            showIcon
        />
    );
};

export default SuccessAlert;
