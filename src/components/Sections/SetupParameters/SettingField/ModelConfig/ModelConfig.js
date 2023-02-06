import React from 'react';
import { Select, Form, InputNumber } from 'antd';

const ModelConfig = ({ paramConfig, modelFormHandler }) => {
    return (
        <Form
            initialValues={paramConfig}
            labelCol={{
                sm: { span: 8 }
            }}
            wrapperCol={{
                sm: { span: 10 }
            }}
            onValuesChange={modelFormHandler}>
            <Form.Item name="model" label="Model for features vector">
                <Select
                    placeholder="Please select the Model"
                    options={[
                        {
                            value: JSON.stringify({
                                inputShape: 1024,
                                URL: 'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_075_224/feature_vector/5/default/1'
                            }),
                            label: 'mobilenet small 075 224'
                        },
                        {
                            value: JSON.stringify({
                                inputShape: 1024,
                                URL: 'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1'
                            }),
                            label: 'mobilenet small 100 224'
                        },
                        {
                            value: JSON.stringify({
                                inputShape: 1280,
                                URL: 'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_large_075_224/feature_vector/5/default/1'
                            }),
                            label: 'mobilenet large 075 224'
                        },
                        {
                            value: JSON.stringify({
                                inputShape: 1280,
                                URL: 'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_large_100_224/feature_vector/5/default/1'
                            }),
                            label: 'mobilenet large 100 224'
                        },
                        {
                            value: JSON.stringify({
                                inputShape: 2048,
                                URL: 'https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/feature_vector/3/default/1'
                            }),
                            label: 'inception'
                        },
                        {
                            value: JSON.stringify({
                                inputShape: 2048,
                                URL: 'https://tfhub.dev/google/tfjs-model/inaturalist/inception_v3/feature_vector/3/default/1'
                            }),
                            label: 'inception (from iNaturalist dataset)'
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
