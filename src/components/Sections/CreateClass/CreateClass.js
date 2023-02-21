import React, { useEffect, useRef, useContext } from 'react';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import ClassesWrapper from './ClassesWrapper/ClassesWrapper';
import { createClassContext as headerContext } from '../../../assets/text/headerText/headerText';
import { ClassConfigContext } from '../../../contexts/ClassConfigContext';
import styles from './CreateClass.module.scss';

const CreateClass = ({ keysDataset, setKeysDataset, dataset, setDataset }) => {
    const classConfigRef = useRef();
    const { classConfig, setClassConfig } = useContext(ClassConfigContext);

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
                    title={headerContext.title}
                    subTitle={headerContext.subTitle}
                    stepStatus={headerContext.stepStatus}
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
