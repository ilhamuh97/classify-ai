import { Dispatch, SetStateAction, useRef } from 'react';
import Class from './Class/Class';
import { ClassConfigItem, DatasetItem } from '../../../../types';
import styles from './ClassesWrapper.module.scss';

interface ClassesWrapperProps {
    classConfig: ClassConfigItem[];
    setClassConfig: Dispatch<SetStateAction<ClassConfigItem[]>>;
    dataset: DatasetItem[];
    setDataset: Dispatch<SetStateAction<DatasetItem[]>>;
}

const ClassesWrapper = ({
    classConfig,
    setClassConfig,
    dataset,
    setDataset
}: ClassesWrapperProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const datasetsClasses = () => {
        return classConfig.map((config, i) => {
            return (
                <Class
                    key={i}
                    config={config}
                    classConfig={classConfig}
                    setClassConfig={setClassConfig}
                    dataset={dataset}
                    setDataset={setDataset}
                    canvasRef={canvasRef}
                />
            );
        });
    };

    const generateKey = (key = 0): number => {
        let emptyKey = false;
        while (!emptyKey) {
            const foundedClass = classConfig.find((config) => config.key === key);
            if (!foundedClass) {
                emptyKey = true;
            } else {
                key++;
            }
        }

        return key;
    };

    const generateClassName = (key = 0): string => {
        let emptyKey = false;
        while (!emptyKey) {
            const foundedClass = classConfig.find((config) => config.label === `Class ${key + 1}`);
            if (!foundedClass) {
                emptyKey = true;
            } else {
                key++;
            }
        }

        return `Class ${key + 1}`;
    };

    const onClickHandler = () => {
        const key = generateKey();
        const className = generateClassName();
        setClassConfig((current) => [
            ...current,
            {
                key: key,
                label: className,
                cameraState: false
            }
        ]);
    };

    return (
        <div className={styles.classesWrapper}>
            {datasetsClasses()}
            <div className={styles.addClass} onClick={() => onClickHandler()}>
                Add Class
            </div>
            <canvas
                ref={canvasRef}
                height={265}
                width={265}
                style={{
                    display: 'none'
                }}
            />
        </div>
    );
};

export default ClassesWrapper;
