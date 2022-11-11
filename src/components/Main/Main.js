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

    const ContentElem = (key) => {
        switch (key) {
            case '0':
                navigate('/');
                break;
            case '1':
                return <CreateClass />;
            case '2':
                return <div>Bla bla {key}</div>;
            case '3':
                return <div>Bla bla {key}</div>;
            default:
                return <CreateClass />;
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
