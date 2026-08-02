import { RefObject, useState } from 'react';
import Webcam from 'react-webcam';
import { MdOutlineCameraswitch } from 'react-icons/md';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface DisplayImageProps {
    isCameraOn: boolean;
    webcamRef: RefObject<Webcam | null>;
}

const DisplayImage = ({ isCameraOn, webcamRef }: DisplayImageProps) => {
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

    if (!isCameraOn) return null;

    if (showError) {
        return (
            <Alert variant="destructive">
                <AlertDescription>
                    Webcam permission denied. Please enable permission to your webcam
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="relative mx-auto aspect-square w-full max-w-[265px] overflow-hidden rounded-md bg-brand-scope">
            <Webcam
                ref={webcamRef}
                audio={false}
                videoConstraints={videoConstraints}
                onUserMedia={() => setShowError(false)}
                onUserMediaError={() => setShowError(true)}
                mirrored={videoConstraints.facingMode === 'user'}
                height={265}
                width={265}
                className="size-full object-cover"
            />
            <div className="pointer-events-none absolute inset-3">
                <span className="absolute left-0 top-0 size-6 border-l-2 border-t-2 border-brand-focus" />
                <span className="absolute right-0 top-0 size-6 border-r-2 border-t-2 border-brand-focus" />
                <span className="absolute bottom-0 left-0 size-6 border-b-2 border-l-2 border-brand-focus" />
                <span className="absolute bottom-0 right-0 size-6 border-b-2 border-r-2 border-brand-focus" />
            </div>
            <button
                type="button"
                onClick={flipCamera}
                aria-label="Flip camera"
                className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm">
                <MdOutlineCameraswitch className="size-4" />
            </button>
        </div>
    );
};

export default DisplayImage;
