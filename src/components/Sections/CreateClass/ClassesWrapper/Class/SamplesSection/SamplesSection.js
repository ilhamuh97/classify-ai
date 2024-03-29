import React from 'react';
import { Typography, Row, Col, Popconfirm, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import styles from './SamplesSection.module.scss';

const SamplesSection = ({ configKey, dataset, removeAllDataset, deleteImage }) => {
    const filteredDataset = dataset.filter((ds) => ds.key == configKey);
    return (
        <div className={styles.samplesSection}>
            <Row justify="space-between" align="middle">
                <Col>
                    <Typography>
                        <Typography.Title level={5}>Your samples</Typography.Title>
                    </Typography>
                </Col>
                {filteredDataset.length !== 0 ? (
                    <Col>
                        <Popconfirm
                            placement="rightBottom"
                            title={'Are you sure to delete all samples in this class?'}
                            onConfirm={() => removeAllDataset(configKey)}
                            okText="Yes"
                            cancelText="No">
                            <Button type="text" size="small" danger>
                                Clear all
                            </Button>
                        </Popconfirm>
                    </Col>
                ) : null}
            </Row>
            {filteredDataset.length !== 0 ? (
                <Collapse accordion>
                    <Collapse.Panel
                        header={`Images ${
                            filteredDataset.length ? '(' + filteredDataset.length + ')' : ''
                        }`}
                        key="1">
                        <Row gutter={[2, 2]} className={styles.samples}>
                            {filteredDataset.map((fds, i) => {
                                return (
                                    <Col key={i} span={6}>
                                        <div key={i + 'img'} className={styles.imageWrapper}>
                                            <img src={fds.img} width={60} height={60} />
                                            <span
                                                className={styles.deleteImage}
                                                onClick={() => deleteImage(fds)}>
                                                <CloseOutlined />
                                            </span>
                                        </div>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Collapse.Panel>
                </Collapse>
            ) : (
                <Typography>
                    <Typography.Paragraph>No samples</Typography.Paragraph>
                </Typography>
            )}
        </div>
    );
};

export default SamplesSection;
