import React from 'react';
import { Typography } from 'antd';
import MainCanvas2 from '../MainCanvas/MainCanvas2';

const AddClass = () => {
    const { Title, Paragraph } = Typography;
    return (
        <div>
            <Typography>
                <Title level={2}>Create Class</Title>
                <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquet luctus
                    aliquam. Phasellus eget lacinia mauris. Aliquam varius malesuada diam sit amet
                    efficitur.{' '}
                </Paragraph>
            </Typography>
            <Typography>
                <Title level={3}>Class 1</Title>
            </Typography>
            <MainCanvas2 id={0} label="class1" />
        </div>
    );
};

export default AddClass;
