import React from 'react';
import { Typography } from 'antd';
import styles from './SectionHeader.module.scss';

const SectionHeader = ({ title, subTitle }) => {
    return (
        <Typography className={styles.sectionHeader}>
            <Typography.Title className={styles.title} level={2}>
                {title}
            </Typography.Title>
            <Typography.Paragraph>{subTitle}</Typography.Paragraph>
        </Typography>
    );
};

export default SectionHeader;
