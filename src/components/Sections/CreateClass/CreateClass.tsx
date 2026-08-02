import { Dispatch, SetStateAction, useContext, useEffect, useRef } from 'react';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import ClassesWrapper from './ClassesWrapper/ClassesWrapper';
import { createClassContext as headerContext } from '../../../assets/text/headerText/headerText';
import { ClassConfigContext } from '../../../contexts/ClassConfigContext';
import { DatasetItem } from '../../../types';
import styles from './CreateClass.module.scss';

interface CreateClassProps {
    dataset: DatasetItem[];
    setDataset: Dispatch<SetStateAction<DatasetItem[]>>;
}

const CreateClass = ({ dataset, setDataset }: CreateClassProps) => {
    const { classConfig, setClassConfig } = useContext(ClassConfigContext);
    const classConfigRef = useRef(classConfig);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                dataset={dataset}
                setDataset={setDataset}
            />
        </div>
    );
};

export default CreateClass;
