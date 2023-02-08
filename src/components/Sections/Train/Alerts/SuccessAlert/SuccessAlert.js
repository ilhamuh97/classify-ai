import { Alert } from 'antd';
import React from 'react';

const SuccessAlert = ({ reports }) => {
    return (
        <Alert
            message="Training is completed!"
            description={`Loss: ${reports[reports.length - 1].logs[
                reports[reports.length - 1].logs.length - 1
            ].lossAndAccuracy.loss.toFixed(3)}, Accuracy: ${reports[reports.length - 1].logs[
                reports[reports.length - 1].logs.length - 1
            ].lossAndAccuracy.acc.toFixed(3)}`}
            type="success"
            showIcon
        />
    );
};

export default SuccessAlert;
