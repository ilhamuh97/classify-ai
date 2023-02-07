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
            <Form.Item
                name="model"
                label="Model"
                tooltip={{
                    color: '#000000',
                    title: 'This model generates feature vectors for each image in the dataset and uses these vectors to train its own parameters.'
                }}>
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
            <Form.Item
                name="optimizer"
                label="Optimizer"
                tooltip={{
                    color: '#000000',
                    title: 'An optimizer is a technique used in machine learning to minimize the loss/error during model training by updating its parameters.'
                }}>
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
            <Form.Item
                name="learningRate"
                label="Learning Rate"
                tooltip={{
                    color: '#000000',
                    title: "The learning rate is like a speed control for training a machine learning model. When the model is being trained, it makes updates to its parameters so it can better fit the data. The learning rate determines how big these updates should be. If the learning rate is set too high, the model might make big leaps and miss the best solution. If it's set too low, the training process will be slow. The goal is to find the right learning rate so the model can quickly and accurately find the best solution."
                }}>
                <InputNumber stringMode step="0.001" />
            </Form.Item>
            <Form.Item
                name="epochs"
                label="Epochs"
                tooltip={{
                    color: '#000000',
                    title: 'The number of training iterations performed by this model can be adjusted by specifying the number of epochs.'
                }}>
                <InputNumber min={1} />
            </Form.Item>
            <Form.Item
                name="batchSize"
                label="Batch Size"
                tooltip={{
                    color: '#000000',
                    title: 'The batch size refers to the number of images processed in a single group. With each batch, the model updates its parameters through learning.'
                }}>
                <InputNumber min={1} />
            </Form.Item>
        </Form>
    );
};

export default ModelConfig;
