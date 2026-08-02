import { Alert } from 'antd';
import { TrainingReport } from '../../../../../types';

interface SuccessAlertProps {
    report: TrainingReport;
}

const SuccessAlert = ({ report }: SuccessAlertProps) => {
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
