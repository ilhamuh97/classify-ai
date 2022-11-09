import React from 'react';
import ClassesWrapper from './ClassesWrapper/ClassesWrapper';
import { Typography } from 'antd';

const CreateClass = () => {
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
            <ClassesWrapper />
        </div>
    );
};

export default CreateClass;
