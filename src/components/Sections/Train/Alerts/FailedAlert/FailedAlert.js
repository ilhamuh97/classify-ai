import { Alert } from 'antd';
import React from 'react';

const FailedAlert = () => {
    return <Alert message="Error Text" showIcon description="Training Failed" type="error" />;
};

export default FailedAlert;
