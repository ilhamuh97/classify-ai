import React from 'react';
import { Form, Select, Switch, Card, Alert } from 'antd';
import {
    graphModelOptions,
    inputDimensionOptions
} from '../../../../assets/initialValues/initialValues';
import styles from './PredictConfig.module.scss';

const PredictConfig = ({ predictConfig, predictFormHandler }) => {
    const newGraphModelOptions = [
        {
            value: null,
            label: 'No graph model is being used.'
        },
        ...graphModelOptions
    ];
    return (
        <div className={styles.predictConfig}>
            <Alert
                type="info"
                message="This card appears because an imported model has been detected."></Alert>
            <Card title="Set up your prediction configuration">
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                    initialValues={predictConfig}
                    className={styles.predictConfigForm}
                    onValuesChange={predictFormHandler}>
                    <Form.Item
                        name="useImportedModel"
                        label="Use imported model"
                        valuePropName="checked">
                        <Switch />
                    </Form.Item>
                    <Form.Item name="inputDimension" label="Input dimension">
                        <Select
                            placeholder="Please select the Model"
                            options={inputDimensionOptions}
                        />
                    </Form.Item>
                    <Form.Item name="graphModelName" label="Graph Model">
                        <Select
                            placeholder="Please select the Model"
                            options={newGraphModelOptions}
                        />
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default PredictConfig;
