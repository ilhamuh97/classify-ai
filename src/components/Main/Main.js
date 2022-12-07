import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateClass from '../CreateClass/CreateClass';
import SetupParameters from '../SetupParameters/SetupParameters';
import SideNav from './SideNav/SideNav';
import { Layout } from 'antd';
import { Space, Typography } from 'antd';
import styles from './Main.module.scss';

const Main = () => {
    let navigate = useNavigate();
    const { Text } = Typography;
    const { Header, Content } = Layout;
    const [collapsed, setCollapsed] = useState(true);
    const [key, setKey] = useState('1');
    const [keysDataset, setKeysDataset] = useState([]);
    const [dataset, setDataset] = useState([]);
    const [graphModel, setGraphModel] = useState(null);
    const [model, setModel] = useState(null);
    const [paramConfig, setParamConfig] = useState({
        modelURL:
            'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1',
        optimizer: 'adam'
    });
    const [classConfig, setClassConfig] = useState([
        {
            key: 0,
            label: 'Class 1',
            cameraState: false
        },
        {
            key: 1,
            label: 'Class 2',
            cameraState: false
        }
    ]);

    useEffect(() => {
        if (model) {
            model.summary();
        }
    }, [graphModel]);

    useEffect(() => {
        if (model) {
            model.summary();
        }
    }, [model]);

    const ContentElem = (key) => {
        switch (key) {
            case '0':
                navigate('/');
                break;
            case '1':
                return (
                    <CreateClass
                        classConfig={classConfig}
                        setClassConfig={setClassConfig}
                        keysDataset={keysDataset}
                        setKeysDataset={setKeysDataset}
                        dataset={dataset}
                        setDataset={setDataset}
                    />
                );
            case '2':
                return (
                    <SetupParameters
                        model={model}
                        graphModel={graphModel}
                        setModel={setModel}
                        setGraphModel={setGraphModel}
                        classesLength={classConfig.length}
                        paramConfig={paramConfig}
                        setParamConfig={setParamConfig}
                    />
                );
            case '3':
                return <div>Bla bla {key}</div>;
            default:
                return (
                    <CreateClass
                        classConfig={classConfig}
                        setClassConfig={setClassConfig}
                        keysDataset={keysDataset}
                        setKeysDataset={setKeysDataset}
                        dataset={dataset}
                        setDataset={setDataset}
                    />
                );
        }
    };

    return (
        <Layout className={styles.layout} hasSider>
            <SideNav collapsed={collapsed} setCollapsed={setCollapsed} setKey={setKey} />
            <Layout className={`${styles.siteLayout} ${collapsed ? styles.big : styles.small}`}>
                <Header className={styles.header}>
                    <Space className={styles.logo} onClick={() => navigate('/')}>
                        <Text>C Y O M</Text>
                    </Space>
                </Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    {ContentElem(key)}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Main;
