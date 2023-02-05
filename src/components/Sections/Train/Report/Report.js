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
import styles from './Report.module.scss';
import Chart from 'react-apexcharts';

const Report = ({ reports }) => {
    const { Panel } = Collapse;
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
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

    const lineChartOption = (title) => {
        return {
            colors: ['rgb(53, 162, 235)', 'rgb(255, 99, 132)'],
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            yaxis: {
                max: 1,
                min: 0
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: title,
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                }
            }
        };
    };

    const lineChartData = (label1, label2, data1, data2) => {
        return [
            {
                name: label1,
                data: data1
            },
            {
                name: label2,
                data: data2
            }
        ];
    };

    return (
        <div className={styles.report}>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="See the report" key="1">
                    <Chart
                        options={lineChartOption('Accuracy')}
                        series={lineChartData(
                            'Training',
                            'Validation',
                            accDatasets,
                            valAccDatasets
                        )}
                    />
                    <Chart
                        options={lineChartOption('Validation')}
                        series={lineChartData(
                            'Training',
                            'Validation',
                            lossDatasets,
                            valLossDatasets
                        )}
                    />
                </Panel>
            </Collapse>
        </div>
    );
};

export default Report;
