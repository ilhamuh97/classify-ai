import React, { useEffect, useRef } from 'react';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import ClassesWrapper from './ClassesWrapper/ClassesWrapper';
import styles from './CreateClass.module.scss';

const CreateClass = ({
    classConfig,
    setClassConfig,
    keysDataset,
    setKeysDataset,
    dataset,
    setDataset
}) => {
    const classConfigRef = useRef();

    useEffect(() => {
        classConfigRef.current = classConfig;
    }, [classConfig]);

    useEffect(() => {
        return () => {
            const newState = classConfigRef.current.map((c) => {
                return { ...c, cameraState: false };
            });
            setClassConfig(newState);
        };
    }, []);

    return (
        <div className={styles.CreateClass}>
            <div className={styles.header}>
                <SectionHeader
                    title="Create Your Dataset in Real-Time"
                    subTitle="Creating a dataset has never been easier! Our platform allows you to snap pictures using your own camera and label them on the spot. It is a great feature for anyone who is looking to build a dataset in real-time scenarios. Just hit the snap button and start creating your dataset."
                />
            </div>
            <ClassesWrapper
                classConfig={classConfig}
                setClassConfig={setClassConfig}
                keysDataset={keysDataset}
                setKeysDataset={setKeysDataset}
                dataset={dataset}
                setDataset={setDataset}
            />
        </div>
    );
};

export default CreateClass;
