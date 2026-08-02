import { Dispatch, SetStateAction, useContext, useEffect, useRef } from 'react';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import ClassesWrapper from './ClassesWrapper/ClassesWrapper';
import { createClassContext as headerContext } from '../../../assets/text/headerText/headerText';
import { ClassConfigContext } from '@/contexts/ClassConfigContext.ts';
import { DatasetItem } from '@/types.ts';

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
        <div className="grid gap-8">
            <SectionHeader
                title={headerContext.title}
                subTitle={headerContext.subTitle}
                stepStatus={headerContext.stepStatus}
            />
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
