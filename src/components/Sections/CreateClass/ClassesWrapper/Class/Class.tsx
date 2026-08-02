import {
    Dispatch,
    RefObject,
    SetStateAction,
    useEffect,
    useRef,
    useState
} from 'react';
import Webcam from 'react-webcam';
import SamplesSection from './SamplesSection/SamplesSection';
import CanvasWrapper from './CanvasWrapper/CanvasWrapper';
import ClassTitle from './ClassTitle/ClassTitle';
import { Typography, Divider, message } from 'antd';
import AddDataset from './AddDataset/AddDataset';
import { ClassConfigItem, CroppedImage, DatasetItem } from '../../../../../types';
import styles from './Class.module.scss';

interface ClassProps {
    config: ClassConfigItem;
    dataset: DatasetItem[];
    setDataset: Dispatch<SetStateAction<DatasetItem[]>>;
    classConfig: ClassConfigItem[];
    setClassConfig: Dispatch<SetStateAction<ClassConfigItem[]>>;
    canvasRef: RefObject<HTMLCanvasElement | null>;
}

const Class = ({ config, dataset, setDataset, classConfig, setClassConfig, canvasRef }: ClassProps) => {
    const { Title } = Typography;
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
        message.success(`'${foundedClass[0].label}' is successfully deleted`);
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
        if (newRecordStatus === true && video && video.readyState === 4 && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d')!;

            const id = window.setInterval(() => {
                ctx.drawImage(video, 0, 0, 265, 265);
                const imageData = ctx.getImageData(0, 0, 265, 265);
                capture(imageData);
            }, 100);
            intervalRef.current = id;
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
        message.success(`All samples in '${config.label}' successfully deleted`);
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
        <div className={styles.class}>
            <ClassTitle
                classTitle={config.label}
                setEditableTitle={setEditableTitle}
                removeClass={removeClass}
                configKey={config.key}
            />
            <Divider />
            <Typography className={styles.addSampleTitle}>
                <Title className={styles.miniTitle} level={5}>
                    Add your samples here
                </Title>
            </Typography>
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
            <Divider />
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
