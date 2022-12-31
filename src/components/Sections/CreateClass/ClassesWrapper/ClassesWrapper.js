import React from 'react';
import Class from './Class/Class';
import { message } from 'antd';
import styles from './ClassesWrapper.module.scss';

const ClassesWrapper = ({
    classConfig,
    setClassConfig,
    keysDataset,
    setKeysDataset,
    dataset,
    setDataset
}) => {
    const removeClass = (classKey) => {
        const foundedClass = classConfig.filter((d) => d.key === classKey);
        const newDataset = dataset.filter((d) => d.key !== classKey);
        const newClasses = classConfig.filter((c) => c.key !== classKey);
        setDataset(newDataset);
        setClassConfig(newClasses);
        message.success(`Class '${foundedClass[0].label}' is successfully deleted`);
    };

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
                    removeClass={removeClass}
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
        </div>
    );
};

export default ClassesWrapper;
