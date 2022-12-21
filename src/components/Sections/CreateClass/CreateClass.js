import React from 'react';
import ClassesWrapper from './ClassesWrapper/ClassesWrapper';
import { Typography } from 'antd';
import styles from './CreateClass.module.scss';

const CreateClass = ({
    classConfig,
    setClassConfig,
    keysDataset,
    setKeysDataset,
    dataset,
    setDataset
}) => {
    const { Title, Paragraph } = Typography;
    return (
        <div className={styles.CreateClass}>
            <Typography>
                <Title level={2}>Create Class</Title>
                <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquet luctus
                    aliquam. Phasellus eget lacinia mauris. Aliquam varius malesuada diam sit amet
                    efficitur.{' '}
                </Paragraph>
            </Typography>
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
