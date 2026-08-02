import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { toast } from 'sonner';
import SamplesSection from './SamplesSection/SamplesSection';
import CanvasWrapper from './CanvasWrapper/CanvasWrapper';
import ClassTitle from './ClassTitle/ClassTitle';
import { Separator } from '@/components/ui/separator';
import AddDataset from './AddDataset/AddDataset';
import { ClassConfigItem, CroppedImage, DatasetItem } from '@/types.ts';

interface ClassProps {
    config: ClassConfigItem;
    dataset: DatasetItem[];
    setDataset: Dispatch<SetStateAction<DatasetItem[]>>;
    classConfig: ClassConfigItem[];
    setClassConfig: Dispatch<SetStateAction<ClassConfigItem[]>>;
    canvasRef: RefObject<HTMLCanvasElement | null>;
}

const Class = ({
    config,
    dataset,
    setDataset,
    classConfig,
    setClassConfig,
    canvasRef
}: ClassProps) => {
    const [editableTitle, setEditableTitle] = useState('');
    const [isRecord, setIsRecord] = useState(false);
    const intervalRef = useRef<number | undefined>(undefined);
    const webcamRef = useRef<Webcam>(null);

    useEffect(() => {
        setEditableTitle(config.label);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        const newState = classConfig.map((c) => {
            if (c.key === config.key) {
                return { ...config, label: editableTitle };
            }
            return c;
        });
        setClassConfig(newState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editableTitle]);

    const removeClass = (classKey: number) => {
        const foundedClass = classConfig.filter((d) => d.key === classKey);
        const newClasses = classConfig
            .filter((c) => c.key !== classKey)
            .map((c) => {
                if (c.key > classKey) c.key = c.key - 1;
                return c;
            });
        const newDataset = dataset
            .filter((d) => d.key !== classKey)
            .map((d) => {
                if (d.key > classKey) d.key = d.key - 1;
                return d;
            });
        setDataset(newDataset);
        setClassConfig(newClasses);
        toast.success(`'${foundedClass[0].label}' is successfully deleted`);
    };

    const capture = (imgData: ImageData) => {
        const imageSrc = webcamRef.current?.getScreenshot() ?? '';
        setDataset((current) => [
            ...current,
            {
                key: config.key,
                img: imageSrc,
                data: imgData
            }
        ]);
    };

    const inputByUpload = (uploadImage: CroppedImage) => {
        setDataset((current) => [
            ...current,
            {
                key: config.key,
                img: uploadImage.src,
                data: uploadImage.imgData
            }
        ]);
    };

    const recordButtonOnClick = () => {
        const newRecordStatus = !isRecord;
        setIsRecord(newRecordStatus);
        const video = webcamRef.current?.video;
        if (newRecordStatus && video && video.readyState === 4 && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d')!;

            intervalRef.current = window.setInterval(() => {
                ctx.drawImage(video, 0, 0, 265, 265);
                const imageData = ctx.getImageData(0, 0, 265, 265);
                capture(imageData);
            }, 100);
        } else {
            clearInterval(intervalRef.current);
        }
    };

    const turnOffCamera = () => {
        const newState = classConfig.map((c) => {
            if (c.key === config.key) return { ...c, cameraState: false };
            return c;
        });
        setClassConfig(newState);
    };

    const removeAllDataset = (classKey: number) => {
        const newDataset = dataset.filter((d) => d.key !== classKey);
        setDataset(newDataset);
        toast.success(`All samples in '${config.label}' successfully deleted`);
    };

    const turnOnCamera = () => {
        const newState = classConfig.map((c) => {
            if (c.key === config.key) return { ...c, cameraState: true };
            if (c.key !== config.key) return { ...c, cameraState: false };
            return c;
        });
        setClassConfig(newState);
    };

    const deleteImage = (img: DatasetItem) => {
        const newDataset = dataset.filter((d) => d !== img);
        setDataset(newDataset);
    };

    return (
        <div className="overflow-hidden rounded-sm border border-border bg-card">
            <ClassTitle
                classTitle={config.label}
                setEditableTitle={setEditableTitle}
                removeClass={removeClass}
                configKey={config.key}
            />
            <p className="px-3.5 pt-3 text-sm font-semibold">Add your samples here</p>
            {config.cameraState ? (
                <CanvasWrapper
                    turnOffCamera={turnOffCamera}
                    webcamRef={webcamRef}
                    recordButtonOnClick={recordButtonOnClick}
                    isRecord={isRecord}
                />
            ) : (
                <AddDataset
                    turnOnCamera={turnOnCamera}
                    canvasRef={canvasRef}
                    inputByUpload={inputByUpload}
                />
            )}
            <Separator />
            <SamplesSection
                configKey={config.key}
                dataset={dataset}
                removeAllDataset={removeAllDataset}
                deleteImage={deleteImage}
            />
        </div>
    );
};

export default Class;
