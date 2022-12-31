import React from 'react';
import { Select, InputNumber, Form } from 'antd';
import styles from './SettingField.module.scss';

const SettingField = ({ paramConfig, setParamConfig }) => {
    const formHandler = (value, allValues) => {
        setParamConfig(allValues);
    };

    return (
        <div className={styles.settingField}>
            <Form
                initialValues={paramConfig}
                labelCol={{
                    span: 4
                }}
                wrapperCol={{
                    span: 10
                }}
                onValuesChange={formHandler}>
                <Form.Item name="model" label="Model Version">
                    <Select
                        placeholder="Please select the Model"
                        options={[
                            {
                                value: 'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1',
                                label: 'mobilenet v3 small'
                            },
                            {
                                value: 'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_130_224/feature_vector/3/default/1',
                                label: 'mobilenet v2 small'
                            }
                        ]}
                    />
                </Form.Item>
                <Form.Item name="optimizer" label="Optimizer">
                    <Select
                        placeholder="Please select the Optimizer"
                        options={[
                            {
                                value: 'adam',
                                label: 'Adam'
                            },
                            {
                                value: 'sgd',
                                label: 'SGD'
                            }
                        ]}
                    />
                </Form.Item>
                <Form.Item name="learningRate" label="Learning Rate">
                    <InputNumber stringMode step="0.001" />
                </Form.Item>
                <Form.Item name="epochs" label="Epochs">
                    <InputNumber min={1} />
                </Form.Item>
                <Form.Item name="batchSize" label="Batch Size">
                    <InputNumber min={1} />
                </Form.Item>
            </Form>
        </div>
    );
};

export default SettingField;
