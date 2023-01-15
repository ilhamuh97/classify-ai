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
                subTitle="In this section, you can fine-tune both your model and your dataset to achieve the best performance. You can set the model's hyperparameters, such as learning rate, number of epochs, and feature vector model. You can also perform data augmentation techniques like rotation, flipping, scaling, and more, on the dataset to increase its diversity and prevent overfitting. With our user-friendly interface, you can easily make adjustments to both your model and dataset to achieve your desired level of accuracy."
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
