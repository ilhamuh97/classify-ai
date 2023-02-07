import React, { useEffect, useState } from 'react';
import CreateClass from '../../components/Sections/CreateClass/CreateClass';
import SetupParameters from '../../components/Sections/SetupParameters/SetupParameters';
import Train from '../../components/Sections/Train/Train';
import Predict from '../../components/Sections/Predict/Predict';
import SideNav from './SideNav/SideNav';
import Logo from '../../assets/logo/classify.svg';
import { Layout, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { usePrompt } from '../../components/common/RouterPrompt/RouterPrompt';
import styles from './Main.module.scss';

const Main = () => {
    const { Content } = Layout;
    const [collapsed, setCollapsed] = useState(true);
    const [key, setKey] = useState(0);
    const [keysDataset, setKeysDataset] = useState([]);
    const [dataset, setDataset] = useState([]);
    const [graphModel, setGraphModel] = useState(null);
    const [model, setModel] = useState(null);
    const [paramConfig, setParamConfig] = useState({
        model: JSON.stringify({
            inputShape: 1024,
            URL: 'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1'
        }),
        optimizer: 'adam',
        learningRate: 0.001,
        epochs: 10,
        batchSize: 4
    });
    const [dataAugmentationConfig, setDataAugmentationConfig] = useState({
        isActive: false,
        noise: 0.0,
        translationX: 0.0,
        translationY: 0.0,
        rotation: 0.0,
        flipX: false,
        flipY: false,
        scale: 0.0
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
    }, [model, graphModel]);

    const ContentElem = (key) => {
        switch (key) {
            case 0:
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
            case 1:
                return (
                    <SetupParameters
                        model={model}
                        graphModel={graphModel}
                        setModel={setModel}
                        setGraphModel={setGraphModel}
                        classesLength={classConfig.length}
                        paramConfig={paramConfig}
                        dataAugmentationConfig={dataAugmentationConfig}
                        setDataAugmentationConfig={setDataAugmentationConfig}
                        setParamConfig={setParamConfig}
                        dataset={dataset}
                    />
                );
            case 2:
                return (
                    <Train
                        dataset={dataset}
                        model={model}
                        setModel={setModel}
                        graphModel={graphModel}
                        setGraphModel={setGraphModel}
                        paramConfig={paramConfig}
                        classConfig={classConfig}
                        dataAugmentationConfig={dataAugmentationConfig}
                    />
                );
            case 3:
                return <Predict model={model} graphModel={graphModel} classConfig={classConfig} />;
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
        <Layout className={styles.layout}>
            {usePrompt('All your work will be lost, are you sure you want to leave this page?')}
            <Button
                style={collapsed ? { left: 0 } : { left: 250 }}
                className={styles.sideToggleButton}
                type="primary"
                onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <SideNav
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                setKey={setKey}
                currKey={key}
            />
            <Layout className={`${styles.siteLayout} ${collapsed ? styles.big : styles.small}`}>
                <Layout.Header>
                    <div className={styles.logo}>
                        <img src={Logo} />
                    </div>
                </Layout.Header>
                {!collapsed ? (
                    <div className={styles.overlay} onClick={() => setCollapsed(true)} />
                ) : null}

                <Content style={{ margin: '32px 0', overflow: 'initial' }}>
                    {ContentElem(key)}
                </Content>
                <Layout.Footer>© Copyright {new Date().getFullYear()} Ilhamuh97</Layout.Footer>
            </Layout>
        </Layout>
    );
};

export default Main;
