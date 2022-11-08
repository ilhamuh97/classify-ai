import React, { useState } from 'react';
import { AimOutlined, SettingOutlined, PlusSquareOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './Main.module.scss';

const Main = () => {
    let navigate = useNavigate();
    const { Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const [key, setKey] = useState(1);

    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label
        };
    }

    const items = [
        getItem('Home', '0', <HomeOutlined />),
        getItem('Create Classes', '1', <PlusSquareOutlined />),
        getItem('Setup Parameters', '2', <SettingOutlined />),
        getItem('Train', '3', <AimOutlined />)
    ];

    const onClick = (e) => {
        setKey(e.key);
        if (e.key === '0') {
            navigate('/');
        }
    };

    const ContentElem = (key) => {
        switch (key) {
            case '1':
                return <div>Bla bla {key}</div>;
            case '2':
                return <div>Bla bla {key}</div>;
            case '3':
                return <div>Bla bla {key}</div>;
            default:
                return <div>Bla bla {key}</div>;
        }
    };

    return (
        <Layout className={styles.layout}>
            <Sider
                className={styles.sider}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}>
                <Menu
                    onClick={onClick}
                    className={styles.menu}
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    {ContentElem(key)}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Main;
