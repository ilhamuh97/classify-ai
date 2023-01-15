import React from 'react';
import { Select, Form, InputNumber } from 'antd';

const ModelConfig = ({ paramConfig, modelFormHandler }) => {
    return (
        <Form
            initialValues={paramConfig}
            labelCol={{
                sm: { span: 7 }
            }}
            wrapperCol={{
                sm: { span: 10 }
            }}
            onValuesChange={modelFormHandler}>
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
    );
};

export default ModelConfig;
