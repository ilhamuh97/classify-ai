import React from 'react';
import SettingField from './SettingField/SettingField';
import { Typography } from 'antd';
import styles from './SetupParameters.module.scss';

const SetupParameters = ({
    model,
    setModel,
    graphModel,
    setGraphModel,
    classesLength,
    paramConfig,
    setParamConfig
}) => {
    const { Title, Paragraph } = Typography;
    return (
        <div className={styles.setupParameters}>
            <Typography>
                <Title level={2}>Setup Model</Title>
                <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquet luctus
                    aliquam. Phasellus eget lacinia mauris. Aliquam varius malesuada diam sit amet
                    efficitur.{' '}
                </Paragraph>
            </Typography>
            <SettingField
                graphModel={graphModel}
                setGraphModel={setGraphModel}
                model={model}
                setModel={setModel}
                classesLength={classesLength}
                paramConfig={paramConfig}
                setParamConfig={setParamConfig}
            />
        </div>
    );
};

export default SetupParameters;
