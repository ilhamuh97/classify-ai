import React, { useRef } from 'react';
import Class from './Class/Class';
import styles from './ClassesWrapper.module.scss';

const ClassesWrapper = ({
    classConfig,
    setClassConfig,
    keysDataset,
    setKeysDataset,
    dataset,
    setDataset
}) => {
    const canvasRef = useRef(null);

    const datasetsClasses = () => {
        return classConfig.map((config, i) => {
            return (
                <Class
                    key={i}
                    config={config}
                    classConfig={classConfig}
                    setClassConfig={setClassConfig}
                    keysDataset={keysDataset}
                    setKeysDataset={setKeysDataset}
                    dataset={dataset}
                    setDataset={setDataset}
                    canvasRef={canvasRef}
                />
            );
        });
    };

    const generateKey = (key = 0) => {
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

    const generateClassName = (key = 0) => {
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
