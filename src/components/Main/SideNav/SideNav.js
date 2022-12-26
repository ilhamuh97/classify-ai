import React from 'react';
import { Steps, Layout } from 'antd';
import styles from './SideNav.module.scss';

const SideNav = ({ collapsed, setCollapsed, setKey, currKey }) => {
    const { Sider } = Layout;

    const steps = [
        {
            title: 'Create Classes',
            description: 'Collect the dataset for 2 or more classes'
        },
        {
            title: 'Setup Parameters',
            description:
                'Choose your own parameters in order to find the best result for your training'
        },
        {
            title: 'Train model',
            description: 'Train your model and see the result of the training'
        },
        {
            title: 'Predict',
            description: 'Use your own model to classify the image from your camera'
        }
    ];

    return (
        <Sider
            className={styles.sider}
            collapsedWidth="0"
            collapsed={collapsed}
            theme="light"
            width={250}
            collapsible={true}
            onCollapse={(value) => setCollapsed(value)}
            trigger={null}>
            <Steps
                className={styles.steps}
                current={currKey}
                onChange={(current) => setKey(current)}
                direction="vertical"
                items={steps}
            />
        </Sider>
    );
};

export default SideNav;
