import React from 'react';
import SettingField from './SettingField/SettingField';
import styles from './SetupParameters.module.scss';
import SectionHeader from '../../common/SectionHeader/SectionHeader';

const SetupParameters = ({
    paramConfig,
    setParamConfig,
    dataAugmentationConfig,
    setDataAugmentationConfig,
    dataset
}) => {
    return (
        <div className={styles.setupParameters}>
            <SectionHeader
                title="Setup Parameters: Model Configuration and Data Augmentation"
                subTitle="This section allows you to make your model and dataset work better together. You can change the settings of the model such as the learning rate and the number of times the model will go through the dataset. You can also use tools like rotation, flipping and scaling to improve the diversity of the dataset and prevent overfitting. With ClassifyAI's user-friendly interface, it's easy to adjust your model and dataset to achieve your desired level of accuracy."
            />
            <SettingField
                paramConfig={paramConfig}
                setParamConfig={setParamConfig}
                dataAugmentationConfig={dataAugmentationConfig}
                setDataAugmentationConfig={setDataAugmentationConfig}
                dataset={dataset}
            />
        </div>
    );
};

export default SetupParameters;
