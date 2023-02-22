import { Alert } from 'antd';
import React from 'react';

const SuccessAlert = ({ report }) => {
    return (
        <Alert
            message="Training is completed!"
            description={`Accuracy: ${report.logs[
                report.logs.length - 1
            ].lossAndAccuracy.acc.toFixed(3)}, Loss: ${report.logs[
                report.logs.length - 1
            ].lossAndAccuracy.loss.toFixed(3)}`}
            type="success"
            showIcon
        />
    );
};

export default SuccessAlert;
