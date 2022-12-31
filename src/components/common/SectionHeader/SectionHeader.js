import { Typography } from 'antd';
import React from 'react';
Typography;

const SectionHeader = ({ title, subTitle }) => {
    return (
        <Typography>
            <Typography.Title level={2}>{title}</Typography.Title>
            <Typography.Paragraph>{subTitle}</Typography.Paragraph>
        </Typography>
    );
};

export default SectionHeader;
