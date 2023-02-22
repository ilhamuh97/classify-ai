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
import { ParamConfigContext } from '../../contexts/ParamConfigContext';
import { DataAugmentationConfigContext } from '../../contexts/DataAugmentationConfigContext';
import { ClassConfigContext } from '../../contexts/ClassConfigContext';
import {
    classConfigValue,
    paramConfigValue,
    dataAugmentationConfigValue
} from '../../assets/initialValues/initialValues';
import styles from './Main.module.scss';

const Main = () => {
    const { Content } = Layout;
    const [collapsed, setCollapsed] = useState(true);
    const [key, setKey] = useState(0);
    const [keysDataset, setKeysDataset] = useState([]);
    const [dataset, setDataset] = useState([]);
    const [graphModel, setGraphModel] = useState(null);
    const [model, setModel] = useState(null);
    const [report, setReport] = useState(null);
    const [paramConfig, setParamConfig] = useState(paramConfigValue);
    const [dataAugmentationConfig, setDataAugmentationConfig] = useState(
        dataAugmentationConfigValue
    );
    const [classConfig, setClassConfig] = useState(classConfigValue);

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
                        keysDataset={keysDataset}
                        setKeysDataset={setKeysDataset}
                        dataset={dataset}
                        setDataset={setDataset}
                    />
                );
            case 1:
                return <SetupParameters dataset={dataset} />;
            case 2:
                return (
                    <Train
                        dataset={dataset}
                        model={model}
                        setModel={setModel}
                        graphModel={graphModel}
                        setGraphModel={setGraphModel}
                        setReport={setReport}
                        report={report}
                    />
                );
            case 3:
                return (
                    <Predict model={model} graphModel={graphModel} setGraphModel={setGraphModel} />
                );
            default:
                return (
                    <CreateClass
                        keysDataset={keysDataset}
                        setKeysDataset={setKeysDataset}
                        dataset={dataset}
                        setDataset={setDataset}
                    />
                );
        }
    };

    return (
        <Layout className={`${styles.layout}`}>
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
            <Layout
                className={`${styles.siteLayout} ${collapsed ? styles.big : styles.small}  ${
                    key === 0 || key === 3 ? styles.noPadding : null
                }`}>
                <Layout.Header>
                    <div className={styles.logo}>
                        <img src={Logo} />
                    </div>
                </Layout.Header>
                {!collapsed ? (
                    <div className={styles.overlay} onClick={() => setCollapsed(true)} />
                ) : null}
                <ParamConfigContext.Provider value={{ paramConfig, setParamConfig }}>
                    <DataAugmentationConfigContext.Provider
                        value={{ dataAugmentationConfig, setDataAugmentationConfig }}>
                        <ClassConfigContext.Provider value={{ classConfig, setClassConfig }}>
                            <Content style={{ margin: '32px 0', overflow: 'initial' }}>
                                {ContentElem(key)}
                            </Content>
                        </ClassConfigContext.Provider>
                    </DataAugmentationConfigContext.Provider>
                </ParamConfigContext.Provider>
                <Layout.Footer>© Copyright {new Date().getFullYear()} Ilhamuh97</Layout.Footer>
            </Layout>
        </Layout>
    );
};

export default Main;
