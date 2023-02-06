import React from 'react';
import { Collapse, Divider } from 'antd';
import styles from './Report.module.scss';
import Chart from 'react-apexcharts';

const Report = ({ reports }) => {
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

    const lineChartOption = (title, yAxis) => {
        return {
            colors: ['rgb(53, 162, 235)', 'rgb(255, 99, 132)'],
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            yaxis: yAxis,
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
                        options={lineChartOption('Accuracy', {
                            max: 1
                        })}
                        series={lineChartData(
                            'Training',
                            'Validation',
                            accDatasets,
                            valAccDatasets
                        )}
                    />
                    <Divider />
                    <Chart
                        options={lineChartOption('Loss', {
                            min: 0
                        })}
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
