import { CircleAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const FailedAlert = () => {
    return (
        <Alert variant="destructive">
            <CircleAlert />
            <AlertTitle>Error Text</AlertTitle>
            <AlertDescription>Training Failed</AlertDescription>
        </Alert>
    );
};

export default FailedAlert;
