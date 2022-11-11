import React, { useState } from 'react';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './Main.module.scss';
import CreateClass from '../CreateClass/CreateClass';
import SideNav from './SideNav/SideNav';
import { Space, Typography } from 'antd';

const Main = () => {
    let navigate = useNavigate();
    const { Text } = Typography;
    const { Header, Content } = Layout;
    const [collapsed, setCollapsed] = useState(true);
    const [key, setKey] = useState('1');
    const [classConfig, setClassConfig] = useState([
        {
            key: 0,
            label: 'Class 1',
            cameraState: 0
        },
        {
            key: 1,
            label: 'Class 2',
            cameraState: 0
        }
    ]);

    const [keysDataset, setKeysDataset] = useState([]);
    const [dataset, setDataset] = useState([]);

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
                return <div>Bla bla {key}</div>;
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
