import { useEffect, useState } from 'react';
import { Collapse, Divider } from 'antd';
import LineChart from './LineChart/LineChart';
import ConfussionMatrix from './ConfussionMatrix/ConfusionMatrix';
import { LogEntry, TrainingReport } from '../../../../types';
import styles from './Report.module.scss';

interface ReportProps {
    report: TrainingReport | null;
    logs: LogEntry[];
}

const Report = ({ report, logs }: ReportProps) => {
    const { Panel } = Collapse;
    const [reportedLogs, setReportedLogs] = useState<LogEntry[]>(logs.length > 0 ? logs : (report?.logs ?? []));

    useEffect(() => {
        if (logs.length > 0) {
            setReportedLogs(logs);
        } else {
            setReportedLogs(report?.logs ?? []);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logs]);

    const lossDatasets = reportedLogs.map((log) => {
        return parseFloat(log.lossAndAccuracy.loss.toFixed(2));
    });
    const accDatasets = reportedLogs.map((log) => {
        return parseFloat(log.lossAndAccuracy.acc.toFixed(2));
    });
    const valLossDatasets = reportedLogs.map((log) => {
        return parseFloat(log.lossAndAccuracy.val_loss.toFixed(2));
    });

    const valAccDatasets = reportedLogs.map((log) => {
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

                    {report && logs.length === 0 ? (
                        <>
                            <Divider />
                            <ConfussionMatrix
                                confusionMatrix={report.confusionMatrix}
                                classConfig={report.classConfig}
                            />
                        </>
                    ) : null}
                </Panel>
            </Collapse>
        </div>
    );
};

export default Report;
