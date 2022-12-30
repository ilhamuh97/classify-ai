import React from 'react';
import { Collapse } from 'antd';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from './Report.module.scss';

const Report = ({ reports }) => {
    const { Panel } = Collapse;
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: `Model: ${reports[reports.length - 1].modelIdx}`
            }
        }
    };
    const labels = Array.from(Array(reports[reports.length - 1].logs.length).keys());
    const lossDatasets = reports[reports.length - 1].logs.map((log) => {
        return log.lossAndAccuracy.loss;
    });
    const accDatasets = reports[reports.length - 1].logs.map((log) => {
        return log.lossAndAccuracy.acc;
    });
    const data = {
        labels,
        datasets: [
            {
                label: 'Loss',
                data: lossDatasets,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y'
            },
            {
                label: 'Accuracy',
                data: accDatasets,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y1'
            }
        ]
    };

    return (
        <div className={styles.report}>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="See the report" key="1">
                    <Line options={options} data={data} />
                </Panel>
            </Collapse>
        </div>
    );
};

export default Report;
