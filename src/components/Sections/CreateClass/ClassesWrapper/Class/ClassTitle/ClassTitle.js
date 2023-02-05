import React from 'react';
import { Typography, Row, Col, Button, Popconfirm } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styles from './ClassTitle.module.scss';

const ClassTitle = ({ classTitle, setEditableTitle, removeClass, configKey }) => {
    return (
        <Row justify="space-between" align="middle" className={styles.classTitle}>
            <Col className={styles.title}>
                <Typography>
                    <Typography.Title
                        className={styles.className}
                        editable={{
                            tooltip: 'Click to edit the class name',
                            onChange: setEditableTitle
                        }}
                        level={4}>
                        {classTitle}
                    </Typography.Title>
                </Typography>
            </Col>
            <Col>
                <Popconfirm
                    title="Are you sure to delete this class?"
                    onConfirm={() => removeClass(configKey)}
                    okText="Yes"
                    cancelText="No">
                    <Button
                        className={styles.turnOffButton}
                        size="small"
                        type="danger"
                        ghost
                        shape="circle"
                        icon={<CloseOutlined />}
                    />
                </Popconfirm>
            </Col>
        </Row>
    );
};

export default ClassTitle;
