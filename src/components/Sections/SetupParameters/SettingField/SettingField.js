import React from 'react';
import { Collapse } from 'antd';
import ModelConfig from './ModelConfig/ModelConfig';
import DataAugConfig from './DataAugConfig/DataAugConfig';
import styles from './SettingField.module.scss';

const SettingField = ({
    paramConfig,
    setParamConfig,
    dataAugmentationConfig,
    setDataAugmentationConfig,
    dataset
}) => {
    const modelFormHandler = (value, allValues) => {
        setParamConfig(allValues);
    };

    const dataAugmentationFormHandler = (value, allValues) => {
        console.log(allValues);
        setDataAugmentationConfig(allValues);
    };

    return (
        <div className={styles.settingField}>
            <Collapse defaultActiveKey={['1']} accordion expandIconPosition="end">
                <Collapse.Panel header="Model configuration" key="1">
                    <ModelConfig paramConfig={paramConfig} modelFormHandler={modelFormHandler} />
                </Collapse.Panel>
                <Collapse.Panel header="Data Augmentation configuration" key="2">
                    <DataAugConfig
                        dataAugmentationConfig={dataAugmentationConfig}
                        setDataAugmentationConfig={setDataAugmentationConfig}
                        dataset={dataset}
                        dataAugmentationFormHandler={dataAugmentationFormHandler}
                    />
                </Collapse.Panel>
            </Collapse>
        </div>
    );
};

export default SettingField;
