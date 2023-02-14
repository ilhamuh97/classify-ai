import React from 'react';
import ExportModelCard from './ExportModelCard/ExportModelCard';
import ImportModelCard from './ImportModelCard/ImportModelCard';
import { Tabs } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import styles from './TabsForModel.module.scss';

const TabsForModel = ({ model, classConfig, setImportedClassConfig, setImportedModel }) => {
    const tabItems = [
        {
            label: (
                <span>
                    <DownloadOutlined /> Export model
                </span>
            ),
            key: '1',

            children: <ExportModelCard model={model} classConfig={classConfig} />
        },
        {
            label: (
                <span>
                    <UploadOutlined /> Import model
                </span>
            ),
            key: '2',
            disabled: true,
            children: (
                <ImportModelCard
                    setImportedClassConfig={setImportedClassConfig}
                    setImportedModel={setImportedModel}
                />
            )
        }
    ];

    return (
        <Tabs
            defaultActiveKey="1"
            items={tabItems}
            type="card"
            size="large"
            className={styles.tabsForModel}
        />
    );
};

export default TabsForModel;
