import { CircleCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TrainingReport } from '@/types.ts';

interface SuccessAlertProps {
    report: TrainingReport;
}

const SuccessAlert = ({ report }: SuccessAlertProps) => {
    const last = report.logs[report.logs.length - 1];
    return (
        <Alert variant="success">
            <CircleCheck />
            <AlertTitle>Training is completed!</AlertTitle>
            <AlertDescription>
                Accuracy: {last.lossAndAccuracy.acc.toFixed(3)}, Loss:{' '}
                {last.lossAndAccuracy.loss.toFixed(3)}
            </AlertDescription>
        </Alert>
    );
};

export default SuccessAlert;
