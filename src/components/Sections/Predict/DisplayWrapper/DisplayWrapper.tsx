import { Dispatch, RefObject, SetStateAction } from 'react';
import Webcam from 'react-webcam';
import { Camera } from 'lucide-react';
import DisplayImage from './DisplayImage/DisplayImage';
import { Button } from '@/components/ui/button';

interface DisplayWrapperProps {
    isCameraOn: boolean;
    setIsCameraOn: Dispatch<SetStateAction<boolean>>;
    webcamRef: RefObject<Webcam | null>;
    predictionClass: string;
    predictionPercent: number;
}

const DisplayWrapper = ({
    isCameraOn,
    setIsCameraOn,
    webcamRef,
    predictionClass,
    predictionPercent
}: DisplayWrapperProps) => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 sm:items-start">
            <div className="grid justify-items-center gap-3 text-center">
                <h3 className="text-sm font-semibold">Camera</h3>
                <DisplayImage isCameraOn={isCameraOn} webcamRef={webcamRef} />
                <Button onClick={() => setIsCameraOn(!isCameraOn)}>
                    <Camera /> {isCameraOn ? 'Turn off' : 'Turn on'}
                </Button>
            </div>
            {isCameraOn ? (
                <div className="grid gap-3 rounded-sm border border-border bg-card p-5">
                    <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                        Identified as
                    </span>
                    <span className="font-display text-3xl">{predictionClass || '—'}</span>
                    <div className="h-2 overflow-hidden rounded-full bg-border">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-brand-focus to-primary transition-[width]"
                            style={{ width: `${predictionPercent}%` }}
                        />
                    </div>
                    <div className="flex justify-between font-mono text-xs tabular-nums text-muted-foreground">
                        <span>Confidence</span>
                        <span>{predictionPercent}%</span>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default DisplayWrapper;
