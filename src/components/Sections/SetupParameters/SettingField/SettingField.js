import React, { useContext } from 'react';
import { Collapse } from 'antd';
import ModelConfig from './ModelConfig/ModelConfig';
import DataAugConfig from './DataAugConfig/DataAugConfig';
import { ParamConfigContext } from '../../../../contexts/ParamConfigContext';
import styles from './SettingField.module.scss';
import { DataAugmentationConfigContext } from '../../../../contexts/DataAugmentationConfigContext';

const SettingField = ({ dataset }) => {
    const { paramConfig, setParamConfig } = useContext(ParamConfigContext);
    const { dataAugmentationConfig, setDataAugmentationConfig } = useContext(
        DataAugmentationConfigContext
    );
    const modelFormHandler = (value, allValues) => {
        setParamConfig(allValues);
    };

    const dataAugmentationFormHandler = (value, allValues) => {
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
