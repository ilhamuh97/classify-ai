import { useContext } from 'react';
import { Collapse } from 'antd';
import ModelConfig from './ModelConfig/ModelConfig';
import DataAugConfig from './DataAugConfig/DataAugConfig';
import { ParamConfigContext } from '../../../../contexts/ParamConfigContext';
import { DataAugmentationConfigContext } from '../../../../contexts/DataAugmentationConfigContext';
import { DataAugmentationConfig, DatasetItem, ParamConfig } from '../../../../types';
import styles from './SettingField.module.scss';

interface SettingFieldProps {
    dataset: DatasetItem[];
}

const SettingField = ({ dataset }: SettingFieldProps) => {
    const { paramConfig, setParamConfig } = useContext(ParamConfigContext);
    const { dataAugmentationConfig, setDataAugmentationConfig } = useContext(
        DataAugmentationConfigContext
    );
    const modelFormHandler = (_changedValues: Partial<ParamConfig>, allValues: ParamConfig) => {
        setParamConfig(allValues);
    };

    const dataAugmentationFormHandler = (
        _changedValues: Partial<DataAugmentationConfig>,
        allValues: DataAugmentationConfig
    ) => {
        setDataAugmentationConfig(allValues);
    };

    return (
        <div className={styles.settingField}>
            <Collapse defaultActiveKey={['1']} accordion expandIconPosition="end">
                <Collapse.Panel header="Training configuration" key="1">
                    <ModelConfig paramConfig={paramConfig} modelFormHandler={modelFormHandler} />
                </Collapse.Panel>
                <Collapse.Panel header="Data Augmentation configuration" key="2">
                    <DataAugConfig
                        dataAugmentationConfig={dataAugmentationConfig}
                        dataset={dataset}
                        dataAugmentationFormHandler={dataAugmentationFormHandler}
                    />
                </Collapse.Panel>
            </Collapse>
        </div>
    );
};

export default SettingField;
