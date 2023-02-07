import React from 'react';
import { Collapse, Divider } from 'antd';
import styles from './Report.module.scss';
import LineChart from './LineChart/LineChart';
import ConfussionMatrix from './ConfussionMatrix/ConfusionMatrix';

const Report = ({ reports, model, validationDataset, classConfig, graphModel }) => {
    const { Panel } = Collapse;
    const lossDatasets = reports[reports.length - 1].logs.map((log) => {
        return parseFloat(log.lossAndAccuracy.loss.toFixed(2));
    });
    const accDatasets = reports[reports.length - 1].logs.map((log) => {
        return parseFloat(log.lossAndAccuracy.acc.toFixed(2));
    });
    const valLossDatasets = reports[reports.length - 1].logs.map((log) => {
        return parseFloat(log.lossAndAccuracy.val_loss.toFixed(2));
    });
    const valAccDatasets = reports[reports.length - 1].logs.map((log) => {
        return parseFloat(log.lossAndAccuracy.val_acc.toFixed(2));
    });

    return (
        <div className={styles.report}>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="See the report" key="1">
                    <LineChart
                        title={'Accuracy'}
                        trainData={accDatasets}
                        validationData={valAccDatasets}
                    />
                    <Divider />
                    <LineChart
                        title={'Loss'}
                        trainData={lossDatasets}
                        validationData={valLossDatasets}
                    />
                    <Divider />
                    <ConfussionMatrix
                        validationDataset={validationDataset}
                        model={model}
                        graphModel={graphModel}
                        classConfig={classConfig}
                    />
                </Panel>
            </Collapse>
        </div>
    );
};

export default Report;
