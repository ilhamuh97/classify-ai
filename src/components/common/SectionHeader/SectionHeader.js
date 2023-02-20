import React from 'react';
import { Typography } from 'antd';
import styles from './SectionHeader.module.scss';

const SectionHeader = ({ title, subTitle, stepStatus }) => {
    return (
        <Typography className={styles.sectionHeader}>
            <span className={styles.stepStatus}>{stepStatus}</span>
            <Typography.Title className={styles.title} level={2}>
                {title}
            </Typography.Title>
            <Typography.Paragraph className={styles.subTitle}>{subTitle}</Typography.Paragraph>
        </Typography>
    );
};

export default SectionHeader;
