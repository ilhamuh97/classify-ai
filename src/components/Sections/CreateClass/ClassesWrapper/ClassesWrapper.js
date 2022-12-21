import React from 'react';
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
                />
            );
        });
    };

    const onClickHandler = () => {
        setClassConfig((current) => [
            ...current,
            {
                key: classConfig.length,
                label: `Class ${classConfig.length + 1}`,
                cameraState: 0
            }
        ]);
    };

    return (
        <div className={styles.classesWrapper}>
            {datasetsClasses()}
            <div className={styles.addClass} onClick={() => onClickHandler()}>
                Add Class
            </div>
        </div>
    );
};

export default ClassesWrapper;
