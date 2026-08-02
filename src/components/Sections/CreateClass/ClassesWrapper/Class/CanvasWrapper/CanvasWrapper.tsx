import { RefObject, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { MdOutlineCameraswitch } from 'react-icons/md';
import { Camera, CircleX, PauseCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CanvasWrapperProps {
    turnOffCamera: () => void;
    webcamRef: RefObject<Webcam | null>;
    recordButtonOnClick: () => void;
    isRecord: boolean;
}

const CanvasWrapper = ({
    turnOffCamera,
    webcamRef,
    recordButtonOnClick,
    isRecord
}: CanvasWrapperProps) => {
    const [showError, setShowError] = useState(false);
    const [videoConstraints, setVideoConstraints] = useState({
        video: true,
        width: 265,
        height: 265,
        facingMode: 'environment'
    });

    const flipCamera = () => {
        setVideoConstraints((current) => ({
            ...current,
            facingMode: current.facingMode === 'environment' ? 'user' : 'environment'
        }));
    };

    useEffect(() => {
        return () => {
            if (isRecord) recordButtonOnClick();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="p-3.5">
            <div className="relative flex flex-col items-center gap-3">
                <button
                    type="button"
                    onClick={turnOffCamera}
                    aria-label="Turn off camera"
                    className="absolute -top-1 right-0 flex size-7 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                    <CircleX className="size-4" />
                </button>
                <h4 className="text-sm font-semibold">Webcam</h4>
                {!showError ? (
                    <div className="relative">
                        <Webcam
                            audio={false}
                            height={265}
                            width={265}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            mirrored={videoConstraints.facingMode === 'user'}
                            videoConstraints={videoConstraints}
                            screenshotQuality={0.8}
                            onUserMediaError={() => setShowError(true)}
                            className="rounded-sm border border-border"
                        />
                        <button
                            type="button"
                            onClick={flipCamera}
                            aria-label="Flip camera"
                            className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm">
                            <MdOutlineCameraswitch className="size-4" />
                        </button>
                    </div>
                ) : null}
                {!showError ? (
                    <Button
                        onClick={recordButtonOnClick}
                        variant={isRecord ? 'destructive' : 'default'}>
                        {isRecord ? <PauseCircle /> : <Camera />}
                        {isRecord ? 'Stop the record' : 'Click to record'}
                    </Button>
                ) : (
                    <Alert variant="destructive">
                        <AlertDescription>
                            Webcam permission denied. Please enable permission to your webcam
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    );
};

export default CanvasWrapper;
