import React from 'react';
import { Layout, Menu } from 'antd';
import { AimOutlined, SettingOutlined, PlusSquareOutlined } from '@ant-design/icons';
import styles from './SideNav.module.scss';

const SideNav = ({ collapsed, setCollapsed, setKey }) => {
    const { Sider } = Layout;

    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label
        };
    }

    const steps = [
        getItem('Create Classes', '1', <PlusSquareOutlined />),
        getItem('Setup Parameters', '2', <SettingOutlined />),
        getItem('Train', '3', <AimOutlined />)
    ];

    return (
        <Sider
            className={styles.sider}
            breakpoint="lg"
            collapsedWidth="0"
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}>
            <div className="logo"></div>
            <Menu
                onClick={(e) => setKey(e.key)}
                className={styles.menu}
                defaultSelectedKeys={['1']}
                mode="inline"
                items={steps}
            />
        </Sider>
    );
};

export default SideNav;
