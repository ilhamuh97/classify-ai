import React from 'react';
import SettingField from './SettingField/SettingField';
import styles from './SetupParameters.module.scss';
import SectionHeader from '../../common/SectionHeader/SectionHeader';

const SetupParameters = ({ paramConfig, setParamConfig }) => {
    return (
        <div className={styles.setupParameters}>
            <SectionHeader
                title="Setup Model"
                subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquet luctus
            aliquam. Phasellus eget lacinia mauris. Aliquam varius malesuada diam sit amet
            efficitur."
            />
            <SettingField paramConfig={paramConfig} setParamConfig={setParamConfig} />
        </div>
    );
};

export default SetupParameters;
