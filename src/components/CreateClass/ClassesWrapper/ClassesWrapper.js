import { Button } from 'antd';
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
                key: classConfig.length + 1,
                label: `Class ${classConfig.length + 1}`,
                cameraState: 0
            }
        ]);
    };

    return (
        <div className={styles.classesWrapper}>
            {datasetsClasses()}
            <Button onClick={() => onClickHandler()}>Add Class</Button>
        </div>
    );
};

export default ClassesWrapper;
