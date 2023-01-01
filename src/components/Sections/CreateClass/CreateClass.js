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
            <SectionHeader
                title="Create Class"
                subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquet luctus
                aliquam. Phasellus eget lacinia mauris. Aliquam varius malesuada diam sit amet
                efficitur."
            />
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
